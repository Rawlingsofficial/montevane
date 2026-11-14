import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { parsePage } from "@/components/common/Pagination";
import { resolveLocale } from "@/lib/i18n/server";

import { CollectionListing, collectionMetadata } from "../../listing";

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

type Props = PageProps<"/[locale]/collections/[id]/page/[n]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { id, n } = await params;
  const page = parsePage(n);
  return page ? collectionMetadata(locale, id, page) : {};
}

export default async function CollectionPageN({ params }: Props) {
  const locale = await resolveLocale(params);
  const { id, n } = await params;
  const page = parsePage(n);
  if (!page) notFound();
  return <CollectionListing locale={locale} id={id} page={page} />;
}
