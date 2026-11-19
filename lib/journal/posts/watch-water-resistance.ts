import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "watch-water-resistance",
  title: "Watch Water Resistance Explained: 30 m to 300 m",
  metaTitle: "Watch Water Resistance Explained: What 30 m, 100 m & 300 m Mean",
  description: "What watch water resistance ratings really mean: 30 m, 50 m, 100 m and 300 m, screw-down crowns, why ratings aren't depths, and whether you can swim with your Rolex.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-04-26",
  keyword: "watch water resistance",
  keywords: ["can i swim with my rolex", "100m water resistant", "screw-down crown", "dive watch", "iso 6425"],
  image: "watches_showcase",
  cover: "rolex-submariner-126610lv-starbucks-stainless-steel-black-index-dial-oyster-bracelet-41",
  picks: { brand: "rolex", query: "submariner", sort: "newest", limit: 4 },
  intro: [
    "\"Water resistant to 30 m\" does not mean you can dive to 30 m. Water resistance ratings come from pressure tests in a lab, not from real depths – here's how to read them.",
  ],
  sections: [
    {
      id: "ratings",
      heading: "What the ratings mean in practice",
      blocks: [
        {
          table: {
            head: ["Rating", "In practice"],
            rows: [
              ["30 m / 3 bar", "Splashes and rain. Not for swimming."],
              ["50 m / 5 bar", "Brief swimming in calm water."],
              ["100 m / 10 bar", "Swimming and snorkelling."],
              ["200 m and more", "Diving; most dive watches meet the ISO 6425 standard."],
            ],
          },
        },
        { note: "A Rolex Oyster is water-resistant to at least 100 m, so swimming is fine. Dive models such as the Submariner go to 300 m." },
      ],
    },
    {
      id: "crown",
      heading: "Why the crown matters",
      blocks: [
        "A **screw-down crown** seals the case when it's screwed in. Always check it is fully closed before going near water, and never pull out the crown or press chronograph pushers underwater unless the watch is designed for it.",
      ],
    },
    {
      id: "care",
      heading: "Water resistance doesn't last forever",
      blocks: [
        {
          list: [
            "Gaskets age; have water resistance tested at each service – see our [Rolex service guide](/journal/rolex-service-guide).",
            "Rinse in fresh water after the sea or a chlorinated pool.",
            "Avoid hot tubs and saunas: heat makes gaskets expand and contract.",
            "Vintage watches should be treated as not water-resistant unless recently tested.",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "Can I swim with a 30 m water-resistant watch?", a: "It's best not to. A 30 m rating is meant for splashes and rain; choose 100 m or more for swimming." },
    { q: "Can I swim with my Rolex?", a: "Yes, if the crown is screwed down and the water resistance has been tested recently. Oyster cases are rated to at least 100 m." },
    { q: "Can I shower with a water-resistant watch?", a: "Water is not the problem; heat, soap and sudden temperature changes are. It's safer to take it off." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "Omega – official site", url: "https://www.omegawatches.com/" },
  ],
  shop: [
    { label: "Shop watches", path: "/shop/watches" },
  ],
};
