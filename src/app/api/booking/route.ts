import { z } from "zod";
import nodemailer from "nodemailer";

/*
  Booking requests → email to BOOKING_EMAIL.

  Railway blocks outbound SMTP on non-Pro plans, so the primary path is an
  HTTPS email API (Resend: set RESEND_API_KEY). SMTP is kept as a fallback for
  hosts that allow it, with short timeouts so the form never hangs.
*/

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z.string().trim().max(40).optional().default(""),
  eventType: z.string().trim().min(1).max(60),
  eventDate: z.string().trim().min(1).max(40),
  venue: z.string().trim().min(2).max(150),
  capacity: z.string().trim().min(1).max(40),
  message: z.string().trim().min(10).max(4000),
});
type Booking = z.infer<typeof schema>;

const RESEND_URL = process.env.RESEND_API_URL || "https://api.resend.com/emails";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function render(b: Booking) {
  const rows: [string, string][] = [
    ["Name", b.name],
    ["Email", b.email],
    ["Phone", b.phone || "—"],
    ["Event type", b.eventType],
    ["Date", b.eventDate],
    ["Venue", b.venue],
    ["Capacity", b.capacity],
  ];
  const html = `
  <div style="font-family:Helvetica,Arial,sans-serif;background:#090203;color:#EDE3DA;padding:32px;max-width:600px;margin:0 auto">
    <p style="margin:0;font-size:28px;font-weight:800;letter-spacing:1px;text-transform:uppercase">Castle</p>
    <p style="margin:2px 0 24px;font-family:Georgia,serif;font-style:italic;color:#B52226;font-size:20px">new booking request.</p>
    <table style="width:100%;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) => `<tr>
        <td style="padding:8px 0;border-top:1px solid #2a1012;color:#AF8374;font-size:11px;letter-spacing:2px;text-transform:uppercase;width:130px;vertical-align:top">${esc(k)}</td>
        <td style="padding:8px 0;border-top:1px solid #2a1012;font-size:14px">${esc(v)}</td></tr>`
        )
        .join("")}
    </table>
    <div style="margin-top:20px;padding:16px;border-left:2px solid #B52226;background:#220709">
      <p style="margin:0 0 8px;color:#AF8374;font-size:11px;letter-spacing:2px;text-transform:uppercase">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.6">${esc(b.message).replace(/\n/g, "<br>")}</p>
    </div>
    <p style="margin-top:24px;font-size:12px;color:#AF8374">Reply to this email to answer ${esc(b.name)} directly.</p>
  </div>`;
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", b.message].join("\n");
  // keep the subject on one line
  const subject = `Booking request: ${b.eventType} on ${b.eventDate} — ${b.name}`.replace(/[\r\n]+/g, " ");
  return { html, text, subject };
}

async function sendWithResend(b: Booking, to: string) {
  const { html, text, subject } = render(b);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      signal: ctrl.signal,
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Castle Sounds <onboarding@resend.dev>",
        to: [to],
        reply_to: b.email,
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  } finally {
    clearTimeout(timer);
  }
}

async function sendWithSmtp(b: Booking, to: string) {
  const { html, text, subject } = render(b);
  const port = Number(process.env.SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 15_000,
  });
  await transporter.sendMail({
    from: `"Castle Sounds Booking" <${process.env.SMTP_USER}>`,
    to,
    replyTo: b.email,
    subject,
    html,
    text,
  });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Please check the form fields" }, { status: 400 });

  const to = process.env.BOOKING_EMAIL || "info@castledj.com";
  try {
    if (process.env.RESEND_API_KEY) await sendWithResend(parsed.data, to);
    else if (process.env.SMTP_USER && process.env.SMTP_PASS) await sendWithSmtp(parsed.data, to);
    else throw new Error("No email provider configured (set RESEND_API_KEY)");
    return Response.json({ success: true });
  } catch (err) {
    console.error("Booking email error:", err);
    return Response.json({ error: "Failed to send email" }, { status: 502 });
  }
}
