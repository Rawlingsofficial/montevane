import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "patek-5711-vs-5712",
  title: "Patek Philippe Nautilus 5711 vs 5712",
  metaTitle: "Patek Nautilus 5711 vs 5712: Time-Only vs Complications",
  description: "Patek Philippe Nautilus 5711 vs 5712: the time-and-date icon against the power reserve, moon phase and date model – dials, movements, wearability and price.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-05-07",
  keyword: "5711 vs 5712",
  keywords: ["5712 power reserve moon phase", "nautilus complications", "patek 5712", "nautilus 5712 price", "patek micro-rotor"],
  image: "watch_2",
  cover: "patek-philippe-nautilus-5990-1423g-001-18k-white-gold-charcoal-gray-dial-41-mm",
  picks: { brand: "patek-philippe", query: "nautilus", sort: "price_desc", limit: 8 },
  intro: [
    "The 5711 is the Nautilus everyone talks about. The 5712 is the one many seasoned collectors prefer: the same case, with an asymmetric dial showing power reserve, moon phase and date.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Nautilus 5711", "Nautilus 5712"],
            rows: [
              ["Display", "Time and date", "Time, date sub-dial, power reserve and moon phase"],
              ["Dial", "Symmetrical, horizontal embossing", "Asymmetric sub-dials, horizontal embossing"],
              ["Movement", "Automatic with central rotor", "Automatic with micro-rotor"],
              ["Diameter", "40 mm", "40 mm"],
              ["Feel", "Sporty and minimal", "More watchmaking, more personality"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which one?",
      blocks: [
        "If you want the purest Nautilus, the 5711 is the reference – read [5711 vs 5811](/journal/patek-5711-vs-5811) for its story. If you like complications and a dial that rewards a closer look, the 5712 is arguably more interesting, and its micro-rotor movement is a fine piece of Patek engineering. For the wider family, see the [Patek buying guide](/journal/patek-philippe-buying-guide).",
        { products: { brand: "patek-philippe", query: "5712", sort: "price_asc" }, title: "Nautilus 5712 available now" },
      ],
    },
  ],
  faq: [
    { q: "What complications does the Patek 5712 have?", a: "A date sub-dial, a power reserve indicator and a moon phase, alongside the hours, minutes and small seconds." },
    { q: "Is the 5712 the same size as the 5711?", a: "Yes, both are 40 mm Nautilus cases on the same style of integrated bracelet." },
    { q: "Which is more valuable?", a: "It depends on dial, metal and condition; the steel 5711 usually commands the highest premium." },
  ],
  sources: [
    { label: "Patek Philippe – Nautilus collection", url: "https://www.patek.com/en/collection/nautilus" },
  ],
  shop: [
    { label: "Nautilus", path: "/models/patek-philippe-nautilus" },
    { label: "Shop Patek Philippe", path: "/shop/watches/patek-philippe" },
  ],
};
