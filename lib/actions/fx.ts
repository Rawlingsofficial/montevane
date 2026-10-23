"use server";

import { requireAdmin } from "@/lib/auth";

export type FxRates = { GBP: number; EUR: number; date: string | null };

// Used when the rate service can't be reached; close enough to edit by hand.
const FALLBACK: FxRates = { GBP: 0.75, EUR: 0.86, date: null };

/** Today's USD → GBP/EUR reference rates (European Central Bank, via Frankfurter). */
export async function getFxRates(): Promise<FxRates> {
  await requireAdmin();
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=GBP,EUR", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return FALLBACK;
    const data = (await res.json()) as { date?: string; rates?: { GBP?: number; EUR?: number } };
    if (!data.rates?.GBP || !data.rates?.EUR) return FALLBACK;
    return { GBP: data.rates.GBP, EUR: data.rates.EUR, date: data.date ?? null };
  } catch {
    return FALLBACK;
  }
}
