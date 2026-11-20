import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { SceneFill } from "@/components/common/GalleryImage";
import { gallery } from "@/lib/catalog/gallery";
import { PageHero } from "@/components/common/PageHero";
import { brandPath, brandRank } from "@/lib/catalog/taxonomy";
import { getBrandCovers, getBrands } from "@/lib/data/catalog";
import { getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { brandBanner } from "@/lib/images";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/brands">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({
    locale,
    path: "/brands",
    title: t.brandsTitle,
    description: t.brandsDescription,
  });
}

export default async function BrandsPage({
  params,
}: PageProps<"/[locale]/brands">) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const [brands, covers] = await Promise.all([getBrands(), getBrandCovers()]);

  return (
    <>
      <PageHero
        eyebrow={t.listing.brandsEyebrow}
        title={t.listing.brandsHeading}
        description={t.listing.brandsBody}
        image="houses"
        priority
      />

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {[...brands]
            .sort(
              (a, b) =>
                brandRank(a.slug) - brandRank(b.slug) ||
                a.name.localeCompare(b.name),
            )
            .map((brand) => (
              <Link
                key={brand.slug}
                href={localePath(
                  locale,
                  brandPath(brand.slug, brand.categories),
                )}
                className="group relative block overflow-hidden bg-background"
              >
                {covers[brand.slug] ? (
                  <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={covers[brand.slug].url}
                      alt={`${brand.name} ${covers[brand.slug].alt}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f0e9]">
                    {(() => {
                      const scene = gallery(brandBanner(brand.slug));
                      return (
                        scene && (
                          <SceneFill
                            scene={scene}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        )
                      );
                    })()}
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-heading text-xl font-light">
                    {brand.name}
                  </h2>
                  {brand.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {brand.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
