import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
import pytesseract

# Load environment variables just like dotenv.config() in Node.js
load_dotenv()

class Config:
    RABBITMQ_URL = os.environ.get("RABBITMQ_URL", "amqp://localhost//")
    DB_URI = os.environ.get("DATABASE_URL", "mssql+pyodbc://localhost/EduVora")
    TESSERACT_CMD = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Configure Tesseract Path globally
pytesseract.pytesseract.tesseract_cmd = Config.TESSERACT_CMD

# Create DB Connection Pool (Equivalent to sql.ConnectionPool in Node.js)
try:
    engine = create_engine(Config.DB_URI, pool_pre_ping=True)
    with engine.connect() as conn:
        print("SQL Server Connected (Python Worker)")
except Exception as err:
    print("SQL Server Connection Error (Python Worker):", err)
