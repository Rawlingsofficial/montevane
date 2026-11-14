// Listing filters and sort, shared by the server (queries) and the filter bar.
// Filtered URLs (/shop/watches/rolex?model=Daytona) are served by the dynamic
// /[locale]/browse route via the proxy and are noindex,follow.

export const FILTER_KEYS = ["brand", "type", "model", "price", "size", "material", "color", "condition", "availability"] as const;
export type FilterKey = (typeof FILTER_KEYS)[number];
export const SORTS = ["newest", "price_asc", "price_desc"] as const;
export type Sort = (typeof SORTS)[number];

export type ListingQuery = { filters: Partial<Record<FilterKey, string[]>>; sort: Sort };
export const EMPTY_QUERY: ListingQuery = { filters: {}, sort: "newest" };

/** USD price bands, as "min-max" ("250000-" = and above). */
export const PRICE_BANDS = ["0-10000", "10000-25000", "25000-50000", "50000-100000", "100000-250000", "250000-"] as const;

export function parseBand(band: string): [number, number | null] | null {
  const m = /^(\d+)-(\d*)$/.exec(band);
  return m ? [Number(m[1]), m[2] ? Number(m[2]) : null] : null;
}

type Params = Record<string, string | string[] | undefined>;

export function parseListingQuery(params: Params): ListingQuery {
  const filters: ListingQuery["filters"] = {};
  for (const key of FILTER_KEYS) {
    const raw = params[key];
    const values = (Array.isArray(raw) ? raw : raw ? [raw] : []).flatMap((v) => v.split("|")).map((v) => v.trim()).filter(Boolean).slice(0, 20);
    if (values.length) filters[key] = values;
  }
  const sort = SORTS.find((s) => s === params.sort) ?? "newest";
  return { filters, sort };
}

export function hasQuery(q: ListingQuery): boolean {
  return q.sort !== "newest" || Object.keys(q.filters).length > 0;
}

/** "?brand=rolex&sort=price_asc" (empty string when nothing is set). */
export function queryString(q: ListingQuery): string {
  const sp = new URLSearchParams();
  for (const key of FILTER_KEYS) for (const v of q.filters[key] ?? []) sp.append(key, v);
  if (q.sort !== "newest") sp.set("sort", q.sort);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

/** Proxy helper: does this request need the filtered (dynamic) listing? */
export function isFilteredRequest(params: URLSearchParams): boolean {
  return params.has("sort") || FILTER_KEYS.some((k) => params.has(k));
}
