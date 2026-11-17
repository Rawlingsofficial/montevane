import "server-only";
import nodemailer from "nodemailer";

// Transactional email. Zoho SMTP (info@montevane.com) when SMTP_USER and
// SMTP_PASS are set; Resend's HTTP API otherwise.

type Email = { to: string; subject: string; text: string; replyTo?: string };

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const transport =
  SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

export async function sendEmail({ to, subject, text, replyTo }: Email): Promise<void> {
  if (transport) {
    try {
      await transport.sendMail({
        from: process.env.EMAIL_FROM ?? `Montévane <${SMTP_USER}>`,
        to,
        subject,
        text,
        ...(replyTo ? { replyTo } : {}),
      });
    } catch (err) {
      console.error("SMTP error", err);
    }
    return;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "Montévane <hello@luxurybagsandwatches.com>",
      to,
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
}
