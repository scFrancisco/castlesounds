import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, eventDate, venue, capacity, message } = body;

    if (!name || !email || !eventType || !eventDate || !venue || !capacity || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <div style="font-family: 'Courier New', monospace; background: #080810; color: #e0e0f0; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(176,109,255,0.3);">
        <h1 style="color: #b06dff; font-size: 24px; letter-spacing: 4px; margin-bottom: 24px;">CASTLESOUNDS</h1>
        <h2 style="color: #ffffff; font-size: 16px; letter-spacing: 2px; border-bottom: 1px solid rgba(176,109,255,0.2); padding-bottom: 12px; margin-bottom: 24px;">NEW BOOKING REQUEST</h2>

        <table style="width: 100%; border-collapse: collapse;">
          ${[
            ["NAME", name],
            ["EMAIL", email],
            ["PHONE", phone || "Not provided"],
            ["EVENT TYPE", eventType],
            ["DATE", eventDate],
            ["VENUE", venue],
            ["CAPACITY", capacity],
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 8px 0; color: #6b6b8a; font-size: 11px; letter-spacing: 2px; vertical-align: top; width: 140px;">${label}</td>
              <td style="padding: 8px 0; color: #e0e0f0; font-size: 13px;">${value}</td>
            </tr>`
            )
            .join("")}
        </table>

        <div style="margin-top: 24px; padding: 16px; background: rgba(176,109,255,0.07); border-left: 2px solid #b06dff;">
          <p style="color: #6b6b8a; font-size: 11px; letter-spacing: 2px; margin-bottom: 8px;">MESSAGE</p>
          <p style="color: #e0e0f0; font-size: 13px; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
        </div>

        <p style="margin-top: 32px; font-size: 11px; color: #6b6b8a; letter-spacing: 1px;">
          Sent from castlesounds.pt — Reply directly to ${email}
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"CastleSounds Booking" <${process.env.SMTP_USER}>`,
      to: process.env.BOOKING_EMAIL || "info@castledj.com",
      replyTo: email,
      subject: `🎵 Booking Request: ${eventType} on ${eventDate} — ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
