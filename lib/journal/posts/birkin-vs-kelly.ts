import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "birkin-vs-kelly",
  title: "Birkin vs Kelly: Which Hermès Bag Should You Buy First?",
  metaTitle: "Birkin vs Kelly: Differences, Sizes, Prices & Which to Buy",
  description: "Birkin or Kelly? The history, design, how each carries, sizes, practicality and prices compared, plus which makes the better first Hermès bag.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-01-01",
  keyword: "birkin vs kelly",
  keywords: ["difference between birkin and kelly", "kelly or birkin first", "kelly bag vs birkin bag", "hermes kelly", "hermes birkin"],
  image: "hero_2",
  cover: "hermes-kelly-25-sellier-box-calf-noir-ghw",
  picks: { category: "kelly-bags", sort: "newest", limit: 4 },
  intro: [
    "They are the two most famous handbags in the world, made in the same workshops from the same leathers. Yet the Birkin and the Kelly suit very different lives.",
    "Here's how they differ and how to choose your first.",
  ],
  sections: [
    {
      id: "history",
      heading: "Two different stories",
      blocks: [
        "The **Kelly** descends from a saddle bag of the 1930s and took its name from Grace Kelly, who was photographed using one in the 1950s. The **Birkin** was designed in 1984 for the actress Jane Birkin, who wanted a bag large enough to carry everything. One is a ladylike structured bag; the other is a generous tote with the same refined details.",
      ],
    },
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Kelly", "Birkin"],
            rows: [
              ["Handles", "One top handle, plus a shoulder strap", "Two handles, no strap (except the Shoulder Birkin)"],
              ["Opening", "Single flap with turn-lock", "Flap with straps, lock and clochette; usually worn open"],
              ["Look", "Structured and formal (Sellier) or softer (Retourne)", "Relaxed and practical"],
              ["Capacity", "Less per size", "More per size"],
              ["Wear", "Hand, crossbody or shoulder", "Hand or forearm"],
              ["Popular sizes", "Mini, 25, 28, 32", "25, 30, 35"],
            ],
          },
        },
      ],
    },
    {
      id: "which",
      heading: "Which suits you?",
      blocks: [
        {
          list: [
            "**You want hands-free:** the Kelly, thanks to its shoulder strap.",
            "**You carry a lot:** the Birkin 30 or 35.",
            "**You want the most formal look:** a Kelly Sellier, with its sharp stitched edges.",
            "**You want an everyday bag:** a Birkin 30 in Togo or a Kelly 28 Retourne.",
            "**You want evening and day:** a Kelly 25, which works with a strap by day and in hand at night.",
          ],
        },
        "For sizes, read [Birkin 25 vs 30](/journal/birkin-25-vs-30) and our [Kelly buying guide](/journal/hermes-kelly-buying-guide).",
      ],
    },
    {
      id: "price",
      heading: "Price and availability",
      blocks: [
        "At retail, sizes for sizes, the Kelly is usually priced slightly above the Birkin. On the resale market, prices depend far more on size, leather, colour and condition than on the model. Small Kellys – the Mini and the 25 – are among the most sought-after bags of all.",
        { products: { category: "birkin-bags", query: "30", max: 40000, sort: "price_desc" }, title: "Birkin 30 available now" },
      ],
    },
  ],
  faq: [
    { q: "What is the main difference between a Birkin and a Kelly?", a: "The Kelly has one handle and a shoulder strap and closes with a single flap; the Birkin has two handles, no strap and a more open, tote-like shape." },
    { q: "Is a Kelly more expensive than a Birkin?", a: "At retail, size for size, the Kelly is usually slightly more expensive. Resale prices depend mostly on size, leather, colour and condition." },
    { q: "Which should be my first Hermès bag?", a: "If you want versatility and a strap, the Kelly 25 or 28. If you want a practical everyday bag, the Birkin 30." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Christie's – Handbags & Accessories department", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
  ],
};
