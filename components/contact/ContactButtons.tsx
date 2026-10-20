import { Mail, MessageCircle, MessageSquare, Phone, Send, ShieldCheck } from "lucide-react";

import type { ContactChannels } from "@/lib/data/catalog";
import { contactLinks, type ContactMethod } from "@/lib/contact";

const ICONS: Record<ContactMethod, typeof Mail> = {
  whatsapp: MessageCircle,
  telegram: Send,
  signal: ShieldCheck,
  sms: MessageSquare,
  call: Phone,
  email: Mail,
};

/** One button per channel configured in admin Settings, pre-filled with `message`. */
export function ContactButtons({
  channels,
  message,
  subject,
  labels,
}: {
  channels: ContactChannels;
  message: string;
  subject: string;
  /** Button text per channel, in the page's language. */
  labels: Record<string, string>;
}) {
  const links = contactLinks(channels, message, subject);
  if (links.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {links.map((link, i) => {
        const Icon = ICONS[link.method];
        return (
          <a
            key={link.method}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={
              i === 0
                ? "flex items-center justify-center gap-2 bg-primary px-4 py-3.5 text-xs font-medium tracking-[0.15em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary"
                : "flex items-center justify-center gap-2 border border-border px-4 py-3.5 text-xs font-medium tracking-[0.15em] uppercase transition-colors hover:border-foreground"
            }
          >
            <Icon className="size-4" strokeWidth={1.5} />
            {labels[link.method] ?? link.label}
          </a>
        );
      })}
    </div>
  );
}
