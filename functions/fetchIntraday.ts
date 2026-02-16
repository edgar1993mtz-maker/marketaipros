import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function fetchPrice(ticker: string) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1m&range=1d`;

  const res = await fetch(url);
  const data = await res.json();

  const result = data.chart?.result?.[0];
  if (!result) return null;

  const ts = result.timestamp.at(-1);
  const o = result.indicators.quote[0].open.at(-1);
  const h = result.indicators.quote[0].high.at(-1);
  const l = result.indicators.quote[0].low.at(-1);
  const c = result.indicators.quote[0].close.at(-1);
  const v = result.indicators.quote[0].volume.at(-1);

  return {
    ticker,
    ts: new Date(ts * 1000).toISOString(),
    open: o,
    high: h,
    low: l,
    close: c,
    volume: v,
    interval: "1m",
  };
}

async function main() {
  const universe = require("../data/universe.json");

  for (const ticker of universe) {
    const price = await fetchPrice(ticker);
    if (!price) continue;

    await supabase.from("prices_intraday").insert(price);
    console.log("Inserted:", ticker);
  }

  console.log("Live price fetch complete.");
}

main();
