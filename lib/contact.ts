// Contact channels shared by the storefront (deep links) and the inquiry
// form/admin (labels). Values match the inquiries.contact_methods check.

export const CONTACT_METHODS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "signal", label: "Signal" },
  { value: "sms", label: "Text / iMessage" },
  { value: "call", label: "Phone Call" },
  { value: "email", label: "Email" },
] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number]["value"];

export const PAYMENT_METHODS = [
  { value: "bank_wire", label: "Bank Wire" },
  { value: "crypto", label: "Crypto" },
  { value: "card", label: "Card" },
  { value: "online", label: "Secure Online Payment Link" },
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]["value"];

const digits = (n: string) => n.replace(/[^\d]/g, "");

/** Deep links that open each app with a pre-written message where supported. */
export function contactLinks(
  channels: { whatsapp: string | null; telegram: string | null; signal: string | null; phone: string | null; email: string | null },
  message: string,
  subject: string
) {
  const text = encodeURIComponent(message);
  const links: { method: ContactMethod; label: string; href: string }[] = [];

  if (channels.whatsapp) links.push({ method: "whatsapp", label: "WhatsApp", href: `https://wa.me/${digits(channels.whatsapp)}?text=${text}` });
  if (channels.telegram) links.push({ method: "telegram", label: "Telegram", href: `https://t.me/${channels.telegram.replace(/^@/, "")}` });
  if (channels.signal) links.push({ method: "signal", label: "Signal", href: `https://signal.me/#p/+${digits(channels.signal)}` });
  if (channels.phone) {
    // "?&body=" is the form both iOS and Android accept.
    links.push({ method: "sms", label: "Text", href: `sms:+${digits(channels.phone)}?&body=${text}` });
    links.push({ method: "call", label: "Call", href: `tel:+${digits(channels.phone)}` });
  }
  if (channels.email)
    links.push({ method: "email", label: "Email", href: `mailto:${channels.email}?subject=${encodeURIComponent(subject)}&body=${text}` });

  return links;
}
