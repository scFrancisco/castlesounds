import {
  adminEnabled, checkPassword, createSession, cookieAttrs, COOKIE,
  clientIp, throttled, recordFailure, clearFailures, sameOrigin,
} from "@/lib/auth";

export async function POST(req: Request) {
  if (!adminEnabled()) return Response.json({ error: "Admin is not configured (ADMIN_PASSWORD missing)." }, { status: 503 });
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403 });

  const ip = clientIp(req);
  if (throttled(ip)) return Response.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });

  let password = "";
  try {
    password = String((await req.json())?.password ?? "");
  } catch {}

  if (!checkPassword(password)) {
    recordFailure(ip);
    // small delay to slow down guessing
    await new Promise((r) => setTimeout(r, 600));
    return Response.json({ error: "Wrong password" }, { status: 401 });
  }

  clearFailures(ip);
  const s = createSession();
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": `${COOKIE}=${s.value}; ${cookieAttrs(req, s.maxAge)}` } }
  );
}
