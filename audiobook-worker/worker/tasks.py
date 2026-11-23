import re
from worker.celery_app import celery_app
from worker.config import OUTPUT_BASE_DIR, TTS_VOICE, TTS_RATE
from worker.db import update_job_status
from worker.logger import get_logger
from worker.pdf_extractor import extract_clean_pdf_text
from worker.script_generator import generate_teacher_script
from worker.audio_synthesizer import synthesize_script_to_mp3

log = get_logger(__name__)


def _slugify(name: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]+", "_", name).strip("_")[:80] or "Chapter"


@celery_app.task(
    bind=True,
    name="worker.tasks.process_chapter_pdf",
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_backoff_max=300,
    retry_kwargs={"max_retries": 3},
)
def process_chapter_pdf(
    self,
    job_id: str,
    course_id: int,
    course_title: str,
    chapter_number: int,
    chapter_title: str,
    source_pdf_path: str,
    voice: str | None = None,
    rate: str | None = None,
):
    voice = voice or TTS_VOICE
    rate = rate or TTS_RATE
    log.info(
        "Starting job_id=%s | course=%s | ch=%s (%s) | pdf=%s",
        job_id,
        course_id,
        chapter_number,
        chapter_title,
        source_pdf_path,
    )

    try:
        # Step 1: Extract clean text from PDF
        update_job_status(job_id, "EXTRACTING")
        raw_text = extract_clean_pdf_text(source_pdf_path)
        if not raw_text:
            raise ValueError("No extractable text found in PDF (it may be scanned/image-only).")

        # Step 2: Generate conversational teacher-style script
        update_job_status(job_id, "SCRIPTING")
        script_text = generate_teacher_script(course_title, chapter_title, raw_text)

        course_dir = OUTPUT_BASE_DIR / f"course_{course_id}"
        course_dir.mkdir(parents=True, exist_ok=True)
        base_name = f"Chapter_{int(chapter_number):02d}_{_slugify(chapter_title)}"

        script_path = course_dir / f"{base_name}.txt"
        script_path.write_text(script_text, encoding="utf-8")
        log.info("Saved narration script -> %s", script_path)

        # Step 3: Synthesize MP3 + watermark + ID3 cover art
        update_job_status(job_id, "SYNTHESIZING", script_path=str(script_path))
        audio_path = course_dir / f"{base_name}.mp3"
        duration_sec = synthesize_script_to_mp3(
            script_text=script_text,
            out_mp3=audio_path,
            course_title=course_title,
            chapter_title=chapter_title,
            chapter_num=int(chapter_number),
            voice=voice,
            rate=rate,
        )
        log.info("Generated MP3 -> %s (%s sec)", audio_path, duration_sec)

        # Step 4: Mark COMPLETED in SQL Server
        update_job_status(
            job_id,
            "COMPLETED",
            script_path=str(script_path),
            audio_path=str(audio_path),
            duration_sec=duration_sec,
        )

        return {
            "job_id": job_id,
            "status": "COMPLETED",
            "script_path": str(script_path),
            "audio_path": str(audio_path),
            "duration_sec": duration_sec,
        }

    except Exception as exc:
        log.exception("Job %s failed (attempt %d/%d): %s", job_id, self.request.retries + 1, self.max_retries + 1, exc)
        if self.request.retries >= self.max_retries:
            update_job_status(job_id, "FAILED", error_message=str(exc))
        raise
