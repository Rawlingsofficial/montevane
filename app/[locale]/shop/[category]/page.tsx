import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { SourcingCta } from "@/components/common/SourcingCta";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCategories, getContactChannels, getProducts } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { MODELS } from "@/lib/seo/models";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ category: c.slug }));
}

type Props = PageProps<"/[locale]/shop/[category]">;

const HERO: Record<string, string> = { bags: "hero_2", watches: "hero_4", jewelry: "lifestyle_2" };
const VIDEO: Record<string, string> = { watches: "/videos/hero.mp4", jewelry: "/videos/jewelry.mp4" };

/** Category copy from the dictionary, or a generic version for categories added in admin. */
async function categoryCopy(slug: string, locale: Locale) {
  const t = getDictionary(locale);
  const known = t.categories[slug];
  if (known) return known;
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) return null;
  const title = fmt(t.meta.brandTitle, { brand: category.name });
  return { name: category.name, title: category.name, metaTitle: title, metaDescription: fmt(t.meta.brandDescription, { brand: category.name }), intro: "" };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { category } = await params;
  const copy = await categoryCopy(category, locale);
  if (!copy) return {};
  return pageMetadata({ locale, path: `/shop/${category}`, title: copy.metaTitle, description: copy.metaDescription });
}

export default async function CategoryPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { category } = await params;
  const copy = await categoryCopy(category, locale);
  if (!copy) notFound();

  const t = getDictionary(locale);
  const [products, channels] = await Promise.all([getProducts({ category }, locale), getContactChannels()]);
  const models = MODELS.filter((m) => m.category === category);

  return (
    <>
      <PageHero eyebrow={t.listing.eyebrow} title={copy.title} image={HERO[category] ?? "hero_4"} video={VIDEO[category]} priority />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t.nav.home, path: "/" },
            { name: copy.name, path: `/shop/${category}` },
          ]}
        />
        {copy.intro && <p className="max-w-3xl text-base leading-relaxed text-foreground/80">{copy.intro}</p>}

        {models.length > 0 && (
          <nav aria-label={copy.name} className="mt-8 flex flex-wrap gap-2">
            {models.map((m) => (
              <Link
                key={m.slug}
                href={localePath(locale, `/models/${m.slug}`)}
                className="border border-border px-3 py-2 text-xs tracking-[0.1em] uppercase transition-colors hover:border-foreground"
              >
                {m.brand} {m.model}
              </Link>
            ))}
          </nav>
        )}

        <section className="mt-12">
          <h2 className="mb-6 text-xs tracking-[0.1em] text-muted-foreground uppercase">
            {products.length === 1 ? t.listing.piece : fmt(t.listing.pieces, { n: products.length })}
          </h2>
          {products.length > 0 ? (
            <ProductGrid products={products} channels={channels} locale={locale} />
          ) : (
            <p className="text-sm text-muted-foreground">{t.listing.empty}</p>
          )}
        </section>

        <SourcingCta locale={locale} />
      </div>
    </>
  );
}
