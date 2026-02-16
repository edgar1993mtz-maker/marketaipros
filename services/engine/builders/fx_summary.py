def build_fx_summary(trend, volatility, strength):
    strongest = None
    weakest = None

    if strength:
        strongest = strength[0]["symbol"]
        weakest = strength[-1]["symbol"]

    # Market volatility regime (simple aggregation)
    vol_regimes = [v["volatility_regime"] for v in volatility]
    if "HIGH_VOLATILITY" in vol_regimes:
        market_vol = "HIGH"
    elif "MEDIUM_VOLATILITY" in vol_regimes:
        market_vol = "MEDIUM"
    else:
        market_vol = "LOW"

    # Macro regime (trend + volatility)
    if market_vol == "HIGH":
        macro = "UNSTABLE"
    elif market_vol == "MEDIUM":
        macro = "MIXED"
    else:
        macro = "STABLE"

    return {
        "strongest_pair": strongest,
        "weakest_pair": weakest,
        "market_volatility": market_vol,
        "macro_regime": macro,
    }
