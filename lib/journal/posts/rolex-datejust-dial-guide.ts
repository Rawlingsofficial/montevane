import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-datejust-dial-guide",
  title: "The Rolex Datejust Dial Guide",
  metaTitle: "Rolex Datejust Dials: Wimbledon, Palm, Fluted Motif & More",
  description: "A guide to Rolex Datejust dials: Wimbledon, mint green, palm and fluted motifs, mother-of-pearl, diamond markers and the classics – and which hold their appeal.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-03-17",
  keyword: "rolex datejust dials",
  keywords: ["wimbledon datejust", "datejust palm dial", "datejust mint green", "datejust fluted motif dial", "best datejust dial"],
  image: "watches_showcase",
  cover: "rolex-datejust-28-279173-stainless-steel-and-18k-yellow-gold-white-roman-dial-28-mm-2026",
  picks: { brand: "rolex", query: "datejust", sort: "newest", limit: 8 },
  intro: [
    "The Datejust's case and bracelet have barely changed in decades. What makes each one personal is the dial – and Rolex offers more dials for the Datejust than for any other watch.",
  ],
  sections: [
    {
      id: "dials",
      heading: "The dials collectors know by name",
      blocks: [
        {
          table: {
            head: ["Dial", "What it looks like", "Mood"],
            rows: [
              ["Wimbledon", "Slate grey with green Roman numerals", "Sporty-elegant, the cult favourite"],
              ["Mint green", "Soft green sunburst", "Fresh and modern"],
              ["Palm motif", "Palm leaves in relief", "Playful, summery"],
              ["Fluted motif", "Fluted pattern echoing the bezel", "Architectural"],
              ["Mother-of-pearl", "Natural iridescence, each one unique", "Jewelry-like"],
              ["Classic silver, black, blue", "Sunburst with baton markers", "Timeless"],
              ["Diamond markers", "Diamonds in place of hour markers", "Dressy; check they're factory-set"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Choosing a dial",
      blocks: [
        {
          list: [
            "**First Datejust?** Silver, blue or black – they go with everything.",
            "**Want personality?** Wimbledon or mint green.",
            "**For a gift?** Mother-of-pearl or diamond markers.",
          ],
        },
        "If you want diamond markers or a diamond bezel, read [factory vs aftermarket diamonds](/journal/rolex-aftermarket-diamonds) first.",
        { products: { brand: "rolex", query: "datejust wimbledon", sort: "price_asc" }, title: "Wimbledon dials available now" },
      ],
    },
  ],
  faq: [
    { q: "What is a Wimbledon Datejust?", a: "A Datejust with a slate grey dial and green Roman numerals outlined in black, echoing the colours of the tennis championship." },
    { q: "Which Datejust dial holds its value best?", a: "Popular dials such as Wimbledon, blue and mint green tend to be the most in demand." },
    { q: "Are diamond dials on a Datejust factory?", a: "Rolex makes diamond-set dials, but aftermarket ones exist too. The papers and reference confirm what was originally fitted." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Rolex Datejust", path: "/models/rolex-datejust" },
  ],
};
