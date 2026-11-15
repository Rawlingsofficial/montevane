import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "skeleton-watch",
  title: "Skeleton Watches Explained",
  metaTitle: "Skeleton Watches Explained: Openworked Movements & Icons",
  description: "What a skeleton watch is, skeleton vs openworked vs open heart, how movements are cut away and hand-finished, and the icons from AP to Richard Mille.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-06-14",
  keyword: "skeleton watch",
  keywords: ["openworked watch", "royal oak openworked", "richard mille skeleton", "skeleton vs open heart", "skeletonised movement"],
  image: "watch_2",
  cover: "richard-mille-rm-38-02-bubba-watson-tourbillon-limited-to-50-pcs-carbon-tpt-and-quartz",
  picks: { category: "watches", query: "skeleton", sort: "price_desc", limit: 8 },
  intro: [
    "A skeleton watch removes everything that doesn't need to be there, so you can look straight through the movement. Done well, it's one of the most demanding crafts in watchmaking.",
  ],
  sections: [
    {
      id: "what",
      heading: "What 'skeleton' means",
      blocks: [
        {
          table: {
            head: ["Term", "Meaning"],
            rows: [
              ["Skeleton / skeletonised", "Bridges and plates cut away to the minimum, often with no solid dial"],
              ["Openworked", "Used similarly; Audemars Piguet uses it for its Royal Oak versions"],
              ["Open heart", "Only a window over the balance wheel – not a skeleton watch"],
              ["Sapphire dial", "A transparent dial over a conventional movement"],
            ],
          },
        },
      ],
    },
    {
      id: "craft",
      heading: "Why it's hard",
      blocks: [
        "Cutting away metal weakens the parts, so the watchmaker must keep them rigid while making them look light. In the finest pieces, every edge revealed is bevelled and polished by hand. That's why skeletons from houses such as Audemars Piguet, Vacheron Constantin and Cartier take so long to make – and why Richard Mille's skeletonised movements are part of its identity. See [Richard Mille models](/journal/richard-mille-models).",
      ],
    },
    {
      id: "buy",
      heading: "Before you buy",
      blocks: [
        {
          list: [
            "**Legibility:** hands can disappear against the movement – check they contrast.",
            "**Finishing:** look closely at the edges; hand-finishing shows.",
            "**Servicing:** delicate parts make servicing more specialised.",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "What is a skeleton watch?", a: "A watch whose movement has been cut away to the minimum so you can see through it, usually without a solid dial." },
    { q: "Is an open heart watch a skeleton watch?", a: "No. An open heart only shows the balance wheel through a window." },
    { q: "Are skeleton watches hard to read?", a: "Some are. The best designs use contrasting hands and markers." },
  ],
  sources: [
    { label: "Audemars Piguet – Royal Oak collection", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html" },
    { label: "Richard Mille – official site", url: "https://www.richardmille.com/" },
  ],
  shop: [
    { label: "Shop watches", path: "/shop/watches" },
  ],
};
