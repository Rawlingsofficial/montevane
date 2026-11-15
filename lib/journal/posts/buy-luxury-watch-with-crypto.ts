import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "buy-luxury-watch-with-crypto",
  title: "Buying a Rolex or Birkin with Bitcoin: How It Works",
  metaTitle: "Buy a Rolex with Bitcoin or USDT: How Crypto Payment Works",
  description: "How to buy a luxury watch or Hermès bag with Bitcoin, Ethereum or USDT: how the price is set, confirming the wallet, network fees, refunds and tax to think about.",
  category: "Buying Advice",
  cluster: "buying",
  date: "2026-12-09",
  keyword: "buy rolex with bitcoin",
  keywords: ["buy birkin with crypto", "pay with usdt luxury", "luxury watch crypto payment", "bitcoin luxury goods", "is buying with crypto taxable"],
  image: "watch_2",
  cover: "rolex-datejust-31-278278-18k-yellow-gold-tahitian-mop-diamond-dial-presidential-bracelet",
  picks: { brand: "rolex", min: 15000, sort: "newest", limit: 8 },
  intro: [
    "Crypto has become a normal way to pay for luxury pieces, especially for international clients: it settles fast, works across borders and doesn't depend on banking hours.",
    "Here is how it works, step by step, and the few things that are different from a bank wire.",
  ],
  sections: [
    {
      id: "steps",
      heading: "How a crypto purchase works",
      blocks: [
        {
          table: {
            head: ["Step", "What happens"],
            rows: [
              ["1. Choose the piece", "Enquire as usual; a specialist confirms availability, condition and the price in USD or EUR."],
              ["2. Agree the amount", "We confirm the exact amount in Bitcoin, Ethereum or USDT at the moment you pay, so price movements don't change what you owe."],
              ["3. Confirm the address", "You receive our wallet address directly from your specialist. Confirm it through a second channel before sending."],
              ["4. Send and confirm", "Once the transaction is confirmed on the network, the order is confirmed."],
              ["5. Delivery", "Insured express, tracked and signed for – exactly as with any other payment."],
            ],
          },
        },
      ],
    },
    {
      id: "coins",
      heading: "Bitcoin, Ethereum or a stablecoin?",
      blocks: [
        {
          list: [
            "**USDT (and other dollar stablecoins)** – the simplest: the value doesn't move between agreeing the price and sending. Make sure you send on the network agreed with us.",
            "**Bitcoin** – the most widely held; confirmation can take longer and network fees vary.",
            "**Ethereum** – fast confirmation; gas fees vary with network activity.",
          ],
        },
        { note: "Always send a small test transaction first for large amounts, and double-check the network. Crypto sent to the wrong network or address usually can't be recovered." },
      ],
    },
    {
      id: "refunds",
      heading: "Returns and refunds",
      blocks: [
        "If you return a piece within 14 days, the refund goes back to the same wallet the payment came from – never to a different person or account. That rule protects you as much as us.",
      ],
    },
    {
      id: "tax",
      heading: "A word on tax",
      blocks: [
        "In many countries, spending crypto counts as disposing of it, which can create a taxable gain or loss. In the US, the IRS treats digital assets as property. Keep a record of what you paid and when, and speak to a tax adviser about your situation. This isn't tax advice.",
      ],
    },
    {
      id: "pieces",
      heading: "Pieces clients often buy with crypto",
      blocks: [
        { products: { brand: "richard-mille", sort: "price_asc" }, title: "Richard Mille" },
        { products: { category: "birkin-bags", min: 20000, sort: "newest" }, title: "Birkin" },
      ],
    },
  ],
  faq: [
    { q: "Can I buy a Rolex with Bitcoin?", a: "Yes. Montévane accepts Bitcoin, Ethereum, USDT and other major coins for any piece. The amount is confirmed at the moment of payment." },
    { q: "What happens if the price of Bitcoin changes?", a: "The crypto amount is fixed when you pay, based on the agreed USD or EUR price, so the price of the piece doesn't change." },
    { q: "Is paying with crypto taxable?", a: "In many countries spending crypto is a taxable event. In the US the IRS treats digital assets as property. Speak to a tax adviser." },
  ],
  sources: [
    { label: "IRS – Digital assets", url: "https://www.irs.gov/filing/digital-assets" },
  ],
  shop: [
    { label: "Payment & shipping", path: "/payment-shipping" },
    { label: "All watches", path: "/shop/watches" },
    { label: "Birkin bags", path: "/shop/birkin-bags" },
  ],
};
