import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "cartier-santos-vs-tank",
  title: "Cartier Santos vs Tank: Which Icon Is for You?",
  metaTitle: "Cartier Santos vs Tank: History, Sizes, Wear & Prices",
  description: "Cartier Santos or Tank? The history of both icons, how they wear, sizes and versions, bracelet vs strap, and which suits your style and wrist.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-02-12",
  keyword: "cartier santos vs tank",
  keywords: ["cartier santos", "cartier tank", "cartier tank louis", "santos de cartier medium vs large", "cartier baignoire"],
  image: "watch_2",
  cover: "cartier-santos-de-cartier-wssa0029-stainless-steel-white-dial-35-mm",
  picks: { brand: "cartier", sort: "price_asc", limit: 8 },
  intro: [
    "Cartier made two of the first wristwatches designed as wristwatches, and both are still in production more than a century later. The Santos is the sportier, more architectural of the two; the Tank is pure elegance.",
  ],
  sections: [
    {
      id: "history",
      heading: "Two founding stories",
      blocks: [
        "The **Santos** was created in 1904 for the aviator Alberto Santos-Dumont, who needed to read the time without taking his hands off the controls. Its square case and exposed screws on the bezel make it one of the first \"tool\" wristwatches. The **Tank**, designed in 1917, was inspired by the outline of the tanks of the First World War seen from above – its vertical side bars (brancards) frame the dial.",
      ],
    },
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Santos", "Tank"],
            rows: [
              ["Shape", "Square with rounded corners, screwed bezel", "Rectangular, framed by brancards"],
              ["Character", "Sporty-elegant, bold", "Dressy, minimalist"],
              ["Bracelet / strap", "Integrated bracelet, often with quick-change strap system", "Usually leather strap; some on bracelet"],
              ["Versions", "Santos de Cartier, Santos-Dumont (slim)", "Louis Cartier, Française, Must, Américaine"],
              ["Wears", "Larger and more present", "Small, slim, slides under a cuff"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which to choose",
      blocks: [
        {
          list: [
            "**Choose the Santos** for an everyday watch on a bracelet that works with jeans and a suit alike.",
            "**Choose the Tank** for a dress watch with a century of style behind it – the watch of Andy Warhol, Jackie Kennedy and Yves Saint Laurent.",
            "**Consider the Baignoire** – Cartier's oval icon – for a more jewelry-like women's watch.",
          ],
        },
        { products: { brand: "cartier", query: "santos", sort: "price_asc" }, title: "Santos available now" },
        { products: { brand: "cartier", query: "tank", sort: "price_asc" }, title: "Tank available now" },
      ],
    },
  ],
  faq: [
    { q: "Which is older, the Santos or the Tank?", a: "The Santos, created in 1904. The Tank followed in 1917." },
    { q: "Is the Cartier Tank a men's or women's watch?", a: "Both. Classic sizes are worn by men and women alike." },
    { q: "Do Cartier watches hold their value?", a: "Icons like the Santos and Tank hold value reasonably well, especially in gold and in complete sets, though less than steel Rolex sports models." },
  ],
  sources: [
    { label: "Cartier – official site", url: "https://www.cartier.com/" },
  ],
  shop: [
    { label: "Shop Cartier", path: "/shop/watches/cartier" },
    { label: "All watches", path: "/shop/watches" },
  ],
};
