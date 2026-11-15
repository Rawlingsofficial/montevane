import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "import-duties-luxury-watches-bags",
  title: "Import Duties on Luxury Watches and Bags, Explained",
  metaTitle: "Import Duty on Watches & Handbags: US, UK and EU Explained",
  description: "How import duty and VAT work when you buy a luxury watch or Hermès bag from abroad: the US, UK and EU explained, what changes the amount, and how to avoid surprises.",
  category: "Buying Advice",
  cluster: "buying",
  date: "2027-02-24",
  keyword: "import duty on watches",
  keywords: ["import duty handbag", "customs on rolex", "uk import vat watch", "eu customs luxury goods", "do i pay duty on a watch from abroad"],
  image: "editorial_setup",
  cover: "patek-philippe-nautilus-7118-1450r-001-18k-rose-gold-pave-dial-35-mm",
  intro: [
    "Buying from another country can open up a much wider choice of pieces – and an extra line on the bill. Import duties and taxes depend on where the piece is going, where it was made, what it is and its value.",
    "Here's how it works. Rules change often, so treat this as a general guide: before you pay us, we confirm the exact amount for your piece and destination.",
  ],
  sections: [
    {
      id: "basics",
      heading: "The two charges",
      blocks: [
        {
          list: [
            "**Customs duty** – a tax on imported goods, set by the destination country according to the product category and often the country of origin.",
            "**Import VAT or sales tax** – charged by many countries on the value of the goods (often including shipping and duty).",
          ],
        },
      ],
    },
    {
      id: "countries",
      heading: "By destination",
      blocks: [
        {
          table: {
            head: ["Destination", "What usually applies", "Good to know"],
            rows: [
              ["United States", "Customs duty by product category and origin; no federal VAT (state sales tax may apply)", "Watch duty can be calculated on several components. Tariffs on some origins have changed several times since 2025."],
              ["United Kingdom", "Import VAT (standard rate 20%) and customs duty depending on the product and origin", "Duty may be reduced or zero for goods that qualify under trade agreements"],
              ["European Union", "Import VAT at the destination country's rate, plus customs duty depending on product and origin", "VAT rates differ by country"],
            ],
          },
        },
        { note: "Some materials – crocodile, alligator and other exotics – also require CITES documentation, and a few countries restrict them entirely. See [Hermès exotic leathers](/journal/hermes-exotic-leathers)." },
      ],
    },
    {
      id: "avoid",
      heading: "How to avoid surprises",
      blocks: [
        {
          list: [
            "Ask the seller to confirm duties and taxes **before** you pay, and who pays them.",
            "Make sure the invoice describes the piece accurately – under-declaring value is illegal and voids insurance.",
            "Keep the import paperwork with the piece's documents; you may need it when you sell.",
          ],
        },
        "When you buy from Montévane, we tell you the duties and taxes for your destination before payment. See [Payment & Shipping](/payment-shipping).",
      ],
    },
  ],
  faq: [
    { q: "Do I pay import duty on a watch bought abroad?", a: "Usually yes when it is shipped to you across a border. The amount depends on your country, the watch's origin and its value." },
    { q: "How much is UK import VAT on a watch?", a: "The standard rate of VAT is 20%, charged on import in addition to any customs duty." },
    { q: "Who pays import duties when I buy from Montévane?", a: "Duties and import taxes are paid by the buyer, and we confirm the amount before you pay." },
  ],
  sources: [
    { label: "U.S. Customs and Border Protection – Basic import and export", url: "https://www.cbp.gov/trade/basic-import-export" },
    { label: "GOV.UK – Tax and customs for goods sent from abroad", url: "https://www.gov.uk/goods-sent-from-abroad/tax-and-duty" },
    { label: "European Commission – Calculation of customs duties", url: "https://taxation-customs.ec.europa.eu/customs-4/calculation-customs-duties_en" },
  ],
  shop: [
    { label: "Payment & shipping", path: "/payment-shipping" },
    { label: "Contact us", path: "/contact" },
  ],
};
