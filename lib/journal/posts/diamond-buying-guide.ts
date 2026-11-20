import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "diamond-buying-guide",
  title: "How to Buy a Diamond: The 4Cs, Certificates and Settings",
  metaTitle: "Diamond Buying Guide: The 4Cs, GIA Reports & Settings",
  description: "Buy a diamond with confidence: cut, colour, clarity and carat explained, why a GIA report matters, natural vs lab-grown, and how to choose a setting.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  pillar: true,
  date: "2026-11-08",
  keyword: "diamond buying guide",
  keywords: ["4cs of diamonds", "diamond cut", "diamond clarity", "gia certified"],
  image: "gallery/cat-jewelry",
  cover: "two-pear-shaped-diamond-halo-toi-et-moi-ring-platinum-two-pear-shaped-halo-diamond-toi-et",
  picks: { category: "jewelry", sort: "price_asc" },
  intro: [
    "Two diamonds of the same weight can differ in price several times over. The reason is the grading – and once you understand it, you can choose where to spend and where to save.",
    "This guide explains the 4Cs, what a grading report tells you, the difference between natural and laboratory-grown diamonds, and how setting and metal change the look of a piece.",
  ],
  sections: [
    {
      id: "four-cs",
      heading: "The 4Cs",
      blocks: [
        "The Gemological Institute of America (GIA), founded in 1931, created the 4Cs and the International Diamond Grading System that the trade uses worldwide.",
        {
          list: [
            "**Cut** – how well a diamond's proportions, symmetry and polish return light. For round brilliants GIA grades cut from Excellent to Poor. Cut has the biggest effect on sparkle, so it is the last place to economise.",
            "**Colour** – graded from D (colourless) to Z (light yellow or brown). D–F are colourless, G–J near colourless. In yellow gold, a G or H can look as white as a D.",
            "**Clarity** – the presence of inclusions and blemishes, from Flawless (FL) and Internally Flawless (IF) through VVS1–VVS2, VS1–VS2 and SI1–SI2 to I1–I3. Many VS2 and SI1 stones look clean to the naked eye.",
            "**Carat** – weight, where one carat equals 0.2 grams. Prices jump at round numbers, so a 0.95 ct stone can cost noticeably less than a 1.00 ct one that looks the same.",
          ],
        },
      ],
    },
    {
      id: "shapes",
      heading: "Shapes",
      blocks: [
        "The round brilliant returns the most light and is the most popular shape. Fancy shapes – oval, cushion, emerald, pear, radiant, princess and marquise – can look larger for their weight and often cost less per carat. Step cuts such as the emerald show clarity more readily, so a higher clarity grade is worth it there.",
      ],
    },
    {
      id: "reports",
      heading: "Why a grading report matters",
      blocks: [
        "A report from an independent laboratory such as [GIA](https://www.gia.edu/gia-about) records a diamond's measurements and 4Cs grades, along with a plot of its inclusions. Many stones also carry the report number laser-inscribed on the girdle, so the stone and report can be matched.",
        "Where a piece on Montévane is certified, the certificate is listed and can be shown before purchase. Ask us for the report number and we will send it so you can verify it yourself.",
      ],
    },
    {
      id: "natural-lab",
      heading: "Natural or laboratory-grown?",
      blocks: [
        "Laboratory-grown diamonds have the same chemical and physical properties as natural diamonds and can only be told apart with specialist equipment. They cost far less, but they do not hold their value in the way natural diamonds do. Any honest seller discloses which is which; every diamond on Montévane is described clearly in its listing.",
      ],
    },
    {
      id: "settings",
      heading: "Setting and metal",
      blocks: [
        {
          list: [
            "**Solitaire** – a single stone, usually held by four or six prongs. Timeless, and it shows off the diamond best.",
            "**Halo** – a ring of small diamonds around the centre stone, which makes it appear larger.",
            "**Three-stone and pavé** – side stones or a diamond-set band for more sparkle.",
            "**Platinum** – naturally white, dense and durable; the classic choice for engagement rings.",
            "**18k white, yellow or rose gold** – warmer or cooler tones to suit the stone and the wearer.",
          ],
        },
        "Browse [engagement and diamond rings](/shop/jewelry/rings), [necklaces](/shop/jewelry/necklaces) and [earrings](/shop/jewelry/earrings) on Montévane.",
      ],
    },
  ],
  faq: [
    { q: "Which of the 4Cs matters most?", a: "Cut. It decides how much light a diamond returns and therefore how much it sparkles. A well-cut diamond with slightly lower colour or clarity often looks better than a poorly cut one with top grades." },
    { q: "What colour grade should I choose?", a: "G or H offers excellent value and looks white in most settings, especially in yellow or rose gold. D–F is colourless and commands a premium." },
    { q: "Is a GIA report necessary?", a: "For a significant diamond, an independent report is strongly recommended. It confirms the grades you are paying for and lets you verify the stone." },
    { q: "Are lab-grown diamonds real diamonds?", a: "Yes, they are physically and chemically diamond. They are much less expensive than natural diamonds and do not hold their value in the same way." },
  ],
  sources: [
    { label: "GIA – Diamond quality factors (the 4Cs)", url: "https://www.gia.edu/diamond-quality-factor" },
    { label: "GIA – About the Gemological Institute of America", url: "https://www.gia.edu/gia-about" },
  ],
  shop: [
    { label: "Shop fine jewelry", path: "/shop/jewelry" },
    { label: "Diamond rings", path: "/shop/jewelry/rings" },
    { label: "Necklaces", path: "/shop/jewelry/necklaces" },
  ],
};
