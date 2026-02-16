class OptionsScore:
    def __init__(self, score, confidence, reasons):
        self.score = score
        self.confidence = confidence
        self.reasons = reasons

def compute_options_score(data):
    if not data:
        return OptionsScore(0, 1.0, [])

    score = 0
    reasons = []

    if data.get("iv_rank", 0) > 75:
        score += 30
        reasons.append("IV Rank above 75")

    if data.get("gex_cluster") == "positive":
        score += 25
        reasons.append("Positive gamma cluster near spot")

    confidence = min(1.0, score / 100)

    return OptionsScore(score, confidence, reasons)
