from core.logging.logger import logger

def build_options_features(normalized_options: dict):
    logger.info("Building options features...")

    features = {}

    for symbol, data in normalized_options.items():
        try:
            features[symbol] = {
                # IV Rank
                "iv_rank": float(data.get("iv_rank", 0)),
                "iv_percentile": float(data.get("iv_percentile", 0)),

                # GEX
                "gex_notional": float(data.get("gex_notional", 0)),
                "gex_near_spot": float(data.get("gex_near_spot", 0)),
                "spot": float(data.get("spot", 0)),
                "gamma_flip_level": float(data.get("gamma_flip_level", 0)),

                # Dealer positioning
                "dealer_delta": float(data.get("dealer_delta", 0)),
                "dealer_gamma": float(data.get("dealer_gamma", 0)),
            }

        except Exception as e:
            logger.error(f"Error building features for {symbol}: {e}")

    return features
