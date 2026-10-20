import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { SourcingCta } from "@/components/common/SourcingCta";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getBrands, getContactChannels, getProducts } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { brandBanner } from "@/lib/images";
import { pageMetadata } from "@/lib/seo/metadata";
import { MODELS } from "@/lib/seo/models";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getBrands()).map((b) => ({ brand: b.slug }));
}

type Props = PageProps<"/[locale]/brands/[brand]">;

async function findBrand(slug: string) {
  return (await getBrands()).find((b) => b.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const brand = await findBrand((await params).brand);
  if (!brand) return {};
  const t = getDictionary(locale).meta;
  return pageMetadata({
    locale,
    path: `/brands/${brand.slug}`,
    title: fmt(t.brandTitle, { brand: brand.name }),
    description: fmt(t.brandDescription, { brand: brand.name }),
  });
}

export default async function BrandPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const brand = await findBrand((await params).brand);
  if (!brand) notFound();

  const t = getDictionary(locale);
  const [products, channels] = await Promise.all([getProducts({ brand: brand.slug }, locale), getContactChannels()]);
  const models = MODELS.filter((m) => m.brandSlug === brand.slug);

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
            { name: brand.name, path: `/brands/${brand.slug}` },
          ]}
        />

        {models.length > 0 && (
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
          {products.length > 0 ? (
            <ProductGrid products={products} channels={channels} locale={locale} />
          ) : (
            <p className="text-sm text-muted-foreground">{fmt(t.listing.brandEmpty, { brand: brand.name })}</p>
          )}
        </section>

        <SourcingCta locale={locale} />
      </div>
    </>
  );
}
