"""
Database, authentication, and JWT authorization for Lunaris & CLPS.
Supports role-based email verification:
- Public / Normal: Any valid email
- Researcher / Student: Only .ac.in or .edu domains
- Scientist / Mission Professional: Space agency or recognized research institution domain
"""
import sqlite3
import hashlib
import os
import re
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Optional, Dict, Any, List
import jwt

DB_PATH = Path(os.environ.get("LUNARIS_DB_PATH", str(Path(__file__).parent / "lunaris.db")))
JWT_SECRET = os.environ.get("LUNARIS_JWT_SECRET", "lunaris-super-secret-key-deep-space-2027")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 72

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                hashed_password TEXT NOT NULL,
                salt TEXT NOT NULL,
                role TEXT NOT NULL,
                organization TEXT,
                created_at TEXT NOT NULL
            );
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS saved_scenarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                name TEXT NOT NULL,
                site_id TEXT NOT NULL,
                lat REAL,
                lon REAL,
                start_utc TEXT NOT NULL,
                hours REAL NOT NULL,
                summary_json TEXT,
                notes TEXT,
                created_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
        """)
        conn.commit()

        # Seed default demonstration accounts if not already present
        now_iso = datetime.now(timezone.utc).isoformat()
        demo_seeds = [
            ("test@gmail.com", "test123", "Demo Explorer", "public", "Public Access"),
            ("test@iitb.ac.in", "test123", "Demo Researcher", "researcher", "IIT Bombay"),
            ("test@nasa.gov", "test123", "Demo Scientist", "mission", "NASA Artemis Team"),
        ]
        for demo_email, demo_pw, demo_name, demo_role, demo_org in demo_seeds:
            existing = conn.execute("SELECT id FROM users WHERE email = ?", (demo_email,)).fetchone()
            if not existing:
                h, s = hash_password(demo_pw)
                conn.execute(
                    """INSERT INTO users (email, name, hashed_password, salt, role, organization, created_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?)""",
                    (demo_email, demo_name, h, s, demo_role, demo_org, now_iso)
                )
        conn.commit()

init_db()

def hash_password(password: str, salt: Optional[str] = None) -> tuple[str, str]:
    if not salt:
        salt = os.urandom(16).hex()
    hashed = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000
    ).hex()
    return hashed, salt

def verify_password(password: str, hashed: str, salt: str) -> bool:
    new_hash, _ = hash_password(password, salt)
    return new_hash == hashed

def create_jwt_token(user_id: int, email: str, role: str, name: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user_id),
        "email": email,
        "role": role,
        "name": name,
        "iat": now,
        "exp": now + timedelta(hours=JWT_EXPIRATION_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except Exception:
        return None

def validate_role_email(email: str, role: str) -> tuple[bool, str]:
    email = email.strip().lower()
    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        return False, "Invalid email format"

    domain = email.split("@")[-1]

    # Researcher & Student role: MUST be .ac.in or .edu (or subdomains)
    if role in ("researcher", "student"):
        if domain.endswith(".ac.in") or domain.endswith(".edu") or ".edu." in domain or ".ac." in domain:
            return True, ""
        return False, "Researcher and Student accounts require an accredited academic email (.ac.in or .edu)."

    # Scientist / Mission Professional role: agency, space research, or verified science domains
    if role in ("mission", "scientist"):
        # Recognized space agencies and science institutions
        valid_agency_patterns = [
            r"\.gov(\.[a-z]{2})?$",      # .gov, .gov.in, .gov.au, etc.
            r"\.isro\.gov\.in$",
            r"\.nasa\.gov$",
            r"\.esa\.int$",
            r"\.jaxa\.jp$",
            r"\.cnes\.fr$",
            r"\.dlr\.de$",
            r"\.space$",
            r"\.org$",
            r"\.int$",
            r"scientist",
        ]
        if any(re.search(pat, domain) for pat in valid_agency_patterns):
            return True, ""
        return False, "Scientist & Mission Professional accounts require an authorized research institute or space agency domain (e.g. @nasa.gov, @isro.gov.in, @esa.int, @*.gov, @*.org, @*.space)."

    # Normal / Public role: accepts any valid email (gmail, outlook, etc.)
    return True, ""

