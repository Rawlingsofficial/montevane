// Category-specific product attributes. Values are free text; the options are
// suggestions so spelling stays consistent across products (and filters later).

export type Facet = { id: string; label: string; options: string[] };

export const FACETS: Record<string, Facet[]> = {
  watches: [
    { id: "dial_colour", label: "Dial colour", options: ["Black", "White", "Silver", "Blue", "Green", "Champagne", "Grey", "Brown", "Meteorite", "Mother of pearl"] },
    { id: "bracelet_style", label: "Bracelet style", options: ["Oyster", "Jubilee", "President", "Oysterflex", "Integrated", "Leather strap", "Rubber strap"] },
    { id: "case_finish", label: "Case finish", options: ["Polished", "Brushed", "Brushed & polished", "Gem-set"] },
    { id: "movement_type", label: "Movement type", options: ["Automatic", "Manual winding", "Quartz"] },
    { id: "case_size", label: "Case size", options: ["36 mm", "40 mm", "41 mm", "42 mm"] },
    { id: "case_material", label: "Case material", options: ["Oystersteel", "Stainless steel", "Yellow gold", "White gold", "Rose gold", "Two-tone", "Platinum", "Titanium"] },
  ],
  bags: [
    { id: "leather", label: "Leather / material", options: ["Togo", "Epsom", "Clemence", "Swift", "Box calf", "Caviar", "Lambskin", "Canvas", "Exotic"] },
    { id: "hardware", label: "Hardware", options: ["Gold", "Palladium", "Rose gold", "Ruthenium", "Brushed gold"] },
    { id: "size", label: "Size", options: ["Mini", "Small", "Medium", "Large", "25", "28", "30", "35"] },
    { id: "closure", label: "Closure", options: ["Turn-lock", "Clasp", "Zip", "Magnetic", "Open top"] },
  ],
  jewelry: [
    { id: "metal", label: "Metal", options: ["Yellow gold", "White gold", "Rose gold", "Platinum", "Sterling silver"] },
    { id: "stone", label: "Stones", options: ["None", "Diamond", "Mother of pearl", "Onyx", "Malachite", "Carnelian", "Sapphire", "Emerald", "Ruby"] },
    { id: "piece_type", label: "Piece type", options: ["Bracelet", "Necklace", "Ring", "Earrings", "Pendant"] },
    { id: "size", label: "Size", options: ["XS", "S", "M", "L", "16 cm", "17 cm", "18 cm"] },
  ],
};

export function facetsFor(categorySlug: string): Facet[] {
  return FACETS[categorySlug] ?? [];
}
