import { NextResponse } from "next/server"

const FINNHUB = process.env.FINNHUB_API_KEY

// ⭐ Map timeframes to Finnhub resolution
const RESOLUTIONS: Record<string, string> = {
  "5m": "5",
  "15m": "15",
  "1H": "60",
  "4H": "240",
  "1D": "D",
  "1W": "W",
}

export async function GET(
  req: Request,
  { params }: { params: { symbol: string } }
) {
  const { symbol } = params
  const { searchParams } = new URL(req.url)

  const tf = searchParams.get("tf") || "1D"
  const resolution = RESOLUTIONS[tf] || "D"

  // ⭐ Finnhub requires timestamps
  const now = Math.floor(Date.now() / 1000)
  const from = now - 60 * 60 * 24 * 30 // last 30 days

  try {
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${now}&token=${FINNHUB}`

    const res = await fetch(url)
    const json = await res.json()

    if (json.s !== "ok") {
      return NextResponse.json({ error: "No data" }, { status: 404 })
    }

    const candles = json.t.map((t: number, i: number) => ({
      time: t,
      open: json.o[i],
      high: json.h[i],
      low: json.l[i],
      close: json.c[i],
    }))

    return NextResponse.json({ candles })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch Finnhub data" },
      { status: 500 }
    )
  }
}
