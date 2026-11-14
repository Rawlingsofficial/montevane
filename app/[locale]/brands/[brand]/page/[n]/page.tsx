import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { parsePage } from "@/components/common/Pagination";
import { resolveLocale } from "@/lib/i18n/server";

import { BrandListing, brandMetadata } from "../../listing";

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

type Props = PageProps<"/[locale]/brands/[brand]/page/[n]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { brand, n } = await params;
  const page = parsePage(n);
  return page ? brandMetadata(locale, brand, page) : {};
}

export default async function BrandPageN({ params }: Props) {
  const locale = await resolveLocale(params);
  const { brand, n } = await params;
  const page = parsePage(n);
  if (!page) notFound();
  return <BrandListing locale={locale} slug={brand} page={page} />;
}
