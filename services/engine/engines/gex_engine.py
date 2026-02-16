def run_gex_engine(options_features: dict):
    """
    options_features: {
      "SPY": {
          "gex_notional": float,      # gamma notional total
          "gex_near_spot": float,     # gamma concentrada cerca del spot
          "spot": float,              # precio spot
          "gamma_flip_level": float,  # nivel donde cambia el signo de gamma
      },
      ...
    }

    Devuelve una lista de dicts por símbolo con:
    - gex_notional
    - gex_near_spot
    - gamma_regime (POSITIVE_GAMMA, NEGATIVE_GAMMA, NEUTRAL)
    - gamma_flip_level
    - distance_to_flip (%)
    """

    results = []

    for symbol, f in options_features.items():
        gex_notional = f.get("gex_notional", 0.0)
        gex_near_spot = f.get("gex_near_spot", 0.0)
        spot = f.get("spot", None)
        gamma_flip_level = f.get("gamma_flip_level", None)

        # Régimen de gamma
        if gex_notional > 0:
            regime = "POSITIVE_GAMMA"
        elif gex_notional < 0:
            regime = "NEGATIVE_GAMMA"
        else:
            regime = "NEUTRAL"

        # Distancia al flip level (en %)
        distance_to_flip = None
        if spot and gamma_flip_level:
            try:
                distance_to_flip = round((gamma_flip_level / spot - 1) * 100, 2)
            except ZeroDivisionError:
                distance_to_flip = None

        results.append({
            "symbol": symbol,
            "gex_notional": round(gex_notional, 2),
            "gex_near_spot": round(gex_near_spot, 2),
            "gamma_regime": regime,
            "gamma_flip_level": gamma_flip_level,
            "distance_to_flip_pct": distance_to_flip,
        })

    return results
