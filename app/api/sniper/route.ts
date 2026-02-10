import { NextResponse } from "next/server";
import data from "@/app/dashboard/data/sniper.json";

export function GET() {
  return NextResponse.json(data);
}
