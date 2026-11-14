import type { Metadata } from "next";

import { getBrands } from "@/lib/data/catalog";
import { resolveLocale } from "@/lib/i18n/server";

import { BrandListing, brandMetadata } from "./listing";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getBrands()).map((b) => ({ brand: b.slug }));
}

type Props = PageProps<"/[locale]/brands/[brand]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return brandMetadata(locale, (await params).brand, 1);
}

export default async function BrandPage({ params }: Props) {
  const locale = await resolveLocale(params);
  return <BrandListing locale={locale} slug={(await params).brand} page={1} />;
}
