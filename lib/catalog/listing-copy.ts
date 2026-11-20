import type { Locale } from "@/lib/i18n/config";

// Copy for the Birkin landing pages and the New / Pre-Owned page of every watch
// brand. Each page has its own title, description and intro so none of them
// reads as a copy of its parent listing.

export type ListingCopy = { name: string; title: string; metaTitle: string; metaDescription: string; intro: string };

const BIRKIN_COPY: Record<string, Record<Locale, ListingCopy>> = {
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

const KELLY_COPY: Record<string, Record<Locale, ListingCopy>> = {
  "pre-owned": {
    en: {
      name: "Pre-Owned Kelly Bags",
      title: "Pre-Owned Hermès Kelly Bags",
      metaTitle: "Pre-Owned Hermès Kelly Bags for Sale | Montévane",
      metaDescription: "Shop pre-owned Hermès Kelly bags in Sellier and Retourne, each checked by our specialists with its condition described honestly. Insured worldwide shipping.",
      intro:
        "A pre-owned Kelly opens up sizes, leathers and colours Hermès no longer makes – from vintage Box calf to discontinued shades.\n\nThe Kelly's flap, straps and handle show wear differently from a Birkin, so we photograph and describe each of them. If a bag ever fails an independent authentication, you get a full refund.",
    },
    de: {
      name: "Kelly Bags aus zweiter Hand",
      title: "Hermès Kelly aus zweiter Hand",
      metaTitle: "Hermès Kelly gebraucht kaufen | Montévane",
      metaDescription: "Gebrauchte Hermès Kelly Bags in Sellier und Retourne, jede von unseren Spezialisten geprüft und ehrlich beschrieben. Versicherter Versand weltweit.",
      intro:
        "Mit einer gebrauchten Kelly finden Sie Größen, Leder und Farben, die Hermès nicht mehr herstellt – von Vintage-Box-Leder bis zu eingestellten Farbtönen.\n\nKlappe, Riemen und Henkel einer Kelly nutzen sich anders ab als bei einer Birkin. Deshalb fotografieren und beschreiben wir jedes Detail. Besteht eine Tasche eine unabhängige Echtheitsprüfung nicht, bekommen Sie Ihr Geld vollständig zurück.",
    },
    uz: {
      name: "Ishlatilgan Kelly sumkalar",
      title: "Ishlatilgan Hermès Kelly sumkalar",
      metaTitle: "Ishlatilgan Hermès Kelly sumkalarni sotib olish | Montévane",
      metaDescription: "Sellier va Retourne uslubidagi ishlatilgan Hermès Kelly sumkalar – har biri mutaxassislarimiz tomonidan tekshirilgan. Sug'urtalangan yetkazib berish.",
      intro:
        "Ishlatilgan Kelly Hermès endi chiqarmaydigan o'lcham, charm va ranglarni topish imkonini beradi – vintaj Box charmdan to'xtatilgan ranglargacha.\n\nKellyning qopqog'i, tasmalari va tutqichi Birkindan boshqacha eskiradi, shuning uchun har birini suratga olib, tasvirlaymiz. Sumka mustaqil tekshiruvdan o'tmasa, pulingiz to'liq qaytariladi.",
    },
  },
  "new-unused": {
    en: {
      name: "New & Unused Kelly Bags",
      title: "New & Unused Hermès Kelly Bags",
      metaTitle: "New & Unused Hermès Kelly Bags for Sale | Montévane",
      metaDescription: "Shop new and unused Hermès Kelly bags – never carried, with the accessories listed on each piece. Checked by our specialists, shipped insured worldwide.",
      intro:
        "These Kellys have never been carried and come with the accessories listed on each piece – usually the shoulder strap, dust bag, rain cover, clochette, lock and keys.\n\nSellier Kellys keep their sharp, structured outline; Retourne Kellys are softer and more relaxed. Each listing tells you which one it is, along with the size, leather and hardware.",
    },
    de: {
      name: "Neue Kelly Bags",
      title: "Neue & ungetragene Hermès Kelly",
      metaTitle: "Neue Hermès Kelly kaufen – ungetragen | Montévane",
      metaDescription: "Neue, ungetragene Hermès Kelly Bags – mit dem Zubehör, das bei jedem Stück angegeben ist. Von Spezialisten geprüft, versicherter Versand weltweit.",
      intro:
        "Diese Kellys wurden noch nie getragen und kommen mit dem Zubehör, das bei jedem Stück steht – meist Schulterriemen, Staubbeutel, Regenschutz, Clochette, Schloss und Schlüssel.\n\nEine Sellier-Kelly behält ihre klare, feste Form, eine Retourne-Kelly ist weicher und lässiger. Bei jedem Stück steht, welche Machart es ist, dazu Größe, Leder und Beschläge.",
    },
    uz: {
      name: "Yangi Kelly sumkalar",
      title: "Yangi va ishlatilmagan Hermès Kelly sumkalar",
      metaTitle: "Yangi Hermès Kelly sumkalarni sotib olish | Montévane",
      metaDescription: "Yangi, hech ishlatilmagan Hermès Kelly sumkalar – har bir buyumda ko'rsatilgan aksessuarlar bilan. Mutaxassislar tekshiruvi, sug'urtalangan yetkazib berish.",
      intro:
        "Bu Kellylar hech qachon ishlatilmagan va har bir buyumda ko'rsatilgan aksessuarlar bilan keladi – odatda yelka tasmasi, chang xaltasi, yomg'ir g'ilofi, klochet, qulf va kalitlar.\n\nSellier Kelly qat'iy, aniq shaklini saqlaydi, Retourne Kelly esa yumshoqroq. Har bir buyumda qaysi turdagi ekani, o'lchami, charmi va furniturasi yozilgan.",
    },
  },
  "exotic-leather": {
    en: {
      name: "Exotic Leather Kelly Bags",
      title: "Exotic Leather Hermès Kelly Bags",
      metaTitle: "Exotic Hermès Kelly Bags – Crocodile & Lizard | Montévane",
      metaDescription: "Shop exotic Hermès Kelly bags in crocodile, alligator and lizard – from the Mini Kelly to the Kelly 28. Each one checked by our specialists before it is listed.",
      intro:
        "In crocodile or lizard, the Kelly's clean lines become an evening piece – especially in the smaller sizes, from the Mini Kelly to the Kelly 25.\n\nShiny and matte skins look and age differently, and every skin has its own pattern. Exotic leathers need CITES papers to cross many borders, so ask us before you buy and we will tell you whether your country allows the import.",
    },
    de: {
      name: "Kelly aus exotischem Leder",
      title: "Hermès Kelly aus exotischem Leder",
      metaTitle: "Exotische Hermès Kelly – Krokodil & Eidechse | Montévane",
      metaDescription: "Hermès Kelly aus Krokodil, Alligator und Eidechse – von der Mini Kelly bis zur Kelly 28. Jede Tasche vor dem Einstellen von Spezialisten geprüft.",
      intro:
        "In Krokodil oder Eidechse wird die klare Kelly zur Abendtasche – vor allem in den kleinen Größen, von der Mini Kelly bis zur Kelly 25.\n\nGlänzendes und mattes Leder sieht anders aus und altert anders, und jede Haut hat ihr eigenes Muster. Für viele Länder braucht exotisches Leder CITES-Papiere. Fragen Sie uns vor dem Kauf – wir sagen Ihnen, ob die Einfuhr in Ihr Land erlaubt ist.",
    },
    uz: {
      name: "Ekzotik charmdan Kelly",
      title: "Ekzotik charmdan Hermès Kelly sumkalar",
      metaTitle: "Ekzotik Hermès Kelly – timsoh va kaltakesak | Montévane",
      metaDescription: "Timsoh, alligator va kaltakesak charmidan Hermès Kelly – Mini Kellydan Kelly 28 gacha. Har biri sotuvga qo'yilishidan oldin mutaxassislar tomonidan tekshiriladi.",
      intro:
        "Timsoh yoki kaltakesak charmida Kellyning toza chiziqlari kechki sumkaga aylanadi – ayniqsa Mini Kellydan Kelly 25 gacha bo'lgan kichik o'lchamlarda.\n\nYaltiroq va mat charm turlicha ko'rinadi va eskiradi, har bir terining o'z naqshi bor. Ko'p mamlakatlarga ekzotik charm uchun CITES hujjatlari kerak, shuning uchun xariddan oldin so'rang.",
    },
  },
  hss: {
    en: {
      name: "Hermès HSS Kelly Bags",
      title: "Hermès HSS Special Order Kellys",
      metaTitle: "Hermès HSS Kelly – Special Order Bags for Sale | Montévane",
      metaDescription: "Shop Hermès HSS special order Kellys – client-chosen colours, contrast stitching and hardware, marked with the horseshoe stamp. Checked by our specialists.",
      intro:
        "An HSS Kelly was ordered by a client who chose its colours, lining, stitching and hardware. Hermès marks it with a small horseshoe next to the date stamp.\n\nOn a Kelly, two-tone combinations show most on the flap, straps and handle, which is why special order Kellys look so different from boutique stock. Each one is effectively one of a kind.",
    },
    de: {
      name: "Hermès HSS Kelly",
      title: "Hermès HSS Kelly – Sonderanfertigungen",
      metaTitle: "Hermès HSS Kelly – Sonderanfertigung kaufen | Montévane",
      metaDescription: "Hermès HSS Kelly als Sonderanfertigung – Farben, Nähte und Beschläge nach Kundenwunsch, mit Hufeisen-Stempel. Von Spezialisten geprüft.",
      intro:
        "Eine HSS Kelly hat ein Kunde selbst bestellt und dabei Farben, Futter, Nähte und Beschläge ausgewählt. Hermès setzt dafür ein kleines Hufeisen neben den Datumsstempel.\n\nBei der Kelly sieht man zweifarbige Kombinationen vor allem an Klappe, Riemen und Henkel – deshalb wirken Sonderanfertigungen so anders als Boutique-Ware. Jede ist praktisch ein Einzelstück.",
    },
    uz: {
      name: "Hermès HSS Kelly",
      title: "Hermès HSS – maxsus buyurtma Kellylar",
      metaTitle: "Hermès HSS Kelly – maxsus buyurtma sumkalar | Montévane",
      metaDescription: "Hermès HSS maxsus buyurtma Kellylar – mijoz tanlagan ranglar, kontrast chok va furnitura, taqa muhri bilan. Mutaxassislar tekshiruvi.",
      intro:
        "HSS Kellyni mijozning o'zi buyurtma qilgan: ranglar, astar, chok va furniturani o'zi tanlagan. Hermès sana muhri yoniga kichik taqa belgisini qo'yadi.\n\nKellyda ikki rangli birikmalar qopqoq, tasmalar va tutqichda yaqqol ko'rinadi, shuning uchun maxsus buyurtma Kellylar butik assortimentidan juda farq qiladi. Har biri deyarli yagona nusxa.",
    },
  },
  "custom-special-order": {
    en: {
      name: "Custom Kelly Bags",
      title: "Custom & Rare Hermès Kellys",
      metaTitle: "Custom Hermès Kelly Bags – Painted & One-of-a-Kind | Montévane",
      metaDescription: "Shop custom Hermès Kellys – hand-painted and embellished one-of-a-kind pieces on authentic Hermès bags. Each listing states exactly what was customised.",
      intro:
        "These Kellys began as authentic Hermès bags and were then personalised by independent artists – hand-painted or embellished into a one-off piece.\n\nThe work is done after the bag leaves Hermès, so it is not a Hermès special order. Each listing says exactly what was changed, so you know what you are buying.",
    },
    de: {
      name: "Individuelle Kellys",
      title: "Individuelle & seltene Hermès Kellys",
      metaTitle: "Individuelle Hermès Kelly – bemalt & einzigartig | Montévane",
      metaDescription: "Individuell gestaltete Hermès Kellys – handbemalt oder verziert, Einzelstücke auf echten Hermès-Taschen. Bei jedem Stück steht genau, was verändert wurde.",
      intro:
        "Diese Kellys waren zuerst echte Hermès-Taschen und wurden dann von unabhängigen Künstlern gestaltet – von Hand bemalt oder zu einem Einzelstück verziert.\n\nDie Gestaltung passiert, nachdem die Tasche Hermès verlassen hat. Es ist also keine Sonderanfertigung von Hermès. Bei jedem Stück steht genau, was verändert wurde.",
    },
    uz: {
      name: "Maxsus bezatilgan Kellylar",
      title: "Maxsus va noyob Hermès Kellylar",
      metaTitle: "Maxsus bezatilgan Hermès Kelly – yagona nusxalar | Montévane",
      metaDescription: "Original Hermès sumkalari asosida qo'lda bo'yalgan va bezatilgan yagona Kellylar. Har bir buyumda nima o'zgartirilgani aniq yozilgan.",
      intro:
        "Bu Kellylar dastlab original Hermès sumkalari bo'lgan, keyin mustaqil rassomlar tomonidan qo'lda bo'yalgan yoki bezatilgan.\n\nBezash sumka Hermèsdan chiqqandan keyin qilinadi, shuning uchun bu Hermès maxsus buyurtmasi emas. Har bir buyumda nima o'zgartirilgani aniq yozilgan.",
    },
  },
  "limited-edition": {
    en: {
      name: "Limited Edition Kellys",
      title: "Limited Edition Hermès Kellys",
      metaTitle: "Limited Edition Hermès Kelly Bags for Sale | Montévane",
      metaDescription: "Shop limited edition Hermès Kellys – seasonal designs and small runs such as the Kelly Pochette and special constructions. Checked by our specialists.",
      intro:
        "Hermès regularly reinterprets the Kelly in small, seasonal runs – new shapes, unusual leathers and pieces like the Kelly Pochette and Kelly Danse.\n\nOnce a season ends, these designs are only found on the resale market. Each piece here is checked by our specialists and listed with its edition details where Hermès published them.",
    },
    de: {
      name: "Limitierte Kellys",
      title: "Limitierte Hermès Kellys",
      metaTitle: "Limitierte Hermès Kelly kaufen | Montévane",
      metaDescription: "Limitierte Hermès Kellys – Saisonmodelle und kleine Serien wie die Kelly Pochette und besondere Macharten. Von unseren Spezialisten geprüft.",
      intro:
        "Hermès interpretiert die Kelly immer wieder in kleinen Saison-Serien neu – mit neuen Formen, besonderem Leder und Modellen wie der Kelly Pochette oder der Kelly Danse.\n\nIst die Saison vorbei, findet man diese Modelle nur noch auf dem Wiederverkaufsmarkt. Jedes Stück hier wird von unseren Spezialisten geprüft und, wo Hermès es veröffentlicht hat, mit den Angaben zur Edition beschrieben.",
    },
    uz: {
      name: "Cheklangan nashr Kellylar",
      title: "Cheklangan nashr Hermès Kellylar",
      metaTitle: "Cheklangan nashr Hermès Kelly sumkalar | Montévane",
      metaDescription: "Cheklangan nashr Hermès Kellylar – mavsumiy dizaynlar va Kelly Pochette kabi kichik seriyalar. Mutaxassislar tekshiruvi.",
      intro:
        "Hermès Kellyni muntazam ravishda kichik mavsumiy seriyalarda qayta talqin qiladi – yangi shakllar, noodatiy charmlar va Kelly Pochette, Kelly Danse kabi modellar.\n\nMavsum tugagach, bu dizaynlarni faqat qayta sotuv bozorida topish mumkin. Har bir buyum mutaxassislarimiz tomonidan tekshirilgan.",
    },
  },
};

/** Landing-page copy per bag category and page slug. */
export const BAG_COPY: Record<string, Record<string, Record<Locale, ListingCopy>>> = {
  "birkin-bags": BIRKIN_COPY,
  "kelly-bags": KELLY_COPY,
};

const ALL_WATCHES: Record<"new" | "pre_owned", Record<Locale, ListingCopy>> = {
  new: {
    en: {
      name: "New Watches",
      title: "New Luxury Watches",
      metaTitle: "New Luxury Watches for Sale – Rolex, Patek, AP | Montévane",
      metaDescription: "Shop new, unworn luxury watches from Rolex, Patek Philippe, Audemars Piguet and more. Checked by our specialists, insured worldwide shipping, 14-day returns.",
      intro:
        "Every watch on this page is new and unworn, across all the houses we carry – from current Rolex sports models to Patek Philippe and Audemars Piguet references that are hard to get at a boutique.\n\nWe list what comes with each watch – box, papers and warranty card where present – and confirm availability personally before any payment. Use the filters to narrow by house, size, material or price.",
    },
    de: {
      name: "Neue Uhren",
      title: "Neue Luxusuhren",
      metaTitle: "Neue Luxusuhren kaufen – Rolex, Patek, AP | Montévane",
      metaDescription: "Neue, ungetragene Luxusuhren von Rolex, Patek Philippe, Audemars Piguet und mehr. Von Spezialisten geprüft, versicherter Versand weltweit, 14 Tage Rückgabe.",
      intro:
        "Jede Uhr auf dieser Seite ist neu und ungetragen – über alle Marken, die wir führen. Von aktuellen Rolex-Sportmodellen bis zu Referenzen von Patek Philippe und Audemars Piguet, die beim Konzessionär kaum zu bekommen sind.\n\nBei jeder Uhr steht, was dabei ist – Box, Papiere und Garantiekarte, falls vorhanden. Die Verfügbarkeit bestätigen wir persönlich, bevor Sie bezahlen. Mit den Filtern finden Sie schnell die passende Marke, Größe, das Material oder den Preis.",
    },
    uz: {
      name: "Yangi soatlar",
      title: "Yangi hashamatli soatlar",
      metaTitle: "Yangi hashamatli soatlar – Rolex, Patek, AP | Montévane",
      metaDescription: "Rolex, Patek Philippe, Audemars Piguet va boshqa brendlarning yangi, taqilmagan soatlari. Mutaxassislar tekshiruvi, sug'urtalangan yetkazib berish, 14 kun ichida qaytarish.",
      intro:
        "Bu sahifadagi har bir soat yangi va taqilmagan – biz sotadigan barcha brendlardan: Rolex sport modellaridan butikda topish qiyin bo'lgan Patek Philippe va Audemars Piguet modellarigacha.\n\nHar bir soat bilan nima kelishini ko'rsatamiz – quti, hujjatlar va kafolat kartasi, agar bo'lsa. To'lovdan oldin mavjudligini shaxsan tasdiqlaymiz. Brend, o'lcham, material yoki narx bo'yicha filtrlardan foydalaning.",
    },
  },
  pre_owned: {
    en: {
      name: "Pre-Owned Watches",
      title: "Pre-Owned Luxury Watches",
      metaTitle: "Pre-Owned Luxury Watches for Sale – Rolex, Patek, AP | Montévane",
      metaDescription: "Shop pre-owned luxury watches from Rolex, Patek Philippe, Audemars Piguet, Richard Mille, F.P. Journe and more – each checked and honestly described.",
      intro:
        "Pre-owned is where most of the world's great watches are found: discontinued references, earlier dial variants and independent makers like F.P. Journe whose pieces are rarely available new.\n\nEvery watch here has been worn before. We check each one and describe its condition plainly – case, bracelet, crystal and service history – and list the box and papers that come with it. If a watch ever fails an independent authentication, you get a full refund.",
    },
    de: {
      name: "Gebrauchte Uhren",
      title: "Luxusuhren aus zweiter Hand",
      metaTitle: "Gebrauchte Luxusuhren kaufen – Rolex, Patek, AP | Montévane",
      metaDescription: "Gebrauchte Luxusuhren von Rolex, Patek Philippe, Audemars Piguet, Richard Mille, F.P. Journe und mehr – jede geprüft und ehrlich beschrieben.",
      intro:
        "Die meisten großen Uhren der Welt findet man aus zweiter Hand: eingestellte Referenzen, ältere Zifferblattvarianten und unabhängige Uhrmacher wie F.P. Journe, deren Uhren neu kaum zu haben sind.\n\nJede Uhr hier wurde schon getragen. Wir prüfen jede einzelne und beschreiben den Zustand klar – Gehäuse, Armband, Glas und Revisionen – und nennen Box und Papiere, die dabei sind. Besteht eine Uhr eine unabhängige Echtheitsprüfung nicht, bekommen Sie Ihr Geld vollständig zurück.",
    },
    uz: {
      name: "Ishlatilgan soatlar",
      title: "Ishlatilgan hashamatli soatlar",
      metaTitle: "Ishlatilgan hashamatli soatlar – Rolex, Patek, AP | Montévane",
      metaDescription: "Rolex, Patek Philippe, Audemars Piguet, Richard Mille, F.P. Journe va boshqa brendlarning ishlatilgan soatlari – har biri tekshirilgan va halol tasvirlangan.",
      intro:
        "Dunyoning eng yaxshi soatlarining aksariyati ishlatilgan holda topiladi: ishlab chiqarilmay qo'ygan modellar, eski siferblat variantlari va F.P. Journe kabi mustaqil ustalarning soatlari.\n\nBu yerdagi har bir soat avval taqilgan. Har birini tekshiramiz va holatini ochiq tasvirlaymiz – korpus, bilaguzuk, oyna va texnik xizmat tarixi – hamda quti va hujjatlarni ko'rsatamiz. Soat mustaqil tekshiruvdan o'tmasa, pulingiz to'liq qaytariladi.",
    },
  },
};

/** Copy for the all-brands New / Pre-Owned watch pages. */
export function allWatchesCopy(condition: "new" | "pre_owned", locale: Locale): ListingCopy {
  return ALL_WATCHES[condition][locale];
}
