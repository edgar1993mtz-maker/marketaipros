export async function GET() {
  return Response.json({ message: "screener API placeholder" });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ message: "Processing screener", data: body });
}
