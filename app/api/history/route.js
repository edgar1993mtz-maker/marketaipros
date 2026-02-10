export async function GET() {
  return Response.json({ message: "history API placeholder" });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ message: "Processing history", data: body });
}
