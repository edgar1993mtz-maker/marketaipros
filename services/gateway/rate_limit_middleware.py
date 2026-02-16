from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import HTTPException
from core.rate_limit.limiter import rate_limit

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        api_key = request.headers.get("x-api-key")

        if api_key:
            route = request.url.path.replace("/", "_")
            key = f"{api_key}:{route}"

            if not rate_limit(key, 1000):  # límite general
                raise HTTPException(429, "Rate limit exceeded")

        return await call_next(request)
