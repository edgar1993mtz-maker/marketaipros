from core.logging.logger import logger

from services.engine.engines.iv_rank import run_iv_rank_engine
from services.engine.engines.gex_engine import run_gex_engine
from services.engine.engines.dealer_positioning import run_dealer_positioning_engine
from services.engine.builders.options_features import build_options_features

async def run_options_pipeline():
    logger.info("Running options pipeline...")

    # TODO: fetch + normalize
    # raw_options = await polygon.fetch_options(...)
    # normalized = normalize_options(raw_options)

    normalized = {}  # placeholder temporal

    # Build institutional features
    options_features = build_options_features(normalized)

    # Engines reales
    gex = run_gex_engine(options_features)
    iv_rank = run_iv_rank_engine(options_features)
    dealer = run_dealer_positioning_engine(options_features)

    return {
        "gex": gex,
        "iv_rank": iv_rank,
        "dealer": dealer,
    }
