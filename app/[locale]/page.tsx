import type { Metadata } from "next";

import { BestSellers } from "@/components/home/BestSellers";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { Editorial } from "@/components/home/Editorial";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { WhyShopWithUs } from "@/components/home/WhyShopWithUs";
import { getDictionary } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({ locale, path: "/", title: t.homeTitle, description: t.homeDescription, absoluteTitle: true });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);

  return (
    <>
      <Hero locale={locale} />
      <ShopByCategory locale={locale} />
      <BestSellers locale={locale} />
      <BrandShowcase locale={locale} />
      <FeaturedCollections locale={locale} />
      <Editorial locale={locale} />
      <WhyShopWithUs locale={locale} />
      <Newsletter locale={locale} />
    </>
  );
}
