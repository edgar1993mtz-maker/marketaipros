def run_strength_matrix_engine(forex_features: dict):
    """
    forex_features:
    {
        "EURUSD": {
            "ma_trend_score": float,
            "adx": float,
            "direction": "bullish" | "bearish" | "neutral",
            "volatility_score": float,
        },
        "GBPUSD": {...},
        ...
    }

    Devuelve:
    [
        {
            "symbol": "EURUSD",
            "strength_score": 72,
            "strength_regime": "STRONG",
            "relative_rank": 3
        },
        ...
    ]
    """

    results = []

    # 1. Calcular strength score por par
    for symbol, f in forex_features.items():
        trend = f.get("ma_trend_score", 0)
        adx = f.get("adx", 0)
        vol = f.get("volatility_score", 0)
        direction = f.get("direction", "neutral")

        # Dirección aporta peso
        if direction == "bullish":
            dir_score = 20
        elif direction == "bearish":
            dir_score = -20
        else:
            dir_score = 0

        # Strength Score institucional
        strength_score = (
            trend * 0.5 +
            adx * 1.2 +
            dir_score +
            (100 - vol) * 0.2
        )

        results.append({
            "symbol": symbol,
            "strength_score": round(strength_score, 2),
        })

    # 2. Ranking relativo
    sorted_results = sorted(results, key=lambda x: x["strength_score"], reverse=True)

    for rank, item in enumerate(sorted_results, start=1):
        score = item["strength_score"]

        # Regímenes institucionales
        if score >= 70:
            regime = "STRONG"
        elif score >= 40:
            regime = "MODERATE"
        else:
            regime = "WEAK"

        item["relative_rank"] = rank
        item["strength_regime"] = regime

    return sorted_results
