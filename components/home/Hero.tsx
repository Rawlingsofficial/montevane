import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/images";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).hero;

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <AssetImage base="hero_1" alt="" priority sizes="100vw" className="absolute inset-0" />
      {/* The photo stays underneath as the LCP image and the fallback while the clip loads. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={asset("hero_1")}
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover motion-reduce:hidden"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="fade-up text-xs font-medium tracking-[0.3em] text-white/90 uppercase">{t.eyebrow}</p>
        {/* No entrance animation on the h1: it is the largest paint, and fading it in delays LCP. */}
        <h1 className="mt-4 max-w-3xl font-heading text-5xl font-extralight text-white sm:text-6xl lg:text-7xl">
          {t.title}
        </h1>
        <p className="fade-up mt-6 max-w-md text-sm font-light text-white/85" style={{ animationDelay: "0.3s" }}>
          {t.body}
        </p>
        <Link
          href={localePath(locale, "/products")}
          className="fade-up mt-10 inline-block bg-white px-10 py-4 text-xs font-medium tracking-[0.2em] text-black uppercase transition-colors hover:bg-[var(--gold)]"
          style={{ animationDelay: "0.45s" }}
        >
          {t.cta}
        </Link>
      </div>
    </section>
  );
}
