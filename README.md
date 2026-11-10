# Lunaris — Lunar Landing Site Navigator

> Unified React (Vite, Tailwind CSS) + FastAPI (SpiceyPy, NASA SPICE, LOLA DEM, SQLite Auth) Mission Planning System.

---

## 🚂 Railway Deployment (All-In-One Container)

This repository is pre-configured with a multi-stage `Dockerfile` and `railway.json`:
1. **Frontend stage**: Builds the React 19 / Vite client (`/dist`).
2. **Backend stage**: Installs Python, GDAL, and dependencies, loads SPICE kernels, and serves both the API endpoints (`/sites`, `/timeseries`, `/auth`, `/horizon`, etc.) and the SPA frontend on a single unified port.

### Quick Deploy to Railway

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy to Railway"
   git push origin main
   ```
2. Open [railway.app](https://railway.app) and click **New Project** → **Deploy from GitHub repo**.
3. Select your repository.
4. In Railway project **Settings**:
   * Under **Networking**, click **Generate Domain** (e.g. `https://lunaris-production.up.railway.app`).
5. In Railway **Variables** tab, set:
   * `LUNARIS_JWT_SECRET`: Any random 32+ character string (for JWT tokens).
   * `LUNARIS_DB_PATH`: `/app/lunaris.db` (or a mounted volume path).

Done! Your full app (UI + API + SPICE ephemeris) will be live under a single domain.

---

## 🛠 Local Development

```bash
# Terminal 1 - Frontend
npm install
npm run dev        # http://localhost:8443

# Terminal 2 - Backend
cd CLPS
.\.venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

---

## 🔐 Demo Test Accounts

| Role | Email | Password | Access |
|---|---|---|---|
| Public Explorer | `test@gmail.com` | `test123` | Public pages & exploration |
| Researcher | `test@iitb.ac.in` | `test123` | Researcher workspace |
| Scientist | `test@nasa.gov` | `test123` | Mission control & planner |
