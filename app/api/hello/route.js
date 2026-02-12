export async function GET(request) {
  return Response.json({
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  });
}
