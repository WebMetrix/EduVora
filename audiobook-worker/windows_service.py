"""
Native Windows Service wrapper for EduVora Audiobook Celery Worker.
Uses pywin32 (win32serviceutil) directly — no NSSM or third-party wrappers required.

Manual CLI commands (Run as Administrator):
    python windows_service.py --startup auto install
    python windows_service.py start
    python windows_service.py stop
    python windows_service.py restart
    python windows_service.py remove
    python windows_service.py debug
"""

import os
import sys
import time
import subprocess
from pathlib import Path

import servicemanager
import win32event
import win32service
import win32serviceutil

BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from worker.config import CELERY_QUEUE, CELERY_CONCURRENCY, LOG_DIR
from worker.logger import get_logger


class EduVoraAudiobookWorkerService(win32serviceutil.ServiceFramework):
    _svc_name_ = "EduVoraAudiobookWorker"
    _svc_display_name_ = "EduVora Audiobook Worker Service"
    _svc_description_ = (
        "Background Celery worker that watches RabbitMQ for uploaded chapter PDFs, "
        "generates conversational teacher-style scripts, and synthesizes watermarked MP3 audiobooks."
    )

    def __init__(self, args):
        super().__init__(args)
        self.stop_event = win32event.CreateEvent(None, 0, 0, None)
        self.proc: subprocess.Popen | None = None
        self.log = get_logger("WindowsService", filename="service.log")
        self.running = True

    def _get_python_exe(self) -> str:
        venv_py = BASE_DIR / ".venv" / "Scripts" / "python.exe"
        if venv_py.exists():
            return str(venv_py)
        return sys.executable

    def _terminate_proc_tree(self):
        if not self.proc:
            return
        if self.proc.poll() is None:
            self.log.info("Stopping Celery worker process tree (PID=%s)...", self.proc.pid)
            try:
                # taskkill /T /F cleanly stops child processes on Windows
                subprocess.run(
                    ["taskkill", "/PID", str(self.proc.pid), "/T", "/F"],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    timeout=15,
                )
            except Exception as exc:
                self.log.error("Error terminating process tree: %s", exc)
                try:
                    self.proc.kill()
                except Exception:
                    pass
        self.proc = None

    def SvcStop(self):
        self.log.info("Service stop requested by Windows SCM.")
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        self.running = False
        win32event.SetEvent(self.stop_event)
        self._terminate_proc_tree()

    def SvcDoRun(self):
        servicemanager.LogMsg(
            servicemanager.EVENTLOG_INFORMATION_TYPE,
            servicemanager.PYS_SERVICE_STARTED,
            (self._svc_name_, ""),
        )
        self.log.info("Starting %s in %s", self._svc_name_, BASE_DIR)
        self.main()

    def main(self):
        LOG_DIR.mkdir(parents=True, exist_ok=True)
        celery_stdout_log = LOG_DIR / "celery_stdout.log"
        python_exe = self._get_python_exe()

        cmd = [
            python_exe,
            "-m",
            "celery",
            "-A",
            "worker.celery_app",
            "worker",
            "-Q",
            CELERY_QUEUE,
            "--pool=threads",
            f"--concurrency={CELERY_CONCURRENCY}",
            "--loglevel=info",
            "--without-gossip",
            "--without-mingle",
        ]

        env = os.environ.copy()
        env["PYTHONUNBUFFERED"] = "1"
        env["PYTHONPATH"] = str(BASE_DIR)

        while self.running:
            self.log.info("Launching Celery worker: %s", " ".join(cmd))
            with open(celery_stdout_log, "a", encoding="utf-8") as out_f:
                self.proc = subprocess.Popen(
                    cmd,
                    cwd=str(BASE_DIR),
                    env=env,
                    stdout=out_f,
                    stderr=subprocess.STDOUT,
                    creationflags=subprocess.CREATE_NO_WINDOW,
                )

                # Monitor worker health until stop_event is signaled or child exits
                while self.running:
                    rc = win32event.WaitForSingleObject(self.stop_event, 2000)
                    if rc == win32event.WAIT_OBJECT_0:
                        break
                    exit_code = self.proc.poll()
                    if exit_code is not None:
                        self.log.warning(
                            "Celery worker exited unexpectedly with code %s. Restarting in 5s...",
                            exit_code,
                        )
                        time.sleep(5)
                        break

        self._terminate_proc_tree()
        self.log.info("%s stopped cleanly.", self._svc_name_)
        servicemanager.LogMsg(
            servicemanager.EVENTLOG_INFORMATION_TYPE,
            servicemanager.PYS_SERVICE_STOPPED,
            (self._svc_name_, ""),
        )


if __name__ == "__main__":
    if len(sys.argv) == 1:
        servicemanager.Initialize()
        servicemanager.PrepareToHostSingle(EduVoraAudiobookWorkerService)
        servicemanager.StartServiceCtrlDispatcher()
    else:
        win32serviceutil.HandleCommandLine(EduVoraAudiobookWorkerService)
