import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { localePath, type Locale } from "@/lib/i18n";

// Tiny inline formatter for journal copy: [text](url), **bold** and *italic*.
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

export function RichText({ text, locale }: { text: string; locale: Locale }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = m.index;
    if (m[1] && m[2]) {
      const href = m[2];
      const cls = "underline decoration-[var(--gold)] underline-offset-4 hover:text-[var(--gold)]";
      out.push(
        href.startsWith("/") ? (
          <Link key={key} href={localePath(locale, href)} className={cls}>
            {m[1]}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener" className={cls}>
            {m[1]}
          </a>
        )
      );
    } else if (m[3]) out.push(<strong key={key} className="font-medium text-foreground">{m[3]}</strong>);
    else if (m[4]) out.push(<em key={key}>{m[4]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}

/** Plain text (for structured data): strips the inline markup. */
export function plainText(text: string): string {
  return text.replace(TOKEN, (_, a, _h, b, c) => a ?? b ?? c ?? "");
}
