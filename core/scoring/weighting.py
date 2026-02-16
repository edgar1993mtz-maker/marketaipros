def weight_scores(options_score: int, forex_score: int):
    """
    Peso institucional:
    - Opciones: 60%
    - Forex: 40%
    """
    return round(options_score * 0.6 + forex_score * 0.4)
