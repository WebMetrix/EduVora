from celery import Celery
from worker_app.config import Config

# Initialize the Celery App using our RabbitMQ broker from .env
app = Celery(
    'kyc_worker',
    broker=Config.RABBITMQ_URL,
    backend='rpc://',  # Allows sending task results back to the Node.js publisher
    include=['worker_app.tasks'] # Automatically discovers our tasks.py
)

# Production-grade Celery Configuration
app.conf.update(
    result_expires=3600,           # Results expire after 1 hour
    task_serializer='json',        # Standardize on JSON for cross-language (Node <-> Python)
    accept_content=['json'],       # Reject unauthorized content types for security
    result_serializer='json',
    timezone='Asia/Kolkata',       # Standard for Indian KYC
    enable_utc=True,
    worker_prefetch_multiplier=1,  # Set to 1 because image processing is heavy; prevents 1 worker from hoarding tasks
    worker_enable_remote_control=False, # Fix for RabbitMQ 4.0 (disables the deprecated transient pidbox queues)
    worker_send_task_events=False, # Disable events to prevent unnecessary queue creation
)

if __name__ == '__main__':
    app.start()
