import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "patek-philippe-buying-guide",
  title: "Patek Philippe Buying Guide: Nautilus, Aquanaut and Calatrava",
  metaTitle: "Patek Philippe Buying Guide: Nautilus, Aquanaut & More",
  description: "How to buy a Patek Philippe: the Nautilus, Aquanaut, Calatrava and complications, how references work, the Patek Philippe Seal, and current market prices.",
  category: "Watch Guides",
  cluster: "watches",
  pillar: true,
  date: "2026-11-10",
  keyword: "patek philippe buying guide",
  keywords: ["nautilus", "aquanaut", "calatrava", "pre-owned patek philippe"],
  image: "watch_2",
  cover: "patek-philippe-nautilus-7118-1452g-001-18k-white-gold-ruby-bezel-diamond-pave-ruby-index",
  picks: { brand: "patek-philippe", sort: "newest" },
  intro: [
    "Patek Philippe is the watchmaker collectors aspire to. Its watches set auction records, its sports models have waiting lists measured in years, and its slogan – that you never actually own one, you merely look after it for the next generation – is as much a promise about value as about craft.",
    "Here is how the collection is structured, which references matter, and how to buy one with confidence.",
  ],
  sections: [
    {
      id: "history",
      heading: "Geneva since 1839",
      blocks: [
        "Antoine Norbert de Patek founded the company in Geneva in 1839 with François Czapek; the French watchmaker Adrien Philippe, inventor of a keyless winding system, joined in 1845. Since 1932 the company has been owned by the Stern family, and it remains one of the last fully independent, family-owned Genevan manufactures.",
        "Every Patek Philippe mechanical watch carries the **Patek Philippe Seal**, the company's own quality standard introduced in 2009, which covers the whole watch – movement finishing, precision and after-sales service – rather than the movement alone.",
      ],
    },
    {
      id: "collections",
      heading: "The collections",
      blocks: [
        {
          table: {
            head: ["Collection", "Introduced", "Character"],
            rows: [
              ["[Nautilus](/models/patek-philippe-nautilus)", "1976", "Gérald Genta's porthole-shaped luxury sports watch; integrated bracelet, horizontally embossed dial"],
              ["Aquanaut", "1997", "A younger, sportier sibling with a rounded octagonal case and \"tropical\" composite strap"],
              ["Calatrava", "1932", "The purist's dress watch, descended from the Reference 96"],
              ["Complications", "–", "Annual calendars, chronographs, world times – everyday complications, beautifully finished"],
              ["Grand Complications", "–", "Perpetual calendars, minute repeaters, tourbillons; the summit of the house"],
            ],
          },
        },
      ],
    },
    {
      id: "nautilus",
      heading: "The Nautilus in detail",
      blocks: [
        "The original Nautilus, reference 3700/1A, launched in 1976 in steel at a time when a steel watch from a great house was a provocation. Its descendants define modern collecting:",
        {
          list: [
            "**5711/1A** – the time-and-date steel Nautilus that became the most in-demand watch of its era. Patek discontinued it in 2021, ending with a limited edition in Tiffany blue.",
            "**5811/1G** – its successor from 2022, in white gold with a 41 mm case.",
            "**5712, 5726, 5980, 5990** – Nautilus models with power reserve and moon phase, annual calendar, chronograph and travel time. Often better value than the 5711 for a comparable presence on the wrist.",
            "**Ladies' Nautilus 7118** – a 35 mm Nautilus in steel, gold or with diamonds.",
          ],
        },
      ],
    },
    {
      id: "references",
      heading: "Reading a Patek Philippe reference",
      blocks: [
        "Patek references are written as a four-digit number followed by a suffix, for example **5711/1A-010**. The number identifies the model; the letters after the slash identify the metal – A for steel (*acier*), J for yellow gold (*jaune*), R for rose gold, G for white gold (*gris*), P for platinum – and a \"/1\" means the watch comes on a metal bracelet. The final three digits identify the dial variant.",
      ],
    },
    {
      id: "buying",
      heading: "Buying a Patek Philippe",
      blocks: [
        {
          list: [
            "**Papers and extracts** – a full set adds value; Patek can also issue an Extract from the Archives confirming a watch's original specification.",
            "**Service history** – a recent Patek service is a plus; ask what was done.",
            "**Condition** – sharp case edges matter on the Nautilus and Aquanaut, whose brushed and polished surfaces are hard to restore without softening.",
            "**The seller** – every Patek on Montévane is checked by our specialists before it ships, with a full refund if an independent check ever disagrees.",
          ],
        },
        "At the time of writing (November 2026), Patek Philippe watches on [our Patek Philippe page](/shop/watches/patek-philippe) ranged from $15,200 for classic Calatrava and Aquanaut references to $2,975,900 for the rarest complications.",
      ],
    },
  ],
  faq: [
    { q: "Why was the Patek Philippe 5711 discontinued?", a: "Patek Philippe ended the steel 5711/1A in 2021 after 15 years, finishing with a limited Tiffany-blue edition. The white-gold 5811/1G followed in 2022." },
    { q: "What does the A or G in a Patek reference mean?", a: "It is the case metal: A for steel, J for yellow gold, R for rose gold, G for white gold and P for platinum. \"/1\" indicates a metal bracelet." },
    { q: "Is the Aquanaut a good alternative to the Nautilus?", a: "Yes. It shares the Nautilus's sporty spirit with a more contemporary design and is usually easier to find and less expensive." },
    { q: "What is the Patek Philippe Seal?", a: "Patek Philippe's own quality standard, introduced in 2009. It covers the finishing and precision of the whole watch as well as service, and appears on every mechanical Patek." },
  ],
  sources: [
    { label: "Patek Philippe – Nautilus collection", url: "https://www.patek.com/en/collection/nautilus" },
    { label: "Patek Philippe – Aquanaut collection", url: "https://www.patek.com/en/collection/aquanaut" },
    { label: "Patek Philippe – Calatrava collection", url: "https://www.patek.com/en/collection/calatrava" },
  ],
  shop: [
    { label: "Shop Patek Philippe", path: "/shop/watches/patek-philippe" },
    { label: "Patek Philippe Nautilus", path: "/models/patek-philippe-nautilus" },
    { label: "All rare watches", path: "/shop/watches" },
  ],
};
