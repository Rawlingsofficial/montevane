import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "audemars-piguet-royal-oak-guide",
  title: "Audemars Piguet Royal Oak: The Collector's Guide",
  metaTitle: "Audemars Piguet Royal Oak Guide: References & Prices",
  description: "The Audemars Piguet Royal Oak explained: Genta's 1972 design, the Jumbo, 15500 and 15510, Offshore and Code 11.59, what to check and current prices.",
  category: "Watch Guides",
  cluster: "watches",
  pillar: true,
  date: "2026-11-09",
  image: "watch_3",
  intro: [
    "In 1972 Audemars Piguet launched a steel watch priced like a gold one, with an octagonal bezel held by eight visible screws. The industry thought it was mad. The Royal Oak went on to define the luxury sports watch and remains the house's signature fifty years later.",
    "This guide covers the references collectors look for, how the Royal Oak family is organised, and what to check before you buy.",
  ],
  sections: [
    {
      id: "history",
      heading: "Le Brassus and the 1972 revolution",
      blocks: [
        "Jules Louis Audemars and Edward Auguste Piguet founded the company in Le Brassus, in Switzerland's Vallée de Joux, in 1875. It is still run by the founding families.",
        "The Royal Oak, reference 5402ST, was designed by Gérald Genta and introduced at Basel in 1972: 39 mm, ultra-thin, in steel, with an integrated bracelet and the *Petite Tapisserie* guilloché dial. Its size earned it the nickname \"Jumbo\". Genta would go on to design the Patek Philippe Nautilus four years later.",
      ],
    },
    {
      id: "references",
      heading: "Key Royal Oak references",
      blocks: [
        {
          table: {
            head: ["Reference", "Size", "Why it matters"],
            rows: [
              ["5402ST", "39 mm", "The 1972 original \"Jumbo\" – the collector's grail"],
              ["15202ST", "39 mm", "The modern Jumbo extra-thin, produced until 2021"],
              ["16202ST", "39 mm", "Its 2022 successor with the new calibre 7121"],
              ["15500ST", "41 mm", "The everyday time-and-date Royal Oak, 2019–2022"],
              ["15510ST", "41 mm", "Its 2022 successor with refreshed dial details"],
              ["26240ST / 26331ST", "41 mm", "Royal Oak chronographs – sporty and highly sought after"],
            ],
          },
        },
        "Royal Oaks in rose gold, white gold, titanium and two-tone exist across these references, as do skeletonised and perpetual-calendar versions at the top of the range.",
      ],
    },
    {
      id: "family",
      heading: "Offshore and Code 11.59",
      blocks: [
        "The **Royal Oak Offshore** arrived in 1993: bigger, bolder and more muscular, with rubber-clad pushers and a sportier character. It remains popular in ceramic, forged carbon and colourful limited editions.",
        "**Code 11.59**, launched in 2019, is AP's round-cased contemporary collection – a different direction from the Royal Oak, with complex case architecture and dials.",
      ],
    },
    {
      id: "buying",
      heading: "What to check before buying",
      blocks: [
        {
          list: [
            "**Case and bracelet finishing** – the Royal Oak's alternating brushed and polished surfaces are its signature. Over-polishing softens the bevels and reduces value.",
            "**Bracelet stretch** – the integrated bracelet is complex; ask about its condition and whether all links are included.",
            "**Dial** – check the Tapisserie pattern is crisp and the applied markers are clean.",
            "**Papers and service** – a full set and recent AP service add confidence and value.",
          ],
        },
        "At the time of writing (November 2026), Audemars Piguet watches on [our Audemars Piguet page](/shop/watches/audemars-piguet) ranged from $15,200 to $1,394,900. Every piece is checked by our specialists, with a full refund if an independent check ever disagrees.",
      ],
    },
  ],
  faq: [
    { q: "What is a Royal Oak \"Jumbo\"?", a: "The 39 mm extra-thin Royal Oak descended from the original 1972 reference 5402ST. Modern Jumbos are the 15202ST and, since 2022, the 16202ST." },
    { q: "What is the difference between the 15500 and 15510?", a: "Both are 41 mm time-and-date Royal Oaks. The 15510, introduced in 2022, replaced the 15500 with updated dial details." },
    { q: "Who designed the Royal Oak?", a: "Gérald Genta, who also designed the Patek Philippe Nautilus. The Royal Oak was launched in 1972." },
    { q: "Is the Royal Oak Offshore a different watch?", a: "Yes. The Offshore, launched in 1993, is a larger, sportier interpretation of the Royal Oak design." },
  ],
  sources: [
    { label: "Audemars Piguet – Royal Oak collection", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html" },
    { label: "Audemars Piguet – Royal Oak Offshore collection", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak-offshore.html" },
  ],
  shop: [
    { label: "Shop Audemars Piguet", path: "/shop/watches/audemars-piguet" },
    { label: "Audemars Piguet Royal Oak", path: "/models/audemars-piguet-royal-oak" },
    { label: "All rare watches", path: "/shop/watches" },
  ],
};
