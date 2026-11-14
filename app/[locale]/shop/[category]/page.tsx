import type { Metadata } from "next";

import { getCategories } from "@/lib/data/catalog";
import { resolveLocale } from "@/lib/i18n/server";

import { CategoryListing, categoryMetadata } from "./listing";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ category: c.slug }));
}

type Props = PageProps<"/[locale]/shop/[category]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return categoryMetadata(locale, (await params).category, 1);
}

export default async function CategoryPage({ params }: Props) {
  const locale = await resolveLocale(params);
  return <CategoryListing locale={locale} category={(await params).category} page={1} />;
}
