import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { parsePage } from "@/components/common/Pagination";
import { resolveLocale } from "@/lib/i18n/server";

import { CategoryListing, categoryMetadata } from "../../../../listing";

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

type Props = PageProps<"/[locale]/shop/[category]/[sub]/[facet]/page/[n]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { category, sub, facet, n } = await params;
  const page = parsePage(n);
  return page ? categoryMetadata(locale, category, page, `${sub}/${facet}`) : {};
}

export default async function BrandConditionPageN({ params }: Props) {
  const locale = await resolveLocale(params);
  const { category, sub, facet, n } = await params;
  const page = parsePage(n);
  if (!page) notFound();
  return <CategoryListing locale={locale} category={category} sub={`${sub}/${facet}`} page={page} />;
}
