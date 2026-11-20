import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "valentines-day-luxury-gifts",
  title: "Valentine's Day Luxury Gifts She'll Keep Forever",
  metaTitle: "Luxury Valentine's Day Gifts: Diamonds, Hermès & Watches",
  description: "Luxury Valentine's Day gift ideas: diamond rings and tennis bracelets, Hermès silk and charms, a first Birkin or a Lady-Datejust – chosen to last a lifetime.",
  category: "Gift Guides",
  cluster: "buying",
  date: "2027-01-27",
  keyword: "luxury valentines day gifts",
  keywords: ["valentines gift for her luxury", "valentines jewelry", "hermes valentines gift", "diamond valentines gift", "romantic luxury gift"],
  image: "gallery/cat-jewelry",
  cover: "emerald-cut-diamond-drop-earrings-platinum-emerald-cut-diamond-drop-earrings-10-51-ct",
  picks: { category: "jewelry", sort: "price_asc", limit: 8 },
  intro: [
    "Flowers last a week. A piece of fine jewelry or Hermès lasts a lifetime – and becomes part of your story every time it's worn.",
    "Here are our favourite Valentine's gifts, available now. Contact us by early February to make sure your gift arrives in time.",
  ],
  sections: [
    {
      id: "jewelry",
      heading: "Diamonds: the classic Valentine's gift",
      blocks: [
        "A tennis bracelet is the piece she'll wear every day. A Toi et Moi ring – two stones side by side, \"you and me\" – is the most romantic design in jewelry. And earrings are the easiest to get right because there's no size to guess.",
        { products: { category: "jewelry", query: "toi moi", sort: "price_asc" }, title: "Toi et Moi rings" },
        { products: { category: "jewelry", query: "tennis", sort: "price_asc" }, title: "Tennis bracelets and necklaces" },
      ],
    },
    {
      id: "hermes",
      heading: "Hermès: silk, charms and the ultimate surprise",
      blocks: [
        "A silk Twilly or carré in red or pink is the perfect Valentine's gesture. A Rodeo charm adds joy to a bag she already loves. And if you want a moment she will never forget, a Birkin or Kelly.",
        { products: { category: "bag-charms", query: "rodeo", sort: "newest" }, title: "Rodeo charms" },
        { products: { category: "twilly-scarves", query: "rose", sort: "newest" }, title: "Twillys in rose and red" },
      ],
    },
    {
      id: "watch",
      heading: "A watch for her",
      blocks: [
        "The Rolex Lady-Datejust and Datejust 31 are the women's watches of a lifetime – especially with a diamond bezel or mother-of-pearl dial. Read [the Rolex Datejust for women](/journal/rolex-datejust-for-women).",
        { products: { brand: "rolex", query: "datejust 31", sort: "newest" }, title: "Rolex Datejust 31" },
      ],
    },
    {
      id: "tips",
      heading: "Getting it right",
      blocks: [
        {
          list: [
            "Find her ring size discreetly – our [engagement ring guide](/journal/engagement-ring-buying-guide) explains how.",
            "Check her metal: yellow, white or rose gold.",
            "Every piece can be returned within 14 days of delivery, unworn and complete.",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "What is a good luxury Valentine's gift?", a: "Diamond earrings or a tennis bracelet, an Hermès Twilly or Rodeo charm, or a Rolex Lady-Datejust for a milestone." },
    { q: "When should I order for Valentine's Day?", a: "Contact us by early February so we can confirm delivery before February 14." },
    { q: "What if the ring doesn't fit?", a: "Most rings can be resized by a jeweller. Unworn pieces can be returned within 14 days of delivery." },
  ],
  sources: [
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
  ],
  shop: [
    { label: "Fine jewelry", path: "/shop/jewelry" },
    { label: "Bag charms", path: "/shop/bag-charms" },
    { label: "Twilly scarves", path: "/shop/twilly-scarves" },
  ],
};
