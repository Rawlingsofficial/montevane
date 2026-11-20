import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-exotic-leathers",
  title: "Hermès Exotic Leathers: Crocodile, Alligator, Ostrich and Lizard",
  metaTitle: "Hermès Exotic Leathers Explained: Croc vs Alligator vs Ostrich",
  description: "Hermès exotic leathers explained: Niloticus and Porosus crocodile, alligator, ostrich and lizard – shiny vs matte, how to tell them apart, care and CITES.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-01-11",
  keyword: "hermes exotic leather",
  keywords: ["crocodile vs alligator birkin", "ostrich birkin", "porosus vs niloticus", "matte alligator", "birkin cites"],
  image: "gallery/hermes",
  cover: "hermes-birkin-25-touch-togo-matte-alligator-noir-ghw",
  picks: { category: "birkin-bags", query: "alligator", sort: "price_asc", limit: 8 },
  intro: [
    "Exotic Birkins and Kellys are the rarest Hermès bags, and the most misunderstood. Crocodile and alligator look alike; shiny and matte change everything; and each skin has its own care rules and travel paperwork.",
    "Here's how to tell them apart.",
  ],
  sections: [
    {
      id: "compared",
      heading: "The exotic leathers at a glance",
      blocks: [
        {
          table: {
            head: ["Leather", "How to recognise it", "Character"],
            rows: [
              ["Niloticus crocodile", "Larger, slightly irregular scales; small pores (follicles) on each scale", "Bold, the classic croc look; used for the Himalaya"],
              ["Porosus crocodile", "Smaller, very regular scales with follicles", "The finest and most expensive skin"],
              ["Mississippiensis alligator", "Rectangular belly scales, no follicles; a distinctive \"umbilical\" pattern", "Elegant and even"],
              ["Ostrich", "Raised quill bumps over the centre of the bag", "Soft, light and surprisingly durable"],
              ["Lizard", "Tiny, regular scales", "Delicate and refined; used for small bags and accessories"],
            ],
          },
        },
      ],
    },
    {
      id: "finish",
      heading: "Shiny or matte?",
      blocks: [
        "Crocodile and alligator come in two finishes. **Shiny** (lisse) is polished to a high gloss – dressier and more formal. **Matte** is softer to the touch and more understated, and is the finish used for the [Himalaya Birkin](/journal/himalaya-birkin). Shiny skins are more sensitive to water, which can leave marks; matte is more forgiving.",
      ],
    },
    {
      id: "care",
      heading: "Caring for exotics",
      blocks: [
        {
          list: [
            "Keep exotic bags away from water, heat and direct sunlight – scales can lift and dry out.",
            "Store stuffed in the dust bag, never in plastic.",
            "Don't use conditioners; take any wear to Hermès or a specialist.",
          ],
        },
        "More in [how to care for a Hermès bag](/journal/how-to-care-for-a-hermes-bag).",
      ],
    },
    {
      id: "cites",
      heading: "Travel and CITES",
      blocks: [
        "Crocodile, alligator and some lizard and ostrich skins are covered by CITES, the international convention on trade in endangered species. Moving an exotic bag across borders can require documentation, and some countries restrict certain skins entirely. Ask for the CITES paperwork when you buy, and check your destination's rules before travelling. Read [travelling with a Birkin or Rolex](/journal/travelling-with-a-birkin-or-rolex).",
        { products: { category: "birkin-bags", query: "ostrich", sort: "price_asc" }, title: "Ostrich Birkins available now" },
      ],
    },
  ],
  faq: [
    { q: "What is the difference between a crocodile and an alligator Birkin?", a: "Crocodile scales have a small pore (follicle) on each scale; alligator scales don't, and alligator has a distinctive pattern at the centre of the belly." },
    { q: "Which is more expensive, Porosus or Niloticus?", a: "Porosus crocodile, with its smaller, more regular scales, is generally the most expensive exotic." },
    { q: "Can I travel with a crocodile Birkin?", a: "Often yes, but CITES documentation may be required, and some destinations restrict certain skins. Check before you travel." },
  ],
  sources: [
    { label: "CITES – Convention on International Trade in Endangered Species", url: "https://cites.org/" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
  ],
};
