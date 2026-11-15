import { COOKIE, cookieAttrs } from "@/lib/auth";

export async function POST(req: Request) {
  return Response.json({ ok: true }, { headers: { "Set-Cookie": `${COOKIE}=; ${cookieAttrs(req, 0)}` } });
}
