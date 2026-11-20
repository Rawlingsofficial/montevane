import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { parseListingQuery } from "@/lib/catalog/filters";
import { resolveLocale } from "@/lib/i18n/server";

import { CategoryListing, categoryMetadata } from "../shop/[category]/listing";

// Filtered / sorted shop listings. The proxy rewrites /shop/<category>[/<sub>][/page/<n>]?filters
// here, so the plain listings stay static. Never indexed (noindex,follow).

type Props = PageProps<"/[locale]/browse">;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

async function resolve({ params, searchParams }: Props) {
  const locale = await resolveLocale(params);
  const sp = await searchParams;
  const m = /^\/shop\/([a-z0-9-]+)(?:\/([a-z0-9-]+(?:\/[a-z0-9-]+)?))?$/.exec(one(sp.scope));
  if (!m) return null;
  const page = Number(one(sp.page)) || 1;
  return { locale, category: m[1], sub: m[2], page: page >= 1 ? Math.floor(page) : 1, query: parseListingQuery(sp) };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const r = await resolve(props);
  return r ? categoryMetadata(r.locale, r.category, r.page, r.sub, true) : {};
}

export default async function BrowsePage(props: Props) {
  const r = await resolve(props);
  if (!r) notFound();
  return <CategoryListing locale={r.locale} category={r.category} sub={r.sub} page={r.page} query={r.query} />;
}
