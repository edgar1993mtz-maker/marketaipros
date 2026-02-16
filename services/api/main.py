from fastapi import FastAPI
from services.api.routers import options, forex, ai

app = FastAPI(
    title="MarketAIPros API",
    version="1.0.0",
    description="Institutional Market Intelligence API"
)

# Routers (versioned)
app.include_router(options.router, prefix="/api/v1/options", tags=["Options"])
app.include_router(forex.router, prefix="/api/v1/forex", tags=["Forex"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI"])

@app.get("/api/health")
async def health():
    return {"status": "ok"}
