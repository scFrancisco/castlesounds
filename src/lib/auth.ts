import { createHmac, timingSafeEqual } from "crypto";

/*
  Admin auth: a single password from the ADMIN_PASSWORD env var (never sent
  to the browser). A successful login gets a signed, httpOnly cookie
  "<expiry>.<hmac>" valid for 7 days.
*/
export const COOKIE = "cs_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // seconds

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

export function adminEnabled(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

function sign(payload: string, key: string) {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  // compare digests so length differences don't leak through timing
  const h = (s: string) => createHmac("sha256", "pw").update(s).digest("hex");
  return safeEqual(h(input), h(pw));
}

export function createSession(): { value: string; maxAge: number } {
  const key = secret()!;
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE);
  return { value: `${exp}.${sign(exp, key)}`, maxAge: MAX_AGE };
}

export function verifySession(value: string | undefined): boolean {
  const key = secret();
  if (!key || !value) return false;
  const [exp, mac] = value.split(".");
  if (!exp || !mac || !/^\d+$/.test(exp)) return false;
  if (Number(exp) < Date.now() / 1000) return false;
  return safeEqual(mac, sign(exp, key));
}

/** Read the cookie off a request and verify it. */
export function isAdmin(req: Request): boolean {
  const cookie = req.headers.get("cookie") ?? "";
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  return verifySession(m ? decodeURIComponent(m[1]) : undefined);
}

/** Reject cross-site writes: the Origin (when sent) must match the Host. */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function cookieAttrs(req: Request, maxAge: number) {
  const proto = req.headers.get("x-forwarded-proto") ?? new URL(req.url).protocol.replace(":", "");
  const secure = proto === "https" ? "; Secure" : "";
  return `Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

// --- login throttling (per IP, in memory) ---
const attempts = new Map<string, { n: number; until: number }>();
const WINDOW = 15 * 60 * 1000;
const LIMIT = 6;

export function clientIp(req: Request) {
  // the right-most X-Forwarded-For entry is the one added by the platform's proxy;
  // left-most entries are whatever the client sent and can be forged
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = (req.headers.get("x-forwarded-for") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  return xff[xff.length - 1] || "local";
}

export function throttled(ip: string): boolean {
  const a = attempts.get(ip);
  return !!a && a.n >= LIMIT && a.until > Date.now();
}

export function recordFailure(ip: string) {
  const a = attempts.get(ip);
  if (!a || a.until < Date.now()) attempts.set(ip, { n: 1, until: Date.now() + WINDOW });
  else a.n += 1;
}

export function clearFailures(ip: string) {
  attempts.delete(ip);
}
