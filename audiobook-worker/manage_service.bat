@echo off
setlocal
cd /d "%~dp0"
set SERVICE_NAME=EduVoraAudiobookWorker
set PYTHON_EXE=%~dp0.venv\Scripts\python.exe

if "%~1"=="" (
    echo Usage: manage_service.bat [start ^| stop ^| restart ^| status ^| uninstall]
    exit /b 1
)

if /i "%~1"=="status" (
    sc query "%SERVICE_NAME%"
    exit /b %errorlevel%
)

if /i "%~1"=="start" (
    "%PYTHON_EXE%" "%~dp0windows_service.py" start
    exit /b %errorlevel%
)

if /i "%~1"=="stop" (
    "%PYTHON_EXE%" "%~dp0windows_service.py" stop
    exit /b %errorlevel%
)

if /i "%~1"=="restart" (
    "%PYTHON_EXE%" "%~dp0windows_service.py" restart
    exit /b %errorlevel%
)

if /i "%~1"=="uninstall" (
    sc stop "%SERVICE_NAME%" >nul 2>&1
    timeout /t 3 /nobreak >nul
    "%PYTHON_EXE%" "%~dp0windows_service.py" remove
    exit /b %errorlevel%
)

echo Unknown command: %~1
echo Usage: manage_service.bat [start ^| stop ^| restart ^| status ^| uninstall]
exit /b 1
