import { NextResponse } from "next/server";
import { getFxDashboardSnapshot } from "@/lib/map/fx-dashboard";

export async function GET() {
  const snapshot = await getFxDashboardSnapshot();
  return NextResponse.json(snapshot);
}
