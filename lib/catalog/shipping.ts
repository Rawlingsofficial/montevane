// Shipping, arranged by us end to end: insured express, tracked, signature on
// delivery. Complimentary over $5,000; secure courier over $100,000. Duties and
// import taxes are paid by the buyer and confirmed before payment.

export const FREE_SHIPPING_FROM = 5_000;
export const SECURE_COURIER_FROM = 100_000;

export type Region = "us" | "europe" | "world";
export type Rates = Record<Region, number>;

/** USD rates below the free threshold, by order value (upper bound, exclusive). */
const PAID_RATES: [below: number, rates: Rates][] = [
  [2_000, { us: 45, europe: 55, world: 85 }],
  [FREE_SHIPPING_FROM, { us: 75, europe: 95, world: 145 }],
];

/** Shipping for a piece at this USD price; all zero when complimentary. */
export function shippingRates(priceUsd: number): Rates {
  const tier = PAID_RATES.find(([below]) => priceUsd < below);
  return tier ? tier[1] : { us: 0, europe: 0, world: 0 };
}

/** Countries per region, for structured data (Google needs explicit countries). */
export const REGION_COUNTRIES: Record<Region, string[]> = {
  us: ["US"],
  europe: ["GB", "IE", "DE", "AT", "CH", "FR", "MC", "IT", "ES", "PT", "NL", "BE", "LU", "SE", "DK", "NO", "FI", "PL", "CZ", "GR"],
  world: ["UZ", "KZ", "AE", "SA", "QA", "KW", "TR", "IL", "CA", "AU", "NZ", "JP", "SG", "HK", "KR"],
};
