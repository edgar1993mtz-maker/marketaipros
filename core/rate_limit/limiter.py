import redis
from datetime import datetime
from core.config.settings import settings

r = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)

def today():
    return datetime.utcnow().strftime("%Y-%m-%d")

def rate_limit(key: str, limit: int):
    redis_key = f"rl:{key}:{today()}"
    current = int(r.get(redis_key) or 0)

    if current >= limit:
        return False

    r.incr(redis_key)
    return True
