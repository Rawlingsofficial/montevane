import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-horseshoe-stamp",
  title: "The Hermès Horseshoe Stamp: Special Orders Explained",
  metaTitle: "Hermès Horseshoe Stamp (HSS): Special Order Birkins Explained",
  description: "What the Hermès horseshoe stamp means: special-order Birkins and Kellys, how clients choose leathers, colours, stitching and hardware, and what it means for value.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-03-29",
  keyword: "hermes horseshoe stamp",
  keywords: ["hss birkin", "hermes special order", "birkin special order", "horseshoe stamp meaning", "two tone birkin"],
  image: "product_interior",
  cover: "pre-owned-hermes-birkin-30-gold-epsom-gold-hardware",
  picks: { category: "birkin-bags", sort: "newest", limit: 4 },
  intro: [
    "Next to the date stamp of a few Birkins and Kellys, you'll find a small horseshoe. It means the bag was a special order – one of a kind, specified by a client.",
  ],
  sections: [
    {
      id: "what",
      heading: "What a special order is",
      blocks: [
        "Hermès periodically invites certain clients to design a bag from a menu of options. The client chooses the model and size, then combines leathers and colours that aren't offered in the regular collection – most often a two-tone exterior, contrasting stitching, a contrasting interior and a choice of hardware. The bag carries the horseshoe stamp to mark it.",
      ],
    },
    {
      id: "options",
      heading: "Typical choices",
      blocks: [
        {
          list: [
            "**Two-tone or tri-colour** exteriors, such as a contrasting body and sides.",
            "**Contrast stitching** in a third colour.",
            "**Interior colour** different from the exterior.",
            "**Hardware** – including brushed finishes.",
          ],
        },
      ],
    },
    {
      id: "value",
      heading: "Special orders and value",
      blocks: [
        "Because each HSS bag reflects one person's taste, its appeal depends on the combination. Balanced, elegant combinations are highly sought after; very personal choices may appeal to fewer buyers. As always, condition and completeness matter most. See [what comes with a Birkin](/journal/what-comes-with-a-birkin).",
        { note: "As with any stamp, a horseshoe can be faked. The bag must be authenticated as a whole – read [how to authenticate a Hermès bag](/journal/how-to-authenticate-hermes)." },
      ],
    },
  ],
  faq: [
    { q: "What does the horseshoe stamp on a Birkin mean?", a: "That the bag was a special order, specified by a client from options Hermès offers by invitation." },
    { q: "Are horseshoe-stamped bags more valuable?", a: "It depends on the combination. Elegant, balanced special orders are highly sought after." },
    { q: "Where is the horseshoe stamp?", a: "Next to the date stamp and artisan mark, usually on the strap under the flap." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Date stamp chart", path: "/journal/hermes-date-stamp-chart" },
  ],
};
