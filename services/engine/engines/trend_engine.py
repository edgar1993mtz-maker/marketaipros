def run_trend_engine(forex_features: dict):
    """
    forex_features: {
      "EURUSD": {
          "ma_trend_score": float,  # 0-100, qué tan alineadas están las MAs
          "adx": float,             # fuerza de tendencia
          "direction": str,         # "bullish" | "bearish" | "neutral"
      },
      ...
    }

    Devuelve una lista de dicts por símbolo con:
    - trend_score
    - trend_regime
    - direction
    - adx
    """

    results = []

    for symbol, f in forex_features.items():
        ma_trend_score = f.get("ma_trend_score", 0)
        adx = f.get("adx", 0)
        direction = f.get("direction", "neutral")

        # Regímenes institucionales
        if ma_trend_score >= 70 and adx >= 20:
            regime = "STRONG_TREND"
        elif ma_trend_score >= 50 and adx >= 15:
            regime = "MODERATE_TREND"
        elif ma_trend_score <= 30 and adx < 15:
            regime = "RANGE"
        else:
            regime = "MIXED"

        results.append({
            "symbol": symbol,
            "trend_score": round(ma_trend_score),
            "trend_regime": regime,
            "direction": direction,
            "adx": round(adx, 2),
        })

    return results
