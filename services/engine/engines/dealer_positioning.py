from math import fabs

def run_dealer_positioning_engine(options_features: dict):
    """
    options_features: {
      "SPY": {
          "dealer_delta": float,
          "dealer_gamma": float,
          "gex_notional": float,
      },
      ...
    }

    Devuelve lista de dicts por símbolo con:
    - dealer_delta
    - dealer_gamma
    - dealer_posture (LONG_GAMMA, SHORT_GAMMA, FLAT_GAMMA)
    - exposure_level (HIGH, MEDIUM, LOW)
    - hedging_pressure (BUYING, SELLING, NEUTRAL)
    - risk_regime (STABLE, FRAGILE, VOLATILE)
    """

    results = []

    for symbol, f in options_features.items():
        dealer_delta = f.get("dealer_delta", 0.0)
        dealer_gamma = f.get("dealer_gamma", 0.0)
        gex_notional = f.get("gex_notional", 0.0)

        # 1. Postura institucional por gamma
        if dealer_gamma > 0:
            posture = "LONG_GAMMA"
        elif dealer_gamma < 0:
            posture = "SHORT_GAMMA"
        else:
            posture = "FLAT_GAMMA"

        # 2. Nivel de exposición (magnitud de gamma)
        abs_gamma = fabs(dealer_gamma)
        if abs_gamma >= 1_000_000:
            exposure_level = "HIGH"
        elif abs_gamma >= 250_000:
            exposure_level = "MEDIUM"
        else:
            exposure_level = "LOW"

        # 3. Hedging pressure (dirección del hedge)
        # Dealers long gamma → absorben movimiento → hedging neutral o contraria
        # Dealers short gamma → persiguen precio → hedging amplifica movimiento
        if dealer_gamma > 0:
            hedging_pressure = "NEUTRAL"
        elif dealer_gamma < 0 and dealer_delta > 0:
            hedging_pressure = "SELLING"
        elif dealer_gamma < 0 and dealer_delta < 0:
            hedging_pressure = "BUYING"
        else:
            hedging_pressure = "NEUTRAL"

        # 4. Régimen de riesgo institucional
        if posture == "LONG_GAMMA" and exposure_level in ("HIGH", "MEDIUM"):
            risk_regime = "STABLE"
        elif posture == "SHORT_GAMMA" and exposure_level == "HIGH":
            risk_regime = "VOLATILE"
        else:
            risk_regime = "FRAGILE"

        results.append({
            "symbol": symbol,
            "dealer_delta": round(dealer_delta, 2),
            "dealer_gamma": round(dealer_gamma, 2),
            "dealer_posture": posture,
            "exposure_level": exposure_level,
            "hedging_pressure": hedging_pressure,
            "risk_regime": risk_regime,
            "gex_notional": round(gex_notional, 2),
        })

    return results
