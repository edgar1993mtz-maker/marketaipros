from starlette.middleware.base import BaseHTTPMiddleware
from core.logging.logger import logger
import uuid
import time

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        request_id = str(uuid.uuid4())
        start = time.time()

        logger.info(f"[{request_id}] Incoming request: {request.method} {request.url}")

        response = await call_next(request)

        duration = round(time.time() - start, 4)
        logger.info(f"[{request_id}] Completed in {duration}s")

        response.headers["X-Request-ID"] = request_id
        response.headers["X-Response-Time"] = str(duration)

        return response
