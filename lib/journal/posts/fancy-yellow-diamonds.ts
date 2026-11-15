import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "fancy-yellow-diamonds",
  title: "Fancy Yellow Diamonds: Colour Grades, Value and Settings",
  metaTitle: "Fancy Yellow Diamonds Explained: Grades, Value & Settings",
  description: "What makes a diamond fancy yellow, how GIA grades colour intensity from Fancy Light to Fancy Vivid, what affects price, and the settings that show it best.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2026-12-07",
  keyword: "fancy yellow diamonds",
  keywords: ["canary diamond", "yellow diamond ring", "fancy intense yellow"],
  image: "jewelry_1",
  cover: "fancy-yellow-radiant-cut-diamond-halo-ring-platinum-and-18k-yellow-gold-rectangular-and",
  picks: { category: "jewelry", piece: "Ring", sort: "price_desc" },
  intro: [
    "Most diamonds are prized for having as little colour as possible. Fancy coloured diamonds turn that around: in a fancy yellow – often called a \"canary\" diamond – colour is the point, and the stronger and purer it is, the more the stone is worth.",
    "Here is how yellow diamonds are graded and how to choose one. If you are new to diamonds, start with our [diamond buying guide](/journal/diamond-buying-guide).",
  ],
  sections: [
    {
      id: "what",
      heading: "What makes a diamond yellow",
      blocks: [
        "Yellow colour comes from nitrogen atoms in the diamond's crystal structure, which absorb blue light. Small amounts give the faint tint of a lower white-diamond colour grade; higher concentrations produce a yellow strong enough to be graded as a fancy colour rather than on the D-to-Z scale.",
      ],
    },
    {
      id: "grades",
      heading: "How fancy colour is graded",
      blocks: [
        "For coloured diamonds, [GIA](https://www.gia.edu/gia-about) grades hue, tone and saturation together and describes the result with an intensity term. From weakest to strongest:",
        {
          list: [
            "Faint, Very Light, Light",
            "**Fancy Light** – a soft, pale yellow",
            "**Fancy** – a clear, definite yellow",
            "**Fancy Intense** – rich and saturated",
            "**Fancy Vivid** – the strongest, purest yellow, and the most valuable",
            "Fancy Deep and Fancy Dark – darker tones",
          ],
        },
        "Unlike white diamonds, colour drives value more than clarity in a fancy yellow. A Fancy Vivid stone with modest clarity can be worth more than a Fancy Light stone with excellent clarity.",
      ],
    },
    {
      id: "cuts",
      heading: "Cuts that intensify colour",
      blocks: [
        "Radiant and cushion cuts are favoured for yellow diamonds because their faceting concentrates colour and makes it look deeper. That is why most fine yellow diamonds – including many on Montévane – are cushion or radiant cut.",
      ],
    },
    {
      id: "settings",
      heading: "Setting a yellow diamond",
      blocks: [
        "Yellow gold prongs under the centre stone reflect warm light into it and strengthen its colour, while a platinum or white-gold band and a halo of white diamonds create contrast. The combination – platinum with 18k yellow-gold prongs – is the classic way to set a canary diamond.",
        "At the time of writing (November 2026), fancy yellow pieces on our [jewelry page](/shop/jewelry) range from $18,000 to just over $3 million, from halo rings to statement necklaces.",
      ],
    },
  ],
  faq: [
    { q: "Are yellow diamonds rarer than white diamonds?", a: "Strongly coloured yellow diamonds are rare compared with colourless ones. Stones graded Fancy Intense or Fancy Vivid are the rarest and most valuable." },
    { q: "What is a canary diamond?", a: "A trade name for a yellow diamond with strong, saturated colour, typically Fancy Intense or Fancy Vivid." },
    { q: "Should a yellow diamond have a GIA report?", a: "Yes. A coloured diamond report confirms that the colour is natural and records its intensity grade, which is the main driver of value." },
  ],
  sources: [
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
    { label: "GIA – About the Gemological Institute of America", url: "https://www.gia.edu/gia-about" },
  ],
  shop: [
    { label: "Shop fine jewelry", path: "/shop/jewelry" },
    { label: "Diamond rings", path: "/shop/jewelry/rings" },
    { label: "Read the diamond buying guide", path: "/journal/diamond-buying-guide" },
  ],
};
