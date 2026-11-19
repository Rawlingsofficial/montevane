import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "richard-mille-vs-audemars-piguet",
  title: "Richard Mille vs Audemars Piguet",
  metaTitle: "Richard Mille vs Audemars Piguet: RM vs Royal Oak Offshore",
  description: "Richard Mille vs Audemars Piguet: a 2001 disruptor against a manufacture founded in 1875 – design, materials, comfort, prices, and RM vs Royal Oak Offshore.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-06-04",
  keyword: "richard mille vs audemars piguet",
  keywords: ["rm vs royal oak offshore", "luxury sports watch", "richard mille or ap", "royal oak vs richard mille"],
  image: "watches_showcase",
  cover: "richard-mille-rm56-01-transparent-dial-tourbillon-brown-sapphire-skeleton-dial-50-mm",
  picks: { brand: "richard-mille", sort: "price_desc", limit: 8 },
  intro: [
    "Walk around Monaco or Miami and you'll see both on the wrists of the same crowd. Audemars Piguet invented the luxury sports watch with the Royal Oak in 1972; Richard Mille reinvented it from 2001.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Richard Mille", "Audemars Piguet"],
            rows: [
              ["Founded", "2001", "1875, Le Brassus"],
              ["Signature", "Tonneau case, skeletonised movement", "Octagonal bezel, integrated bracelet"],
              ["Materials", "Titanium, Carbon TPT, ceramic, composites", "Steel, gold, ceramic, titanium"],
              ["On the wrist", "Very light, often on rubber", "Solid and substantial on a bracelet"],
              ["Price", "Usually far higher", "Wide range, from steel Royal Oaks upwards"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which suits you?",
      blocks: [
        "If you want watchmaking heritage and a design icon you'll wear for decades, the Royal Oak or Royal Oak Offshore is the natural choice – start with our [Royal Oak guide](/journal/audemars-piguet-royal-oak-guide). If you want the most technical, lightest and most attention-grabbing sports watch, it's a Richard Mille – see [why it's so expensive](/journal/why-is-richard-mille-so-expensive) and [the key models](/journal/richard-mille-models).",
        { products: { brand: "audemars-piguet", query: "offshore", sort: "price_desc" }, title: "Royal Oak Offshore available now" },
      ],
    },
  ],
  faq: [
    { q: "Is Richard Mille better than Audemars Piguet?", a: "Neither is better; they're different. AP has 150 years of history and the Royal Oak; Richard Mille offers extreme materials and lightness." },
    { q: "Why is Richard Mille more expensive than AP?", a: "Very small production, costly materials and complex skeletonised movements push Richard Mille prices far higher." },
    { q: "Is the Royal Oak Offshore like a Richard Mille?", a: "Both are bold sports watches, but the Offshore has AP's octagonal design and is generally heavier and more traditional." },
  ],
  sources: [
    { label: "Richard Mille – official site", url: "https://www.richardmille.com/" },
    { label: "Audemars Piguet – official site", url: "https://www.audemarspiguet.com/com/en/home.html" },
  ],
  shop: [
    { label: "Shop Richard Mille", path: "/shop/watches/richard-mille" },
    { label: "Shop Audemars Piguet", path: "/shop/watches/audemars-piguet" },
  ],
};
