import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-store-a-birkin",
  title: "How to Store a Birkin Long-Term",
  metaTitle: "How to Store a Birkin: Keep Its Shape, Leather & Value",
  description: "How to store a Birkin or Kelly long-term: stuffing, dust bags, where to keep it, how to protect handles and hardware, exotics, and mistakes that damage leather.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-06-07",
  keyword: "how to store a birkin",
  keywords: ["birkin storage", "handbag storage", "dust bag", "store hermes bag", "birkin shape"],
  image: "gallery/cat-birkin-bags",
  cover: "bag-bestie-birkin-grey-organizer",
  picks: { category: "bag-organizers", sort: "price_asc", limit: 8 },
  intro: [
    "A Birkin that is stored well keeps its shape, colour and value. A few simple habits make all the difference, especially if a bag rests for months at a time.",
  ],
  sections: [
    {
      id: "steps",
      heading: "The right way to store it",
      blocks: [
        {
          list: [
            "**Empty it** completely – pens and cosmetics leave marks.",
            "**Stuff it** with acid-free tissue or a bag pillow so it keeps its shape. An organiser insert works too.",
            "**Keep the flap and straps free**: don't close the turn-lock tightly, and don't leave the clochette resting against the leather.",
            "**Use the dust bag**: breathable cotton, never plastic, which traps moisture.",
            "**Store it upright** on a shelf, with space around it – not stacked or squeezed.",
            "**Cool, dry and dark**: away from sunlight, radiators and damp cellars.",
          ],
        },
        { products: { category: "bag-organizers", sort: "price_asc" }, title: "Bag organisers available now" },
      ],
    },
    {
      id: "mistakes",
      heading: "Common mistakes",
      blocks: [
        {
          list: [
            "Hanging the bag by its handles – they stretch and lose shape.",
            "Storing it in its orange box for years without airflow.",
            "Letting hardware rest against the leather, which can leave impressions.",
          ],
        },
      ],
    },
    {
      id: "exotics",
      heading: "Exotic leathers",
      blocks: [
        "Crocodile and alligator dislike both very dry and very humid air. Check them every few weeks, and keep them away from heat sources. See [Hermès exotic leathers](/journal/hermes-exotic-leathers) and our [care guide](/journal/how-to-care-for-a-hermes-bag).",
      ],
    },
  ],
  faq: [
    { q: "Should I keep my Birkin in its box?", a: "The dust bag on a shelf is best for regular use. If you use the box, make sure the bag is stuffed and the box isn't sealed in a damp place." },
    { q: "Should I stuff my Birkin?", a: "Yes, with acid-free tissue or a pillow, so it keeps its shape." },
    { q: "Can I store a Birkin in plastic?", a: "No. Plastic traps moisture; use the cotton dust bag." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
  ],
  shop: [
    { label: "Shop bag organisers", path: "/shop/bag-organizers" },
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
  ],
};
