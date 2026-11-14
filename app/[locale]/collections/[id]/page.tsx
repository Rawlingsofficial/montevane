import type { Metadata } from "next";

import { getCollections } from "@/lib/data/catalog";
import { resolveLocale } from "@/lib/i18n/server";

import { CollectionListing, collectionMetadata } from "./listing";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCollections()).map((c) => ({ id: c.slug }));
}

type Props = PageProps<"/[locale]/collections/[id]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return collectionMetadata(locale, (await params).id, 1);
}

export default async function CollectionPage({ params }: Props) {
  const locale = await resolveLocale(params);
  return <CollectionListing locale={locale} id={(await params).id} page={1} />;
}
