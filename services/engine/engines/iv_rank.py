def run_iv_rank_engine(options_features: dict):
    """
    options_features: {
      "SPY": {
          "iv_rank": float,        # 0-100
          "iv_percentile": float,  # 0-100
      },
      "AAPL": {...},
      ...
    }

    Devuelve una lista de dicts por símbolo con:
    - iv_rank
    - iv_percentile
    - iv_regime (HIGH_IV, MID_IV, LOW_IV)
    """

    results = []

    for symbol, f in options_features.items():
        iv_rank = f.get("iv_rank", 0)
        iv_percentile = f.get("iv_percentile", 0)

        # Clasificación institucional
        if iv_rank >= 75:
            regime = "HIGH_IV"
        elif iv_rank <= 25:
            regime = "LOW_IV"
            # else:
        else:
            regime = "MID_IV"

        results.append({
            "symbol": symbol,
            "iv_rank": round(iv_rank, 2),
            "iv_percentile": round(iv_percentile, 2),
            "iv_regime": regime,
        })

    return results
