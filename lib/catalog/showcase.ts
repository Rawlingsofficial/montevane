import manifest from "@/lib/catalog/showcase.json";

// Home page tile images composed from real products by
// scripts/compose-showcase.mjs (re-run it when stock changes a lot).

type Slot = { slug: string; name: string }[];
const SLOTS = manifest as Record<string, Slot>;

/** Composite image and alt text for a slot such as "category-watches", or null if none was built. */
export function showcase(id: string): { src: string; alt: string } | null {
  const pieces = SLOTS[id];
  if (!pieces?.length) return null;
  return { src: `/images/showcase/${id}.webp`, alt: pieces.map((p) => p.name).join(", ") };
}
