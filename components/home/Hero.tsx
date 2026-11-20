import Link from "next/link";

import { GalleryImage } from "@/components/common/GalleryImage";
import { gallery } from "@/lib/catalog/gallery";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

const ON_VIEW: Record<Locale, string> = { en: "On view", de: "Ausgestellt", uz: "Ko'rgazmada" };

/**
 * The home page opens in a quiet gallery: three real pieces from stock — a
 * Birkin, a Kelly and a watch — on stone plinths (scripts/compose-gallery.mjs).
 * Text sits on the empty wall: left on desktop, on top on phones. A placard
 * names the pieces on view and links to each one.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).hero;
  const scene = gallery("home-hero");

  return (
    <section className="relative mt-16 h-[calc(100svh-4rem)] min-h-[600px] w-full overflow-hidden bg-[#f5f0e9] lg:mt-[100px] lg:h-[calc(100svh-100px)] lg:max-h-[1000px] lg:min-h-[620px]">
      {scene && (
        <GalleryImage
          scene={scene}
          kind="hero"
          priority
          className="gallery-drift absolute inset-0"
          imgClassName="object-[50%_100%] lg:object-[100%_70%]"
        />
      )}

      <div className="relative mx-auto flex h-full max-w-7xl flex-col px-6 pt-10 lg:justify-center lg:px-10 lg:pt-0">
        <div className="max-w-xl text-center lg:text-left">
          {/* No entrance animation on the h1: it is the largest paint, and fading it in delays LCP. */}
          <h1 className="font-heading text-4xl leading-[1.05] font-extralight sm:text-6xl lg:text-7xl">
            {t.title}
            <span className="mt-3 block text-2xl text-foreground/75 sm:text-3xl lg:text-4xl">{t.titleLine2}</span>
          </h1>
          <p className="fade-up mx-auto mt-5 max-w-sm text-sm font-light text-muted-foreground sm:text-base lg:mx-0" style={{ animationDelay: "0.3s" }}>
            {t.body}
          </p>
          <Link
            href={localePath(locale, "/products")}
            className="fade-up mt-8 inline-flex min-h-12 items-center bg-foreground px-10 text-xs font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-[var(--gold)] hover:text-foreground"
            style={{ animationDelay: "0.45s" }}
          >
            {t.cta}
          </Link>
        </div>
      </div>

      {scene && (
        <aside className="absolute right-6 bottom-6 hidden max-w-xs border-l border-[var(--gold)] pl-4 lg:right-10 lg:bottom-8 lg:block">
          <p className="text-[10px] font-medium tracking-[0.3em] text-[var(--gold)] uppercase">{ON_VIEW[locale]}</p>
          <ul className="mt-2 space-y-1">
            {scene.pieces.map((p) => (
              <li key={p.slug}>
                <Link href={localePath(locale, `/products/${p.slug}`)} className="line-clamp-1 text-xs text-foreground/70 hover:text-foreground hover:underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  );
}
