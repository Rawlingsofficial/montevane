import Link from "next/link";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { PageHero } from "@/components/common/PageHero";
import { getBrands } from "@/lib/data/catalog";
import { getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { brandBanner } from "@/lib/images";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/brands">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({ locale, path: "/brands", title: t.brandsTitle, description: t.brandsDescription });
}

export default async function BrandsPage({ params }: PageProps<"/[locale]/brands">) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const brands = await getBrands();

  return (
    <>
      <PageHero eyebrow={t.listing.brandsEyebrow} title={t.listing.brandsHeading} description={t.listing.brandsBody} image="hero_2" priority />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-border px-6 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        {brands.map((brand) => (
          <Link key={brand.slug} href={localePath(locale, `/brands/${brand.slug}`)} className="group relative block overflow-hidden bg-background">
            <AssetImage
              base={brandBanner(brand.slug)}
              alt=""
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="p-6">
              <h2 className="font-heading text-xl font-light">{brand.name}</h2>
              {brand.description && <p className="mt-1 text-sm text-muted-foreground">{brand.description}</p>}
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
