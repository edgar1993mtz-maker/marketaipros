from fastapi import APIRouter, Depends, HTTPException
from core.rate_limit.limiter import rate_limit
from core.config.settings import settings
import redis
import json

router = APIRouter()
r = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)

def require_api_key(x_api_key: str):
    if not x_api_key:
        raise HTTPException(401, "Missing API Key")
    return x_api_key

@router.get("/trend")
async def get_trend(x_api_key: str = Depends(require_api_key)):
    if not rate_limit(f"{x_api_key}:trend", 500):
        raise HTTPException(429, "Rate limit exceeded")

    raw = r.get("state:forex:trend")
    return json.loads(raw) if raw else []
