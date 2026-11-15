import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-stamp",
  title: "Hermès Heat Stamps: Reading Every Mark on Your Bag",
  metaTitle: "Hermès Stamp Guide: Heat Stamp, Date Stamp & Artisan Mark",
  description: "How to read the marks on a Hermès bag: the 'Hermès Paris Made in France' heat stamp, date stamp, artisan mark and special symbols – and their limits.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-05-10",
  keyword: "hermes stamp",
  keywords: ["hermes paris made in france stamp", "artisan mark", "hermes stamp fake", "hermes blind stamp", "hermes date stamp"],
  image: "product_interior",
  cover: "hermes-pre-owned-2012-togo-birkin-retourne-35-handbag",
  picks: { category: "birkin-bags", sort: "price_asc", limit: 8 },
  intro: [
    "A Hermès bag carries a small set of marks that tell you where and when it was made – and, sometimes, something about the leather or the client who ordered it.",
  ],
  sections: [
    {
      id: "heat-stamp",
      heading: "The heat stamp",
      blocks: [
        "On the front, under the flap, you'll find \"HERMÈS PARIS MADE IN FRANCE\" heat-stamped into the leather, sometimes with foil matching the hardware (gold or silver) or blind (no colour). The letters should be crisp, evenly spaced and pressed cleanly into the leather.",
      ],
    },
    {
      id: "date",
      heading: "The date stamp and artisan mark",
      blocks: [
        "On the strap under the flap (or inside, on some models) is a letter that gives the year of production, often with a shape around it on older bags, and an artisan's mark. Use our [Hermès date stamp chart](/journal/hermes-date-stamp-chart) to read it.",
      ],
    },
    {
      id: "symbols",
      heading: "Special symbols",
      blocks: [
        {
          list: [
            "**Horseshoe:** a special order – see [the horseshoe stamp explained](/journal/hermes-horseshoe-stamp).",
            "**Exotic symbols:** exotic leathers carry an extra small mark next to the Hermès stamp identifying the skin.",
            "**Other marks:** some bags carry symbols for limited editions or employee pieces.",
          ],
        },
      ],
    },
    {
      id: "fakes",
      heading: "Stamps alone don't prove anything",
      blocks: [
        { note: "Stamps are among the first things counterfeiters copy. A bag must be authenticated as a whole – leather, stitching, hardware, construction and stamps together. Read [how to authenticate a Hermès bag](/journal/how-to-authenticate-hermes)." },
      ],
    },
  ],
  faq: [
    { q: "Where is the stamp on a Birkin?", a: "The Hermès heat stamp is on the front under the flap; the date stamp and artisan mark are usually on the strap under the flap." },
    { q: "Can a Hermès stamp be fake?", a: "Yes. Stamps are copied, so they should never be the only check; the whole bag must be authenticated." },
    { q: "What does a blind stamp mean?", a: "A blind stamp is pressed into the leather without foil. On Hermès bags, 'blind stamp' also refers to the date and artisan marks." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Our authenticity guarantee", path: "/authenticity" },
  ],
};
