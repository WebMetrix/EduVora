import os
from pathlib import Path
from dotenv import load_dotenv

# Resolve project root reliably even when executed as a Windows Service (cwd = C:\Windows\System32)
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


def _resolve_path(env_key: str, default_rel: str) -> Path:
    raw = os.getenv(env_key, default_rel).strip()
    p = Path(raw)
    return p if p.is_absolute() else (BASE_DIR / p).resolve()


# RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672//")
RABBITMQ_URL = os.environ.get("RABBITMQ_URL", "amqp://localhost//")

CELERY_QUEUE = os.environ.get("CELERY_QUEUE", "chapter_audio_jobs")
CELERY_CONCURRENCY = int(os.environ.get("CELERY_CONCURRENCY", "4"))

SQLSERVER_CONN_STR = os.environ.get("SQLSERVER_CONN_STR", "").strip()

LLM_PROVIDER = os.environ.get("LLM_PROVIDER", "gemini").strip().lower()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash").strip()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini").strip()

TTS_VOICE = os.environ.get("TTS_VOICE", "en-IN-NeerjaNeural").strip()
TTS_RATE = os.environ.get("TTS_RATE", "+0%").strip()

AUDIO_INTRO_LINE = os.environ.get("AUDIO_INTRO_LINE", "Welcome to Eduvora.").strip()
AUDIO_OUTRO_LINE = os.environ.get("AUDIO_OUTRO_LINE", "Thanks for hearing.").strip()
AUDIO_WATERMARK_PHRASE = os.environ.get("AUDIO_WATERMARK_PHRASE", "EduVora. Learn, Grow, Earn.").strip()

COVER_ART_PATH = _resolve_path("COVER_ART_PATH", "assets/EduVora_Cover_Art.jpg")
OUTPUT_BASE_DIR = _resolve_path("OUTPUT_BASE_DIR", "storage/audiobooks")
LOG_DIR = _resolve_path("LOG_DIR", "logs")
