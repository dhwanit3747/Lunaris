from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
import lunar
import pathlib
import os

app = FastAPI(title="Lunar Landing Site Navigator API")
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"],
                   allow_methods=["*"], allow_headers=["*"])
# Approximate coordinates (planetocentric lat, east lon). VERIFY against
# mission documents / LOLA before relying on them.
SITES = {
    "apollo11": {"name": "Apollo 11 (Lunar Module)", "lat": 0.67416, "lon": 23.47314, "height_km": 0.0,
                 "source": "NASA NSSDCA Apollo landing site coordinates (LROC-based, Wagner et al. 2017)"},
    "apollo15": {"name": "Apollo 15 (Lunar Module)", "lat": 26.13239, "lon": 3.63330, "height_km": 0.0,
                 "source": "LROC 2016 coordinates of human features (Wagner et al.)"},
    "apollo17": {"name": "Apollo 17 (Lunar Module)", "lat": 20.19080, "lon": 30.77168, "height_km": 0.0,
                 "source": "NASA NSSDC lunar sites table (Davies and Colvin 2000)"},
    "malapert": {"name": "Malapert massif high point (not an official landing site)",
                 "lat": -85.99, "lon": 0.12, "height_km": 0.0,
                 "source": "Inside the IAU feature Mons Malapert; near the LROC Malapert mosaic centre (-86.0, 0.3); "
                           "about 4.8 km high in the 80 m LOLA DEM"},
    "connecting_ridge": {"name": "Connecting Ridge high point (DEM-derived, not an official site)",
                         "lat": -89.44, "lon": 222.9, "height_km": 0.0,
                         "source": "Highest ground near Shackleton in the 80 m LOLA DEM; about 0.3 km from site 001 "
                                   "(-89.45, 222.69) in Planet. Sci. J. 2022, doi:10.3847/PSJ/aca590"},
}
HORIZON_MASKS = {}  # site_id -> list of 360 floats
import json, pathlib
_m = pathlib.Path(__file__).parent / "masks.json"
if _m.exists():
    HORIZON_MASKS.update(json.loads(_m.read_text()))


class Query(BaseModel):
    site_id: Optional[str] = None
    lat: Optional[float] = Field(None, ge=-90, le=90)
    lon: Optional[float] = Field(None, ge=-180, le=360)
    height_km: float = 0.0
    start_utc: str = "2027-03-01T00:00:00"
    hours: float = Field(24 * 30, gt=0, le=24 * 400)
    step_min: float = Field(10, ge=1, le=1440)
    now_utc: Optional[str] = None
    use_terrain: bool = True


from datetime import datetime
from fastapi.responses import JSONResponse
from spiceypy.utils.exceptions import SpiceyError

MAX_POINTS = 60000
MAX_SCENARIOS = 12


@app.exception_handler(SpiceyError)
async def _spice_error(request, exc):
    return JSONResponse(status_code=422, content={
        "detail": "Ephemeris computation failed for these inputs "
                  "(check dates are between 1850 and 2149 and coordinates are valid)."})


def _check_time(t, name):
    try:
        d = datetime.fromisoformat(t.strip().replace("Z", ""))
    except ValueError:
        raise HTTPException(422, f"{name} must be ISO format like 2027-03-01T00:00:00 (UTC)")
    if not 1850 <= d.year <= 2149:
        raise HTTPException(422, f"{name} must be between 1850 and 2149 (ephemeris coverage)")


def validate(q):
    _check_time(q.start_utc, "start_utc")
    if q.now_utc:
        _check_time(q.now_utc, "now_utc")
    pts = q.hours * 60 / q.step_min
    if pts > MAX_POINTS:
        raise HTTPException(422, f"too many samples ({int(pts)}, max {MAX_POINTS}): "
                                 "increase step_min or reduce hours")


def resolve(q: Query):
    validate(q)
    if q.site_id:
        s = SITES.get(q.site_id)
        if not s:
            raise HTTPException(404, "unknown site_id")
        return s["lat"], s["lon"], s["height_km"], HORIZON_MASKS.get(q.site_id)
    if q.lat is None or q.lon is None:
        raise HTTPException(422, "provide site_id or lat/lon")
    return q.lat, q.lon % 360, q.height_km, custom_mask(q.lat, q.lon % 360)


@app.get("/sites")
def sites():
    return [{"id": k, **v, "has_terrain": k in HORIZON_MASKS} for k, v in SITES.items()]


@app.post("/timeseries")
def timeseries(q: Query):
    lat, lon, h, mask = resolve(q)
    ts = lunar.timeseries(lat, lon, h, q.start_utc, q.hours, q.step_min,
                          mask if q.use_terrain else None)
    return {
        "step_min": q.step_min, "start_utc": q.start_utc,
        **{k: v.tolist() for k, v in ts.items()},
        "summary": lunar.summary(ts),
    }


@app.post("/windows")
def windows(q: Query):
    lat, lon, h, mask = resolve(q)
    ts = lunar.timeseries(lat, lon, h, q.start_utc, q.hours, q.step_min,
                          mask if q.use_terrain else None)
    return {**lunar.windows(ts, q.now_utc, (lat, lon, h, mask if q.use_terrain else None)),
            "summary": lunar.summary(ts)}


@app.post("/compare")
def compare(queries: List[Query]):
    if len(queries) > MAX_SCENARIOS:
        raise HTTPException(422, f"max {MAX_SCENARIOS} scenarios per request")
    out = []
    for q in queries:
        lat, lon, h, mask = resolve(q)
        ts = lunar.timeseries(lat, lon, h, q.start_utc, q.hours, q.step_min,
                              mask if q.use_terrain else None)
        out.append({"site_id": q.site_id, "lat": lat, "lon": lon,
                    "start_utc": q.start_utc, **lunar.summary(ts)})
    return out


@app.get("/horizon/{site_id}")
def horizon(site_id: str):
    if site_id not in HORIZON_MASKS:
        raise HTTPException(404, "no horizon mask precomputed for this site")
    return {"site_id": site_id, "elevation_deg_by_azimuth": HORIZON_MASKS[site_id]}


# ---- custom coordinates: compute horizon mask on the fly (south of 80S only) ----
from functools import lru_cache


@lru_cache(maxsize=256)
def _mask_cached(lat, lon):
    import rasterio
    import horizon as hz
    if lat > -80 or not hz.DEM.exists():
        return None
    with rasterio.open(hz.DEM) as ds:
        m, _ = hz.compute_mask(ds, lat, lon)
    return tuple(float(v) for v in m)


def custom_mask(lat, lon):
    return _mask_cached(round(lat, 3), round(lon, 3))


@app.get("/horizon")
def horizon_custom(lat: float, lon: float):
    m = custom_mask(lat, lon % 360)
    if m is None:
        raise HTTPException(404, "no terrain data here (DEM covers 80S to the pole only)")
    return {"lat": lat, "lon": lon % 360, "elevation_deg_by_azimuth": list(m)}


# ---- warm the cache for catalog sites with the default query ----
import threading


WARM_SWEEPS = ("connecting_ridge", "malapert")   # year-long sweeps pre-computed at startup


def _warm():
    for sid in list(SITES):
        try:
            q = Query(site_id=sid)
            lat, lon, h, mask = resolve(q)
            lunar.timeseries(lat, lon, h, q.start_utc, q.hours, q.step_min, mask)
        except Exception as e:
            print("warm-up failed for", sid, e)
    for sid in WARM_SWEEPS:
        if sid in SITES:
            try:   # same parameters as demo_sweep.py, so those requests hit the cache
                sweep(SweepQuery(site_id=sid, start_utc="2027-01-01T00:00:00"))
            except Exception as e:
                print("sweep warm-up failed for", sid, e)




# ---- /sweep: one site, many start dates (how conditions change across lunar days) ----
from datetime import timedelta, timezone

MAX_SWEEP_POINTS = 200000


class SweepQuery(Query):
    count: int = Field(12, ge=1, le=24)           # number of start dates
    step_days: float = Field(29.53, gt=0, le=400)  # spacing between start dates


@app.post("/sweep")
def sweep(q: SweepQuery):
    validate(q)
    lat, lon, h, mask = resolve(q)
    pts = q.hours * 60 / q.step_min
    if pts * q.count > MAX_SWEEP_POINTS:
        raise HTTPException(422, f"sweep too large ({int(pts * q.count)} samples, "
                                 f"max {MAX_SWEEP_POINTS}): reduce count/hours or raise step_min")
    t0 = datetime.fromisoformat(q.start_utc.strip().replace("Z", ""))
    if t0.tzinfo:
        t0 = t0.astimezone(timezone.utc).replace(tzinfo=None)
    results = []
    for i in range(q.count):
        start = (t0 + timedelta(days=q.step_days * i)).isoformat(timespec="seconds")
        _check_time(start, "sweep start date")
        ts = lunar.timeseries(lat, lon, h, start, q.hours, q.step_min,
                              mask if q.use_terrain else None)
        results.append({"start_utc": start, **lunar.summary(ts)})
    return {"site_id": q.site_id, "lat": lat, "lon": lon, "results": results}


# ==========================================
# Authentication & Scenario Persistence (JWT)
# ==========================================
import db

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    role: str = "public"   # "public", "researcher", "mission", "admin"
    organization: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str

class ScenarioPayload(BaseModel):
    name: str
    site_id: str
    lat: Optional[float] = None
    lon: Optional[float] = None
    start_utc: str
    hours: float
    summary: Optional[dict] = None
    notes: Optional[str] = None

def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Missing or invalid authorization token")
    token = authorization.split(" ", 1)[1]
    payload = db.decode_jwt_token(token)
    if not payload:
        raise HTTPException(401, "Invalid or expired token")
    return payload

@app.post("/auth/register")
def register(req: RegisterRequest):
    valid, msg = db.validate_role_email(req.email, req.role)
    if not valid:
        raise HTTPException(400, msg)
    if len(req.password) < 6:
        raise HTTPException(400, "Password must be at least 6 characters")
    
    hashed, salt = db.hash_password(req.password)
    now_str = datetime.now(timezone.utc).isoformat()
    try:
        with db.get_connection() as conn:
            cur = conn.execute(
                "INSERT INTO users (email, name, hashed_password, salt, role, organization, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (req.email.strip().lower(), req.name.strip(), hashed, salt, req.role, req.organization, now_str)
            )
            user_id = cur.lastrowid
            conn.commit()
    except Exception as e:
        if "UNIQUE" in str(e).upper():
            raise HTTPException(400, "An account with this email already exists")
        raise HTTPException(500, f"Registration failed: {str(e)}")
    
    token = db.create_jwt_token(user_id, req.email.strip().lower(), req.role, req.name.strip())
    return {
        "token": token,
        "user": {
            "id": user_id,
            "email": req.email.strip().lower(),
            "name": req.name.strip(),
            "role": req.role,
            "organization": req.organization,
        }
    }

@app.post("/auth/login")
def login(req: LoginRequest):
    email = req.email.strip().lower()
    with db.get_connection() as conn:
        row = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    if not row or not db.verify_password(req.password, row["hashed_password"], row["salt"]):
        raise HTTPException(401, "Incorrect email or password")
    
    token = db.create_jwt_token(row["id"], row["email"], row["role"], row["name"])
    return {
        "token": token,
        "user": {
            "id": row["id"],
            "email": row["email"],
            "name": row["name"],
            "role": row["role"],
            "organization": row["organization"],
        }
    }

@app.get("/auth/me")
def get_me(user: dict = Depends(get_current_user)):
    return user

@app.post("/scenarios")
def save_scenario(sc: ScenarioPayload, user: dict = Depends(get_current_user)):
    now_str = datetime.now(timezone.utc).isoformat()
    with db.get_connection() as conn:
        cur = conn.execute(
            """INSERT INTO saved_scenarios 
               (user_id, name, site_id, lat, lon, start_utc, hours, summary_json, notes, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (int(user["sub"]), sc.name, sc.site_id, sc.lat, sc.lon, sc.start_utc, sc.hours,
             json.dumps(sc.summary) if sc.summary else None, sc.notes, now_str)
        )
        scenario_id = cur.lastrowid
        conn.commit()
    return {"id": scenario_id, "status": "saved"}

@app.get("/scenarios")
def list_scenarios(user: dict = Depends(get_current_user)):
    with db.get_connection() as conn:
        rows = conn.execute(
            "SELECT * FROM saved_scenarios WHERE user_id = ? ORDER BY id DESC",
            (int(user["sub"]),)
        ).fetchall()
    return [
        {
            "id": r["id"],
            "name": r["name"],
            "site_id": r["site_id"],
            "lat": r["lat"],
            "lon": r["lon"],
            "start_utc": r["start_utc"],
            "hours": r["hours"],
            "summary": json.loads(r["summary_json"]) if r["summary_json"] else None,
            "notes": r["notes"],
            "created_at": r["created_at"],
        }
        for r in rows
    ]

@app.delete("/scenarios/{scenario_id}")
def delete_scenario(scenario_id: int, user: dict = Depends(get_current_user)):
    with db.get_connection() as conn:
        conn.execute(
            "DELETE FROM saved_scenarios WHERE id = ? AND user_id = ?",
            (scenario_id, int(user["sub"]))
        )
        conn.commit()
    return {"status": "deleted"}


threading.Thread(target=_warm, daemon=True).start()

# Mount frontend build if available (single container Railway deployment)
DIST_DIR = pathlib.Path(__file__).parent.parent / "dist"
if not DIST_DIR.exists():
    DIST_DIR = pathlib.Path("/app/dist")

if DIST_DIR.exists() and (DIST_DIR / "index.html").exists():
    app.mount("/assets", StaticFiles(directory=str(DIST_DIR / "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = DIST_DIR / full_path
        if full_path and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(DIST_DIR / "index.html")

