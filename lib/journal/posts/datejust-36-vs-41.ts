import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "datejust-36-vs-41",
  title: "Rolex Datejust 36 vs 41: Which Size Is Right?",
  metaTitle: "Rolex Datejust 36 vs 41: Size, Fit, References & Prices",
  description: "Rolex Datejust 36 or 41? Case size, how each wears, bezels, bracelets and dials, the key references (126200, 126234, 126300, 126334) and which to buy.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-01-08",
  keyword: "datejust 36 vs 41",
  keywords: ["rolex datejust 36", "rolex datejust 41", "126334 vs 126234", "datejust size", "datejust jubilee or oyster"],
  image: "watches_showcase",
  cover: "rolex-datejust-41-126331-stainless-steel-and-18k-rose-gold-sundust-dial-jubilee-bracelet",
  picks: { brand: "rolex", query: "datejust 41", sort: "newest", limit: 4 },
  intro: [
    "The Datejust is Rolex's most versatile watch, and the first choice is size: the classic 36 mm or the modern 41 mm. Both use the same calibre and share the same dials and bracelets – but they feel like different watches.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Datejust 36", "Datejust 41"],
            rows: [
              ["Steel, smooth bezel", "126200", "126300"],
              ["Steel and white gold, fluted bezel", "126234", "126334"],
              ["Movement", "Calibre 3235, about 70 hours", "Calibre 3235, about 70 hours"],
              ["Character", "Classic, elegant, unisex", "Contemporary, more presence"],
              ["Suits wrists", "Most wrists, especially under 18 cm", "Wrists from about 17 cm"],
            ],
          },
        },
      ],
    },
    {
      id: "fit",
      heading: "How they wear",
      blocks: [
        "The 36 mm was the standard Datejust size for decades, and it's slim enough to sit under any cuff. The 41 mm has more presence and a broader dial that makes it easier to read. If you're between sizes, our [watch size guide](/journal/watch-size-guide) helps you decide.",
      ],
    },
    {
      id: "options",
      heading: "Bezel, bracelet and dial",
      blocks: [
        {
          list: [
            "**Fluted white gold bezel** – the dressier, signature Datejust look.",
            "**Smooth bezel** – more understated and modern.",
            "**Jubilee bracelet** – five-link, dressy and very comfortable.",
            "**Oyster bracelet** – three-link, sportier.",
            "**Dials** – from classic silver and black to the Wimbledon (slate with green Roman numerals) and mint green.",
          ],
        },
      ],
    },
    {
      id: "shop",
      heading: "Available now",
      blocks: [
        { products: { brand: "rolex", query: "datejust 36", sort: "newest" }, title: "Datejust 36" },
        { products: { brand: "rolex", query: "datejust 41", sort: "newest" }, title: "Datejust 41" },
      ],
    },
  ],
  faq: [
    { q: "Is the Datejust 36 too small for a man?", a: "No. It was the standard men's Datejust for decades and suits most wrists. Larger wrists may prefer the 41." },
    { q: "What is the difference between the 126234 and the 126334?", a: "Both have a steel case and white gold fluted bezel. The 126234 is 36 mm; the 126334 is 41 mm." },
    { q: "Jubilee or Oyster bracelet?", a: "The Jubilee is dressier and very comfortable; the Oyster is sportier. It's a matter of taste – both are excellent." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
  ],
  shop: [
    { label: "Rolex Datejust", path: "/models/rolex-datejust" },
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
  ],
};
