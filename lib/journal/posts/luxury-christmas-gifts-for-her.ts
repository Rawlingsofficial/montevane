import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "luxury-christmas-gifts-for-her",
  title: "Luxury Christmas Gifts for Her: Hermès, Diamonds and Watches",
  metaTitle: "Luxury Christmas Gifts for Her 2026: Hermès, Diamonds & More",
  description: "Luxury Christmas gift ideas for her at every budget: Hermès Twillys and Rodeo charms, a first Birkin, a Lady Datejust or a diamond ring, delivered before Christmas.",
  category: "Gift Guides",
  cluster: "buying",
  date: "2026-11-15",
  keyword: "luxury christmas gifts for her",
  keywords: ["hermes gift for her", "designer christmas gifts", "luxury gift ideas for wife", "birkin as a gift", "rolex gift for her"],
  image: "gallery/cat-scarves-shawls",
  cover: "hermes-ardoise-epsom-constance-elan-permabrass-hardware-2025-and-rodeo-robeo-rock-charm",
  picks: { category: "bag-charms", sort: "price_desc", limit: 8 },
  intro: [
    "The best luxury gifts are the ones she would never buy for herself, and the ones she will still be using in twenty years. That rules out most of what fills holiday gift guides.",
    "This guide is organised by budget, and every piece shown is available now. Order by **December 18** for delivery before Christmas ([see delivery details](/journal/christmas-delivery-deadline)).",
  ],
  sections: [
    {
      id: "under-1000",
      heading: "Under $1,000: the Hermès Twilly",
      blocks: [
        "A Twilly is a narrow silk ribbon (about 86 cm long) printed with an Hermès design. She can wrap it around a Birkin or Kelly handle, tie it in her hair, wear it at the neck or around the wrist. It is the most versatile Hermès gift there is, and a natural first piece for someone new to the house.",
        "If she already owns an Hermès bag, choose a Twilly in a colour from the same family as the leather. If she doesn't, a print with black or navy will work with almost anything. Our guide to [tying a Twilly](/journal/how-to-tie-a-twilly) shows the classic ways to wear one.",
        { products: { category: "twilly-scarves", sort: "newest" }, title: "Twillys available now" },
      ],
    },
    {
      id: "1000-5000",
      heading: "$1,000 – $5,000: Rodeo charms and silk carrés",
      blocks: [
        "The Rodeo horse charm is the accessory collectors hang from their Birkins, and it is now as recognisable as the bag itself. It comes in three sizes – PM, MM and GM – and countless colour combinations. A silk carré (scarf) is the other classic: the 90 cm square is the house's signature, and many collectors frame the rarest designs.",
        { products: { category: "bag-charms", query: "rodeo", sort: "newest" }, title: "Rodeo charms" },
        { products: { category: "scarves-shawls", sort: "newest" }, title: "Silk carrés and shawls" },
      ],
    },
    {
      id: "5000-25000",
      heading: "$5,000 – $25,000: a first watch or a first Birkin",
      blocks: [
        "This is the range where a gift becomes an heirloom. A Rolex Lady-Datejust or Datejust 31 is the most classic women's watch of the last fifty years. A pre-owned Birkin 30 or 35 in Togo or Epsom also sits in this bracket: no boutique waitlist, ready to wrap.",
        { products: { query: "datejust 31", brand: "rolex", max: 25000, sort: "price_desc" }, title: "Rolex Datejust 31" },
        { products: { category: "birkin-bags", max: 25000, sort: "price_desc" }, title: "Birkins under $25,000" },
      ],
    },
    {
      id: "statement",
      heading: "The statement gift: diamonds",
      blocks: [
        "For a once-in-a-lifetime gift, fine jewelry outlasts everything else on this list. Toi et Moi rings (two stones side by side) are the most requested style this season, and a diamond tennis bracelet is the piece she will wear every day.",
        { products: { category: "jewelry", min: 5000, max: 100000, sort: "price_asc" }, title: "Fine jewelry" },
        "Read our [diamond buying guide](/journal/diamond-buying-guide) before choosing, and ask us for the grading report of any stone.",
      ],
    },
    {
      id: "tips",
      heading: "How to get it right",
      blocks: [
        {
          list: [
            "**Look at what she already wears.** Yellow or white gold, bright colours or neutrals, small or statement pieces.",
            "**Bags: size matters more than colour.** If she carries a lot, a Birkin 30; if she prefers small bags, a 25. See [Birkin 25 vs 30](/journal/birkin-25-vs-30).",
            "**Rings: find her size discreetly** by borrowing a ring she wears on the same finger and having a jeweller measure it.",
            "**Returns:** every piece can be returned within 14 days of delivery, unworn and complete, so a gift that's not quite right can still be exchanged.",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "What is the best Hermès gift under $1,000?", a: "A silk Twilly. It is versatile, beautifully packaged and works whether or not she already owns an Hermès bag." },
    { q: "Will my gift arrive before Christmas?", a: "Orders confirmed by December 18 are delivered before Christmas in the US, the UK and Europe. Contact us early for other destinations." },
    { q: "Can a gift be returned?", a: "Yes. Pieces can be returned within 14 days of delivery, unworn and complete as received. The refund goes back to the account the payment came from." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
  ],
  shop: [
    { label: "Bag charms", path: "/shop/bag-charms" },
    { label: "Twilly scarves", path: "/shop/twilly-scarves" },
    { label: "Fine jewelry", path: "/shop/jewelry" },
    { label: "Birkin bags", path: "/shop/birkin-bags" },
  ],
};
