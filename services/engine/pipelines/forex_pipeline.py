from core.logging.logger import logger
from services.engine.builders.forex_features import build_forex_features
from services.engine.engines.trend_engine import run_trend_engine
from services.engine.engines.volatility_engine import run_volatility_engine
from services.engine.engines.strength_matrix_engine import run_strength_matrix_engine

# Más adelante conectarás:
# - data_providers.oanda
# - normalizers

async def run_forex_pipeline():
    """
    Pipeline institucional de FX:
    1) Fetch raw FX data
    2) Normalize
    3) Build features
    4) Run engines (Trend, Volatility, Strength Matrix)
    5) Devolver estado estructurado
    """

    logger.info("Running forex pipeline...")

    # TODO: fetch + normalize
    # raw_fx = await oanda.fetch_fx(...)
    # normalized_fx = normalize_fx(raw_fx)

    normalized_fx = {}  # placeholder temporal

    # Build institutional features
    forex_features = build_forex_features(normalized_fx)

    # Engines reales
    trend = run_trend_engine(forex_features)
    volatility = run_volatility_engine(forex_features)
    strength = run_strength_matrix_engine(forex_features)

    return {
        "trend": trend,
        "volatility": volatility,
        "strength": strength,
    }
