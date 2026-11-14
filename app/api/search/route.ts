import { NextResponse, type NextRequest } from "next/server";

import { displayPrice } from "@/lib/catalog/pricing";
import { getProducts } from "@/lib/data/catalog";
import { isLocale, localePath, DEFAULT_LOCALE } from "@/lib/i18n/config";

// Instant suggestions for the header search box.
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim().slice(0, 80) ?? "";
  const lang = request.nextUrl.searchParams.get("locale") ?? DEFAULT_LOCALE;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  if (q.length < 2) return NextResponse.json({ results: [] });

  const products = await getProducts({ query: q, limit: 6 }, locale);
  const results = products.map((p) => {
    const price = displayPrice(p, locale);
    return {
      title: p.title,
      href: localePath(locale, `/products/${p.slug}`),
      image: p.images[0]?.url ?? null,
      price: new Intl.NumberFormat(locale, { style: "currency", currency: price.currency, maximumFractionDigits: 0 }).format(price.amount),
    };
  });
  return NextResponse.json({ results }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
