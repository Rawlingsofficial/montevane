import type { SpecRow } from "@/lib/db/schema";

// Product spec rows grouped for the product page: Overview / Case & Bezel /
// Dial / Bracelet / Movement / Stones & Metal; anything else lands in Details.

export const SPEC_GROUPS = ["overview", "case", "dial", "bracelet", "movement", "stones", "details"] as const;
export type SpecGroup = (typeof SPEC_GROUPS)[number];

const GROUP_OF: Record<string, SpecGroup> = {
  Model: "overview",
  Reference: "overview",
  Year: "overview",
  Condition: "overview",
  Gender: "overview",
  Box: "overview",
  Papers: "overview",
  "Case Size": "case",
  "Case Thickness": "case",
  "Case Material": "case",
  "Bezel Material": "case",
  "Bezel Type": "case",
  Crystal: "case",
  "Water Resistance": "case",
  "Dial Color": "dial",
  "Dial Markers": "dial",
  "Bracelet/Strap": "bracelet",
  "Clasp Type": "bracelet",
  "Clasp Material": "bracelet",
  Movement: "movement",
  Functions: "movement",
  Metal: "stones",
  "Second Metal": "stones",
  "Metal Purity": "stones",
  "Piece Weight": "stones",
  "Total Carat Weight": "stones",
  "Center Stone": "stones",
  "Stone Color": "stones",
  "Stone Types": "stones",
  "Stone Treatment": "stones",
  "Setting Style": "stones",
  "Side Stones": "stones",
  Size: "stones",
  "Chain Length": "stones",
  Width: "stones",
};

const groupOf = (label: string): SpecGroup => GROUP_OF[label] ?? (/^Stone \d/.test(label) ? "stones" : "details");

export function groupSpecs(rows: SpecRow[]): { group: SpecGroup; rows: SpecRow[] }[] {
  const by = new Map<SpecGroup, SpecRow[]>();
  for (const row of rows) {
    const g = groupOf(row.label);
    by.set(g, [...(by.get(g) ?? []), row]);
  }
  return SPEC_GROUPS.filter((g) => by.has(g)).map((g) => ({ group: g, rows: by.get(g)! }));
}
