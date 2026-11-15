import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "fp-journe-guide",
  title: "F.P. Journe: A Collector's Guide",
  metaTitle: "F.P. Journe Guide: Chronomètre Bleu, Octa, Tourbillon & Prices",
  description: "A collector's guide to F.P. Journe: the watchmaker, the gold movements, key models from the Chronomètre Bleu to the Octa and Tourbillon Souverain, and buying advice.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-01-06",
  keyword: "fp journe",
  keywords: ["fp journe chronometre bleu", "fp journe octa", "fp journe tourbillon souverain", "fp journe price", "independent watchmakers"],
  image: "watch_2",
  cover: "f-p-journe-octa-automatique-lune-platinum-guilloche-silver-dial-40-mm-2",
  picks: { brand: "fp-journe", sort: "price_asc", limit: 8 },
  intro: [
    "Ask serious collectors which modern watchmaker they most admire and one name comes up again and again: François-Paul Journe. In barely 25 years his Geneva manufacture has gone from a small independent to one of the most sought-after names in horology.",
    "Here's what makes an F.P. Journe special and how to choose one.",
  ],
  sections: [
    {
      id: "why",
      heading: "Why collectors love F.P. Journe",
      blocks: [
        {
          list: [
            "**Invention.** Journe's watches are built around original ideas – resonance, constant force, new calibres – rather than variations on a theme. The dials say it: *Invenit et Fecit*, \"invented and made\".",
            "**Gold movements.** Most calibres are made from 18k rose gold rather than brass, finished by hand.",
            "**Tiny production.** Only a small number of watches leave the manufacture each year.",
            "**Design.** Off-centre dials, clear typography and proportions you recognise across a room.",
          ],
        },
      ],
    },
    {
      id: "models",
      heading: "The key collections",
      blocks: [
        {
          table: {
            head: ["Collection", "What it is", "Why it matters"],
            rows: [
              ["Chronomètre Bleu", "Time-only watch with a blue dial in a tantalum case", "The modern cult classic and many collectors' first Journe"],
              ["Octa", "A family of automatic watches on one calibre (date, power reserve, chronograph, calendar)", "Everyday wearability with Journe complications"],
              ["Chronomètre à Résonance", "Two movements that synchronise through resonance", "Journe's signature invention"],
              ["Tourbillon Souverain", "Tourbillon with a constant-force remontoir", "The watch that launched the brand"],
              ["Élégante", "Electro-mechanical watch with a long-life movement", "Elegant, slim, easy to own"],
              ["LineSport", "Sports collection, often in titanium or aluminium", "Journe for daily wear"],
            ],
          },
        },
        { products: { brand: "fp-journe", query: "octa", sort: "price_asc" }, title: "Octa available now" },
      ],
    },
    {
      id: "buy",
      heading: "Buying advice",
      blocks: [
        {
          list: [
            "**Box and papers matter** more than with most brands: complete sets command a premium and are easier to sell.",
            "**Early dials and metals** (for example, early brass-movement pieces and limited dial variants) attract collectors – document what you buy.",
            "**Service at the manufacture** keeps value: ask for the service history.",
            "**Buy what you'll wear.** Journe watches are meant to be worn; small signs of use matter less than completeness and originality.",
          ],
        },
        "If you're weighing a Journe against the big three, read [the Holy Trinity of watchmaking](/journal/holy-trinity-of-watchmaking).",
      ],
    },
  ],
  faq: [
    { q: "Why is F.P. Journe so expensive?", a: "Very small production, gold movements finished by hand, original inventions and very strong collector demand." },
    { q: "What is the most popular F.P. Journe?", a: "The Chronomètre Bleu is the best-known modern Journe, followed by the Octa and Résonance collections." },
    { q: "Can you buy an F.P. Journe at retail?", a: "Boutiques have long waiting lists and allocate to established clients, so most collectors buy on the secondary market." },
  ],
  sources: [
    { label: "F.P. Journe – official site", url: "https://www.fpjourne.com/en" },
  ],
  shop: [
    { label: "Shop F.P. Journe", path: "/shop/watches/fp-journe" },
    { label: "All watches", path: "/shop/watches" },
  ],
};
