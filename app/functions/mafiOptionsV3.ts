import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const SYMBOLS = ["AAPL", "TSLA", "SPY", "MSFT", "GOOG"];
const ATR_MULTIPLIER = 1.5;
const SCORE_THRESHOLD = 7;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

async function sendTelegram(msg: string) {
  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: msg,
        parse_mode: "Markdown"
      })
    }
  );
}

async function getData(symbol: string, interval: string, limit: number) {
  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${interval}/2024-01-01/2026-12-31?limit=${limit}&apiKey=${process.env.POLYGON_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results || [];
}

function computeHTFBias(candles: any[]) {
  const close = candles.at(-1).c;
  const sma20 = candles.slice(-20).reduce((a, c) => a + c.c, 0) / 20;

  const bullBias = close > sma20;
  const bearBias = close < sma20;

  const swingHigh = Math.max(...candles.slice(-10).map(c => c.h));
  const swingLow = Math.min(...candles.slice(-10).map(c => c.l));

  const chochUp = close > swingHigh;
  const chochDown = close < swingLow;

  return {
    bull: bullBias && chochUp,
    bear: bearBias && chochDown,
    swingHigh,
    swingLow
  };
}

function computeLTF(candles: any[]) {
  const last = candles.at(-1);
  const prev = candles.at(-2);

  const sweepHigh = last.h > Math.max(...candles.slice(-21, -1).map(c => c.h));
  const sweepLow = last.l < Math.min(...candles.slice(-21, -1).map(c => c.l));

  const dispUp = last.c > prev.h;
  const dispDown = last.c < prev.l;

  const fvgUp = last.l > candles.at(-3).h;
  const fvgDown = last.h < candles.at(-3).l;

  const volMA = candles.slice(-20).reduce((a, c) => a + c.v, 0) / 20;
  const volOK = last.v > volMA;

  return { sweepHigh, sweepLow, dispUp, dispDown, fvgUp, fvgDown, volOK };
}

function computeOTE(high: number, low: number) {
  return {
    min: low + (high - low) * 0.62,
    max: low + (high - low) * 0.79
  };
}

function computeMAFI(high: number, low: number) {
  return {
    z705: low + (high - low) * 0.705,
    z718: low + (high - low) * 0.718
  };
}

function computeATR(candles: any[]) {
  const trs = [];
  for (let i = 1; i < candles.length; i++) {
    const prev = candles[i - 1];
    const curr = candles[i];
    trs.push(
      Math.max(
        curr.h - curr.l,
        Math.abs(curr.h - prev.c),
        Math.abs(curr.l - prev.c)
      )
    );
  }
  return trs.reduce((a, b) => a + b, 0) / trs.length;
}

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const results: any[] = [];

  for (const symbol of SYMBOLS) {
    const htf = await getData(symbol, "60", 200);
    const ltf = await getData(symbol, "5", 200);

    if (htf.length < 50 || ltf.length < 50) continue;

    const bias = computeHTFBias(htf);
    const ltfModel = computeLTF(ltf);

    const high = htf.at(-1).h;
    const low = htf.at(-1).l;

    const ote = computeOTE(high, low);
    const mafi = computeMAFI(high, low);
    const atr = computeATR(ltf);

    const price = ltf.at(-1).c;

    const callSignal =
      bias.bull &&
      price >= ote.min &&
      price <= ote.max &&
      ltfModel.sweepLow &&
      ltfModel.dispUp &&
      ltfModel.fvgUp &&
      ltfModel.volOK &&
      price > mafi.z705 &&
      price < mafi.z718;

    const putSignal =
      bias.bear &&
      price >= ote.min &&
      price <= ote.max &&
      ltfModel.sweepHigh &&
      ltfModel.dispDown &&
      ltfModel.fvgDown &&
      ltfModel.volOK &&
      price > mafi.z705 &&
      price < mafi.z718;

    const score =
      [
        bias.bull || bias.bear,
        ltfModel.sweepLow || ltfModel.sweepHigh,
        ltfModel.dispUp || ltfModel.dispDown,
        ltfModel.fvgUp || ltfModel.fvgDown,
        ltfModel.volOK,
        price >= ote.min && price <= ote.max,
        price > mafi.z705 && price < mafi.z718
      ].filter(Boolean).length;

    if (score >= SCORE_THRESHOLD && (callSignal || putSignal)) {
      const entry = price;
      const stop = callSignal ? bias.swingLow : bias.swingHigh;
      const tp = callSignal
        ? entry + atr * ATR_MULTIPLIER
        : entry - atr * ATR_MULTIPLIER;

      const signal = {
        symbol,
        call_signal: callSignal,
        put_signal: putSignal,
        entry,
        stop,
        tp,
        score,
        date: today
      };

      results.push(signal);

      await sendTelegram(
        `*${symbol}*\nScore: ${score}\nEntry: ${entry}\nStop: ${stop}\nTP: ${tp}`
      );
    }
  }

  if (results.length > 0) {
    await supabase.from("options_signals").insert(results);
  }

  return NextResponse.json({
    status: "ok",
    signals: results.length
  });
}
