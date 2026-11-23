# EduVora Audiobook Worker Service

A generic, native **Windows Service** (Python + Celery + RabbitMQ + SQL Server) that automatically converts any uploaded chapter PDF into:
1. A conversational, teacher-style narration script (`.txt`) with `Welcome to Eduvora.`, `[EDUVORA_WATERMARK]`, and `Thanks for hearing.`
2. A neural-voiced `.mp3` audiobook with spoken EduVora anti-piracy branding and embedded EduVora logo ID3 cover art.

## Folder Layout
- `.env` — Broker, SQL Server, LLM (`gemini` or `openai`), and TTS configuration
- `worker/` — Celery app, PDF extractor, LLM script generator, MP3 synthesizer, and SQL Server stored-procedure client
- `windows_service.py` — Native `pywin32` Windows Service (`EduVoraAudiobookWorker`) — no NSSM required
- `deploy_windows_service.bat` — One-click build, install, auto-recovery setup, and start (Run as Administrator)
- `manage_service.bat` — CLI helper (`start`, `stop`, `restart`, `status`, `uninstall`)
- `run_local_dev.bat` — Foreground runner for local testing
- `sql/01_chapter_audio_jobs.sql` — SQL Server table and stored procedures (`EV_CreateChapterAudioJob`, `EV_UpdateChapterAudioJobStatus`, `EV_GetChapterAudioJob`)
- `node_integration/enqueueChapterAudio.js` — Express.js RabbitMQ producer snippet

## Deployment Steps (Windows Server)

1. **Run SQL Script:** Execute `sql/01_chapter_audio_jobs.sql` against your SQL Server database.
2. **Edit `.env`:** Fill in `RABBITMQ_URL`, `SQLSERVER_CONN_STR`, and `GEMINI_API_KEY` (or `OPENAI_API_KEY`).
3. **Deploy as Windows Service:** Right-click **`deploy_windows_service.bat`** → **Run as administrator**.
   - Creates `.venv`
   - Installs `requirements.txt` (including `pywin32`)
   - Registers `EduVoraAudiobookWorker` with Automatic startup and SCM crash-recovery
   - Starts the service immediately
4. **Verify:**
   - Run `manage_service.bat status`
   - Check logs in `logs/service.log`, `logs/worker.log`, and `logs/celery_stdout.log`
5. **Test a PDF End-to-End:**
   ```cmd
   .venv\Scripts\python.exe test_enqueue_local.py --pdf "C:\path\to\Chapter_01.pdf" --course-id 1 --course-title "AI Basics" --chapter-num 1 --chapter-title "What Is AI?"
   ```
