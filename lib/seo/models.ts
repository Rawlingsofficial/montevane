import type { Locale } from "@/lib/i18n/config";

// Landing pages for the most-searched models (see seo/refined/*.csv — the
// clusters with the most buyer-intent keywords). Each page lists matching
// products and, when none are in stock, offers sourcing on request.
// Hermès Birkin/Kelly live on the category pages (/shop/birkin-bags, /shop/kelly-bags).
// `match` terms are tested against product names (case-insensitive).

type Copy = { title: string; metaTitle: string; metaDescription: string; intro: string };

export type ModelPage = {
  slug: string;
  /** Keyword cluster id in lib/seo/keywords.json. */
  cluster: string;
  brandSlug: string;
  brand: string;
  model: string;
  category: "watches" | "jewelry";
  match: string[];
  copy: Record<Locale, Copy>;
};

export const MODELS: ModelPage[] = [
  {
    slug: "rolex-submariner",
    cluster: "rolex-submariner",
    brandSlug: "rolex",
    brand: "Rolex",
    model: "Submariner",
    category: "watches",
    match: ["submariner"],
    copy: {
      en: {
        title: "Rolex Submariner for Sale — Date & No-Date",
        metaTitle: "Buy Rolex Submariner — Authentic, New & Pre-Owned, Box & Papers",
        metaDescription:
          "Authentic Rolex Submariner Date and No-Date, including 126610LN, 126610LV and 124060. Box and papers, verified, insured worldwide shipping. Pay with crypto.",
        intro:
          "The Submariner set the standard for the dive watch in 1953 and remains Rolex's most recognisable model. We offer authentic Submariner Date and No-Date references, new and pre-owned, with box and papers where available.",
      },
      de: {
        title: "Rolex Submariner kaufen – Date & No-Date",
        metaTitle: "Rolex Submariner kaufen – neu & gebraucht, Preis",
        metaDescription:
          "Original Rolex Submariner Date und No-Date kaufen, u. a. 126610LN, 126610LV, 124060. Mit Box & Papieren, geprüft, versicherter Versand. Zahlung mit Krypto.",
        intro:
          "Die Submariner setzte 1953 den Maßstab für Taucheruhren und ist bis heute das bekannteste Rolex Modell. Originale Submariner Date und No-Date, neu und gebraucht, mit Box und Papieren.",
      },
      uz: {
        title: "Rolex Submariner soatlari – Date va No-Date",
        metaTitle: "Rolex Submariner narxi – original soat",
        metaDescription: "Original Rolex Submariner Date va No-Date soatlari – 126610LN, 124060. Haqiqiyligi tekshirilgan, Toshkentga yetkazib berish.",
        intro: "Submariner 1953-yildan beri suvosti soatlari uchun andoza va Rolexning eng taniqli modeli. Original Submariner Date va No-Date, yangi va ishlatilgan.",
      },
    },
  },
  {
    slug: "rolex-daytona",
    cluster: "rolex-daytona",
    brandSlug: "rolex",
    brand: "Rolex",
    model: "Daytona",
    category: "watches",
    match: ["daytona"],
    copy: {
      en: {
        title: "Rolex Daytona for Sale — Steel, Gold & Platinum",
        metaTitle: "Buy Rolex Cosmograph Daytona — Authentic, Box & Papers",
        metaDescription:
          "Authentic Rolex Cosmograph Daytona in steel, gold and platinum, including the 126500LN panda. Verified, insured worldwide shipping. Pay by wire or crypto.",
        intro:
          "The Cosmograph Daytona is the chronograph every collector wants and few can get at retail. We source authentic Daytonas in steel, gold and platinum — including the 126500LN 'panda' — new and pre-owned.",
      },
      de: {
        title: "Rolex Daytona kaufen – Stahl, Gold & Platin",
        metaTitle: "Rolex Daytona kaufen – Original Cosmograph, Preis",
        metaDescription: "Original Rolex Cosmograph Daytona in Stahl, Gold und Platin kaufen, u. a. 126500LN Panda. Geprüft, versicherter Versand, Zahlung auch mit Krypto.",
        intro: "Die Cosmograph Daytona ist der Chronograph, den jeder Sammler will – und kaum einer beim Händler bekommt. Wir suchen originale Daytonas in Stahl, Gold und Platin.",
      },
      uz: {
        title: "Rolex Daytona soatlari – po'lat, oltin, platina",
        metaTitle: "Rolex Daytona narxi – original soat",
        metaDescription: "Original Rolex Cosmograph Daytona – po'lat, oltin va platina, 126500LN. Haqiqiyligi tekshirilgan, yetkazib berish.",
        intro: "Cosmograph Daytona – har bir kolleksioner orzu qiladigan xronograf. Original Daytona soatlarini po'lat, oltin va platinada topib beramiz.",
      },
    },
  },
  {
    slug: "rolex-datejust",
    cluster: "rolex-datejust",
    brandSlug: "rolex",
    brand: "Rolex",
    model: "Datejust",
    category: "watches",
    match: ["datejust"],
    copy: {
      en: {
        title: "Rolex Datejust for Sale — 31, 36 & 41 mm",
        metaTitle: "Buy Rolex Datejust 36 & 41 — Authentic, New & Pre-Owned",
        metaDescription: "Authentic Rolex Datejust 31, 36 and 41 in steel, Rolesor and gold, fluted or smooth bezel. Verified, box and papers, insured worldwide shipping.",
        intro: "The Datejust is the classic Rolex — the first self-winding wristwatch with a date window. Shop authentic Datejust 31, 36 and 41 in steel, two-tone Rolesor and gold.",
      },
      de: {
        title: "Rolex Datejust kaufen – 31, 36 & 41 mm",
        metaTitle: "Rolex Datejust kaufen – 36 & 41, neu & gebraucht",
        metaDescription: "Original Rolex Datejust 31, 36 und 41 in Stahl, Rolesor und Gold kaufen. Geprüft, mit Box & Papieren, versicherter Versand.",
        intro: "Die Datejust ist die klassische Rolex – die erste automatische Armbanduhr mit Datumsfenster. Originale Datejust 31, 36 und 41 in Stahl, Rolesor und Gold.",
      },
      uz: {
        title: "Rolex Datejust soatlari – 31, 36 va 41 mm",
        metaTitle: "Rolex Datejust narxi – original soat",
        metaDescription: "Original Rolex Datejust 31, 36 va 41 – po'lat, Rolesor va oltin. Haqiqiyligi tekshirilgan, yetkazib berish.",
        intro: "Datejust – klassik Rolex, sana oynasiga ega birinchi avtomatik qo'l soati. Original Datejust 31, 36 va 41.",
      },
    },
  },
  {
    slug: "patek-philippe-nautilus",
    cluster: "patek-nautilus",
    brandSlug: "patek-philippe",
    brand: "Patek Philippe",
    model: "Nautilus",
    category: "watches",
    match: ["nautilus", "patek"],
    copy: {
      en: {
        title: "Patek Philippe Nautilus for Sale — 5711, 5712 & 5811",
        metaTitle: "Buy Patek Philippe Nautilus 5711 — Authentic, Box & Papers",
        metaDescription: "Authentic Patek Philippe Nautilus 5711, 5712, 5811 and 5980. Verified, box and papers, insured worldwide shipping. Pay by wire or crypto.",
        intro: "Gérald Genta's Nautilus is the most sought-after steel sports watch ever made. We source authentic references including the 5711, 5712 and 5811, with full documentation.",
      },
      de: {
        title: "Patek Philippe Nautilus kaufen – 5711, 5712 & 5811",
        metaTitle: "Patek Philippe Nautilus kaufen – Original 5711, Preis",
        metaDescription: "Original Patek Philippe Nautilus 5711, 5712, 5811 und 5980 kaufen. Geprüft, mit Box & Papieren, versicherter Versand.",
        intro: "Gérald Gentas Nautilus ist die begehrteste Stahl-Sportuhr aller Zeiten. Wir suchen originale Referenzen wie 5711, 5712 und 5811 mit vollständigen Papieren.",
      },
      uz: {
        title: "Patek Philippe Nautilus – 5711, 5712, 5811",
        metaTitle: "Patek Philippe Nautilus narxi – original soat",
        metaDescription: "Original Patek Philippe Nautilus 5711, 5712, 5811. Haqiqiyligi tekshirilgan, hujjatlari bilan, yetkazib berish.",
        intro: "Nautilus – eng talabgir po'lat sport soati. 5711, 5712 va 5811 kabi original modellarni hujjatlari bilan topib beramiz.",
      },
    },
  },
  {
    slug: "audemars-piguet-royal-oak",
    cluster: "ap-royal-oak",
    brandSlug: "audemars-piguet",
    brand: "Audemars Piguet",
    model: "Royal Oak",
    category: "watches",
    match: ["royal oak"],
    copy: {
      en: {
        title: "Audemars Piguet Royal Oak for Sale — 15500, 15202 & 26240",
        metaTitle: "Buy Audemars Piguet Royal Oak — Authentic, Box & Papers",
        metaDescription: "Authentic Audemars Piguet Royal Oak 15500, 15510, 15202 Jumbo and 26240 chronograph. Verified, insured worldwide shipping.",
        intro: "The Royal Oak invented the luxury steel sports watch in 1972. We offer authentic references including the 15510, the 'Jumbo' 16202 and the 26240 chronograph.",
      },
      de: {
        title: "Audemars Piguet Royal Oak kaufen",
        metaTitle: "Audemars Piguet Royal Oak kaufen – Original, Preis",
        metaDescription: "Original Audemars Piguet Royal Oak 15500, 15510, Jumbo und Chronograph 26240 kaufen. Geprüft, versicherter Versand.",
        intro: "Die Royal Oak erfand 1972 die luxuriöse Stahl-Sportuhr. Originale Referenzen wie 15510, die „Jumbo“ 16202 und der Chronograph 26240.",
      },
      uz: {
        title: "Audemars Piguet Royal Oak soatlari",
        metaTitle: "Audemars Piguet Royal Oak narxi – original",
        metaDescription: "Original Audemars Piguet Royal Oak 15510, Jumbo, 26240. Haqiqiyligi tekshirilgan, yetkazib berish.",
        intro: "Royal Oak 1972-yilda lyuks po'lat sport soatini yaratdi. 15510, Jumbo va 26240 kabi original modellar.",
      },
    },
  },
  {
    slug: "cartier-santos",
    cluster: "cartier-santos",
    brandSlug: "cartier",
    brand: "Cartier",
    model: "Santos",
    category: "watches",
    match: ["santos"],
    copy: {
      en: {
        title: "Cartier Santos for Sale — Santos de Cartier & Santos-Dumont",
        metaTitle: "Buy Cartier Santos Watch — Authentic Medium & Large",
        metaDescription: "Authentic Cartier Santos de Cartier and Santos-Dumont watches in steel and gold, medium and large. Verified, insured worldwide shipping.",
        intro: "Created in 1904 for aviator Alberto Santos-Dumont, the Santos was one of the first wristwatches. Shop authentic Santos de Cartier and Santos-Dumont in steel and gold.",
      },
      de: {
        title: "Cartier Santos kaufen – Santos de Cartier & Santos-Dumont",
        metaTitle: "Cartier Santos kaufen – Original Uhr, Preis",
        metaDescription: "Original Cartier Santos de Cartier und Santos-Dumont in Stahl und Gold kaufen. Echtheit geprüft, versicherter Versand.",
        intro: "1904 für den Flieger Alberto Santos-Dumont geschaffen, war die Santos eine der ersten Armbanduhren. Originale Santos de Cartier und Santos-Dumont.",
      },
      uz: {
        title: "Cartier Santos soatlari",
        metaTitle: "Cartier Santos narxi – original soat",
        metaDescription: "Original Cartier Santos de Cartier va Santos-Dumont soatlari. Haqiqiyligi tekshirilgan, yetkazib berish.",
        intro: "1904-yilda yaratilgan Santos – ilk qo'l soatlaridan biri. Original Santos de Cartier va Santos-Dumont soatlari.",
      },
    },
  },
  {
    slug: "cartier-love-bracelet",
    cluster: "cartier-love",
    brandSlug: "cartier",
    brand: "Cartier",
    model: "Love Bracelet",
    category: "jewelry",
    match: ["love bracelet", "love ring", "love"],
    copy: {
      en: {
        title: "Cartier Love Bracelets for Sale — Yellow, Rose & White Gold",
        metaTitle: "Buy Cartier Love Bracelet — Authentic, Gold & Diamond",
        metaDescription: "Authentic Cartier Love bracelets and rings in yellow, rose and white gold, classic and small, with or without diamonds. Verified, insured shipping.",
        intro: "Designed in 1969 and fastened with its own screwdriver, the Love bracelet is Cartier's most famous jewel. Shop authentic Love bracelets and rings in every gold, classic and small models.",
      },
      de: {
        title: "Cartier Love Armband kaufen – Gelb-, Rosé- & Weißgold",
        metaTitle: "Cartier Love Armband kaufen – Original, Preis",
        metaDescription: "Original Cartier Love Armbänder und Ringe in Gelb-, Rosé- und Weißgold, mit oder ohne Diamanten. Echtheit geprüft, versicherter Versand.",
        intro: "1969 entworfen und mit eigenem Schraubendreher verschlossen – das Love Armband ist Cartiers berühmtestes Schmuckstück. Originale Love Armbänder und Ringe in allen Goldtönen.",
      },
      uz: {
        title: "Cartier Love bilaguzuklari – sariq, pushti va oq oltin",
        metaTitle: "Cartier Love bilaguzuk narxi – original",
        metaDescription: "Original Cartier Love bilaguzuk va uzuklari – sariq, pushti va oq oltin, olmosli yoki olmossiz. Haqiqiyligi tekshirilgan, yetkazib berish.",
        intro: "1969-yilda yaratilgan Love bilaguzugi – Cartierning eng mashhur zargarlik buyumi. Original Love bilaguzuk va uzuklari.",
      },
    },
  },
  {
    slug: "van-cleef-alhambra",
    cluster: "vca-alhambra",
    brandSlug: "van-cleef-arpels",
    brand: "Van Cleef & Arpels",
    model: "Alhambra",
    category: "jewelry",
    match: ["alhambra"],
    copy: {
      en: {
        title: "Van Cleef & Arpels Alhambra for Sale — Necklaces & Bracelets",
        metaTitle: "Buy Van Cleef Alhambra — Authentic Necklace & Bracelet",
        metaDescription: "Authentic Van Cleef & Arpels Vintage and Sweet Alhambra necklaces, bracelets and earrings in gold, onyx, mother-of-pearl and malachite.",
        intro: "The four-leaf clover motif of the Alhambra has been a symbol of luck since 1968. Shop authentic Vintage, Sweet and Magic Alhambra necklaces, bracelets and earrings.",
      },
      de: {
        title: "Van Cleef & Arpels Alhambra kaufen – Kette & Armband",
        metaTitle: "Van Cleef Alhambra kaufen – Original Kette, Preis",
        metaDescription: "Original Van Cleef & Arpels Vintage und Sweet Alhambra Ketten, Armbänder und Ohrringe in Gold, Onyx und Perlmutt. Echtheit geprüft.",
        intro: "Das vierblättrige Kleeblatt der Alhambra ist seit 1968 ein Glückssymbol. Originale Vintage, Sweet und Magic Alhambra Ketten, Armbänder und Ohrringe.",
      },
      uz: {
        title: "Van Cleef & Arpels Alhambra – marjon va bilaguzuklar",
        metaTitle: "Van Cleef Alhambra narxi – original",
        metaDescription: "Original Van Cleef & Arpels Alhambra marjon, bilaguzuk va ziraklari. Haqiqiyligi tekshirilgan, yetkazib berish.",
        intro: "Alhambraning to'rt bargli beda naqshi 1968-yildan beri omad ramzi. Original Vintage va Sweet Alhambra buyumlari.",
      },
    },
  },
  {
    slug: "tiffany-t",
    cluster: "tiffany",
    brandSlug: "tiffany",
    brand: "Tiffany & Co.",
    model: "Tiffany T",
    category: "jewelry",
    match: ["tiffany"],
    copy: {
      en: {
        title: "Tiffany T Bracelets & Jewelry for Sale",
        metaTitle: "Buy Tiffany T Bracelet — Authentic Tiffany & Co. Jewelry",
        metaDescription: "Authentic Tiffany T wire and smile bracelets, Tiffany HardWear and Knot jewelry in gold and silver. Verified, insured worldwide shipping.",
        intro: "Clean, graphic and wearable every day, the Tiffany T collection is the house's modern signature. Shop authentic T wire, T smile and HardWear pieces.",
      },
      de: {
        title: "Tiffany T Armband & Schmuck kaufen",
        metaTitle: "Tiffany T Armband kaufen – Original Tiffany Schmuck",
        metaDescription: "Original Tiffany T Armbänder, HardWear und Knot Schmuck in Gold und Silber. Echtheit geprüft, versicherter Versand.",
        intro: "Klar, grafisch und alltagstauglich – die Tiffany T Kollektion ist die moderne Signatur des Hauses. Originale T Wire, T Smile und HardWear Stücke.",
      },
      uz: {
        title: "Tiffany T bilaguzuklari va zargarlik buyumlari",
        metaTitle: "Tiffany bilaguzuk narxi – original",
        metaDescription: "Original Tiffany T bilaguzuklari va zargarlik buyumlari, oltin va kumush. Haqiqiyligi tekshirilgan, yetkazib berish.",
        intro: "Tiffany T – brendning zamonaviy ramzi. Original T wire, T smile va HardWear buyumlari.",
      },
    },
  },
  {
    slug: "bvlgari-serpenti",
    cluster: "bvlgari-serpenti",
    brandSlug: "bvlgari",
    brand: "Bvlgari",
    model: "Serpenti",
    category: "jewelry",
    match: ["serpenti"],
    copy: {
      en: {
        title: "Bvlgari Serpenti for Sale — Watches, Bracelets & Bags",
        metaTitle: "Buy Bvlgari Serpenti — Authentic Watch, Bracelet & Bag",
        metaDescription: "Authentic Bvlgari Serpenti Tubogas and Seduttori watches, Serpenti Viper bracelets and Serpenti Forever bags. Verified, insured worldwide shipping.",
        intro: "The serpent has been Bvlgari's emblem since the 1940s. Shop authentic Serpenti Tubogas and Seduttori watches, Viper jewelry and Serpenti Forever bags.",
      },
      de: {
        title: "Bvlgari Serpenti kaufen – Uhren, Armbänder & Taschen",
        metaTitle: "Bvlgari Serpenti kaufen – Original Uhr & Armband",
        metaDescription: "Original Bvlgari Serpenti Tubogas und Seduttori Uhren, Viper Armbänder und Serpenti Forever Taschen. Echtheit geprüft.",
        intro: "Die Schlange ist seit den 1940er Jahren Bvlgaris Emblem. Originale Serpenti Tubogas und Seduttori Uhren, Viper Schmuck und Serpenti Forever Taschen.",
      },
      uz: {
        title: "Bvlgari Serpenti – soatlar, bilaguzuklar va sumkalar",
        metaTitle: "Bvlgari Serpenti narxi – original",
        metaDescription: "Original Bvlgari Serpenti soatlari, bilaguzuklari va sumkalari. Haqiqiyligi tekshirilgan, yetkazib berish.",
        intro: "Ilon 1940-yillardan beri Bvlgari ramzi. Original Serpenti soatlari, Viper zargarlik buyumlari va Serpenti Forever sumkalari.",
      },
    },
  },
];

export const getModel = (slug: string) => MODELS.find((m) => m.slug === slug);
