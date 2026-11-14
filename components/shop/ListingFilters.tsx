"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { FILTER_KEYS, SORTS, parseBand, queryString, type FilterKey, type ListingQuery, type Sort } from "@/lib/catalog/filters";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string; count: number };
export type FilterLabels = {
  title: string;
  sort: string;
  sorts: Record<string, string>;
  apply: string;
  clear: string;
  close: string;
  facets: Record<string, string>;
  under: string;
  over: string;
  values: Record<string, string>;
};

/**
 * Filter + sort bar for listing pages. Choices are drafted in the open panel and
 * applied together, so picking several values costs one navigation.
 */
export function ListingFilters({
  locale,
  basePath,
  options,
  query,
  hidden = [],
  labels,
}: {
  locale: string;
  /** Localised path of the unfiltered listing, e.g. "/de/shop/watches". */
  basePath: string;
  options: Partial<Record<FilterKey, Option[]>>;
  query: ListingQuery;
  /** Filters that make no sense here (brand on a brand page). */
  hidden?: FilterKey[];
  labels: FilterLabels;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<FilterKey | "sheet" | null>(null);
  const [draft, setDraft] = useState(query.filters);
  const bar = useRef<HTMLDivElement>(null);

  const keys = FILTER_KEYS.filter((k) => !hidden.includes(k) && ((options[k]?.length ?? 0) > 1 || query.filters[k]?.length));
  const usd = new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const label = (key: FilterKey, value: string, fallback: string) => {
    if (key === "price") {
      const band = parseBand(value);
      if (!band) return value;
      const [min, max] = band;
      if (min === 0 && max) return labels.under.replace("{n}", usd.format(max));
      if (max === null) return labels.over.replace("{n}", usd.format(min));
      return `${usd.format(min)} – ${usd.format(max)}`;
    }
    return labels.values[`${key}.${value}`] ?? fallback;
  };

  useEffect(() => {
    if (!open || open === "sheet") return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !bar.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const go = (next: ListingQuery) => {
    setOpen(null);
    router.push(basePath + queryString(next), { scroll: false });
  };
  const openPanel = (key: FilterKey | "sheet") => {
    setDraft(query.filters);
    setOpen((o) => (o === key ? null : key));
  };
  const toggle = (key: FilterKey, value: string) =>
    setDraft((d) => {
      const set = new Set(d[key] ?? []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...d, [key]: set.size ? [...set] : undefined };
    });
  const clean = (filters: ListingQuery["filters"]) => Object.fromEntries(Object.entries(filters).filter(([, v]) => v?.length));

  const checklist = (key: FilterKey) => (
    <ul className="max-h-72 space-y-0.5 overflow-y-auto pr-1">
      {(options[key] ?? []).map((o) => {
        const checked = draft[key]?.includes(o.value) ?? false;
        return (
          <li key={o.value}>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
              <input type="checkbox" checked={checked} onChange={() => toggle(key, o.value)} className="size-4 accent-[var(--foreground)]" />
              <span className="flex-1">{label(key, o.value, o.label)}</span>
              <span className="text-xs text-muted-foreground">{o.count}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );

  const active = keys.flatMap((k) => (query.filters[k] ?? []).map((v) => ({ key: k, value: v })));
  const optionLabel = (key: FilterKey, value: string) => label(key, value, options[key]?.find((o) => o.value === value)?.label ?? value);
  const sortSelect = (
    <label className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase">
      <span className="text-muted-foreground">{labels.sort}</span>
      <select
        value={query.sort}
        onChange={(e) => go({ ...query, sort: e.target.value as Sort })}
        className="min-h-11 border-0 bg-transparent pr-6 text-xs tracking-[0.1em] uppercase focus:ring-0"
      >
        {SORTS.map((s) => (
          <option key={s} value={s}>
            {labels.sorts[s]}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div ref={bar} className="mb-8">
      <div className="flex items-center justify-between gap-4 border-y border-border">
        {/* Desktop: one dropdown per filter */}
        <div className="hidden flex-wrap items-center gap-x-6 lg:flex">
          {keys.map((key) => (
            <div key={key} className="relative">
              <button
                type="button"
                aria-expanded={open === key}
                onClick={() => openPanel(key)}
                className="flex min-h-12 items-center gap-1.5 text-xs tracking-[0.1em] uppercase hover:text-[var(--gold)]"
              >
                {labels.facets[key]}
                {query.filters[key]?.length ? <span className="text-[var(--gold)]">({query.filters[key]!.length})</span> : null}
                <ChevronDown className={cn("size-3 transition-transform", open === key && "rotate-180")} />
              </button>
              {open === key && (
                <div className="absolute top-full left-0 z-30 mt-px w-72 border border-border bg-white p-4 shadow-lg">
                  {checklist(key)}
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <button type="button" onClick={() => setDraft({ ...draft, [key]: undefined })} className="min-h-11 text-xs tracking-[0.1em] text-muted-foreground uppercase hover:text-foreground">
                      {labels.clear}
                    </button>
                    <button type="button" onClick={() => go({ ...query, filters: clean(draft) })} className="min-h-11 bg-foreground px-5 text-xs tracking-[0.1em] text-white uppercase hover:bg-[var(--gold)]">
                      {labels.apply}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: one button opens the sheet */}
        <button type="button" onClick={() => openPanel("sheet")} className="flex min-h-12 items-center gap-2 text-xs tracking-[0.1em] uppercase lg:hidden">
          <SlidersHorizontal className="size-4" strokeWidth={1.5} />
          {labels.title}
          {active.length > 0 && <span className="text-[var(--gold)]">({active.length})</span>}
        </button>

        {sortSelect}
      </div>

      {active.length > 0 && (
        <ul className="mt-4 flex flex-wrap items-center gap-2">
          {active.map(({ key, value }) => (
            <li key={`${key}:${value}`}>
              <button
                type="button"
                onClick={() => go({ ...query, filters: clean({ ...query.filters, [key]: query.filters[key]!.filter((v) => v !== value) }) })}
                className="flex min-h-9 items-center gap-1.5 border border-border px-3 text-xs hover:border-foreground"
              >
                {optionLabel(key, value)}
                <X className="size-3" aria-hidden="true" />
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={() => go({ ...query, filters: {} })} className="min-h-9 px-2 text-xs tracking-[0.1em] uppercase underline underline-offset-4">
              {labels.clear}
            </button>
          </li>
        </ul>
      )}

      {open === "sheet" && (
        <div role="dialog" aria-modal="true" aria-label={labels.title} className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <p className="text-sm tracking-[0.1em] uppercase">{labels.title}</p>
            <button type="button" aria-label={labels.close} onClick={() => setOpen(null)} className="flex size-11 items-center justify-center">
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 divide-y divide-border overflow-y-auto px-6">
            {keys.map((key) => (
              <details key={key} open={Boolean(draft[key]?.length)} className="group py-1">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-sm tracking-[0.1em] uppercase">
                  {labels.facets[key]}
                  <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pb-3">{checklist(key)}</div>
              </details>
            ))}
          </div>
          <div className="flex gap-3 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button type="button" onClick={() => setDraft({})} className="min-h-12 flex-1 border border-border text-xs tracking-[0.1em] uppercase">
              {labels.clear}
            </button>
            <button type="button" onClick={() => go({ ...query, filters: clean(draft) })} className="min-h-12 flex-[2] bg-foreground text-xs tracking-[0.1em] text-white uppercase">
              {labels.apply}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
