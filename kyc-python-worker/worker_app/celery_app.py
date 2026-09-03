from celery import Celery
from worker_app.config import Config

app = Celery(
    'kyc_worker',
    broker=Config.RABBITMQ_URL,
    backend='rpc://',
    include=['worker_app.tasks']
)

app.conf.update(
    result_expires=3600,
)

if __name__ == '__main__':
    app.start()
