// app/api/intelligence/route.ts

import { NextResponse } from "next/server";
import { getMapIntelligenceSnapshot } from "@/lib/map/intelligenceEngine";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") || "SPY";

  const snapshot = await getMapIntelligenceSnapshot(symbol);

  return NextResponse.json(snapshot);
}
