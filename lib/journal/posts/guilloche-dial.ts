import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "guilloche-dial",
  title: "Guilloché: The Art Behind the Dial",
  metaTitle: "Guilloché Dials Explained: Clous de Paris, Tapisserie & More",
  description: "What guilloché is: rose and straight-line engines, Clous de Paris, Tapisserie on the Royal Oak, and hand-cut vs stamped guilloché dials.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-06-28",
  keyword: "guilloche dial",
  keywords: ["tapisserie dial", "clous de paris", "hand guilloche", "engine turned dial", "guilloche watch"],
  image: "gallery/cat-watches",
  cover: "patek-philippe-calatrava-5115g-001-18k-white-gold-white-dial-35-mm",
  picks: { brand: "patek-philippe", query: "calatrava", sort: "price_asc", limit: 8 },
  intro: [
    "Look closely at some dials and you'll see a fine, repeating pattern that catches the light as the watch moves. That's guilloché – one of the oldest decorative arts in watchmaking.",
  ],
  sections: [
    {
      id: "what",
      heading: "What guilloché is",
      blocks: [
        "Traditional guilloché is cut into the metal on hand-operated machines called rose engines (for curved patterns) and straight-line engines. The artisan guides the cutter, one line at a time; a single dial can take many hours. The result plays with light in a way printed or stamped patterns can't fully match.",
      ],
    },
    {
      id: "patterns",
      heading: "Patterns you'll recognise",
      blocks: [
        {
          table: {
            head: ["Pattern", "Look", "Where you'll see it"],
            rows: [
              ["Clous de Paris", "Tiny pyramids, like hobnails", "Patek Philippe Calatrava, Breguet"],
              ["Tapisserie", "A grid of small squares", "Audemars Piguet Royal Oak (Petite and Grande Tapisserie)"],
              ["Sunburst / soleil", "Rays from the centre", "Many dials, often brushed rather than cut"],
              ["Barleycorn, waves, basket weave", "Classical motifs", "Independent makers and high horology"],
            ],
          },
        },
      ],
    },
    {
      id: "hand",
      heading: "Hand-cut or stamped?",
      blocks: [
        "Many modern dials have guilloché-style patterns that are stamped or machined – which is how houses make them consistently in volume. Hand-cut guilloché has slightly deeper, crisper lines and is mostly found at independents such as Kari Voutilainen – see [independent watchmakers](/journal/independent-watchmakers). Neither is 'fake'; they're different crafts.",
      ],
    },
  ],
  faq: [
    { q: "What is a guilloché dial?", a: "A dial decorated with a precise, repeating engraved pattern, traditionally cut on a rose or straight-line engine." },
    { q: "Is the Royal Oak dial guilloché?", a: "The Tapisserie pattern belongs to the guilloché tradition; today it is produced on machines designed for the purpose." },
    { q: "What is Clous de Paris?", a: "A pattern of tiny pyramids, used on Patek Philippe Calatrava bezels and dials and by Breguet." },
  ],
  sources: [
    { label: "Patek Philippe – Calatrava collection", url: "https://www.patek.com/en/collection/calatrava" },
    { label: "Audemars Piguet – Royal Oak collection", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html" },
  ],
  shop: [
    { label: "Shop watches", path: "/shop/watches" },
  ],
};
