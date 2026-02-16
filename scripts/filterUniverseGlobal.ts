// scripts/filterUniverseGlobal.ts
// --------------------------------------------------
// MAFI GLOBAL ENGINE — REGIME + HYBRID FILTER PER REGION
// Now includes REGIME SCORE (0–100) per region
// --------------------------------------------------

import "dotenv/config";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// --------------------------------------------------
// SUPABASE CLIENT
// --------------------------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// --------------------------------------------------
// TYPES
// --------------------------------------------------
type DailyRow = {
  ticker: string;
  ts: string;
  close: number;
  volume: number;
  atr: number | null;
  sma20: number | null;
  sma50: number | null;
  avg_volume20: number | null;
  vol20: number | null;
  sector: string | null;
};

// --------------------------------------------------
// HYBRID FILTER THRESHOLDS
// --------------------------------------------------
const MIN_AVG_VOLUME_20 = 800_000;
const MIN_ATR_PCT = 1;
const MAX_ATR_PCT = 8;
const MIN_VOL20 = 0.8;
const MAX_VOL20 = 6.0;

const BANNED_TICKERS = new Set<string>([]);

// --------------------------------------------------
// ⭐ REGIME SCORE FUNCTION (0–100)
// --------------------------------------------------
function computeRegimeScore({
  trendHealthy,
  trendTotal,
  volOK,
  breadthOK,
  currencyScore,
  commodityOK
}: {
  trendHealthy: number;
  trendTotal: number;
  volOK: boolean;
  breadthOK: boolean;
  currencyScore: number;
  commodityOK: boolean;
}) {
  let score = 0;

  // Trend = 40%
  const trendPct = trendHealthy / trendTotal;
  score += trendPct * 40;

  // Volatility = 20%
  score += volOK ? 20 : 0;

  // Breadth = 15%
  score += breadthOK ? 15 : 0;

  // Currency = 15%
  if (currencyScore === 0) score += 15;
  else if (currencyScore === 1) score += 7;
  else score += 0;

  // Commodities = 10%
  score += commodityOK ? 10 : 0;

  return Math.round(score);
}

// --------------------------------------------------
// REGIONAL CONFIG
// --------------------------------------------------
type RegionConfig = {
  name: string;
  regime: {
    trend: string[];
    vol?: string[];
    breadth?: string[];
    currencies?: string[];
    commodities?: string[];
    global?: string[];
  };
  universe: string[];
  outputFile: string;
};

// ------------------ REGIONS -----------------------

const REGION_US: RegionConfig = {
  name: "US",
  regime: {
    trend: ["SPY", "QQQ", "IWM"],
    vol: ["VIXY", "VXX"],
    breadth: ["RSP", "MDY"],
    currencies: ["UUP"],
    commodities: ["USO", "GLD"],
  },
  universe: [
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
    "PYPL","SNAP","UBER","LYFT","ROKU","ZM",
    "TLT","IEF","HYG","LQD","EMB",
    "VIXY","VXX","VXZ",
    "USO","UNG","GLD","SLV","GDX","COPX",
    "UUP"
  ],
  outputFile: path.join(process.cwd(), "data", "universe_us.json"),
};

const REGION_EUROPE: RegionConfig = {
  name: "Europe",
  regime: {
    trend: ["EWG", "EWU", "EZU"],
    vol: ["VIXY"],
    breadth: ["FEZ"],
    currencies: ["FXE"],
    commodities: ["USO", "GLD"],
  },
  universe: ["EWG","EWU","EZU","FEZ","SAP","NVO","RIO","BHP","FXE"],
  outputFile: path.join(process.cwd(), "data", "universe_europe.json"),
};

const REGION_ASIA: RegionConfig = {
  name: "Asia",
  regime: {
    trend: ["EWJ", "EEM", "FXI"],
    vol: ["VIXY"],
    breadth: ["AAXJ"],
    currencies: ["FXY"],
    commodities: ["USO","COPX"],
  },
  universe: [
    "EWJ","EEM","FXI","AAXJ",
    "TSM","ASML","NTES","TCEHY","BABA","BIDU","JD","PDD","SONY",
    "FXY"
  ],
  outputFile: path.join(process.cwd(), "data", "universe_asia.json"),
};

const REGION_MEXICO: RegionConfig = {
  name: "Mexico",
  regime: {
    trend: ["EWW"],
    vol: ["VIXY"],
    breadth: ["EWW"],
    commodities: ["USO"],
  },
  universe: ["EWW"],
  outputFile: path.join(process.cwd(), "data", "universe_mexico.json"),
};

const REGION_LATAM: RegionConfig = {
  name: "SouthAmerica",
  regime: {
    trend: ["EWZ", "ECH", "ILF"],
    vol: ["VIXY"],
    breadth: ["ILF"],
    commodities: ["USO","COPX"],
  },
  universe: ["EWZ","ECH","ILF","FCX","TECK"],
  outputFile: path.join(process.cwd(), "data", "universe_south_america.json"),
};

const REGIONS = [
  REGION_US,
  REGION_EUROPE,
  REGION_ASIA,
  REGION_MEXICO,
  REGION_LATAM,
];

// --------------------------------------------------
// HELPERS
// --------------------------------------------------
async function fetchLatestMetrics(ticker: string): Promise<DailyRow | null> {
  const { data } = await supabase
    .from("prices_daily")
    .select("*")
    .eq("ticker", ticker)
    .order("ts", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data as DailyRow;
}

async function fetchRows(list: string[]) {
  return Promise.all(list.map(fetchLatestMetrics));
}

function healthy(row: DailyRow | null) {
  if (!row) return false;
  const { close, sma20, sma50, vol20, atr } = row;
  if (!close || !sma20 || !sma50 || !vol20 || !atr) return false;

  const trendOK = sma20 >= sma50 && close >= sma20;
  const volOK = vol20 >= 0.5 && vol20 <= 6;
  const atrPct = (atr / close) * 100;
  const atrOK = atrPct >= 0.7;

  return trendOK && volOK && atrOK;
}

// --------------------------------------------------
// ⭐ REGIONAL REGIME CHECK (NOW RETURNS SCORE)
// --------------------------------------------------
async function regionRegimeHealthy(region: RegionConfig) {
  console.log("--------------------------------------------------");
  console.log(`Checking ${region.name} Market Regime...`);
  console.log("--------------------------------------------------");

  const { trend, vol, breadth, currencies, commodities } = region.regime;

  // ---------------- TREND ----------------
  const trendRows = await fetchRows(trend);
  const trendHealthy = trendRows.filter(healthy).length;
  const trendTotal = trend.length;

  console.log("Trend block:");
  trend.forEach((t, i) => {
    const r = trendRows[i];
    if (!r) return console.log(`  ${t}: NO DATA`);
    console.log(`  ${t}: close=${r.close}, sma20=${r.sma20}, sma50=${r.sma50}`);
  });
  console.log(`  Healthy count: ${trendHealthy}/${trendTotal}`);

  if (trendHealthy < Math.max(1, Math.floor(trendTotal * 0.66))) {
    console.log(`❌ ${region.name} Trend FAILED`);
  }

  // ---------------- VOLATILITY ----------------
  let volOK = true;
  if (vol && vol.length > 0) {
    const volRows = await fetchRows(vol);
    const volRising = volRows.some((row) => row && row.sma20 > row.sma50);
    volOK = !volRising;
  }

  // ---------------- BREADTH ----------------
  let breadthOK = true;
  if (breadth && breadth.length > 0) {
    const breadthRows = await fetchRows(breadth);
    const breadthWeak = breadthRows.some(
      (row) => row && row.sma20 < row.sma50
    );
    breadthOK = !breadthWeak;
  }

  // ---------------- CURRENCY ----------------
  let currencyScore = 0;
  if (currencies && currencies.length > 0) {
    const curRows = await fetchRows(currencies);

    for (const row of curRows) {
      if (!row || !row.sma20 || !row.sma50 || !row.close || !row.atr) continue;

      const trendUp = row.sma20 > row.sma50;
      const atrPct = (row.atr / row.close) * 100;
      const atrHigh = atrPct > 2.0; // softened threshold

      if (trendUp && atrHigh) currencyScore += 1;
    }
  }

  // ---------------- COMMODITIES ----------------
  let commodityOK = true;
  if (commodities && commodities.length > 0) {
    const comRows = await fetchRows(commodities);
    const spike = comRows.some(
      (row) => row && row.atr && row.close && row.atr / row.close > 0.08
    );
    commodityOK = !spike;
  }

  // ---------------- SCORE ----------------
  const regimeScore = computeRegimeScore({
    trendHealthy,
    trendTotal,
    volOK,
    breadthOK,
    currencyScore,
    commodityOK
  });

  console.log(`\n${region.name} REGIME SCORE: ${regimeScore}`);

  const regimeOK = regimeScore >= 60;

  console.log(
    `--------------------------------------------------\n${region.name} REGIME: ${
      regimeOK ? "✔ HEALTHY" : "❌ BLOCKED"
    }\n--------------------------------------------------`
  );

  return { regimeOK, regimeScore };
}

// --------------------------------------------------
// HYBRID FILTER
// --------------------------------------------------
function passesHybridInstitutionalRules(row: DailyRow): boolean {
  const {
    close,
    volume,
    atr,
    sma20,
    sma50,
    avg_volume20,
    vol20,
    sector,
    ticker,
  } = row;

  if (
    close == null ||
    atr == null ||
    sma20 == null ||
    sma50 == null ||
    avg_volume20 == null ||
    vol20 == null
  ) {
    return false;
  }

  if (BANNED_TICKERS.has(ticker)) return false;
  if (sector && sector.toLowerCase().includes("real estate")) return false;

  const trendStrong = sma20 >= sma50 && close >= sma20;
  if (!trendStrong) return false;

  const avgVolOK = avg_volume20 >= MIN_AVG_VOLUME_20;
  const todayVolOK = volume >= 0.8 * avg_volume20;
  if (!avgVolOK || !todayVolOK) return false;

  const volOK = vol20 >= MIN_VOL20 && vol20 <= MAX_VOL20;
  if (!volOK) return false;

  const atrPct = (atr / close) * 100;
  const atrOK = atrPct >= MIN_ATR_PCT && atrPct <= MAX_ATR_PCT;
  if (!atrOK) return false;

  return true;
}

// --------------------------------------------------
// MAIN GLOBAL ENGINE
// --------------------------------------------------
async function main() {
  console.log("==================================================");
  console.log("RUNNING MAFI GLOBAL ENGINE — REGIME + HYBRID + SCORE");
  console.log("==================================================");

  const globalCombined: string[] = [];

  for (const region of REGIONS) {
    console.log("\n==================================================");
    console.log(`REGION: ${region.name}`);
    console.log("==================================================");

    const { regimeOK, regimeScore } = await regionRegimeHealthy(region);

    const originalUniverse = region.universe.filter(
      (t) => !BANNED_TICKERS.has(t)
    );

    const filtered: string[] = [];

    if (regimeOK) {
      console.log(`${region.name} regime healthy — running hybrid filter...`);
      for (const ticker of originalUniverse) {
        const row = await fetchLatestMetrics(ticker);
        if (!row) continue;

        if (passesHybridInstitutionalRules(row)) {
          filtered.push(ticker);
          console.log(`  ✔ ${ticker} PASSED hybrid filter`);
        } else {
          console.log(`  ✖ ${ticker} filtered out`);
        }
      }
    } else {
      console.log(`${region.name} regime unhealthy — skipping hybrid filter.`);
    }

    // Save regional universe
    const payload = {
      region: region.name,
      universe: filtered,
      original_universe: originalUniverse,
      generated_at: new Date().toISOString(),
      mode: "MAFI_GLOBAL_ENGINE",
      regime_healthy: regimeOK,
      regime_score: regimeScore
    };

    fs.mkdirSync(path.dirname(region.outputFile), { recursive: true });
    fs.writeFileSync(region.outputFile, JSON.stringify(payload, null, 2), "utf8");

    if (regimeOK) globalCombined.push(...filtered);
  }

  // Save combined global universe
  const globalPath = path.join(process.cwd(), "data", "universe_global.json");
  const globalPayload = {
    universe: Array.from(new Set(globalCombined)),
    generated_at: new Date().toISOString(),
    mode: "MAFI_GLOBAL_ENGINE_COMBINED",
  };

  fs.mkdirSync(path.dirname(globalPath), { recursive: true });
  fs.writeFileSync(globalPath, JSON.stringify(globalPayload, null, 2), "utf8");

  console.log("==================================================");
  console.log("GLOBAL UNIVERSE COMPLETE");
  console.log("Combined filtered universe:", globalPayload.universe.length);
  console.log("Output saved to:", globalPath);
  console.log("==================================================");
}

main().catch((err) => {
  console.error("Fatal error in MAFI Global Engine:", err);
  process.exit(1);
});
