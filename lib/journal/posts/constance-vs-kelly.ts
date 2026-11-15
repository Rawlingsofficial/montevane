import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "constance-vs-kelly",
  title: "Hermès Constance vs Kelly",
  metaTitle: "Hermès Constance vs Kelly: Which Hermès Bag Suits You?",
  description: "Hermès Constance vs Kelly: the H clasp vs the turn-lock, strap and handle, size, how each is worn day and night, and which one to buy first.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-06-25",
  keyword: "constance vs kelly",
  keywords: ["hermes evening bag", "crossbody hermes", "constance 18", "kelly 25", "hermes shoulder bag"],
  image: "product_side",
  cover: "hermes-kelly-25-colormatic-retourne-swift-noir-phw",
  picks: { category: "kelly-bags", sort: "price_asc", limit: 8 },
  intro: [
    "Both are elegant, both can be worn on the shoulder, and both are among the most coveted Hermès bags. But the Constance and the Kelly are designed to be carried very differently.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Constance", "Kelly"],
            rows: [
              ["Closure", "Sculpted H clasp", "Turn-lock with padlock and keys"],
              ["Carry", "Shoulder strap only (long or doubled)", "Top handle plus detachable strap"],
              ["Popular sizes", "18 and 24", "25 and 28"],
              ["Capacity", "Slim; essentials only", "More room; structured"],
              ["Mood", "Hands-free, day-to-night", "Polished, ladylike"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which first?",
      blocks: [
        "If you love to go hands-free and want a bag that works from lunch to dinner, start with the **Constance** – see the [Constance buying guide](/journal/hermes-constance-buying-guide). If you want a bag that does everything – by hand at the office, crossbody at the weekend – choose the **Kelly**, and pick the size with [Kelly 25 vs 28](/journal/kelly-25-vs-28).",
      ],
    },
  ],
  faq: [
    { q: "Does the Constance have a top handle?", a: "No. The Constance is carried on its strap, worn long or doubled; the Kelly has a top handle and a detachable strap." },
    { q: "Which is more practical?", a: "The Kelly, thanks to its handle, strap and greater capacity. The Constance is lighter and slimmer." },
    { q: "Which is better for evening?", a: "Both work; a small Constance or Kelly 25 in an exotic leather is a classic evening choice." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
  ],
  shop: [
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
    { label: "Shop Hermès", path: "/brands/hermes" },
  ],
};
