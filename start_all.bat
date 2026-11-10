@echo off
echo ==============================================
echo   Lunaris + CLPS Lunar Navigator Launcher
echo ==============================================
echo.

echo Starting CLPS FastAPI backend on http://127.0.0.1:8000 ...
start "CLPS Backend" cmd /k "CLPS\.venv\Scripts\python.exe -m uvicorn main:app --app-dir CLPS --host 127.0.0.1 --port 8000 --reload"

echo Starting Lunaris Frontend Vite Server ...
npm run dev

