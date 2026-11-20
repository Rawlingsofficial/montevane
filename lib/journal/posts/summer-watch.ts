import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "summer-watch",
  title: "Summer Watches: Rubber Straps, Titanium and Colour",
  metaTitle: "The Best Summer Watches: Rubber, Titanium & Colour",
  description: "The best summer watches: the Patek Aquanaut, Royal Oak Offshore on rubber, Rolex on Oysterflex, light titanium – and how to care for them.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-06-02",
  keyword: "summer watch",
  keywords: ["aquanaut tropical strap", "offshore rubber", "oysterflex summer", "titanium watch", "colourful dial"],
  image: "gallery/cat-scarves-shawls",
  cover: "audemars-piguet-royal-oak-offshore-26622ce-tourbillon-black-ceramic-skeleton-dial-43-mm-2",
  picks: { brand: "audemars-piguet", query: "offshore", sort: "price_desc", limit: 8 },
  intro: [
    "Summer is when a watch has to cope with sun, salt, sweat and swimming pools. The best summer watches are light, water-resistant and fun to wear.",
  ],
  sections: [
    {
      id: "straps",
      heading: "Rubber straps",
      blocks: [
        {
          list: [
            "**Patek Philippe Aquanaut** – designed around its embossed 'tropical' composite strap. See [Aquanaut vs Nautilus](/journal/patek-aquanaut-vs-nautilus).",
            "**Audemars Piguet Royal Oak Offshore** – bold and sporty on rubber. See [Royal Oak vs Offshore](/journal/royal-oak-vs-royal-oak-offshore).",
            "**Rolex on Oysterflex** – the Yacht-Master, Daytona and Day-Date in gold on Rolex's metal-cored elastomer strap.",
          ],
        },
      ],
    },
    {
      id: "materials",
      heading: "Light materials",
      blocks: [
        "Titanium and carbon are lighter than steel and comfortable in the heat. Richard Mille built its reputation on them – see [Richard Mille models](/journal/richard-mille-models) – and titanium is now found across the industry, from Tudor to Rolex.",
      ],
    },
    {
      id: "care",
      heading: "Summer care",
      blocks: [
        {
          list: [
            "Make sure the crown is screwed down before swimming – read [water resistance explained](/journal/watch-water-resistance).",
            "Rinse in fresh water after the sea or the pool.",
            "Don't leave watches in direct sun or a hot car.",
            "Keep exotic-leather straps away from water and sunscreen.",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "What is the best watch for summer?", a: "A water-resistant watch on rubber or a bracelet – such as an Aquanaut, Royal Oak Offshore or a Rolex on Oysterflex." },
    { q: "Can you wear a leather strap in summer?", a: "You can, but sweat and water age leather quickly; rubber or a bracelet is more practical." },
    { q: "Is titanium good for summer?", a: "Yes. It's light, strong and comfortable in the heat." },
  ],
  sources: [
    { label: "Patek Philippe – Aquanaut collection", url: "https://www.patek.com/en/collection/aquanaut" },
    { label: "Audemars Piguet – Royal Oak Offshore", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak-offshore.html" },
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Shop watches", path: "/shop/watches" },
  ],
};
