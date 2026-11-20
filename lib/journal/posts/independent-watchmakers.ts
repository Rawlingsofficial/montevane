import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "independent-watchmakers",
  title: "Independent Watchmakers Every Collector Should Know",
  metaTitle: "Independent Watchmakers: F.P. Journe, MB&F, De Bethune & More",
  description: "The independent watchmakers collectors chase: F.P. Journe, MB&F, De Bethune, Akrivia, Kari Voutilainen, Philippe Dufour and more – what makes each special.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-06-16",
  keyword: "independent watchmakers",
  keywords: ["fp journe", "mb&f", "de bethune", "akrivia", "independent watch brands"],
  image: "gallery/cat-watches",
  cover: "f-p-journe-titalyt-titanium-luminicent-white-dial-40-mm",
  picks: { brand: "fp-journe", sort: "price_asc", limit: 8 },
  intro: [
    "Beyond the big houses is a small world of independent watchmakers, often run by the person whose name is on the dial. They make few watches – and those are among the most collected in the world.",
  ],
  sections: [
    {
      id: "names",
      heading: "The names to know",
      blocks: [
        {
          table: {
            head: ["Watchmaker", "Founded", "Known for"],
            rows: [
              ["F.P. Journe", "Geneva, 1999", "Chronomètre Bleu, Résonance, rose-gold movements"],
              ["MB&F", "Geneva, 2005 (Max Büsser)", "Sculptural 'Horological Machines'"],
              ["De Bethune", "Jura, 2002", "Blued titanium, space-age design, innovative balances"],
              ["Akrivia", "Geneva, 2012 (Rexhep Rexhepi)", "Classical, exquisitely hand-finished watches"],
              ["Kari Voutilainen", "Môtiers", "Guilloché dials and superb finishing"],
              ["Philippe Dufour", "Vallée de Joux", "The Simplicity, a benchmark of hand-finishing"],
            ],
          },
        },
      ],
    },
    {
      id: "why",
      heading: "Why collectors love them",
      blocks: [
        "Independents make a few hundred watches a year at most – some only a handful. Each piece shows the hand and ideas of its maker, from the movement layout to the finishing. Waiting lists are long and secondary-market prices reflect that. Our [F.P. Journe guide](/journal/fp-journe-guide) is the best place to start.",
      ],
    },
  ],
  faq: [
    { q: "What is an independent watchmaker?", a: "A watchmaker or small company not owned by a large group, usually led by its founder and making very few watches." },
    { q: "Is F.P. Journe an independent?", a: "Yes. François-Paul Journe founded his brand in Geneva in 1999, and it remains independent." },
    { q: "Why are independent watches so expensive?", a: "Tiny production, hand-finishing and high demand from collectors." },
  ],
  sources: [
    { label: "F.P. Journe – official site", url: "https://www.fpjourne.com/en" },
  ],
  shop: [
    { label: "Shop F.P. Journe", path: "/shop/watches/fp-journe" },
    { label: "Shop watches", path: "/shop/watches" },
  ],
};
