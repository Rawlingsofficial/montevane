import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "himalaya-birkin",
  title: "The Hermès Himalaya Birkin: A Collector's Guide",
  metaTitle: "Hermès Himalaya Birkin: Leather, Hardware, Sizes & Prices",
  description: "Everything about the Hermès Himalaya Birkin: the Niloticus crocodile, the gradient, white gold and diamond hardware, sizes, how to check one and current prices.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-11-30",
  image: "hero_2",
  intro: [
    "The Himalaya is the most coveted handbag in the world. Its smoky grey fading to white recalls a snow-capped mountain, and its rarity has made it the benchmark for the entire Hermès market.",
    "Here's what makes a Himalaya, which versions exist and what they cost. For the Birkin in general, start with our [Birkin buying guide](/journal/hermes-birkin-buying-guide).",
  ],
  sections: [
    {
      id: "what",
      heading: "What makes a Himalaya",
      blocks: [
        {
          list: [
            "**Leather** – matte Niloticus crocodile. The Himalaya is never made in calfskin.",
            "**Colour** – a hand-dyed gradient from smoky grey at the base to near-white at the top. No two are identical.",
            "**Hardware** – usually palladium; the rarest versions have 18k white gold hardware set with diamonds.",
            "**Rarity** – produced in very small numbers and offered only to a boutique's most established clients.",
          ],
        },
      ],
    },
    {
      id: "versions",
      heading: "Sizes and versions",
      blocks: [
        {
          table: {
            head: ["Version", "What to know"],
            rows: [
              ["Birkin 25", "The most sought-after size today"],
              ["Birkin 30", "The classic proportion; versatile day to evening"],
              ["Birkin 35", "Larger and slightly less in demand"],
              ["Diamond hardware", "18k white gold set with diamonds – the auction record-setters"],
              ["Kelly Himalaya", "The same leather and gradient on the Kelly"],
            ],
          },
        },
        "At the time of writing (November 2026), Himalaya Birkins on Montévane range from $150,500 to $575,990.",
      ],
    },
    {
      id: "checks",
      heading: "What to check",
      blocks: [
        {
          list: [
            "**The gradient** should be soft and even, with no harsh line between grey and white.",
            "**Scales** should be regular and symmetrical across the front panel.",
            "**The CITES documentation** for crocodile – essential if you plan to travel or ship the bag.",
            "**Condition of the white areas**, which show handling and discolouration more than darker skins.",
            "**Date stamp and hardware** consistent with each other. See our [date stamp chart](/journal/hermes-date-stamp-chart).",
          ],
        },
        { note: "Every Hermès piece on Montévane is inspected before it is offered. Read [how we authenticate](/authenticity), or our guide to [authenticating a Hermès bag](/journal/how-to-authenticate-hermes)." },
      ],
    },
  ],
  faq: [
    { q: "What leather is the Himalaya Birkin?", a: "Matte Niloticus crocodile, hand-dyed in a grey-to-white gradient." },
    { q: "Why is the Himalaya Birkin so expensive?", a: "It combines exotic leather, a difficult hand-dyed finish and very limited production. The diamond-hardware versions are among the most valuable handbags ever sold at auction." },
    { q: "Can I travel with a Himalaya Birkin?", a: "Crocodile is protected under CITES, so some countries require documentation to import or export it. Check the rules for your destination before travelling." },
  ],
  sources: [
    { label: "Christie's – Handbags & Accessories department", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
  ],
  shop: [
    { label: "Shop Hermès Birkin bags", path: "/shop/birkin-bags" },
    { label: "Our authenticity guarantee", path: "/authenticity" },
  ],
};
