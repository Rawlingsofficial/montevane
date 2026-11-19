import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "what-is-a-chronometer",
  title: "What Is a Chronometer? COSC and Superlative Chronometers",
  metaTitle: "What Is a Chronometer? COSC, Rolex Superlative & Omega",
  description: "What a chronometer is: COSC certification (-4/+6 s a day), Rolex's Superlative Chronometer (±2 s), Omega's Master Chronometer – and whether it matters.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-04-12",
  keyword: "what is a chronometer",
  keywords: ["cosc certified", "superlative chronometer", "master chronometer", "chronometer vs chronograph", "watch accuracy"],
  image: "watches_showcase",
  cover: "rolex-datejust-36-126233-stainless-steel-and-18k-yellow-gold-olive-green-roman-dial",
  picks: { brand: "rolex", sort: "newest", limit: 4 },
  intro: [
    "\"Chronometer\" appears on the dials of Rolex, Omega, Tudor and Breitling. It isn't a style or a complication – it's a certificate of accuracy.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Chronometer vs chronograph",
      blocks: [
        "A **chronometer** is a watch whose movement has passed an official precision test. A **chronograph** is a stopwatch function with pushers. A watch can be both – the Rolex Daytona is a chronometer-certified chronograph.",
      ],
    },
    {
      id: "standards",
      heading: "The standards",
      blocks: [
        {
          table: {
            head: ["Certification", "Who tests", "Accuracy (mechanical)"],
            rows: [
              ["COSC chronometer", "Swiss Official Chronometer Testing Institute, on the uncased movement over 15 days", "-4 to +6 seconds a day on average"],
              ["Rolex Superlative Chronometer", "Rolex, after the movement is cased", "-2 to +2 seconds a day"],
              ["Omega Master Chronometer", "METAS (Swiss Federal Institute of Metrology), on the cased watch", "0 to +5 seconds a day, plus resistance to strong magnetic fields"],
            ],
          },
        },
        "Rolex and Omega movements are COSC-certified first and then tested again to their own stricter standard once cased.",
      ],
    },
    {
      id: "matters",
      heading: "Does it matter?",
      blocks: [
        "For daily wear, a well-regulated chronometer will usually be accurate to a few seconds a day. Accuracy also depends on how you wear the watch and on regular servicing – see our [Rolex service guide](/journal/rolex-service-guide). If your watch suddenly gains minutes a day, it may be magnetised; a watchmaker can fix that in minutes.",
        "For the difference between movement types, read [automatic vs manual vs quartz](/journal/automatic-vs-manual-vs-quartz).",
      ],
    },
  ],
  faq: [
    { q: "What does COSC certified mean?", a: "The movement passed 15 days of testing by the Swiss Official Chronometer Testing Institute, averaging between -4 and +6 seconds a day." },
    { q: "How accurate is a Rolex?", a: "Rolex's Superlative Chronometer standard is -2 to +2 seconds a day, tested after casing." },
    { q: "Is a chronometer the same as a chronograph?", a: "No. A chronometer is certified for accuracy; a chronograph is a stopwatch function. Some watches are both." },
  ],
  sources: [
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "Omega – official site", url: "https://www.omegawatches.com/" },
  ],
  shop: [
    { label: "Shop watches", path: "/shop/watches" },
  ],
};
