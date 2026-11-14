import type { Metadata } from "next";

import { resolveLocale } from "@/lib/i18n/server";

import { ProductsListing, productsMetadata } from "./listing";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">): Promise<Metadata> {
  return productsMetadata(await resolveLocale(params), 1);
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  return <ProductsListing locale={await resolveLocale(params)} page={1} />;
}
