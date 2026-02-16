import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function fetchDaily(ticker: string) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=6mo`;

  const res = await fetch(url);
  const data = await res.json();

  const result = data.chart?.result?.[0];
  if (!result) return [];

  const timestamps = result.timestamp;
  const quote = result.indicators.quote[0];

  return timestamps.map((ts: number, i: number) => ({
    ticker,
    ts: new Date(ts * 1000).toISOString().slice(0, 10),
    open: quote.open[i],
    high: quote.high[i],
    low: quote.low[i],
    close: quote.close[i],
    volume: quote.volume[i],
  }));
}

async function main() {
  const universe = require("../data/universe.json");

  for (const ticker of universe) {
    const rows = await fetchDaily(ticker);
    if (!rows.length) continue;

    await supabase.from("prices_daily").insert(rows);
    console.log("Inserted daily candles:", ticker);
  }

  console.log("Daily candle fetch complete.");
}

main();
