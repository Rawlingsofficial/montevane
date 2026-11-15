import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-aftermarket-diamonds",
  title: "Factory vs Aftermarket Diamonds on a Rolex",
  metaTitle: "Rolex Aftermarket vs Factory Diamonds: How to Tell",
  description: "Factory vs aftermarket diamonds on a Rolex: how to tell them apart, how references and papers show factory settings, the effect on value and on Rolex servicing.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-02-10",
  keyword: "aftermarket diamonds rolex",
  keywords: ["factory diamond rolex", "rolex diamond bezel", "rolex rbr meaning", "custom rolex value", "iced out rolex"],
  image: "watch_1",
  cover: "rolex-datejust-36-126234-stainless-steel-black-diamond-dial-oyster-bracelet-36-mm",
  picks: { brand: "rolex", query: "diamond", sort: "price_asc", limit: 8 },
  intro: [
    "A diamond-set Rolex can be one of two very different things: a watch Rolex made with diamonds, or a watch someone else added diamonds to later. They can look similar in photos. They are worth very different amounts.",
    "Here's how to tell them apart and what it means for you.",
  ],
  sections: [
    {
      id: "difference",
      heading: "Factory vs aftermarket",
      blocks: [
        {
          table: {
            head: ["", "Factory (Rolex)", "Aftermarket"],
            rows: [
              ["Who set the stones", "Rolex", "An independent jeweller"],
              ["Shown on the papers", "Yes – the reference and dial describe the setting", "No"],
              ["Quality of stones and setting", "Rolex's own standards", "Varies widely"],
              ["Rolex servicing", "Serviced as normal", "Rolex may decline or replace non-original parts"],
              ["Value", "Holds value like other Rolex models", "Usually well below a factory piece"],
            ],
          },
        },
      ],
    },
    {
      id: "tell",
      heading: "How to tell",
      blocks: [
        {
          list: [
            "**Check the reference.** Factory gem-set models have their own references and suffixes – for example \"RBR\" is commonly used for a factory diamond bezel.",
            "**Check the papers.** The warranty card and original documents describe the model as delivered.",
            "**Look closely at the setting.** Factory settings are precise and even; aftermarket settings often show uneven stones, visible glue or tool marks.",
            "**Look at the dial.** Aftermarket dials may have inconsistent printing or markers that don't sit perfectly.",
          ],
        },
      ],
    },
    {
      id: "value",
      heading: "Are aftermarket pieces always bad?",
      blocks: [
        "Not necessarily – some buyers want the look at a lower price, and that's a legitimate choice. The problem is when an aftermarket watch is sold as if it were factory. A trustworthy seller tells you exactly what has been modified.",
        { note: "On Montévane, modifications are disclosed on the product page. If a listing doesn't mention any, ask us – we'll confirm in writing." },
      ],
    },
    {
      id: "shop",
      heading: "Diamond-set Rolex available now",
      blocks: [
        { products: { brand: "rolex", query: "diamond", sort: "price_asc" } },
        "Learn more in [how to spot a fake Rolex](/journal/how-to-spot-a-fake-rolex).",
      ],
    },
  ],
  faq: [
    { q: "How can I tell if Rolex diamonds are factory?", a: "Check the reference and the papers, which describe the setting as delivered, and examine the setting quality. A specialist can confirm." },
    { q: "Does Rolex service watches with aftermarket diamonds?", a: "Rolex may decline to service a watch with non-original parts or replace them with genuine parts during service." },
    { q: "Do aftermarket diamonds reduce a Rolex's value?", a: "Usually yes. Collectors pay for original, factory-specified watches." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
    { label: "Our authenticity guarantee", path: "/authenticity" },
  ],
};
