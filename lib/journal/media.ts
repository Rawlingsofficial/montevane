import "server-only";

import { cache } from "react";

import { getProductPhotos, getProducts, type StoreProduct } from "@/lib/data/catalog";
import type { Locale } from "@/lib/i18n";
import { asset } from "@/lib/images";
import type { Picks, Post } from "@/lib/journal/types";

export type Cover = { url: string; alt: string; product: boolean };

/** Live, buyable products for a picks spec. */
export const loadPicks = cache(async (picks: Picks, locale: Locale, limit?: number): Promise<StoreProduct[]> =>
  getProducts(
    {
      brand: picks.brand,
      category: picks.category,
      query: picks.query,
      piece: picks.piece,
      minPrice: picks.min,
      maxPrice: picks.max,
      available: true,
      listing: { filters: {}, sort: picks.sort ?? "price_desc" },
      limit: limit ?? picks.limit ?? 4,
    },
    locale
  )
);

/** Cover photo per post: its pinned product, else its first pick, else the editorial asset. */
export async function postCovers(posts: Post[], locale: Locale): Promise<Record<string, Cover>> {
  const pinned = await getProductPhotos(posts.flatMap((p) => (p.cover ? [p.cover] : [])));
  const entries = await Promise.all(
    posts.map(async (post): Promise<[string, Cover]> => {
      const pin = post.cover ? pinned[post.cover] : undefined;
      if (pin) return [post.slug, { ...pin, product: true }];
      const first = post.picks ? (await loadPicks(post.picks, locale, 1))[0] : undefined;
      if (first) return [post.slug, { url: first.images[0].url, alt: first.images[0].alt, product: true }];
      return [post.slug, { url: asset(post.image), alt: "", product: false }];
    })
  );
  return Object.fromEntries(entries);
}
