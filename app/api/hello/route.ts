export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name") || "John";
  const gender = searchParams.get("gender") || "female";

  return Response.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    name: name,
    username: name.toLowerCase(),
    gender: gender,
  });
}
