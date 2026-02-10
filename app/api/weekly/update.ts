import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();
  const filePath = path.join(process.cwd(), "app/dashboard/data/weekly.json");

  await writeFile(filePath, JSON.stringify(body, null, 2));

  return NextResponse.json({ updated: true });
}
