import pyodbc
from worker.config import SQLSERVER_CONN_STR
from worker.logger import get_logger

log = get_logger(__name__)


def update_job_status(
    job_id: str,
    status: str,
    script_path: str | None = None,
    audio_path: str | None = None,
    duration_sec: int | None = None,
    error_message: str | None = None,
) -> None:
    """Update ChapterAudioJobs lifecycle strictly via SQL Server stored procedure."""
    if not SQLSERVER_CONN_STR:
        log.warning("SQLSERVER_CONN_STR is not configured; skipping DB update for job %s (%s).", job_id, status)
        return

    with pyodbc.connect(SQLSERVER_CONN_STR, autocommit=True, timeout=15) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "EXEC EV_UpdateChapterAudioJobStatus ?, ?, ?, ?, ?, ?",
            job_id,
            status,
            script_path,
            audio_path,
            duration_sec,
            error_message,
        )
    log.info("Updated DB job %s -> %s", job_id, status)
