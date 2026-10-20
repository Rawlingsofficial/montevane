import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

const IMAGES: Record<string, string> = { bags: "product_45deg", watches: "lifestyle_3", jewelry: "lifestyle_2" };

export function ShopByCategory({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.home.categoriesEyebrow}</p>
        <h2 className="mt-3 text-4xl">{t.home.categoriesTitle}</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {Object.entries(t.categories).map(([slug, c]) => (
          <Link key={slug} href={localePath(locale, `/shop/${slug}`)} className="group relative block overflow-hidden">
            <AssetImage
              base={IMAGES[slug] ?? "feature_card_1"}
              alt={c.title}
              sizes="(max-width: 640px) 100vw, 33vw"
              className="aspect-[3/4] transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-8">
              <h3 className="font-heading text-2xl font-light text-white">{c.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
