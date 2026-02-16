import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.FileHandler("logs_system.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("marketai")
