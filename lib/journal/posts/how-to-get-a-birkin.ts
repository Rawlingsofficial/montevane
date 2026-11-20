import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-get-a-birkin",
  title: "How to Get a Birkin: Boutique, Waitlist or Resale?",
  metaTitle: "How to Get a Hermès Birkin (Without the Waitlist)",
  description: "How people really get a Hermès Birkin: how boutique allocation works, why there's no real waitlist, purchase history, and when buying pre-owned is smarter.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-11-15",
  keyword: "how to get a birkin",
  keywords: ["birkin waitlist", "hermes purchase history", "how to buy a birkin", "birkin quota", "buy birkin without waitlist"],
  image: "gallery/home-hero",
  cover: "hermes-birkin-30-black-togo-gold-hardware",
  picks: { category: "birkin-bags", sort: "newest", limit: 8 },
  intro: [
    "There is no Birkin waitlist. That surprises most people. Hermès boutiques don't take names and call you in turn; they offer bags to clients they know, when a bag arrives that suits them.",
    "Here is how it really works, what it costs, and when it makes more sense to buy a Birkin that is already in someone's hands.",
  ],
  sections: [
    {
      id: "boutique",
      heading: "How boutique allocation works",
      blocks: [
        "Birkins are made by hand, one artisan per bag, in limited numbers. Each boutique receives a small allocation and decides which clients to offer them to. In practice that means:",
        {
          list: [
            "**A relationship with one sales associate**, built over visits and years.",
            "**A purchase history** in other categories – ready-to-wear, homeware, jewelry, silk. Spending on the bag itself is not how it works.",
            "**Flexibility.** Clients who will accept a size, colour or leather they didn't ask for are offered bags sooner.",
          ],
        },
        "None of this is published by Hermès, and every boutique works a little differently. What's consistent is that the process can take months or years, and you rarely choose the exact specification.",
      ],
    },
    {
      id: "cost",
      heading: "The true cost of a boutique Birkin",
      blocks: [
        "The retail price is only part of it. Add the purchase history clients typically build first, and the time involved, and a \"retail\" Birkin is often far more expensive than its price tag. That is why many collectors buy their first Birkin, or a specific specification, on the secondary market.",
      ],
    },
    {
      id: "resale",
      heading: "Buying pre-owned: what you gain",
      blocks: [
        {
          table: {
            head: ["", "Boutique", "Pre-owned"],
            rows: [
              ["Wait", "Months to years", "Immediate"],
              ["Choice of size, colour, leather", "Limited – you're offered a bag", "Exactly what you want"],
              ["Price", "Retail, plus purchase history", "Market price, often above retail for new"],
              ["Rare exotics and limited editions", "Very rarely offered", "Available"],
            ],
          },
        },
        "The trade-off is price: a new, never-used Birkin in a popular specification usually sells above retail. Older or pre-loved bags can be close to – or below – today's retail.",
        { products: { category: "birkin-bags", max: 30000, sort: "price_desc" }, title: "Birkins available now" },
      ],
    },
    {
      id: "safe",
      heading: "How to buy one safely",
      blocks: [
        "Buy from a specialist who authenticates every bag and guarantees it in writing. Learn the basics yourself: read [how to authenticate a Hermès bag](/journal/how-to-authenticate-hermes) and our [date stamp chart](/journal/hermes-date-stamp-chart), and choose the right size with [Birkin 25 vs 30](/journal/birkin-25-vs-30).",
      ],
    },
  ],
  faq: [
    { q: "Is there a waitlist for the Birkin?", a: "Not formally. Boutiques offer Birkins to clients they know, at their discretion. Some sales associates note requests, but there is no queue you can join." },
    { q: "How much do you need to spend at Hermès to get a Birkin?", a: "Hermès doesn't publish any rule, and it varies by boutique and client. Many clients report building a purchase history over time before being offered a bag." },
    { q: "Is it better to buy a Birkin pre-owned?", a: "If you want a specific size, colour or leather now, yes. You pay the market price but skip the wait and the purchase history." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Sotheby's – Higher Hermès bag prices in 2026", url: "https://www.sothebys.com/en/articles/higher-hermes-bag-prices-in-2026-what-you-need-to-know" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
  ],
};
