import logging
import os
from logging.handlers import TimedRotatingFileHandler

# Define the log directory (one level up from worker_app, matching backend structure)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOG_DIR = os.path.join(BASE_DIR, 'logs')
os.makedirs(LOG_DIR, exist_ok=True)

# Define the custom log format mirroring Winston
# Format: [YYYY-MM-DD HH:mm:ss] LEVEL: message
class CustomFormatter(logging.Formatter):
    def format(self, record):
        # Ensure level name is uppercase
        record.levelname = record.levelname.upper()
        # Format the traceback if present, similar to Winston's stack printing
        if record.exc_info:
            record.exc_text = self.formatException(record.exc_info)
            record.exc_info = None
        
        return super().format(record)

log_format = '[%(asctime)s] %(levelname)s: %(message)s'
formatter = CustomFormatter(log_format, datefmt='%Y-%m-%d %H:%M:%S')

# 1. General Application Transport (Info level)
# Mirrors Winston's application-%DATE%.log behavior
info_handler = TimedRotatingFileHandler(
    filename=os.path.join(LOG_DIR, 'application.log'),
    when='midnight',
    interval=1,
    backupCount=14,
    encoding='utf-8'
)
info_handler.setLevel(logging.INFO)
info_handler.setFormatter(formatter)
# Suffix to match daily rotation pattern
info_handler.suffix = "%Y-%m-%d.log"

# 2. Dedicated Error Transport (Error level only)
# Mirrors Winston's error-%DATE%.log behavior
error_handler = TimedRotatingFileHandler(
    filename=os.path.join(LOG_DIR, 'error.log'),
    when='midnight',
    interval=1,
    backupCount=14,
    encoding='utf-8'
)
error_handler.setLevel(logging.ERROR)
error_handler.setFormatter(formatter)
# Suffix to match daily rotation pattern
error_handler.suffix = "%Y-%m-%d.log"

# 3. Console Handler
# Mirrors Winston's new winston.transports.Console()
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_handler.setFormatter(formatter)

# Create the logger instance
logger = logging.getLogger('eduvora_python_worker')
logger.setLevel(logging.INFO)
logger.addHandler(info_handler)
logger.addHandler(error_handler)
logger.addHandler(console_handler)

# Prevent log propagation to the root logger to avoid duplicate console outputs
logger.propagate = False
