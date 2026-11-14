import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { Pagination, pagePath } from "@/components/common/Pagination";
import { SourcingCta } from "@/components/common/SourcingCta";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getBrands, getContactChannels, getLiveModels, getProductPage } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { brandBanner } from "@/lib/images";
import { pageMetadata } from "@/lib/seo/metadata";

// Shared by /brands/[brand] (page 1) and /brands/[brand]/page/[n].

async function findBrand(slug: string) {
  return (await getBrands()).find((b) => b.slug === slug) ?? null;
}

export async function brandMetadata(locale: Locale, slug: string, page: number): Promise<Metadata> {
  const brand = await findBrand(slug);
  if (!brand) return {};
  const t = getDictionary(locale);
  const suffix = page > 1 ? ` — ${fmt(t.listing.page, { n: page })}` : "";
  return pageMetadata({
    locale,
    path: pagePath(`/brands/${brand.slug}`, page),
    title: fmt(t.meta.brandTitle, { brand: brand.name }) + suffix,
    description: fmt(t.meta.brandDescription, { brand: brand.name }),
  });
}

export async function BrandListing({ locale, slug, page }: { locale: Locale; slug: string; page: number }) {
  const brand = await findBrand(slug);
  if (!brand) notFound();

  const t = getDictionary(locale);
  const [listing, channels] = await Promise.all([getProductPage({ brand: brand.slug }, page, locale), getContactChannels()]);
  if (!listing) notFound();
  const models = (await getLiveModels()).filter((m) => m.brandSlug === brand.slug);
  const base = `/brands/${brand.slug}`;

  return (
    <>
      <PageHero
        eyebrow={t.listing.brandEyebrow}
        title={brand.name}
        description={brand.description ?? undefined}
        image={brandBanner(brand.slug)}
        priority
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t.nav.home, path: "/" },
            { name: t.nav.brands, path: "/brands" },
            { name: brand.name, path: base },
            ...(page > 1 ? [{ name: fmt(t.listing.page, { n: page }), path: pagePath(base, page) }] : []),
          ]}
        />

        {models.length > 0 && page === 1 && (
          <nav aria-label={brand.name} className="mb-10 flex flex-wrap gap-2">
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

        <section>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl">{t.listing.brandAvailable}</h2>
            <Link href={localePath(locale, "/brands")} className="text-xs font-medium tracking-[0.15em] text-foreground/70 uppercase hover:text-[var(--gold)]">
              {t.listing.allBrands}
            </Link>
          </div>
          {listing.products.length > 0 ? (
            <ProductGrid products={listing.products} channels={channels} locale={locale} />
          ) : (
            <p className="text-sm text-muted-foreground">{fmt(t.listing.brandEmpty, { brand: brand.name })}</p>
          )}
          <Pagination locale={locale} base={base} page={listing.page} pages={listing.pages} />
        </section>

        <SourcingCta locale={locale} />
      </div>
    </>
  );
}
