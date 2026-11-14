import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { parsePage } from "@/components/common/Pagination";
import { resolveLocale } from "@/lib/i18n/server";

import { ProductsListing, productsMetadata } from "../../listing";

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

type Props = PageProps<"/[locale]/products/page/[n]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const page = parsePage((await params).n);
  return page ? productsMetadata(locale, page) : {};
}

export default async function ProductsPageN({ params }: Props) {
  const locale = await resolveLocale(params);
  const page = parsePage((await params).n);
  if (!page) notFound();
  return <ProductsListing locale={locale} page={page} />;
}
