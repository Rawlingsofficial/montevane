import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-explorer-vs-submariner",
  title: "Rolex Explorer vs Submariner: Which Everyday Rolex?",
  metaTitle: "Rolex Explorer vs Submariner: The Everyday Rolex Compared",
  description: "Rolex Explorer vs Submariner: size, bezel, water resistance, legibility and price – which suits an everyday watch, from the 36 mm Explorer to the Sub.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-04-02",
  keyword: "explorer vs submariner",
  keywords: ["explorer 124270", "submariner 124060", "everyday rolex", "explorer 40", "rolex explorer size"],
  image: "gallery/cat-watches",
  cover: "rolex-explorer-224270-stainless-steel-black-dial-oyster-bracelet-40-mm",
  picks: { brand: "rolex", query: "explorer", sort: "price_asc", limit: 8 },
  intro: [
    "If you want one Rolex to wear every day, the shortlist usually comes down to two steel tool watches: the Explorer and the Submariner. Both are robust, legible and instantly recognisable – but they wear very differently.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Explorer (124270)", "Submariner (124060)"],
            rows: [
              ["Case", "36 mm (also 40 mm, ref. 224270)", "41 mm"],
              ["Bezel", "Smooth, fixed", "Rotating dive bezel, Cerachrom ceramic"],
              ["Water resistance", "100 m", "300 m"],
              ["Dial", "Black with 3-6-9 numerals", "Black with dot, baton and triangle markers"],
              ["Date", "No", "No (124060); date on 126610"],
              ["Character", "Understated, slim, dressy enough for a suit", "Sporty, bolder, more presence"],
            ],
          },
        },
      ],
    },
    {
      id: "explorer",
      heading: "The case for the Explorer",
      blocks: [
        "The Explorer's roots go back to the expeditions of the early 1950s, and its design is all about legibility: a black dial, bold 3, 6 and 9 numerals and nothing else. At 36 mm with a smooth bezel it slides under a shirt cuff and suits smaller wrists. It is the quiet Rolex – people who know will recognise it; everyone else won't notice.",
      ],
    },
    {
      id: "submariner",
      heading: "The case for the Submariner",
      blocks: [
        "The Submariner is the archetypal dive watch: a rotating ceramic bezel to time a dive, 300 m of water resistance and a 41 mm case with real wrist presence. It is more versatile than it looks – on the Oyster bracelet it works with jeans, tailoring and a swimsuit alike. Choosing between date and no-date? Read [Submariner Date vs No-Date](/journal/rolex-submariner-date-vs-no-date).",
        { products: { brand: "rolex", query: "submariner", sort: "price_asc" }, title: "Submariners available now" },
      ],
    },
    {
      id: "choose",
      heading: "How to choose",
      blocks: [
        {
          list: [
            "**Wrist under about 17 cm, or you prefer slim watches?** The Explorer 36.",
            "**You swim, sail or simply like a sportier look?** The Submariner.",
            "**Want the Explorer with more presence?** The Explorer 40.",
            "**Thinking about value over time?** Both are among the strongest Rolex models – see [which watches hold their value](/journal/which-watches-hold-their-value).",
          ],
        },
        "Not sure about size? Our [watch size guide](/journal/watch-size-guide) explains how to judge it.",
      ],
    },
  ],
  faq: [
    { q: "Is the Rolex Explorer smaller than the Submariner?", a: "Yes. The Explorer 124270 is 36 mm with a smooth bezel; the Submariner is 41 mm with a rotating bezel, so it wears noticeably larger." },
    { q: "Can you swim with a Rolex Explorer?", a: "Yes. The Explorer is water-resistant to 100 m with a screw-down crown, which is fine for swimming. The Submariner is rated to 300 m." },
    { q: "Which is the better everyday Rolex?", a: "Both are excellent. The Explorer is more discreet and dressy; the Submariner is sportier and more versatile in the water." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
    { label: "Rolex buying guide", path: "/journal/rolex-buying-guide" },
  ],
};
