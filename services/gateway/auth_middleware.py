from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import HTTPException
from core.security.auth import decode_token
from core.config.settings import settings

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        # Excepciones (endpoints públicos)
        if request.url.path.startswith("/api/health"):
            return await call_next(request)

        # API Key
        api_key = request.headers.get("x-api-key")
        if not api_key:
            raise HTTPException(401, "Missing API Key")

        # JWT opcional (solo para endpoints privados)
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ", 1)[1]
            try:
                decode_token(token)
            except:
                raise HTTPException(401, "Invalid JWT")

        return await call_next(request)
