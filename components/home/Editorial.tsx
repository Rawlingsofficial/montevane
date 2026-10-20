import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function Editorial({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home;

  return (
    <section className="grid lg:grid-cols-2">
      <AssetImage
        base="editorial_setup"
        alt=""
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="aspect-[4/3] lg:aspect-auto lg:h-full"
      />
      <div className="flex flex-col items-start justify-center bg-[#111111] px-8 py-20 text-white sm:px-16 lg:py-0">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.editorialEyebrow}</p>
        <h2 className="mt-4 max-w-md text-3xl font-light sm:text-4xl">{t.editorialTitle}</h2>
        <p className="mt-5 max-w-sm text-sm text-white/70">{t.editorialBody}</p>
        <Link
          href={localePath(locale, "/journal")}
          className="mt-8 border-b border-[var(--gold)] pb-1 text-xs font-medium tracking-[0.15em] text-[var(--gold)] uppercase"
        >
          {t.editorialCta}
        </Link>
      </div>
    </section>
  );
}
