@echo off
cd /d "%~dp0"
set PYTHON_EXE=%~dp0.venv\Scripts\python.exe

if not exist "%PYTHON_EXE%" (
    echo Creating .venv and installing dependencies...
    python -m venv .venv
    "%PYTHON_EXE%" -m pip install -r requirements.txt
)

echo Starting EduVora Audiobook Worker in foreground (Ctrl+C to stop)...
"%PYTHON_EXE%" -m celery -A worker.celery_app worker -Q chapter_audio_jobs --pool=threads --concurrency=4 --loglevel=info
