import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "birkin-25-vs-kelly-25",
  title: "Birkin 25 vs Kelly 25: The Small Hermès Bags Compared",
  metaTitle: "Birkin 25 vs Kelly 25: Which Small Hermès Bag to Choose",
  description: "Birkin 25 vs Kelly 25: two handles or one, strap or no strap, capacity, how each is carried and which small Hermès bag suits your style.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-04-16",
  keyword: "birkin 25 vs kelly 25",
  keywords: ["small hermes bag", "kelly 25 strap", "birkin 25 size", "mini hermes bag", "birkin or kelly"],
  image: "product_45deg",
  cover: "hermes-birkin-25-bubblegum-ostrich-boreal-palladium-hardware",
  picks: { category: "birkin-bags", query: "25", sort: "price_asc", limit: 8 },
  intro: [
    "Same width, very different bags. The Birkin 25 and Kelly 25 are the most sought-after small Hermès bags, and choosing between them is mostly about how you like to carry a bag.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Birkin 25", "Kelly 25"],
            rows: [
              ["Handles", "Two", "One"],
              ["Shoulder strap", "No", "Yes, detachable"],
              ["Opening", "Can be worn with the flap open", "Closed flap, more formal"],
              ["Look", "Relaxed, casual-chic", "Structured, ladylike"],
              ["Carry", "By hand or on the forearm", "By hand, on the arm, on the shoulder or crossbody"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which one is for you?",
      blocks: [
        "Choose the **Birkin 25** if you like an easy, open bag in the hand and don't need a strap. Choose the **Kelly 25** if you want to go hands-free or prefer a more polished silhouette. For the bigger picture, read [Birkin vs Kelly](/journal/birkin-vs-kelly) and [Kelly 25 vs 28](/journal/kelly-25-vs-28).",
        { products: { category: "kelly-bags", sort: "price_asc" }, title: "Kelly bags available now" },
      ],
    },
  ],
  faq: [
    { q: "Does the Birkin 25 have a strap?", a: "No. The Birkin is carried by its two handles; the Kelly comes with a detachable shoulder strap." },
    { q: "Which holds more, Birkin 25 or Kelly 25?", a: "They're similar. The Birkin's open top makes it a little easier to reach into and slightly more forgiving to fill." },
    { q: "Which is harder to find?", a: "Both are highly sought after. Availability depends on leather, colour and hardware rather than on the model alone." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
  ],
};
