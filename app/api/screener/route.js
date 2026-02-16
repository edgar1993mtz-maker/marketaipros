// app/api/screener/route.ts

import { NextResponse } from "next/server";
import { getMapScreenerRows } from "@/lib/map/screener";

export async function GET() {
  const rows = await getMapScreenerRows();
  return NextResponse.json(rows);
}
