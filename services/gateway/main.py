from fastapi import FastAPI
from services.gateway.auth_middleware import AuthMiddleware
from services.gateway.rate_limit_middleware import RateLimitMiddleware
from services.gateway.logging_middleware import LoggingMiddleware

app = FastAPI(title="MarketAIPros Gateway")

# Middlewares institucionales
app.add_middleware(LoggingMiddleware)
app.add_middleware(AuthMiddleware)
app.add_middleware(RateLimitMiddleware)

@app.get("/gateway/health")
def health():
    return {"status": "gateway_ok"}
