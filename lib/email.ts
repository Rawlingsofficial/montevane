import "server-only";

// Transactional email through Resend's HTTP API. The sending domain is
// verified in Resend; replies land in the Zoho inbox via `reply_to`.

const FROM = process.env.EMAIL_FROM ?? "Montévane <hello@luxurybagsandwatches.com>";

type Email = { to: string; subject: string; text: string; replyTo?: string };

export async function sendEmail({ to, subject, text, replyTo }: Email): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
}
