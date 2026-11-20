import type { Metadata } from "next";

import { resolveLocale } from "@/lib/i18n/server";

import { CategoryListing, categoryMetadata } from "../../listing";

// A watch brand's New / Pre-Owned page: /shop/watches/rolex/pre-owned.
export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

type Props = PageProps<"/[locale]/shop/[category]/[sub]/[facet]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { category, sub, facet } = await params;
  return categoryMetadata(locale, category, 1, `${sub}/${facet}`);
}

export default async function BrandConditionPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { category, sub, facet } = await params;
  return <CategoryListing locale={locale} category={category} sub={`${sub}/${facet}`} page={1} />;
}
