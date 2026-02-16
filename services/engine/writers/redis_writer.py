import asyncio
import json
import redis
from core.config.settings import settings
from core.logging.logger import logger

r = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)

async def write_state_batch(state: dict):
    """
    state = {
      "options": {
         "gex": [...],
         "iv_rank": [...],
         ...
      },
      "forex": {
         "trend": [...],
         "volatility": [...],
         ...
      }
    }
    """
    try:
        pipe = r.pipeline()

        # Opciones
        options = state.get("options", {})
        if "gex" in options:
            pipe.set("state:options:gex", json.dumps(options["gex"]))
        if "iv_rank" in options:
            pipe.set("state:options:iv_rank", json.dumps(options["iv_rank"]))

        # Forex
        forex = state.get("forex", {})
        if "trend" in forex:
            pipe.set("state:forex:trend", json.dumps(forex["trend"]))
        if "volatility" in forex:
            pipe.set("state:forex:volatility", json.dumps(forex["volatility"]))

        pipe.execute()
        logger.info("State written to Redis successfully.")

    except Exception as e:
        logger.error(f"Error writing state to Redis: {e}")
        raise
