def run_volatility_engine(forex_features: dict):
    """
    forex_features: {
        "EURUSD": {
            "volatility_score": float,  # 0-100
            "atr": float,               # opcional si lo tienes
            "price": float,             # opcional
        },
        ...
    }

    Devuelve:
    [
        {
            "symbol": "EURUSD",
            "volatility_score": 75,
            "volatility_regime": "HIGH_VOLATILITY",
            "risk_environment": "UNSTABLE"
        },
        ...
    ]
    """

    results = []

    for symbol, f in forex_features.items():
        vol_score = f.get("volatility_score", 0)

        # Clasificación institucional
        if vol_score >= 70:
            regime = "HIGH_VOLATILITY"
            risk_env = "UNSTABLE"
        elif vol_score >= 40:
            regime = "MEDIUM_VOLATILITY"
            risk_env = "CAUTION"
        else:
            regime = "LOW_VOLATILITY"
            risk_env = "STABLE"

        results.append({
            "symbol": symbol,
            "volatility_score": round(vol_score, 2),
            "volatility_regime": regime,
            "risk_environment": risk_env,
        })

    return results
