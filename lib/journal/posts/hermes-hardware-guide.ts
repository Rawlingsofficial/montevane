import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-hardware-guide",
  title: "Hermès Hardware Guide: Gold, Palladium, Rose Gold and More",
  metaTitle: "Hermès Hardware Guide: GHW vs PHW vs RGHW, Permabrass & More",
  description: "Hermès hardware explained: gold-plated, palladium, rose gold, permabrass, ruthenium, brushed finishes and solid gold with diamonds – how to choose and care for each.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-02-08",
  keyword: "hermes hardware",
  keywords: ["ghw vs phw", "palladium hardware birkin", "gold hardware birkin", "permabrass hermes", "rose gold hardware"],
  image: "gallery/col-custom-rare",
  cover: "pre-owned-hermes-birkin-30-gold-togo-gold-hardware",
  picks: { category: "birkin-bags", query: "gold hardware", sort: "newest", limit: 8 },
  intro: [
    "Hardware is the metal of a Hermès bag – the lock, turn-lock, plaque, feet and rings. It changes the whole character of a bag, and it's one of the first specifications collectors ask for.",
  ],
  sections: [
    {
      id: "types",
      heading: "The hardware options",
      blocks: [
        {
          table: {
            head: ["Hardware", "Abbreviation", "Look", "Best with"],
            rows: [
              ["Gold-plated", "GHW", "Warm, classic", "Gold, Etoupe, Black, warm colours"],
              ["Palladium-plated", "PHW", "Cool, silvery, understated", "Greys, blues, Black, cool colours"],
              ["Rose gold-plated", "RGHW", "Soft pink tone", "Pinks, neutrals, Craie"],
              ["Permabrass", "PBHW", "Warm, slightly brushed brass tone", "Neutrals and earthy colours"],
              ["Ruthenium", "RUHW", "Dark gunmetal", "Black, rare editions"],
              ["Brushed versions", "Brushed GHW / PHW", "Satin, discreet", "So Black and tone-on-tone looks"],
              ["Solid gold with diamonds", "Diamond hardware", "18k gold set with diamonds", "The rarest exotics"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "How to choose",
      blocks: [
        {
          list: [
            "**Match your jewelry.** If you wear yellow gold, choose GHW; white gold or silver, PHW.",
            "**Match the leather's temperature.** Warm colours suit gold; cool colours suit palladium.",
            "**For resale,** gold and palladium are the most in demand; rarer hardware appeals to collectors of specific combinations.",
          ],
        },
        { products: { category: "birkin-bags", query: "palladium", sort: "newest" }, title: "Palladium hardware Birkins" },
      ],
    },
    {
      id: "care",
      heading: "Caring for hardware",
      blocks: [
        "Many new bags arrive with protective film on the hardware; leaving it on keeps the hardware perfect, though many owners remove it for the look. Plated hardware can scratch – avoid storing other metal objects against it and wrap the lock and clochette separately when storing the bag. Hermès can refresh hardware as part of a spa treatment.",
        "More in [how to care for a Hermès bag](/journal/how-to-care-for-a-hermes-bag).",
      ],
    },
  ],
  faq: [
    { q: "Which is better, gold or palladium hardware?", a: "Neither – it depends on the leather colour and the jewelry you wear. Both are equally sought after." },
    { q: "Does Hermès hardware scratch?", a: "Plated hardware can show fine scratches with use. Keep the protective film on, or store the lock and clochette wrapped." },
    { q: "Is Birkin hardware real gold?", a: "Standard hardware is plated. Some rare editions have solid 18k gold hardware set with diamonds." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Christie's – Handbags & Accessories department", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
  ],
};
