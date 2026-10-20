import Link from "next/link";

import { getDictionary, localePath, type Locale } from "@/lib/i18n";

/** "Looking for a specific piece?" — turns empty or thin pages into leads. */
export function SourcingCta({ locale, body }: { locale: Locale; body?: string }) {
  const t = getDictionary(locale);
  return (
    <section className="mt-20 border border-border p-8 sm:p-12">
      <h2 className="text-2xl">{t.listing.sourceTitle}</h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">{body ?? t.listing.sourceBody}</p>
      <Link
        href={localePath(locale, "/contact")}
        className="mt-6 inline-block bg-primary px-8 py-3.5 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary"
      >
        {t.nav.contact}
      </Link>
    </section>
  );
}
