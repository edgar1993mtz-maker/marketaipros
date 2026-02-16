class ForexScore:
    def __init__(self, score, confidence, reasons):
        self.score = score
        self.confidence = confidence
        self.reasons = reasons

def compute_forex_score(data):
    if not data:
        return ForexScore(0, 1.0, [])

    score = 0
    reasons = []

    if data.get("trend_score", 0) > 70:
        score += 40
        reasons.append("Strong bullish FX trend")

    if data.get("volatility") == "high":
        score -= 10
        reasons.append("High volatility environment")

    confidence = min(1.0, abs(score) / 100)

    return ForexScore(score, confidence, reasons)
