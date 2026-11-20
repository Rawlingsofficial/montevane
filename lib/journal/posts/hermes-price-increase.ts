import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-price-increase",
  title: "Hermès Price Increases: What January Means for Buyers",
  metaTitle: "Hermès Price Increase 2027: What to Expect and When to Buy",
  description: "Hermès raises prices most years in January. What happened in 2026, how increases flow into the resale market, and whether to buy a Birkin or Kelly before or after.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-12-16",
  keyword: "hermes price increase",
  keywords: ["hermes price increase 2027", "birkin price increase", "kelly price increase", "birkin retail price", "hermes january price"],
  image: "gallery/col-exotic-hermes",
  cover: "hermes-birkin-sellier-30-black-madame-palladium-hardware",
  picks: { category: "birkin-bags", sort: "newest", limit: 8 },
  intro: [
    "Hermès adjusts its prices most years, usually at the start of January. For anyone thinking about a Birkin or Kelly, it's the most important date in the calendar.",
    "Here's what happened in 2026, how retail increases reach the resale market, and what it means for timing.",
  ],
  sections: [
    {
      id: "2026",
      heading: "What happened in January 2026",
      blocks: [
        "According to Sotheby's analysis, core leather Birkin and Kelly bags rose by roughly 6–9% in the US and 7–9% in Europe in January 2026. Increases varied by model, size and market, and other categories such as ready-to-wear moved differently.",
        { note: "Hermès doesn't publish a price list, and it hasn't announced a 2027 change at the time of writing. We'll update this article once new prices are confirmed." },
      ],
    },
    {
      id: "resale",
      heading: "How retail increases reach the resale market",
      blocks: [
        {
          list: [
            "**New, unused bags** in sought-after specifications usually trade above retail, so a higher retail price tends to lift their floor.",
            "**Pre-loved and older bags** follow more slowly; condition, colour and leather matter more than the retail change.",
            "**Exotics and limited editions** are driven by rarity rather than the retail price list.",
          ],
        },
        "Read more in [is a Birkin a good investment?](/journal/is-a-birkin-a-good-investment)",
      ],
    },
    {
      id: "timing",
      heading: "Buy before or after January?",
      blocks: [
        "If you have found the exact bag you want – size, leather, colour, hardware, condition – the price increase is a reason not to wait. If you're still deciding, it isn't a reason to rush: the right specification matters far more to your long-term satisfaction (and resale value) than a few percent.",
        { products: { category: "birkin-bags", max: 30000, sort: "price_desc" }, title: "Birkins available now" },
      ],
    },
  ],
  faq: [
    { q: "When does Hermès raise prices?", a: "Usually in January, though timing and amounts vary by market and category. Hermès doesn't announce changes in advance." },
    { q: "How much did Birkin prices go up in 2026?", a: "Sotheby's reported increases of roughly 6–9% in the US and 7–9% in Europe for core leather Birkin and Kelly bags." },
    { q: "Do resale prices rise when Hermès raises retail prices?", a: "Prices for new, sought-after bags tend to follow, because they trade above retail. Older and pre-loved bags respond more slowly." },
  ],
  sources: [
    { label: "Sotheby's – Higher Hermès bag prices in 2026", url: "https://www.sothebys.com/en/articles/higher-hermes-bag-prices-in-2026-what-you-need-to-know" },
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
  ],
};
