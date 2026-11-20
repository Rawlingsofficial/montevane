import type { Locale } from "@/lib/i18n/config";

// Copy for the Birkin landing pages and the New / Pre-Owned page of every watch
// brand. Each page has its own title, description and intro so none of them
// reads as a copy of its parent listing.

export type ListingCopy = { name: string; title: string; metaTitle: string; metaDescription: string; intro: string };

export const BIRKIN_COPY: Record<string, Record<Locale, ListingCopy>> = {
  "pre-owned": {
    en: {
      name: "Pre-Owned Birkin Bags",
      title: "Pre-Owned Hermès Birkin Bags",
      metaTitle: "Pre-Owned Hermès Birkin Bags for Sale | Montévane",
      metaDescription: "Shop pre-owned Hermès Birkin bags, each one checked by our specialists, with its condition described honestly. Insured worldwide shipping and 14-day returns.",
      intro:
        "A pre-owned Birkin is often the fastest way to own the exact bag you want. Many colours, leathers and hardware combinations are no longer made, and the only way to find them is on the resale market.\n\nEvery bag on this page has been carried before. We check each one before it is listed and describe its condition plainly – corners, handles, hardware and interior – so you know exactly what you are buying. If a bag ever fails an independent authentication, you get a full refund.",
    },
    de: {
      name: "Birkin Bags aus zweiter Hand",
      title: "Hermès Birkin aus zweiter Hand",
      metaTitle: "Hermès Birkin gebraucht kaufen | Montévane",
      metaDescription: "Gebrauchte Hermès Birkin Bags, jede von unseren Spezialisten geprüft und ehrlich beschrieben. Versicherter Versand weltweit und 14 Tage Rückgabe.",
      intro:
        "Mit einer gebrauchten Birkin bekommen Sie oft am schnellsten genau die Tasche, die Sie suchen. Viele Farben, Leder und Beschläge werden gar nicht mehr hergestellt – man findet sie nur noch auf dem Wiederverkaufsmarkt.\n\nJede Tasche auf dieser Seite wurde schon getragen. Wir prüfen sie vor dem Einstellen und beschreiben den Zustand klar und offen – Ecken, Henkel, Beschläge und Innenraum. So wissen Sie genau, was Sie kaufen. Besteht eine Tasche eine unabhängige Echtheitsprüfung nicht, bekommen Sie Ihr Geld vollständig zurück.",
    },
    uz: {
      name: "Ishlatilgan Birkin sumkalar",
      title: "Ishlatilgan Hermès Birkin sumkalar",
      metaTitle: "Ishlatilgan Hermès Birkin sumkalarni sotib olish | Montévane",
      metaDescription: "Ishlatilgan Hermès Birkin sumkalar – har biri mutaxassislarimiz tomonidan tekshirilgan va holati halol tasvirlangan. Sug'urtalangan yetkazib berish va 14 kun ichida qaytarish.",
      intro:
        "Ishlatilgan Birkin – ko'pincha aynan siz xohlagan sumkaga ega bo'lishning eng tez yo'li. Ko'plab ranglar, charmlar va furnituralar endi ishlab chiqarilmaydi va ularni faqat qayta sotuv bozorida topish mumkin.\n\nBu sahifadagi har bir sumka avval ishlatilgan. Har birini sotuvga qo'yishdan oldin tekshiramiz va holatini ochiq tasvirlaymiz – burchaklar, tutqichlar, furnitura va ichki qism. Agar sumka mustaqil tekshiruvdan o'tmasa, pulingiz to'liq qaytariladi.",
    },
  },
  "new-unused": {
    en: {
      name: "New & Unused Birkin Bags",
      title: "New & Unused Hermès Birkin Bags",
      metaTitle: "New & Unused Hermès Birkin Bags for Sale | Montévane",
      metaDescription: "Shop new and unused Hermès Birkin bags – never carried, complete with their accessories as received. Checked by our specialists, shipped insured worldwide.",
      intro:
        "These Birkins have never been carried. They come as they left the boutique, with the accessories listed on each piece – usually the dust bag, rain cover, clochette, lock and keys.\n\nBuying a new Birkin without waiting years for an offer from Hermès is the main reason clients come to us. Each bag is checked by our specialists before it is listed, and the date stamp and details are shown in the photos so you can see the bag exactly as it is.",
    },
    de: {
      name: "Neue Birkin Bags",
      title: "Neue & ungetragene Hermès Birkin",
      metaTitle: "Neue Hermès Birkin kaufen – ungetragen | Montévane",
      metaDescription: "Neue, ungetragene Hermès Birkin Bags – komplett mit dem Zubehör, wie sie aus der Boutique kamen. Von Spezialisten geprüft, versicherter Versand weltweit.",
      intro:
        "Diese Birkins wurden noch nie getragen. Sie kommen so, wie sie die Boutique verlassen haben – mit dem Zubehör, das bei jedem Stück angegeben ist, meist Staubbeutel, Regenschutz, Clochette, Schloss und Schlüssel.\n\nViele Kundinnen kommen zu uns, weil sie eine neue Birkin möchten, ohne jahrelang auf ein Angebot von Hermès zu warten. Jede Tasche wird vor dem Einstellen von unseren Spezialisten geprüft. Datumsstempel und Details sehen Sie auf den Fotos, damit Sie die Tasche genau so sehen, wie sie ist.",
    },
    uz: {
      name: "Yangi Birkin sumkalar",
      title: "Yangi va ishlatilmagan Hermès Birkin sumkalar",
      metaTitle: "Yangi Hermès Birkin sumkalarni sotib olish | Montévane",
      metaDescription: "Yangi, hech ishlatilmagan Hermès Birkin sumkalar – butikdan qanday chiqqan bo'lsa, aksessuarlari bilan to'liq. Mutaxassislar tekshiruvi, sug'urtalangan yetkazib berish.",
      intro:
        "Bu Birkinlar hech qachon ishlatilmagan. Ular butikdan qanday chiqqan bo'lsa, shunday keladi – har bir buyumda ko'rsatilgan aksessuarlar bilan: odatda chang xaltasi, yomg'ir g'ilofi, klochet, qulf va kalitlar.\n\nMijozlar bizga ko'pincha Hermès taklifini yillab kutmasdan yangi Birkinga ega bo'lish uchun keladi. Har bir sumka sotuvga qo'yilishidan oldin mutaxassislarimiz tomonidan tekshiriladi, sana muhri va tafsilotlar rasmlarda ko'rsatiladi.",
    },
  },
  "exotic-leather": {
    en: {
      name: "Exotic Leather Birkin Bags",
      title: "Exotic Leather Hermès Birkin Bags",
      metaTitle: "Exotic Hermès Birkin Bags – Crocodile, Alligator & Lizard | Montévane",
      metaDescription: "Shop exotic Hermès Birkin bags in crocodile, alligator, lizard and ostrich. Each one checked by our specialists before it is listed.",
      intro:
        "Exotic Birkins are the rarest bags Hermès makes. Crocodile, alligator and lizard skins are made in small numbers, and some colours – like the Himalaya – appear only a few times a year.\n\nShiny (lisse) and matte finishes look and age very differently, and each skin has its own scale pattern, so no two bags are the same. Exotic leathers need CITES papers to cross many borders, so ask us before you buy and we will tell you whether your country allows the import.",
    },
    de: {
      name: "Birkin aus exotischem Leder",
      title: "Hermès Birkin aus exotischem Leder",
      metaTitle: "Exotische Hermès Birkin – Krokodil, Alligator & Eidechse | Montévane",
      metaDescription: "Hermès Birkin aus Krokodil, Alligator, Eidechse und Strauß. Jede Tasche wird vor dem Einstellen von unseren Spezialisten geprüft.",
      intro:
        "Exotische Birkins sind die seltensten Taschen von Hermès. Krokodil, Alligator und Eidechse werden nur in kleinen Mengen verarbeitet, und manche Farben – etwa die Himalaya – gibt es nur ein paar Mal im Jahr.\n\nGlänzendes (Lisse) und mattes Leder sehen anders aus und altern unterschiedlich. Jede Haut hat ihr eigenes Schuppenmuster, deshalb gleicht keine Tasche der anderen. Für viele Länder braucht exotisches Leder CITES-Papiere. Fragen Sie uns vor dem Kauf – wir sagen Ihnen, ob die Einfuhr in Ihr Land erlaubt ist.",
    },
    uz: {
      name: "Ekzotik charmdan Birkin",
      title: "Ekzotik charmdan Hermès Birkin sumkalar",
      metaTitle: "Ekzotik Hermès Birkin – timsoh, alligator va kaltakesak | Montévane",
      metaDescription: "Timsoh, alligator, kaltakesak va tuyaqush charmidan Hermès Birkin sumkalar. Har biri sotuvga qo'yilishidan oldin mutaxassislarimiz tomonidan tekshiriladi.",
      intro:
        "Ekzotik Birkinlar Hermès ishlab chiqaradigan eng noyob sumkalardir. Timsoh, alligator va kaltakesak terisi kam miqdorda ishlanadi, ba'zi ranglar – masalan, Himalaya – yiliga bir necha marta chiqadi.\n\nYaltiroq (lisse) va mat charm turlicha ko'rinadi va turlicha eskiradi, har bir terining o'z naqshi bor, shuning uchun ikki sumka bir xil bo'lmaydi. Ko'p mamlakatlarga ekzotik charm uchun CITES hujjatlari kerak, shuning uchun xariddan oldin so'rang – mamlakatingizga olib kirish mumkinligini aytamiz.",
    },
  },
  hss: {
    en: {
      name: "Hermès HSS Birkin Bags",
      title: "Hermès HSS Special Order Birkins",
      metaTitle: "Hermès HSS Birkin – Special Order Bags for Sale | Montévane",
      metaDescription: "Shop Hermès HSS (Horseshoe) special order Birkins – two-tone colours, contrast stitching and custom hardware, marked with the horseshoe stamp. Checked by our specialists.",
      intro:
        "HSS stands for Horseshoe Stamp – the small horseshoe Hermès adds next to the date stamp on a special order bag. These Birkins were ordered by a client who chose the colours, lining, stitching and hardware themselves.\n\nThat is why you see combinations here that Hermès never makes for its regular stock: two-tone bodies, contrast piping and brushed hardware. Special orders are offered only to a small number of clients, so each HSS Birkin is effectively one of a kind.",
    },
    de: {
      name: "Hermès HSS Birkin",
      title: "Hermès HSS Birkin – Sonderanfertigungen",
      metaTitle: "Hermès HSS Birkin – Sonderanfertigung kaufen | Montévane",
      metaDescription: "Hermès HSS (Horseshoe) Birkin als Sonderanfertigung – zweifarbig, mit Kontrastnähten und besonderen Beschlägen, erkennbar am Hufeisen-Stempel. Von Spezialisten geprüft.",
      intro:
        "HSS steht für Horseshoe Stamp – das kleine Hufeisen, das Hermès bei einer Sonderanfertigung neben den Datumsstempel setzt. Diese Birkins hat eine Kundin oder ein Kunde selbst bestellt und dabei Farben, Futter, Nähte und Beschläge ausgewählt.\n\nDeshalb finden Sie hier Kombinationen, die es im normalen Sortiment von Hermès nicht gibt: zweifarbige Taschen, Kontrastkanten und gebürstete Beschläge. Sonderanfertigungen bietet Hermès nur wenigen Kunden an – jede HSS Birkin ist damit praktisch ein Einzelstück.",
    },
    uz: {
      name: "Hermès HSS Birkin",
      title: "Hermès HSS – maxsus buyurtma Birkinlar",
      metaTitle: "Hermès HSS Birkin – maxsus buyurtma sumkalar | Montévane",
      metaDescription: "Hermès HSS (Horseshoe) maxsus buyurtma Birkinlar – ikki rangli, kontrast chok va maxsus furnitura, taqa muhri bilan. Mutaxassislar tekshiruvi.",
      intro:
        "HSS – Horseshoe Stamp, ya'ni Hermès maxsus buyurtma sumkada sana muhri yoniga qo'yadigan kichik taqa belgisi. Bu Birkinlarni mijozning o'zi buyurtma qilgan: ranglar, astar, chok va furniturani o'zi tanlagan.\n\nShuning uchun bu yerda Hermès oddiy assortimentda chiqarmaydigan birikmalarni ko'rasiz: ikki rangli sumkalar, kontrast hoshiya va cho'tkalangan furnitura. Maxsus buyurtma faqat kam sonli mijozlarga taklif qilinadi, shuning uchun har bir HSS Birkin deyarli yagona nusxadir.",
    },
  },
  "custom-special-order": {
    en: {
      name: "Custom & Special Order Birkins",
      title: "Custom & Rare Hermès Birkins",
      metaTitle: "Custom Hermès Birkin Bags – Painted & One-of-a-Kind | Montévane",
      metaDescription: "Shop custom Hermès Birkins – hand-painted and embellished one-of-a-kind pieces created on authentic Hermès bags. Each listing states exactly what was customised.",
      intro:
        "These Birkins started as authentic Hermès bags and were then personalised by independent artists – hand-painted, embellished with crystals or reworked into a one-off piece.\n\nCustomisation is done after the bag leaves Hermès, so it is not a Hermès special order. Each listing says exactly what was changed and by whom, so you know what you are buying. If you have an idea of your own, ask us – we can help you find the right bag to start from.",
    },
    de: {
      name: "Individuelle Birkins",
      title: "Individuelle & seltene Hermès Birkins",
      metaTitle: "Individuelle Hermès Birkin – bemalt & einzigartig | Montévane",
      metaDescription: "Individuell gestaltete Hermès Birkins – handbemalt oder verziert, Einzelstücke auf echten Hermès-Taschen. Bei jedem Stück steht genau, was verändert wurde.",
      intro:
        "Diese Birkins waren zuerst echte Hermès-Taschen und wurden dann von unabhängigen Künstlern gestaltet – von Hand bemalt, mit Kristallen besetzt oder zu einem Einzelstück umgearbeitet.\n\nDie Gestaltung passiert, nachdem die Tasche Hermès verlassen hat. Es ist also keine Sonderanfertigung von Hermès. Bei jedem Stück steht genau, was verändert wurde und von wem – so wissen Sie, was Sie kaufen. Haben Sie selbst eine Idee? Fragen Sie uns – wir helfen Ihnen, die passende Tasche dafür zu finden.",
    },
    uz: {
      name: "Maxsus bezatilgan Birkinlar",
      title: "Maxsus va noyob Hermès Birkinlar",
      metaTitle: "Maxsus bezatilgan Hermès Birkin – yagona nusxalar | Montévane",
      metaDescription: "Original Hermès sumkalari asosida qo'lda bo'yalgan va bezatilgan yagona Birkinlar. Har bir buyumda nima o'zgartirilgani aniq yozilgan.",
      intro:
        "Bu Birkinlar dastlab original Hermès sumkalari bo'lgan, keyin mustaqil rassomlar tomonidan bezatilgan – qo'lda bo'yalgan, kristallar bilan bezatilgan yoki yagona nusxaga aylantirilgan.\n\nBezash sumka Hermèsdan chiqqandan keyin qilinadi, shuning uchun bu Hermès maxsus buyurtmasi emas. Har bir buyumda nima va kim tomonidan o'zgartirilgani aniq yozilgan. O'z g'oyangiz bormi? Bizga yozing – g'oyangiz uchun mos sumkani topishga yordam beramiz.",
    },
  },
  "limited-edition": {
    en: {
      name: "Limited Edition Birkins",
      title: "Limited Edition Hermès Birkins",
      metaTitle: "Limited Edition Hermès Birkin Bags for Sale | Montévane",
      metaDescription: "Shop limited edition Hermès Birkins – seasonal designs, collaborations and small runs that Hermès made once and never again. Checked by our specialists.",
      intro:
        "Some Birkins are made for one season only – a special print, a new construction or a design Hermès never repeats. Once they are sold, the resale market is the only place to find them.\n\nLimited editions are among the most collected Birkins, and the best examples keep their value well. Each piece here is checked by our specialists and listed with its edition details where Hermès published them.",
    },
    de: {
      name: "Limitierte Birkins",
      title: "Limitierte Hermès Birkins",
      metaTitle: "Limitierte Hermès Birkin kaufen | Montévane",
      metaDescription: "Limitierte Hermès Birkins – Saisonmodelle, Kooperationen und kleine Serien, die Hermès nur einmal gemacht hat. Von unseren Spezialisten geprüft.",
      intro:
        "Manche Birkins gibt es nur eine Saison lang – mit besonderem Druck, neuer Machart oder einem Design, das Hermès nie wiederholt. Sind sie verkauft, findet man sie nur noch auf dem Wiederverkaufsmarkt.\n\nLimitierte Modelle gehören zu den gefragtesten Birkins, und gute Stücke behalten ihren Wert. Jedes Stück hier wird von unseren Spezialisten geprüft und, wo Hermès es veröffentlicht hat, mit den Angaben zur Edition beschrieben.",
    },
    uz: {
      name: "Cheklangan nashr Birkinlar",
      title: "Cheklangan nashr Hermès Birkinlar",
      metaTitle: "Cheklangan nashr Hermès Birkin sumkalar | Montévane",
      metaDescription: "Cheklangan nashr Hermès Birkinlar – mavsumiy dizaynlar, hamkorliklar va Hermès faqat bir marta chiqargan kichik seriyalar. Mutaxassislar tekshiruvi.",
      intro:
        "Ba'zi Birkinlar faqat bir mavsum uchun chiqariladi – maxsus naqsh, yangi tuzilish yoki Hermès qaytarmaydigan dizayn bilan. Ular sotib bo'lingach, faqat qayta sotuv bozorida topiladi.\n\nCheklangan nashrlar eng ko'p yig'iladigan Birkinlar qatoriga kiradi va yaxshi nusxalar qiymatini saqlaydi. Bu yerdagi har bir buyum mutaxassislarimiz tomonidan tekshirilgan va Hermès e'lon qilgan bo'lsa, nashr tafsilotlari bilan berilgan.",
    },
  },
};

const CONDITION_TEMPLATES: Record<"new" | "pre_owned", Record<Locale, ListingCopy>> = {
  new: {
    en: {
      name: "New",
      title: "New {brand} Watches",
      metaTitle: "New {brand} Watches for Sale – Unworn | Montévane",
      metaDescription: "Shop new, unworn {brand} watches at Montévane. Each piece is checked by our specialists and listed with what comes with it. Insured worldwide shipping, 14-day returns.",
      intro:
        "Every {brand} on this page is new and unworn. We list what comes with each watch – box, papers, warranty card and stickers where present – so you know exactly what you receive.\n\nNew pieces are the right choice if you want a full manufacturer warranty from day one, or a current reference that is hard to get at a boutique. Prices reflect today's market, and we confirm availability personally before any payment.",
    },
    de: {
      name: "Neu",
      title: "Neue {brand} Uhren",
      metaTitle: "Neue {brand} Uhren kaufen – ungetragen | Montévane",
      metaDescription: "Neue, ungetragene {brand} Uhren bei Montévane. Jedes Stück von unseren Spezialisten geprüft, mit Angabe des Lieferumfangs. Versicherter Versand weltweit, 14 Tage Rückgabe.",
      intro:
        "Jede {brand} auf dieser Seite ist neu und ungetragen. Wir geben bei jeder Uhr an, was dabei ist – Box, Papiere, Garantiekarte und Schutzfolien, falls vorhanden. So wissen Sie genau, was Sie bekommen.\n\nEine neue Uhr ist richtig für Sie, wenn Sie vom ersten Tag an die volle Herstellergarantie möchten oder eine aktuelle Referenz suchen, die beim Konzessionär schwer zu bekommen ist. Die Preise richten sich nach dem heutigen Markt, und wir bestätigen die Verfügbarkeit persönlich, bevor Sie bezahlen.",
    },
    uz: {
      name: "Yangi",
      title: "Yangi {brand} soatlari",
      metaTitle: "Yangi {brand} soatlarini sotib olish | Montévane",
      metaDescription: "Montévane'da yangi, taqilmagan {brand} soatlari. Har bir buyum mutaxassislarimiz tomonidan tekshirilgan, to'plami ko'rsatilgan. Sug'urtalangan yetkazib berish, 14 kun ichida qaytarish.",
      intro:
        "Bu sahifadagi har bir {brand} yangi va taqilmagan. Har bir soat bilan nima kelishini ko'rsatamiz – quti, hujjatlar, kafolat kartasi va himoya plyonkalari, agar bo'lsa.\n\nYangi soat birinchi kundan to'liq ishlab chiqaruvchi kafolatini xohlasangiz yoki butikda topish qiyin bo'lgan joriy modelni izlasangiz, to'g'ri tanlov. Narxlar bugungi bozorga mos, to'lovdan oldin mavjudligini shaxsan tasdiqlaymiz.",
    },
  },
  pre_owned: {
    en: {
      name: "Pre-Owned",
      title: "Pre-Owned {brand} Watches",
      metaTitle: "Pre-Owned {brand} Watches for Sale | Montévane",
      metaDescription: "Shop pre-owned {brand} watches at Montévane, each checked by our specialists with its condition described honestly. Insured worldwide shipping, 14-day returns.",
      intro:
        "A pre-owned {brand} lets you choose from discontinued references, earlier dial variants and pieces that are no longer available new. It is also how most collectors build a collection.\n\nEvery watch on this page has been worn before. We check each one and describe its condition plainly – case, bracelet, crystal and whether it has been serviced – and list the box and papers that come with it. If a watch ever fails an independent authentication, you get a full refund.",
    },
    de: {
      name: "Gebraucht",
      title: "{brand} Uhren aus zweiter Hand",
      metaTitle: "{brand} gebraucht kaufen | Montévane",
      metaDescription: "Gebrauchte {brand} Uhren bei Montévane – jede von unseren Spezialisten geprüft und ehrlich beschrieben. Versicherter Versand weltweit, 14 Tage Rückgabe.",
      intro:
        "Mit einer gebrauchten {brand} können Sie auch aus eingestellten Referenzen, älteren Zifferblattvarianten und Uhren wählen, die es neu nicht mehr gibt. So bauen die meisten Sammler ihre Sammlung auf.\n\nJede Uhr auf dieser Seite wurde schon getragen. Wir prüfen jede einzelne und beschreiben den Zustand klar – Gehäuse, Armband, Glas und ob sie revidiert wurde – und nennen Box und Papiere, die dabei sind. Besteht eine Uhr eine unabhängige Echtheitsprüfung nicht, bekommen Sie Ihr Geld vollständig zurück.",
    },
    uz: {
      name: "Ishlatilgan",
      title: "Ishlatilgan {brand} soatlari",
      metaTitle: "Ishlatilgan {brand} soatlarini sotib olish | Montévane",
      metaDescription: "Montévane'da ishlatilgan {brand} soatlari – har biri mutaxassislarimiz tomonidan tekshirilgan va holati halol tasvirlangan. Sug'urtalangan yetkazib berish, 14 kun ichida qaytarish.",
      intro:
        "Ishlatilgan {brand} sizga ishlab chiqarilmay qo'ygan modellar, eski siferblat variantlari va yangi holda sotilmaydigan soatlardan tanlash imkonini beradi. Ko'pchilik kolleksionerlar kolleksiyasini shunday yig'adi.\n\nBu sahifadagi har bir soat avval taqilgan. Har birini tekshiramiz va holatini ochiq tasvirlaymiz – korpus, bilaguzuk, oyna va texnik xizmat ko'rsatilganmi – hamda qo'shib beriladigan quti va hujjatlarni ko'rsatamiz. Agar soat mustaqil tekshiruvdan o'tmasa, pulingiz to'liq qaytariladi.",
    },
  },
};

/** Copy for a brand's New or Pre-Owned page, e.g. "Pre-Owned Rolex Watches". */
export function conditionCopy(condition: "new" | "pre_owned", brand: string, locale: Locale): ListingCopy {
  const t = CONDITION_TEMPLATES[condition][locale];
  const fill = (s: string) => s.replaceAll("{brand}", brand);
  return { name: t.name, title: fill(t.title), metaTitle: fill(t.metaTitle), metaDescription: fill(t.metaDescription), intro: fill(t.intro) };
}
