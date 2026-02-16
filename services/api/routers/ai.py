from fastapi import APIRouter, Depends, HTTPException
from services.ai.explainer import explain_symbol
from core.rate_limit.limiter import rate_limit

router = APIRouter()

def require_api_key(x_api_key: str):
    if not x_api_key:
        raise HTTPException(401, "Missing API Key")
    return x_api_key

@router.get("/explain/{symbol}")
async def explain(symbol: str, x_api_key: str = Depends(require_api_key)):
    if not rate_limit(f"{x_api_key}:explain", 200):
        raise HTTPException(429, "Rate limit exceeded")

    result = explain_symbol(symbol.upper())
    if not result:
        raise HTTPException(404, "No data available")

    return result
