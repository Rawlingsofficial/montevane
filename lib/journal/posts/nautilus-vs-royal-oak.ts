import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "nautilus-vs-royal-oak",
  title: "Patek Philippe Nautilus vs Audemars Piguet Royal Oak",
  metaTitle: "Nautilus vs Royal Oak: Which Luxury Sports Watch to Buy?",
  description: "Patek Philippe Nautilus or Audemars Piguet Royal Oak? Design, history, wearability, key references and real market prices compared side by side.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2026-11-23",
  image: "watch_2",
  intro: [
    "Both were designed by Gérald Genta in the 1970s. Both are steel sports watches with integrated bracelets that cost more than most gold watches. And both have defined luxury watch collecting for half a century. So which one should you buy?",
    "Here's how they compare. For each house in depth, see our guides to [Patek Philippe](/journal/patek-philippe-buying-guide) and the [Royal Oak](/journal/audemars-piguet-royal-oak-guide).",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Royal Oak", "Nautilus"],
            rows: [
              ["Launched", "1972", "1976"],
              ["Shape", "Octagonal bezel with eight hexagonal screws", "Rounded octagon with porthole \"ears\""],
              ["Dial", "Tapisserie (grid) guilloché", "Horizontal embossed lines"],
              ["Character", "Architectural, angular, bold", "Softer, fluid, understated"],
              ["Key steel references", "15510ST (41 mm), 16202ST Jumbo (39 mm)", "5711/1A (discontinued 2021), 5712/1A"],
              ["On Montévane (Nov 2026)", "15510ST $42,200 – $85,300 · 16202ST from $101,200", "5711/1A $123,400 – $250,000 · 5811/1G $218,400"],
            ],
          },
        },
      ],
    },
    {
      id: "design",
      heading: "Design and wearability",
      blocks: [
        "The **Royal Oak** wears flat and wide, with crisp alternating brushed and polished surfaces that catch the light. Its bracelet tapers sharply, which makes it more comfortable than its size suggests. It is the bolder of the two.",
        "The **Nautilus** is softer on the wrist. Its case flanks flow into the bracelet, and the horizontally embossed dial gives it a calmer, more discreet presence. Many collectors find it the more elegant watch with a suit.",
      ],
    },
    {
      id: "value",
      heading: "Price and value",
      blocks: [
        "Steel Nautilus references trade well above Royal Oaks of similar size, largely because Patek produced fewer and discontinued the 5711. The Royal Oak offers more choice – many sizes, metals and complications – and better value for those who want the Genta look without the Nautilus premium.",
        "If budget is the deciding factor, a steel Royal Oak 15510 or a Patek Aquanaut are the natural alternatives to a 5711.",
      ],
    },
    {
      id: "verdict",
      heading: "Which should you choose?",
      blocks: [
        {
          list: [
            "**Choose the Royal Oak** if you love bold, architectural design and want the widest choice of references.",
            "**Choose the Nautilus** if you prefer understatement and want the most collectable steel sports watch of its era.",
          ],
        },
        "Compare current pieces on our [Audemars Piguet](/shop/watches/audemars-piguet) and [Patek Philippe](/shop/watches/patek-philippe) pages, or [ask us](/contact) to source a specific reference.",
      ],
    },
  ],
  faq: [
    { q: "Did Gérald Genta design both the Nautilus and the Royal Oak?", a: "Yes. He designed the Royal Oak for Audemars Piguet in 1972 and the Nautilus for Patek Philippe in 1976." },
    { q: "Which is more expensive, the Nautilus or the Royal Oak?", a: "In steel, the Nautilus generally trades higher. The discontinued 5711/1A in particular carries a large premium over comparable Royal Oaks." },
    { q: "Which is more comfortable?", a: "It depends on your wrist. The Nautilus's case is softer and rounder; the Royal Oak is flatter with a sharply tapering bracelet. Both are thin and wear comfortably." },
  ],
  sources: [
    { label: "Audemars Piguet – Royal Oak collection", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html" },
    { label: "Patek Philippe – Nautilus collection", url: "https://www.patek.com/en/collection/nautilus" },
  ],
  shop: [
    { label: "Shop Audemars Piguet", path: "/shop/watches/audemars-piguet" },
    { label: "Shop Patek Philippe", path: "/shop/watches/patek-philippe" },
    { label: "Royal Oak", path: "/models/audemars-piguet-royal-oak" },
    { label: "Nautilus", path: "/models/patek-philippe-nautilus" },
  ],
};
