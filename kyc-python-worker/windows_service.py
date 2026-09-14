import win32serviceutil
import win32service
import win32event
import subprocess

class CeleryWorkerService(win32serviceutil.ServiceFramework):
    _svc_name_ = "EduVoraKYCValidator"
    _svc_display_name_ = "EduVora KYC Validator"
    _svc_description_ = "Native Python Celery Background Worker"

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.hWaitStop = win32event.CreateEvent(None, 0, 0, None)
        self.process = None

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.hWaitStop)
        if self.process:
            self.process.terminate()

    def SvcDoRun(self):
        bat_path = r"C:\inetpub\EduVora\Services\KYCValidator\run_worker.bat"
        self.process = subprocess.Popen([bat_path], cwd=r"C:\inetpub\EduVora\Services\KYCValidator")
        win32event.WaitForSingleObject(self.hWaitStop, win32event.INFINITE)

if __name__ == '__main__':
    win32serviceutil.HandleCommandLine(CeleryWorkerService)