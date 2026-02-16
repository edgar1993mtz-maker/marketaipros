// scripts/loadDailyPrices.ts
// --------------------------------------------------
// GLOBAL DAILY PRICE LOADER — OPTION C READY
// Currently uses Yahoo only, but structured to plug in
// Polygon + Finnhub later with zero refactor.
// --------------------------------------------------

import "dotenv/config";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// --------------------------------------------------
// SUPABASE CLIENT
// --------------------------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// --------------------------------------------------
// GLOBAL TICKER LIST (MATCHES FILTER SCRIPT)
// --------------------------------------------------
const TICKERS_TO_LOAD = [
  // Primary regime tickers
  "SPY","QQQ","IWM",
  "VIXY","VXX",
  "TLT","HYG","UUP",
  "XLK","SMH",
  "RSP","MDY",
  "EFA","EEM","FXI",
  "USO","GLD",
  "FXY",

  // Europe regime + breadth + FX
  "EWG","EWU","EZU","FEZ","FXE",

  // Asia regime + breadth
  "EWJ","AAXJ",

  // Mexico + South America regime
  "EWW","EWZ","ECH","ILF",

  // Full US / global universe
  "AAPL","MSFT","AMZN","META","GOOG","GOOGL","NVDA","TSLA",
  "AMD","AVGO","INTC","MU","QCOM","TXN","ADI","AMAT","LRCX","KLAC","NXPI","CRM","ORCL","IBM","SHOP","PLTR",
  "SPY","QQQ","IWM","DIA","VOO","VTI","RSP","MDY",
  "XLK","XLF","XLE","XLI","XLY","XLV","XLB","XLU","XLP","XLC","SMH",
  "TQQQ","SQQQ","SOXL","SOXS","LABU","LABD","FNGU","FNGD",
  "JPM","BAC","WFC","C","MS","GS","SCHW","AXP","BLK",
  "XOM","CVX","COP","SLB","HAL","MPC","VLO","OXY",
  "WMT","COST","HD","LOW","TGT","MCD","SBUX","NKE","PG","KO","PEP",
  "CAT","DE","GE","BA","HON","UPS","FDX","MMM","LMT","RTX",
  "UNH","JNJ","PFE","MRK","ABBV","LLY","TMO","BMY","AMGN","GILD",
  "AAL","DAL","UAL","LUV","MAR","HLT","BKNG","ABNB",
  "F","GM","RIVN","LCID","TM","HMC",
  "COIN","MSTR","MARA","RIOT","HUT","GBTC","ETHE",
  "BABA","BIDU","JD","PDD","TCEHY","NTES",
  "TSM","ASML","NVO","SAP","RIO","BHP","SONY","ADBE","NFLX",
  "FCX","NUE","AA","MOS","CLF","TECK",
  "NEE","DUK","SO","AEP","EXC",
  "VZ","T","TMUS","CHTR","CMCSA",
  "PYPL","SNAP","UBER","LYFT","ROKU","ZM",
  "EWJ","EWG","EWU",
  "UNG","SLV","GDX","COPX",
  "FXE","FXA",
  "IEF","LQD","EMB",
  "VXZ"
];

// --------------------------------------------------
// SKIP LIST (DELISTED / BROKEN ON YAHOO)
// --------------------------------------------------
const SKIP_TICKERS = new Set<string>([
  "X",   // delisted
  "SQ",  // Yahoo chart endpoint flaky; handle later with Polygon/Finnhub
]);

// --------------------------------------------------
// YAHOO FINANCE FETCHER (CURRENT PROVIDER)
// --------------------------------------------------
async function fetchFromYahoo(ticker: string) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=6mo`;

  try {
    const res = await axios.get(url);
    const result = res.data.chart.result?.[0];
    if (!result) return null;

    const timestamps = result.timestamp;
    const quote = result.indicators.quote[0];
    const adj = result.indicators.adjclose?.[0];

    const rows = timestamps.map((ts: number, i: number) => ({
      ts: new Date(ts * 1000).toISOString(),
      close: adj?.adjclose?.[i] ?? quote.close[i],
      volume: quote.volume[i],
      high: quote.high[i],
      low: quote.low[i],
    }));

    return rows;
  } catch (err: any) {
    console.error(`  Yahoo error for ${ticker}:`, err.message);
    return null;
  }
}

// --------------------------------------------------
// PROVIDER ABSTRACTION (C-READY)
// --------------------------------------------------
async function fetchDailyBars(ticker: string) {
  // 1) Try Polygon (future)
  // 2) Try Finnhub (future)
  // 3) Fallback to Yahoo (current)
  return await fetchFromYahoo(ticker);
}

// --------------------------------------------------
// INDICATOR CALCULATIONS
// --------------------------------------------------
function sma(values: number[], period: number) {
  if (values.length < period) return null;
  const slice = values.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / period;
}

function atr(rows: any[], period = 14) {
  if (rows.length < period + 1) return null;

  const trs: number[] = [];
  for (let i = 1; i < rows.length; i++) {
    const high = rows[i].high;
    const low = rows[i].low;
    const prevClose = rows[i - 1].close;
    trs.push(
      Math.max(
        high - low,
        Math.abs(high - prevClose),
        Math.abs(low - prevClose)
      )
    );
  }

  return sma(trs, period);
}

function vol20(values: number[]) {
  if (values.length < 20) return null;
  const slice = values.slice(-20);
  const mean = slice.reduce((a, b) => a + b, 0) / 20;
  const variance = slice.reduce((a, b) => a + (b - mean) ** 2, 0) / 20;
  return Math.sqrt(variance);
}

// --------------------------------------------------
// MAIN LOADER
// --------------------------------------------------
async function main() {
  console.log("--------------------------------------------------");
  console.log("GLOBAL DAILY PRICE LOAD (C-READY, YAHOO ACTIVE)");
  console.log("Tickers:", TICKERS_TO_LOAD.length);
  console.log("--------------------------------------------------");

  for (const ticker of TICKERS_TO_LOAD) {
    if (SKIP_TICKERS.has(ticker)) {
      console.log(`⏭ Skipping ${ticker} (known unsupported / delisted)`);
      continue;
    }

    console.log(`Fetching ${ticker}...`);

    const rows = await fetchDailyBars(ticker);
    if (!rows || rows.length === 0) {
      console.log(`❌ No data for ${ticker}`);
      continue;
    }

    const closes = rows.map((r) => r.close);
    const volumes = rows.map((r) => r.volume);

    const sma20v = sma(closes, 20);
    const sma50v = sma(closes, 50);
    const avgVol20 = sma(volumes, 20);
    const vol20v = vol20(closes);
    const atr14 = atr(rows, 14);

    const latest = rows[rows.length - 1];

    const payload = {
      ticker,
      ts: latest.ts,
      close: latest.close,
      volume: latest.volume,
      sma20: sma20v,
      sma50: sma50v,
      avg_volume20: avgVol20,
      vol20: vol20v,
      atr: atr14,
      sector: null, // optional, can be enriched later
    };

    const { error } = await supabase
      .from("prices_daily")
      .upsert(payload, { onConflict: "ticker" });

    if (error) {
      console.error(`❌ Error saving ${ticker}:`, error.message);
    } else {
      console.log(`✔ Saved ${ticker}`);
    }
  }

  console.log("--------------------------------------------------");
  console.log("Global daily price load complete.");
  console.log("--------------------------------------------------");
}

main().catch((err) => {
  console.error("Fatal loader error:", err);
  process.exit(1);
});
