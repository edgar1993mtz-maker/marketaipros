import "./env";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

function sma(values: number[], period: number) {
  const result = [];
  for (let i = period - 1; i < values.length; i++) {
    const slice = values.slice(i - (period - 1), i + 1);
    const avg = slice.reduce((a, b) => a + b, 0) / period;
    result.push(avg);
  }
  return result;
}

function rollingStd(values: number[], period: number) {
  const result = [];
  for (let i = period - 1; i < values.length; i++) {
    const slice = values.slice(i - (period - 1), i + 1);
    const mean = slice.reduce((a, b) => a + b, 0) / period;
    const variance =
      slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
    result.push(Math.sqrt(variance));
  }
  return result;
}

async function run() {
  // 1. Fetch all tickers
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

    if (!rows || rows.length < 50) continue;

    const closes = rows.map(r => r.close);
    const volumes = rows.map(r => r.volume);

    const sma20 = sma(closes, 20);
    const sma50 = sma(closes, 50);
    const avgVol20 = sma(volumes, 20);
    const vol20 = rollingStd(closes, 20);

    // 3. Update rows
    for (let i = 0; i < rows.length; i++) {
      const updateData: any = {};

      if (i >= 19) updateData.sma20 = sma20[i - 19];
      if (i >= 49) updateData.sma50 = sma50[i - 49];
      if (i >= 19) updateData.avg_volume20 = avgVol20[i - 19];
      if (i >= 19) updateData.vol20 = vol20[i - 19];

      if (Object.keys(updateData).length > 0) {
        await supabase
          .from("prices_daily")
          .update(updateData)
          .eq("id", rows[i].id);
      }
    }

    console.log("Updated metrics:", ticker);
  }

  console.log("MAFI metrics computation complete.");
}

run();
