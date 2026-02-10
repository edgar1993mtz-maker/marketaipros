import { NextResponse } from "next/server";
import data from "@/app/dashboard/data/weekly.json";

export function GET() {
  return NextResponse.json(data);
}
