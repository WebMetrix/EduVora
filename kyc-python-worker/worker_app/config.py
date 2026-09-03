import os

class Config:
    RABBITMQ_URL = os.environ.get("RABBITMQ_URL", "amqp://localhost//")
    DB_URI = os.environ.get("DB_URI", "mssql+pyodbc://localhost/EduVora")
    
    # Path to the rules configuration used in backend
    # RULES_PATH = os.path.join(os.path.dirname(__file__), '../../backend/utils/kyc_document_rules.js')
