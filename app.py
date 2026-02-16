import os
import json
import numpy as np
import pandas as pd
import yfinance as yf
from fastapi import FastAPI
from fastapi_utils.tasks import repeat_every

# ============================================================
# SAFE DOWNLOAD WRAPPER (DAILY FX DATA WORKS)
# ============================================================

def safe_download(symbol, period="180d", interval="1d"):
    try:
        df = yf.download(symbol, period=period, interval=interval, progress=False)
    except:
        return None

    if df is None or df.empty:
        return None
    if df.isna().all().all():
        return None

    df = df.dropna(how="all")
    if df.empty:
        return None

    required = {"Open", "High", "Low", "Close"}
    if not required.issubset(df.columns):
        return None

    return df

# ============================================================
# AUTO-CREATE /data FOLDER
# ============================================================

DATA_DIR = "data"
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI()

@app.get("/")
def home():
    return {"status": "MarketAIPros Hybrid Engine Running"}

# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def save_json(filename, data):
    with open(os.path.join(DATA_DIR, filename), "w") as f:
        json.dump(data, f, indent=4)

def atr(df, period=14):
    return float((df["High"] - df["Low"]).rolling(period).mean().iloc[-1])

def momentum(df, period=10):
    if len(df) <= period:
        return 0.0
    return float(df["Close"].iloc[-1] - df["Close"].iloc[-period])

def iv_rank(symbol):
    try:
        iv = yf.Ticker(symbol).info.get("impliedVolatility", 0)
        return float(min(max(iv * 100, 0), 100))
    except:
        return 0.0

def calculate_greeks(price, strike, iv, dte):
    try:
        if price <= 0:
            return 0, 0, 0, 0
        delta = float(np.tanh((price - strike) / (price * 0.1)))
        gamma = float(1 / (price * 0.1 + 1e-9))
        theta = float(-iv * 0.01)
        vega = float(iv * 0.5)
        return delta, gamma, theta, vega
    except:
        return 0, 0, 0, 0

# ============================================================
# WORKING FX TICKERS (DAILY DATA)
# ============================================================

FX_PAIRS = [
    "EURUSD=X",
    "GBPUSD=X",
    "JPY=X",      # USDJPY alternative
    "AUDUSD=X",
    "NZDUSD=X",
    "CAD=X",      # USDCAD alternative
    "GC=F"        # Gold futures (works perfectly)
]

# ============================================================
# L12 — ICT ENGINE
# ============================================================

def l12_ict_engine():
    results = []

    for symbol in FX_PAIRS:
        df = safe_download(symbol)
        if df is None or len(df) < 20:
            continue

        close_now = float(df["Close"].iloc[-1])
        close_10 = float(df["Close"].iloc[-10])

        htf_trend = "bullish" if close_now > close_10 else "bearish"
        ltf_momentum = momentum(df, 10)
        volatility = atr(df, 14)

        signal = "neutral"
        if htf_trend == "bullish" and ltf_momentum > 0:
            signal = "buy"
        elif htf_trend == "bearish" and ltf_momentum < 0:
            signal = "sell"

        results.append({
            "symbol": symbol,
            "htf_trend": htf_trend,
            "momentum": ltf_momentum,
            "atr": volatility,
            "signal": signal
        })

    save_json("l12_ict.json", results)
    print("[L12] ICT Engine Updated")
    return results

# ============================================================
# L13 — TREND ENGINE
# ============================================================

def l13_trend_engine():
    results = []

    for symbol in FX_PAIRS:
        df = safe_download(symbol)
        if df is None or len(df) < 50:
            continue

        price_now = float(df["Close"].iloc[-1])
        price_20 = float(df["Close"].iloc[-20])
        price_50 = float(df["Close"].iloc[-50])

        trend_short = "bullish" if price_now > price_20 else "bearish"
        trend_long = "bullish" if price_now > price_50 else "bearish"

        mom = momentum(df, 10)
        vol = atr(df, 14)

        trend_score = (
            int(trend_short == "bullish") +
            int(trend_long == "bullish") +
            int(mom > 0)
        )

        results.append({
            "symbol": symbol,
            "trend_short": trend_short,
            "trend_long": trend_long,
            "momentum": mom,
            "atr": vol,
            "trend_score": trend_score
        })

    save_json("l13_trend.json", results)
    print("[L13] Trend Engine Updated")
    return results

# ============================================================
# L14 — WAITLIST ENGINE
# ============================================================

def l14_waitlist_engine():
    results = []

    for symbol in FX_PAIRS:
        df = safe_download(symbol)
        if df is None or len(df) < 30:
            continue

        mom = momentum(df, 5)
        micro_atr = float((df["High"] - df["Low"]).rolling(5).mean().iloc[-1])
        macro_atr = atr(df, 14)

        compression = micro_atr < (macro_atr * 0.6)
        pre_breakout = compression and abs(mom) > 0

        results.append({
            "symbol": symbol,
            "momentum_5": mom,
            "micro_atr": micro_atr,
            "macro_atr": macro_atr,
            "compression": bool(compression),
            "pre_breakout": bool(pre_breakout)
        })

    save_json("l14_waitlist.json", results)
    print("[L14] Waitlist Engine Updated")
    return results

# ============================================================
# L15A — EXPLOSION ENGINE
# ============================================================

def l15_explosion_engine():
    results = []

    for symbol in FX_PAIRS:
        df = safe_download(symbol)
        if df is None or len(df) < 20:
            continue

        atr_now = atr(df, 14)
        atr_prev = atr(df.iloc[:-1], 14)

        last_candle = float(df["High"].iloc[-1] - df["Low"].iloc[-1])
        prev_candle = float(df["High"].iloc[-2] - df["Low"].iloc[-2])

        atr_explosion = atr_now > atr_prev * 1.3
        candle_explosion = last_candle > prev_candle * 1.5

        explosion = atr_explosion or candle_explosion

        results.append({
            "symbol": symbol,
            "atr_now": atr_now,
            "atr_prev": atr_prev,
            "last_candle": last_candle,
            "prev_candle": prev_candle,
            "atr_explosion": bool(atr_explosion),
            "candle_explosion": bool(candle_explosion),
            "explosion": bool(explosion)
        })

    save_json("l15_explosion.json", results)
    print("[L15A] Explosion Engine Updated")
    return results

# ============================================================
# OPTIONS SCREENER
# ============================================================

OPTION_TICKERS = ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN", "META"]

def options_screener():
    results = []

    for symbol in OPTION_TICKERS:
        try:
            tk = yf.Ticker(symbol)
            hist = tk.history(period="30d")

            if hist is None or hist.empty:
                continue

            price = float(hist["Close"].iloc[-1])
            iv = float(tk.info.get("impliedVolatility", 0) or 0)
            ivr = iv_rank(symbol)

            strike = round(price)
            dte = 30

            delta, gamma, theta, vega = calculate_greeks(price, strike, iv, dte)

            results.append({
                "symbol": symbol,
                "price": price,
                "iv": iv,
                "iv_rank": ivr,
                "delta": delta,
                "gamma": gamma,
                "theta": theta,
                "vega": vega
            })

        except:
            continue

    save_json("options.json", results)
    print("[OPTIONS] Screener Updated")
    return results

# ============================================================
# FOREX SCREENER
# ============================================================

def forex_screener():
    results = []

    for symbol in FX_PAIRS:
        df = safe_download(symbol)
        if df is None or len(df) < 20:
            continue

        mom = momentum(df, 10)
        vol = atr(df, 14)
        trend = "bullish" if mom > 0 else "bearish"

        results.append({
            "symbol": symbol,
            "momentum": mom,
            "atr": vol,
            "trend": trend
        })

    save_json("forex.json", results)
    print("[FOREX] Screener Updated")
    return results

# ============================================================
# RANKING ENGINE
# ============================================================

def ranking_engine(l12, l13, l14, l15, fx, opt):
    ranking = []

    map_l12 = {x["symbol"]: x for x in l12}
    map_l13 = {x["symbol"]: x for x in l13}
    map_l14 = {x["symbol"]: x for x in l14}
    map_l15 = {x["symbol"]: x for x in l15}
    map_fx  = {x["symbol"]: x for x in fx}

    for symbol in FX_PAIRS:
        score = 0

        if symbol in map_l12 and map_l12[symbol]["signal"] != "neutral":
            score += 2
        if symbol in map_l13:
            score += map_l13[symbol]["trend_score"]
        if symbol in map_l14 and map_l14[symbol]["pre_breakout"]:
            score += 2
        if symbol in map_l15 and map_l15[symbol]["explosion"]:
            score += 3
        if symbol in map_fx and map_fx[symbol]["trend"] == "bullish":
            score += 1

        ranking.append({"symbol": symbol, "score": score})

    for item in opt:
        score = 0
        if item["iv_rank"] > 50:
            score += 1
        if abs(item["delta"]) > 0.3:
            score += 1
        if item["vega"] > 0.1:
            score += 1

        ranking.append({"symbol": item["symbol"], "score": score})

    ranking = sorted(ranking, key=lambda x: x["score"], reverse=True)

    save_json("ranking.json", ranking)
    print("[RANKING] Updated")
    return ranking

# ============================================================
# BACKGROUND ENGINE LOOP
# ============================================================

@app.on_event("startup")
@repeat_every(seconds=60)
def run_all_engines():
    print("\n=== MARKET AIPROS HYBRID ENGINE RUNNING ===")

    l12 = l12_ict_engine()
    l13 = l13_trend_engine()
    l14 = l14_waitlist_engine()
    l15 = l15_explosion_engine()
    fx  = forex_screener()
    opt = options_screener()

    ranking_engine(l12, l13, l14, l15, fx, opt)

    print("=== ENGINE CYCLE COMPLETE ===\n")

# ============================================================
# API ENDPOINTS
# ============================================================

@app.get("/api/l12")
def api_l12():
    return json.load(open("data/l12_ict.json"))

@app.get("/api/l13")
def api_l13():
    return json.load(open("data/l13_trend.json"))

@app.get("/api/l14")
def api_l14():
    return json.load(open("data/l14_waitlist.json"))

@app.get("/api/l15")
def api_l15():
    return json.load(open("data/l15_explosion.json"))

@app.get("/api/options")
def api_options():
    return json.load(open("data/options.json"))

@app.get("/api/forex")
def api_forex():
    return json.load(open("data/forex.json"))

@app.get("/api/ranking")
def api_ranking():
    return json.load(open("data/ranking.json"))
