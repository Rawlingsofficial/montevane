import type { Locale } from "../config";

// Long-form copy for About, Journal chrome and the Privacy Policy.
// Privacy text is a starting draft — have it reviewed for GDPR before launch.

type Block = { eyebrow: string; title: string; body: string };
type PageCopy = {
  about: { eyebrow: string; title: string; description: string; blocks: [Block, Block, Block]; founderEyebrow: string; founderBody: string };
  journal: { eyebrow: string; title: string; description: string; back: string; more: string; englishOnly: string };
  privacy: { title: string; updated: string; sections: { title: string; body: string }[] };
};

export const PAGES: Record<Locale, PageCopy> = {
  en: {
    about: {
      eyebrow: "Our Story",
      title: "Hermès & Rare Watches Specialist, Miami & Monaco",
      description: "Hermès and rare watches — a boutique in Miami, specialists in Monaco.",
      blocks: [
        {
          eyebrow: "The House",
          title: "Hermès first, and only what we can stand behind",
          body: "Montévane focuses on what it knows best: Hermès — Birkin, Kelly, exotics, special orders and the accessories that go with them — and rare watches. Every Hermès piece and every watch is verified by our authentication specialists before it is listed, and if any item ever fails a third-party check we refund the full price.",
        },
        {
          eyebrow: "Craftsmanship",
          title: "Every stitch tells the story of an atelier",
          body: "A Birkin is saddle-stitched by one artisan from start to finish; a great watch is assembled and regulated by hand. We look for the pieces where that craft shows — the right leather, the right hardware, the right condition — and tell you exactly what you are buying.",
        },
        {
          eyebrow: "The Experience",
          title: "Personal service, in Miami or anywhere",
          body: "See a piece in person at our Miami boutique, or talk to us on WhatsApp, Telegram, Signal or by phone. Pay securely by payment link, card or bank wire, receive it fully insured anywhere in the world, and return it within 14 days if it isn't right.",
        },
      ],
      founderEyebrow: "Who You'll Deal With",
      founderBody: "Every inquiry is answered personally — by message, by phone, or face to face at the boutique.",
    },
    journal: {
      eyebrow: "The Journal",
      title: "Luxury Guides & Stories",
      description: "How to authenticate, buy and care for Hermès bags and rare watches — and the heritage behind the icons.",
      back: "Back to Journal",
      more: "More Stories",
      englishOnly: "",
    },
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: November 2026",
      sections: [
        { title: "Who we are", body: "Montévane is an independent luxury boutique. This policy explains what personal data we collect through this website and how we use it." },
        { title: "What we collect", body: "When you send an inquiry we collect your name, the contact details you give us (email, phone, messaging handle), your country, the channels you want us to use and your message. For a purchase request we also collect your delivery address, so we can quote shipping and send the piece. When you subscribe to our newsletter we collect your email address." },
        { title: "Why we use it", body: "We use your details only to answer your inquiry, arrange a purchase, ship your order and — if you subscribed — send you news about new pieces. The legal basis is your request (steps before a contract) and, for the newsletter, your consent." },
        { title: "Who we share it with", body: "We share data only with the services needed to run the shop — our hosting and database provider, the messaging app you choose, payment providers and shipping carriers. We never sell your data." },
        { title: "How long we keep it", body: "Inquiries are kept for up to 24 months, or longer where tax law requires for completed sales. You can unsubscribe from the newsletter at any time." },
        { title: "Your rights", body: "You may ask to access, correct, delete or export your data, object to its use, or withdraw consent at any time. Contact us using the details on our contact page. You may also complain to your local data protection authority." },
        { title: "Cookies", body: "This website uses cookies that are needed for it to work, and Google Analytics cookies to count visits and see which pages are used, so we can improve the site. We do not use advertising cookies. You can block or delete cookies in your browser settings." },
      ],
    },
  },
  de: {
    about: {
      eyebrow: "Unsere Geschichte",
      title: "Spezialist für Hermès & seltene Uhren – Miami & Monaco",
      description: "Hermès und seltene Uhren – Boutique in Miami, Spezialisten in Monaco.",
      blocks: [
        {
          eyebrow: "Das Haus",
          title: "Hermès zuerst – und nur, wofür wir einstehen",
          body: "Montévane konzentriert sich auf das, was es am besten kennt: Hermès – Birkin, Kelly, Exoten, Sonderanfertigungen und passende Accessoires – sowie seltene Uhren. Jedes Hermès-Stück und jede Uhr wird vor dem Angebot von unseren Experten geprüft. Besteht ein Stück je eine Drittprüfung nicht, erstatten wir den vollen Preis.",
        },
        {
          eyebrow: "Handwerk",
          title: "Jeder Stich erzählt von einem Atelier",
          body: "Eine Birkin wird von einer Hand von Anfang bis Ende sattelgenäht; eine große Uhr von Hand montiert und reguliert. Wir suchen Stücke, bei denen dieses Handwerk sichtbar ist – und sagen Ihnen genau, was Sie kaufen.",
        },
        {
          eyebrow: "Der Service",
          title: "Persönlich – in Miami oder überall",
          body: "Sehen Sie Stücke in unserer Boutique in Miami oder schreiben Sie uns per WhatsApp, Telegram, Signal oder rufen Sie an. Sichere Zahlung per Zahlungslink, Karte oder Überweisung, voll versicherter Versand weltweit und 14 Tage Rückgabe.",
        },
      ],
      founderEyebrow: "Ihr Ansprechpartner",
      founderBody: "Jede Anfrage wird persönlich beantwortet – per Nachricht, Telefon oder direkt in der Boutique.",
    },
    journal: {
      eyebrow: "Das Journal",
      title: "Ratgeber & Geschichten",
      description: "Echtheit prüfen, sicher kaufen und richtig pflegen – plus die Geschichte hinter den Ikonen.",
      back: "Zurück zum Journal",
      more: "Weitere Artikel",
      englishOnly: "Unsere Journal-Artikel erscheinen derzeit auf Englisch.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      updated: "Stand: November 2026",
      sections: [
        { title: "Wer wir sind", body: "Montévane ist eine unabhängige Luxus-Boutique. Diese Erklärung beschreibt, welche personenbezogenen Daten wir über diese Website erheben und wie wir sie verwenden." },
        { title: "Welche Daten wir erheben", body: "Bei einer Anfrage erheben wir Ihren Namen, Ihre Kontaktdaten (E-Mail, Telefon, Messenger), Ihr Land, die gewünschten Kontaktkanäle und Ihre Nachricht. Bei einer Kaufanfrage erheben wir außerdem Ihre Lieferadresse, damit wir den Versand berechnen und das Stück schicken können. Bei der Newsletter-Anmeldung erheben wir Ihre E-Mail-Adresse." },
        { title: "Zweck und Rechtsgrundlage", body: "Wir nutzen Ihre Daten ausschließlich zur Beantwortung Ihrer Anfrage, zur Abwicklung eines Kaufs und des Versands sowie – bei Anmeldung – für den Newsletter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. lit. a (Einwilligung)." },
        { title: "Empfänger", body: "Wir geben Daten nur an Dienste weiter, die für den Betrieb nötig sind – Hosting- und Datenbankanbieter, den von Ihnen gewählten Messenger, Zahlungsdienstleister und Versanddienstleister. Wir verkaufen keine Daten." },
        { title: "Speicherdauer", body: "Anfragen speichern wir bis zu 24 Monate bzw. so lange, wie steuerrechtliche Aufbewahrungspflichten es verlangen. Den Newsletter können Sie jederzeit abbestellen." },
        { title: "Ihre Rechte", body: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie auf Widerruf Ihrer Einwilligung. Sie können sich zudem bei einer Datenschutz-Aufsichtsbehörde beschweren." },
        { title: "Cookies", body: "Diese Website nutzt Cookies, die für den Betrieb nötig sind, und Cookies von Google Analytics. Damit zählen wir Besuche und sehen, welche Seiten genutzt werden, um die Website zu verbessern. Werbe-Cookies setzen wir nicht ein. Sie können Cookies jederzeit in Ihrem Browser blockieren oder löschen." },
      ],
    },
  },
  uz: {
    about: {
      eyebrow: "Bizning tariximiz",
      title: "Hermès va noyob soatlar mutaxassisi – Mayami va Monako",
      description: "Hermès va noyob soatlar – Mayamida butik, Monakoda mutaxassislar.",
      blocks: [
        {
          eyebrow: "Butik",
          title: "Avvalo Hermès – faqat kafolat bera oladiganimiz",
          body: "Montévane eng yaxshi biladigan narsasiga e'tibor qaratadi: Hermès – Birkin, Kelly, ekzotik, maxsus buyurtmalar va aksessuarlar – hamda noyob soatlar. Har bir Hermès buyumi va soat sotuvdan oldin mutaxassislarimiz tomonidan tekshiriladi; uchinchi tomon tekshiruvidan o'tmasa, to'liq pul qaytariladi.",
        },
        {
          eyebrow: "Mahorat",
          title: "Har bir chok ustaxona tarixini so'zlaydi",
          body: "Birkin boshidan oxirigacha bitta usta tomonidan qo'lda tikiladi; yaxshi soat qo'lda yig'iladi va sozlanadi. Biz shu mahorat ko'rinadigan buyumlarni tanlaymiz va nima sotib olayotganingizni aniq aytamiz.",
        },
        {
          eyebrow: "Xizmat",
          title: "Mayamida yoki istalgan joyda shaxsiy xizmat",
          body: "Mayamidagi butikimizda ko'ring yoki WhatsApp, Telegram, Signal orqali yozing. To'lov havolasi, karta yoki bank o'tkazmasi bilan xavfsiz to'lov, butun dunyoga sug'urtalangan yetkazib berish va 14 kun ichida qaytarish.",
        },
      ],
      founderEyebrow: "Siz bilan kim ishlaydi",
      founderBody: "Har bir so'rovga shaxsan javob beriladi – xabar, telefon yoki butikda yuzma-yuz.",
    },
    journal: {
      eyebrow: "Jurnal",
      title: "Qo'llanmalar va hikoyalar",
      description: "Haqiqiylikni tekshirish, xarid qilish va parvarishlash bo'yicha qo'llanmalar.",
      back: "Jurnalga qaytish",
      more: "Boshqa maqolalar",
      englishOnly: "Jurnal maqolalari hozircha ingliz tilida.",
    },
    privacy: {
      title: "Maxfiylik siyosati",
      updated: "Yangilangan: 2026-yil noyabr",
      sections: [
        { title: "Biz kimmiz", body: "Montévane – mustaqil lyuks butik. Ushbu siyosat sayt orqali qanday shaxsiy ma'lumotlarni yig'ishimiz va ulardan qanday foydalanishimizni tushuntiradi." },
        { title: "Qanday ma'lumot yig'amiz", body: "So'rov yuborganingizda ismingiz, aloqa ma'lumotlaringiz (email, telefon, messenjer), mamlakatingiz, tanlagan aloqa kanallaringiz va xabaringizni yig'amiz. Xarid so'rovida yetkazib berish narxini hisoblash va buyumni jo'natish uchun manzilingizni ham yig'amiz. Obuna bo'lganingizda email manzilingizni saqlaymiz." },
        { title: "Nima uchun foydalanamiz", body: "Ma'lumotlaringizdan faqat so'rovingizga javob berish, xaridni rasmiylashtirish, buyurtmani yetkazish va – obuna bo'lsangiz – yangiliklar yuborish uchun foydalanamiz." },
        { title: "Kimga beramiz", body: "Ma'lumotlarni faqat do'kon ishlashi uchun zarur xizmatlarga beramiz – xosting va ma'lumotlar bazasi, siz tanlagan messenjer, to'lov va yetkazib berish xizmatlari. Ma'lumotlaringizni sotmaymiz." },
        { title: "Qancha saqlaymiz", body: "So'rovlar 24 oygacha yoki soliq qonunchiligi talab qilgan muddat davomida saqlanadi. Obunadan istalgan vaqtda chiqishingiz mumkin." },
        { title: "Huquqlaringiz", body: "Ma'lumotlaringizni ko'rish, tuzatish, o'chirish yoki rozilikni qaytarib olishni so'rashingiz mumkin. Buning uchun aloqa sahifasidagi kanallar orqali bog'laning." },
        { title: "Cookie fayllar", body: "Sayt ishlashi uchun zarur cookie fayllardan hamda tashriflarni hisoblash va saytni yaxshilash uchun Google Analytics cookie fayllaridan foydalanadi. Reklama cookie fayllari ishlatilmaydi. Cookie fayllarni brauzeringiz sozlamalarida bloklashingiz yoki o'chirishingiz mumkin." },
      ],
    },
  },
};
