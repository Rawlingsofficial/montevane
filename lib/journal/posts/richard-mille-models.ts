import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "richard-mille-models",
  title: "Richard Mille Models: A Guide to the Key References",
  metaTitle: "Richard Mille Models Explained: RM 011, RM 035, RM 67, RM 72",
  description: "A guide to Richard Mille models: the RM 011 flyback chronograph, RM 035 Rafael Nadal, RM 055, RM 67 Extra Flat and RM 72-01 – what each is and who it suits.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-04-07",
  keyword: "richard mille models",
  keywords: ["rm 011", "rm 035", "rm 67", "rm 72", "richard mille reference guide"],
  image: "watch_2",
  cover: "richard-mille-rm-titanium-ultra-thin-limited-edition-americas-skeleton-dial-watch-38-mm",
  picks: { brand: "richard-mille", sort: "price_asc", limit: 8 },
  intro: [
    "Richard Mille names its watches by number rather than by collection, which can make the catalogue hard to read. Here are the references collectors ask about most, and what sets each one apart.",
  ],
  sections: [
    {
      id: "numbers",
      heading: "How Richard Mille numbers work",
      blocks: [
        "Every model is an \"RM\" followed by a number; a second number after a hyphen marks a later version or variation (RM 67-01, RM 67-02). Most references come in several materials – titanium, red gold, Carbon TPT, ceramic – which affect weight and price as much as the movement does. For why prices are so high, see [why Richard Mille is so expensive](/journal/why-is-richard-mille-so-expensive).",
      ],
    },
    {
      id: "key",
      heading: "The key references",
      blocks: [
        {
          table: {
            head: ["Reference", "What it is", "Known for"],
            rows: [
              ["RM 011", "Automatic flyback chronograph with annual calendar", "The Felipe Massa watch; the classic sporty RM"],
              ["RM 035", "Ultra-light automatic", "Made for Rafael Nadal; very light materials"],
              ["RM 055", "Ultra-light manual-wind", "Made for golfer Bubba Watson; often in white ceramic"],
              ["RM 67", "Extra-flat automatic", "The slimmest, most wearable RM for every day"],
              ["RM 72-01", "In-house automatic flyback chronograph", "A modern lifestyle chronograph"],
              ["RM 07", "Women's collection", "Jewelry-set and coloured-ceramic versions"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which one to choose",
      blocks: [
        {
          list: [
            "**First Richard Mille, worn daily?** An RM 67 – slim and comfortable.",
            "**Want the iconic look?** An RM 011 or RM 72-01 chronograph.",
            "**Lightness above everything?** An RM 035 or RM 055.",
          ],
        },
        "Always check the papers, the material and the service history – see our [watch insurance guide](/journal/how-to-insure-luxury-watch-handbag) once it's yours.",
        { products: { brand: "richard-mille", query: "rm 011", sort: "price_asc" }, title: "RM 011 available now" },
      ],
    },
  ],
  faq: [
    { q: "What is the most popular Richard Mille?", a: "The RM 011 flyback chronograph and the RM 035 are among the most recognised, along with the slim RM 67 for everyday wear." },
    { q: "What does the number after the hyphen mean?", a: "It marks a later version of the same reference, such as the RM 67-01 and RM 67-02." },
    { q: "Are Richard Mille watches light?", a: "Many are. The brand uses materials such as titanium and Carbon TPT, and some models weigh only a few dozen grams." },
  ],
  sources: [
    { label: "Richard Mille – official site", url: "https://www.richardmille.com/" },
  ],
  shop: [
    { label: "Shop Richard Mille", path: "/shop/watches/richard-mille" },
  ],
};
