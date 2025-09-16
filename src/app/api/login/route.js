export async function POST(req) {
  const { code } = await req.json();

  if (code === process.env.ACCESS_CODE) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Código incorrecto" }), { status: 401 });
}
