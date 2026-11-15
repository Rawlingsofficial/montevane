import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "christmas-delivery-deadline",
  title: "Christmas Delivery 2026: Order by December 18",
  metaTitle: "Christmas Delivery 2026: Luxury Gifts Delivered in Time",
  description: "Order by December 18 for delivery before Christmas. How our insured express delivery works, what to expect for duties, and how to send a luxury gift discreetly.",
  category: "Buying Advice",
  cluster: "buying",
  date: "2026-11-15",
  keyword: "luxury gifts delivered before christmas",
  keywords: ["christmas delivery deadline", "last order date for christmas", "insured delivery luxury watch", "send a birkin as a gift"],
  image: "editorial_setup",
  cover: "hermes-rodeo-robeo-coeur-charm-pm-jaune-milton-bleu-nuit-and-bleu-tie-milo-lambskin",
  picks: { category: "bag-charms", sort: "newest", limit: 4 },
  intro: [
    "**Order by Friday, December 18, 2026** for delivery before Christmas. For destinations outside the US, the UK and Europe, contact us as early as you can so we can confirm timing.",
    "Here is exactly how it works, from the moment you enquire to the moment the box is opened.",
  ],
  sections: [
    {
      id: "dates",
      heading: "Key dates",
      blocks: [
        {
          table: {
            head: ["Date", "What it means"],
            rows: [
              ["December 18", "Last day to confirm an order for delivery before Christmas (US, UK, Europe)"],
              ["After December 18", "We will still ship as fast as possible – ask us for a realistic date"],
            ],
          },
        },
        { note: "An order is confirmed once payment has been received. Bank wires can take one to two business days to arrive, so allow for this." },
      ],
    },
    {
      id: "how",
      heading: "How delivery works",
      blocks: [
        {
          list: [
            "**Insured express**, fully tracked, with signature on delivery – arranged by us end to end.",
            "**Complimentary** on orders over $5,000; smaller orders from $45.",
            "**Secure courier** for pieces over $100,000.",
          ],
        },
        "Read the full details on [Payment & Shipping](/payment-shipping).",
      ],
    },
    {
      id: "gift",
      heading: "Sending it as a gift",
      blocks: [
        "Tell us the piece is a gift and we can ship it straight to the recipient's address – just ask us about gift packaging and notes when you order. Because delivery needs a signature, choose an address where someone will be in, or a workplace with a reception.",
      ],
    },
    {
      id: "duties",
      heading: "Duties and taxes",
      blocks: [
        "Shipping across borders can mean import VAT and customs duties in the destination country. We confirm the amount before you pay, so there are no surprises at the door. Our guide to [import duties](/journal/import-duties-luxury-watches-bags) explains how they are calculated.",
      ],
    },
    {
      id: "ideas",
      heading: "Still deciding?",
      blocks: [
        "See our gift guides for [her](/journal/luxury-christmas-gifts-for-her), for [him](/journal/luxury-watch-gifts-for-him) and our [Hermès gift ideas](/journal/hermes-gift-ideas), or [contact us](/contact) and a specialist will suggest pieces for your budget.",
      ],
    },
  ],
  faq: [
    { q: "What is the last day to order for Christmas delivery?", a: "December 18, 2026, for the US, the UK and Europe. For other countries, contact us as early as possible to confirm timing." },
    { q: "Is delivery insured?", a: "Yes. Every shipment is fully insured, tracked and requires a signature on delivery." },
    { q: "Can I return a Christmas gift?", a: "Yes, within 14 days of delivery, unworn and complete as received. The refund goes back to the account the payment came from." },
  ],
  sources: [
    { label: "U.S. Customs and Border Protection – Basic import and export", url: "https://www.cbp.gov/trade/basic-import-export" },
    { label: "GOV.UK – Tax and customs for goods sent from abroad", url: "https://www.gov.uk/goods-sent-from-abroad/tax-and-duty" },
  ],
  shop: [
    { label: "Payment & shipping", path: "/payment-shipping" },
    { label: "Contact us", path: "/contact" },
  ],
};
