import "./env";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

function computeATRSeries(rows: any[]) {
  const trs = [];

  for (let i = 1; i < rows.length; i++) {
    const prevClose = rows[i - 1].close;
    const high = rows[i].high;
    const low = rows[i].low;

    const tr = Math.max(
      high - low,
      Math.abs(high - prevClose),
      Math.abs(low - prevClose)
    );

    trs.push(tr);
  }

  const atrSeries = [];

  for (let i = 14; i < trs.length; i++) {
    const slice = trs.slice(i - 14, i);
    const atr = slice.reduce((a, b) => a + b, 0) / 14;
    atrSeries.push(atr);
  }

  return atrSeries;
}

async function run() {
  // 1. Fetch all tickers (no DISTINCT — we dedupe manually)
  const { data: tickerRows } = await supabase
    .from("prices_daily")
    .select("ticker")
    .neq("ticker", "")
    .order("ticker", { ascending: true });

  const uniqueTickers = [...new Set(tickerRows!.map(t => t.ticker))];

  // 2. Loop through each ticker
  for (const ticker of uniqueTickers) {
    const { data: rows } = await supabase
      .from("prices_daily")
      .select("*")
      .eq("ticker", ticker)
      .order("ts", { ascending: true });

    if (!rows || rows.length < 20) continue;

    const atrSeries = computeATRSeries(rows);

    // 3. Update ATR for every row starting at index 14
    for (let i = 14; i < rows.length; i++) {
      await supabase
        .from("prices_daily")
        .update({ atr: atrSeries[i - 14] })
        .eq("id", rows[i].id);
    }

    console.log("Updated ATR series:", ticker);
  }

  console.log("ATR computation complete.");
}

run();
