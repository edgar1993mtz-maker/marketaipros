import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

// ⭐ Generate a small sparkline (random walk)
function generateSparkline(length = 20) {
  let data = [100]
  for (let i = 1; i < length; i++) {
    const change = (Math.random() - 0.5) * 2 // -1 to +1
    data.push(data[i - 1] + change)
  }
  return data
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const timeframe = searchParams.get("timeframe")
  const direction = searchParams.get("direction")
  const status = searchParams.get("status")

  let query = supabase.from("signals").select("*")

  if (timeframe) query = query.eq("timeframe", timeframe)
  if (direction) query = query.eq("direction", direction)
  if (status) query = query.eq("status", status)

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // ⭐ Attach sparkline to each signal
  const enriched = data.map(signal => ({
    ...signal,
    sparkline: generateSparkline(25)
  }))

  return NextResponse.json({ data: enriched })
}
