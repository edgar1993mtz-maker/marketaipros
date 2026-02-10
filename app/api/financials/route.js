export async function GET() {
  return Response.json({ message: "financials API placeholder" });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ message: "Processing financials", data: body });
}
