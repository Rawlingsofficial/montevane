import Link from "next/link";

import { LoopVideo } from "@/components/common/LoopVideo";
import { FILMS, INSPECTION } from "@/lib/catalog/ours";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

/** Our own films and photos from Miami: real stock, handled with gloves. */
export function InOurHands({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).ours;
  const stills = [INSPECTION[0], INSPECTION[1]];

  return (
    <section className="bg-[#111111] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.eyebrow}</p>
          <h2 className="mt-4 max-w-sm text-3xl font-light sm:text-4xl">{t.title}</h2>
          <p className="mt-5 max-w-sm text-sm text-white/70">{t.body}</p>
          <Link
            href={localePath(locale, "/authenticity")}
            className="mt-8 inline-block border-b border-[var(--gold)] pb-1 text-xs font-medium tracking-[0.15em] text-[var(--gold)] uppercase"
          >
            {t.cta}
          </Link>
        </div>

        <ul className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
          {FILMS.map((f) => (
            <li key={f.src} className="relative aspect-[3/4] w-[62%] shrink-0 snap-start overflow-hidden bg-black sm:w-auto">
              <LoopVideo src={f.src} poster={f.poster} label={t[f.label]} />
            </li>
          ))}
          {stills.map((p) => (
            <li key={p.src} className="relative aspect-[3/4] w-[62%] shrink-0 snap-start overflow-hidden bg-black sm:w-auto">
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-compressed, served from the CDN as-is */}
              <img src={p.src} alt={p.caption ? t.captions[p.caption] : ""} width={p.width} height={p.height} loading="lazy" decoding="async" className="size-full object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
