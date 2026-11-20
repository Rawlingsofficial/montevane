import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "why-is-richard-mille-so-expensive",
  title: "Why Is Richard Mille So Expensive?",
  metaTitle: "Why Is Richard Mille So Expensive? Materials, Production, Prices",
  description: "Why Richard Mille watches cost $100,000 to millions: the materials, the skeletonised movements, the shock resistance, tiny production and the athletes who wear them.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2026-11-25",
  keyword: "why is richard mille so expensive",
  keywords: ["richard mille price", "richard mille rm 011", "richard mille rm 07-01", "carbon tpt", "richard mille resale"],
  image: "gallery/cat-watches",
  cover: "richard-mille-rm-028-rm028-titanium-blue-skeleton-dial-47-mm",
  picks: { brand: "richard-mille", sort: "price_asc", limit: 8 },
  intro: [
    "A Richard Mille is light enough to forget you're wearing it, looks like a racing car's engine bay, and costs more than most houses. It is also one of the hardest watches in the world to buy new.",
    "Founded in 2001, the brand went from nothing to the most talked-about name in watchmaking in two decades. Here's why its watches cost what they do.",
  ],
  sections: [
    {
      id: "materials",
      heading: "1. Materials nobody else uses",
      blocks: [
        "Richard Mille treats a watch case like a Formula 1 component. Many models are made from **Carbon TPT** and **Quartz TPT** – hundreds of ultra-thin layers of carbon or silica fibre, pressed and heated – plus titanium alloys, ceramics and sapphire. These materials are extremely light and strong, and very hard to machine. Each tonneau-shaped case is made from many separate parts.",
      ],
    },
    {
      id: "movement",
      heading: "2. Skeletonised movements built for impact",
      blocks: [
        "The movements are openworked so you can see straight through them, and they're built to survive shocks that would stop a conventional watch. Rafael Nadal famously played his matches wearing a Richard Mille tourbillon. Baseplates in grade 5 titanium or carbon and cable-suspended movements are engineering solutions, and they add cost at every step.",
      ],
    },
    {
      id: "rarity",
      heading: "3. Very small production",
      blocks: [
        "Richard Mille makes only a few thousand watches a year across its whole range, and many references are limited editions. Boutiques offer them to established clients, so the secondary market is where most people buy – usually above retail.",
      ],
    },
    {
      id: "models",
      heading: "Key models",
      blocks: [
        {
          table: {
            head: ["Model", "What it is", "Who it's for"],
            rows: [
              ["RM 011", "Flyback chronograph with annual calendar", "The collector's sports watch"],
              ["RM 035", "Ultra-light \"Rafael Nadal\" model", "Lightness above all"],
              ["RM 07-01", "Women's skeletonised automatic, often gem-set", "The women's icon"],
              ["RM 67", "Extra-flat automatic", "Everyday wear, dress or casual"],
              ["RM 027 / RM 27", "Nadal's tourbillon – among the lightest ever made", "The grail"],
            ],
          },
        },
        { products: { brand: "richard-mille", query: "rm 011", sort: "price_asc" }, title: "RM 011 available now" },
        { products: { brand: "richard-mille", query: "07", sort: "price_asc" }, title: "RM 07-01 available now" },
      ],
    },
    {
      id: "worth",
      heading: "Is a Richard Mille worth it?",
      blocks: [
        "If you value comfort, technical innovation and design that couldn't be mistaken for anything else, yes. If you prefer traditional finishing and understatement, a [Patek Philippe](/journal/patek-philippe-buying-guide) or [F.P. Journe](/journal/fp-journe-guide) will suit you better. Prices on the secondary market move with demand, so buy the model you love rather than as a speculation.",
      ],
    },
  ],
  faq: [
    { q: "How much does a Richard Mille cost?", a: "On the secondary market, from around $80,000 for some models to several million for rare tourbillons and limited editions." },
    { q: "Why are Richard Mille watches so light?", a: "Cases in Carbon TPT, Quartz TPT and titanium, and movements with skeletonised titanium or carbon baseplates, make many models remarkably light." },
    { q: "Can you buy a Richard Mille at retail?", a: "Boutiques allocate new watches to established clients, so most buyers purchase on the secondary market, often above retail." },
  ],
  sources: [
    { label: "Richard Mille – official site", url: "https://www.richardmille.com/" },
  ],
  shop: [
    { label: "Shop Richard Mille", path: "/shop/watches/richard-mille" },
    { label: "All watches", path: "/shop/watches" },
  ],
};
