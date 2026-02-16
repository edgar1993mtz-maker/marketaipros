import redis
import json
from core.config.settings import settings
from core.scoring.options_score import compute_options_score
from core.scoring.forex_score import compute_forex_score
from core.scoring.weighting import weight_scores
from core.logging.logger import logger

r = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)

def load_symbol_state(symbol: str):
    """
    Carga el estado del símbolo desde Redis.
    El engine debe guardar datos por símbolo en:
      state:options:{symbol}
      state:forex:{symbol}
    """
    options_raw = r.get(f"state:options:{symbol}")
    forex_raw = r.get(f"state:forex:{symbol}")

    options_data = json.loads(options_raw) if options_raw else None
    forex_data = json.loads(forex_raw) if forex_raw else None

    return options_data, forex_data


def explain_symbol(symbol: str):
    """
    Produce una explicación institucional basada en:
    - scoring determinista
    - reasoning cuantitativo
    - risk profile
    """

    logger.info(f"AI Explainer: generating explanation for {symbol}")

    options_data, forex_data = load_symbol_state(symbol)

    if not options_data and not forex_data:
        return None

    # 1) Compute scores
    options_score = compute_options_score(options_data) if options_data else None
    forex_score = compute_forex_score(forex_data) if forex_data else None

    # 2) Combine scores
    total_score = weight_scores(
        options_score.score if options_score else 0,
        forex_score.score if forex_score else 0
    )

    # 3) Combine reasoning
    reasoning = []
    if options_score:
        reasoning += options_score.reasons
    if forex_score:
        reasoning += forex_score.reasons

    # 4) Confidence
    confidence = min(
        options_score.confidence if options_score else 1.0,
        forex_score.confidence if forex_score else 1.0
    )

    # 5) Risk profile
    if total_score >= 70:
        risk = "HIGH_VOLATILITY"
    elif total_score >= 40:
        risk = "MEDIUM_RISK"
    else:
        risk = "LOW_CONVICTION"

    return {
        "symbol": symbol,
        "score": total_score,
        "confidence": round(confidence, 2),
        "reasoning": reasoning,
        "risk_profile": risk
    }
