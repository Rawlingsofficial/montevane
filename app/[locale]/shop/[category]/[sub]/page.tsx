import type { Metadata } from "next";

import { getCategories, getSubcategories } from "@/lib/data/catalog";
import { resolveLocale } from "@/lib/i18n/server";

import { CategoryListing, categoryMetadata } from "../listing";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const categories = await getCategories();
  const subs = await Promise.all(categories.map(async (c) => (await getSubcategories(c.slug)).map((s) => ({ category: c.slug, sub: s.slug }))));
  return subs.flat();
}

type Props = PageProps<"/[locale]/shop/[category]/[sub]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { category, sub } = await params;
  return categoryMetadata(locale, category, 1, sub);
}

export default async function SubcategoryPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { category, sub } = await params;
  return <CategoryListing locale={locale} category={category} sub={sub} page={1} />;
}
