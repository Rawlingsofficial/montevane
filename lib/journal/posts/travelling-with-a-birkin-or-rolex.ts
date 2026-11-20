import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "travelling-with-a-birkin-or-rolex",
  title: "Travelling with a Birkin or Rolex: Customs, CITES and Security",
  metaTitle: "Travelling with a Rolex or Birkin: Customs, CITES & Safety",
  description: "How to travel with a luxury watch or Hermès bag: proving you owned it before you left, CITES for exotic leathers, insurance abroad and staying safe.",
  category: "Buying Advice",
  cluster: "buying",
  date: "2027-03-08",
  keyword: "travelling with a rolex",
  keywords: ["travel with birkin customs", "cbp form 4457", "crocodile bag travel", "declare watch customs", "luxury watch travel safety"],
  image: "gallery/cat-twilly-scarves",
  cover: "rolex-gmt-master-ii-116759sa-18k-white-gold-sapphire-and-diamond-bezel-pave-diamond-dial",
  intro: [
    "The best part of owning a fine watch or a Birkin is wearing it – including on holiday. But crossing borders with valuable pieces raises questions at customs, and exotic leathers have rules of their own.",
    "Here's how to travel with confidence. Rules vary by country; always check your destination's requirements.",
  ],
  sections: [
    {
      id: "prove",
      heading: "1. Be able to prove you owned it before you left",
      blocks: [
        "Coming home, customs officers may ask whether a valuable item was bought abroad. Carry a copy of the invoice or papers. US residents can register items with serial numbers – such as watches – with U.S. Customs and Border Protection before travelling, using a Certificate of Registration (CBP Form 4457), so they're not treated as new purchases on return.",
      ],
    },
    {
      id: "cites",
      heading: "2. Exotic leathers and CITES",
      blocks: [
        "Crocodile, alligator, some lizard and ostrich skins fall under CITES, the convention on trade in endangered species. Travelling with an exotic bag can require documentation, and some countries restrict certain skins entirely. Keep the CITES certificate with the bag and check before you go. More in [Hermès exotic leathers](/journal/hermes-exotic-leathers).",
      ],
    },
    {
      id: "insurance",
      heading: "3. Check your insurance covers travel",
      blocks: [
        "Many policies limit cover outside the home or abroad. Confirm that your watch or bag is covered at your destination, and for how long. See [how to insure a Rolex or Birkin](/journal/how-to-insure-luxury-watch-handbag).",
      ],
    },
    {
      id: "security",
      heading: "4. Stay discreet",
      blocks: [
        {
          list: [
            "Keep pieces in your hand luggage, never in checked bags.",
            "Use the hotel safe, or keep the piece on you.",
            "In busy streets, a watch under a cuff or a bag carried close is a simple precaution.",
            "Keep photos of serials and date stamps in the cloud in case of loss.",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "Do I need to declare my Rolex when travelling?", a: "Generally not if you owned it before you left, but you may need to prove it. Carry the invoice or papers; US residents can register it with CBP before departure." },
    { q: "Can I fly with a crocodile Birkin?", a: "Often, but CITES documentation may be required and some countries restrict certain skins. Check before you travel." },
    { q: "Is my watch insured abroad?", a: "Not always. Check whether your policy covers travel, and for how long." },
  ],
  sources: [
    { label: "U.S. Customs and Border Protection – Know before you go", url: "https://www.cbp.gov/travel/us-citizens/know-before-you-go" },
    { label: "CITES – Convention on International Trade in Endangered Species", url: "https://cites.org/" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "All watches", path: "/shop/watches" },
  ],
};
