from core.logging.logger import logger

def build_forex_features(normalized_fx: dict):
    """
    normalized_fx:
    {
        "EURUSD": {
            "price": float,
            "ma_20": float,
            "ma_50": float,
            "ma_100": float,
            "ma_200": float,
            "adx_14": float,
            "atr": float,
        },
        "GBPUSD": {...},
        ...
    }

    Devuelve:
    {
        "EURUSD": {
            "ma_trend_score": float,  # 0-100
            "adx": float,
            "direction": str,         # bullish | bearish | neutral
            "volatility_score": float # 0-100
        },
        ...
    }
    """

    logger.info("Building forex features...")

    features = {}

    for symbol, data in normalized_fx.items():
        try:
            price = float(data.get("price", 0))
            ma_20 = float(data.get("ma_20", 0))
            ma_50 = float(data.get("ma_50", 0))
            ma_100 = float(data.get("ma_100", 0))
            ma_200 = float(data.get("ma_200", 0))
            adx = float(data.get("adx_14", 0))
            atr = float(data.get("atr", 0))

            # Dirección básica
            if price > ma_50 and ma_50 > ma_100:
                direction = "bullish"
            elif price < ma_50 and ma_50 < ma_100:
                direction = "bearish"
            else:
                direction = "neutral"

            # MA alignment score (0-100)
            alignment_points = 0
            if price > ma_20 > ma_50 > ma_100 > ma_200:
                alignment_points = 100
            elif price > ma_50 > ma_200:
                alignment_points = 70
            elif price < ma_20 < ma_50 < ma_100 < ma_200:
                alignment_points = 100
            elif price < ma_50 < ma_200:
                alignment_points = 70
            else:
                alignment_points = 40

            ma_trend_score = alignment_points

            # Volatility score simple basado en ATR relativo al precio
            vol_ratio = (atr / price) * 100 if price > 0 else 0
            if vol_ratio >= 2.0:
                volatility_score = 90
            elif vol_ratio >= 1.0:
                volatility_score = 60
            else:
                volatility_score = 30

            features[symbol] = {
                "ma_trend_score": float(ma_trend_score),
                "adx": float(adx),
                "direction": direction,
                "volatility_score": float(volatility_score),
            }

        except Exception as e:
            logger.error(f"Error building FX features for {symbol}: {e}")

    return features
