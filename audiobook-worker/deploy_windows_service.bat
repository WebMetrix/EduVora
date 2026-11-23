@echo off
setlocal enabledelayedexpansion

REM ============================================================================
REM EduVora Audiobook Worker - Build & Deploy as Native Windows Service
REM MUST BE RUN AS ADMINISTRATOR
REM ============================================================================

cd /d "%~dp0"
set SERVICE_NAME=EduVoraAudiobookWorker
set VENV_DIR=%~dp0.venv
set PYTHON_EXE=%VENV_DIR%\Scripts\python.exe

echo.
echo ============================================================================
echo  EduVora Audiobook Worker Service - Build ^& Deploy
echo ============================================================================

REM 1. Check Administrator privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Please right-click this .bat file and select "Run as administrator".
    pause
    exit /b 1
)

REM 2. Check .env exists
if not exist "%~dp0.env" (
    echo [ERROR] .env file not found in %~dp0
    echo         Copy .env.example to .env and fill in your API keys and DB connection.
    pause
    exit /b 1
)

REM 3. Create virtual environment if missing
if not exist "%PYTHON_EXE%" (
    echo [1/6] Creating Python virtual environment in .venv ...
    python -m venv "%VENV_DIR%"
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to create virtual environment. Ensure Python 3.10+ is in PATH.
        pause
        exit /b 1
    )
) else (
    echo [1/6] Existing .venv detected.
)

REM 4. Upgrade pip & install dependencies
echo [2/6] Installing / updating Python dependencies ...
"%PYTHON_EXE%" -m pip install --upgrade pip
"%PYTHON_EXE%" -m pip install -r "%~dp0requirements.txt"
if %errorlevel% neq 0 (
    echo [ERROR] pip install failed. Check your internet connection or requirements.txt.
    pause
    exit /b 1
)

REM 5. Register pywin32 DLLs inside venv (required for native Windows Services)
echo [3/6] Running pywin32 post-install check ...
if exist "%VENV_DIR%\Scripts\pywin32_postinstall.py" (
    "%PYTHON_EXE%" "%VENV_DIR%\Scripts\pywin32_postinstall.py" -install -silent
)

REM 6. Stop & remove existing service if redeploying
echo [4/6] Checking for existing %SERVICE_NAME% service ...
sc query "%SERVICE_NAME%" >nul 2>&1
if %errorlevel% equ 0 (
    echo       Stopping existing service ...
    sc stop "%SERVICE_NAME%" >nul 2>&1
    timeout /t 4 /nobreak >nul
    echo       Removing existing service ...
    "%PYTHON_EXE%" "%~dp0windows_service.py" remove
    timeout /t 2 /nobreak >nul
)

REM 7. Install service with Automatic startup & crash recovery
echo [5/6] Installing %SERVICE_NAME% as a native Windows Service ...
"%PYTHON_EXE%" "%~dp0windows_service.py" --startup auto install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install Windows Service.
    pause
    exit /b 1
)

REM Configure Windows SCM auto-recovery on failure (restart after 10s, 30s, 60s)
sc failure "%SERVICE_NAME%" reset= 86400 actions= restart/10000/restart/30000/restart/60000 >nul

REM 8. Start the service
echo [6/6] Starting %SERVICE_NAME% ...
"%PYTHON_EXE%" "%~dp0windows_service.py" start
if %errorlevel% neq 0 (
    echo [ERROR] Service installed but failed to start. Check logs\service.log and Event Viewer.
    pause
    exit /b 1
)

echo.
echo ============================================================================
echo  SUCCESS! %SERVICE_NAME% is installed and running.
echo  Logs:
echo    - %~dp0logs\service.log
echo    - %~dp0logs\worker.log
echo    - %~dp0logs\celery_stdout.log
echo ============================================================================
echo.
sc query "%SERVICE_NAME%"
pause
