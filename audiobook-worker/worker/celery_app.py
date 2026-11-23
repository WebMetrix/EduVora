from celery import Celery
from worker.config import RABBITMQ_URL, CELERY_QUEUE

celery_app = Celery(
    "audiobook_worker",
    broker=RABBITMQ_URL,
    include=["worker.tasks"],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_acks_late=True,
    task_reject_on_worker_lost=True,
    worker_prefetch_multiplier=1,
    broker_connection_retry_on_startup=True,
    task_default_queue=CELERY_QUEUE,
    task_routes={
        "worker.tasks.process_chapter_pdf": {"queue": CELERY_QUEUE},
    },
)
