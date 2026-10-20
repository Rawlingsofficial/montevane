import type { Locale } from "../config";

// Long-form copy for About, Journal chrome and the Privacy Policy.
// Privacy text is a starting draft — have it reviewed for GDPR before launch.

type Block = { eyebrow: string; title: string; body: string };
type PageCopy = {
  about: { eyebrow: string; title: string; description: string; blocks: [Block, Block, Block] };
  journal: { eyebrow: string; title: string; description: string; back: string; more: string; englishOnly: string };
  privacy: { title: string; updated: string; sections: { title: string; body: string }[] };
};

export const PAGES: Record<Locale, PageCopy> = {
  en: {
    about: {
      eyebrow: "Our Story",
      title: "An Independent Boutique for Authentic Luxury",
      description: "Bags, watches and jewelry from the world's great houses — not affiliated with any of them.",
      blocks: [
        {
          eyebrow: "The House",
          title: "Carefully curated, expertly authenticated",
          body: "Montévane was founded on a simple belief: a luxury piece is not just an accessory but an investment in craft. We source from the world's most prestigious houses, and every bag, watch and jewel passes independent authentication before it reaches you.",
        },
        {
          eyebrow: "Craftsmanship",
          title: "Every stitch tells the story of an atelier",
          body: "From saddle-stitched leather to hand-finished movements, the pieces we carry represent decades — sometimes centuries — of refined technique. We celebrate that craft rather than hide it behind marketing.",
        },
        {
          eyebrow: "The Experience",
          title: "Personal service, from first message to delivery",
          body: "Talk to us on WhatsApp, Telegram, Signal or by phone. We arrange payment by bank wire, crypto or card, and ship fully insured to the US, UK, Europe, Uzbekistan and worldwide.",
        },
      ],
    },
    journal: {
      eyebrow: "The Journal",
      title: "Luxury Guides & Stories",
      description: "How to authenticate, buy and care for luxury bags, watches and jewelry — and the heritage behind the icons.",
      back: "Back to Journal",
      more: "More Stories",
      englishOnly: "",
    },
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: October 2026",
      sections: [
        { title: "Who we are", body: "Montévane is an independent luxury boutique. This policy explains what personal data we collect through this website and how we use it." },
        { title: "What we collect", body: "When you send an inquiry we collect your name, the contact details you give us (email, phone, messaging handle), your country, the channels you want us to use, your preferred payment method and your message. When you subscribe to our newsletter we collect your email address." },
        { title: "Why we use it", body: "We use your details only to answer your inquiry, arrange a purchase, ship your order and — if you subscribed — send you news about new pieces. The legal basis is your request (steps before a contract) and, for the newsletter, your consent." },
        { title: "Who we share it with", body: "We share data only with the services needed to run the shop — our hosting and database provider, the messaging app you choose, payment providers and shipping carriers. We never sell your data." },
        { title: "How long we keep it", body: "Inquiries are kept for up to 24 months, or longer where tax law requires for completed sales. You can unsubscribe from the newsletter at any time." },
        { title: "Your rights", body: "You may ask to access, correct, delete or export your data, object to its use, or withdraw consent at any time. Contact us using the details on our contact page. You may also complain to your local data protection authority." },
        { title: "Cookies", body: "This website uses only cookies that are strictly necessary for it to work. We do not use advertising or tracking cookies." },
      ],
    },
  },
  de: {
    about: {
      eyebrow: "Unsere Geschichte",
      title: "Eine unabhängige Boutique für originalen Luxus",
      description: "Taschen, Uhren und Schmuck der großen Häuser – mit keinem davon verbunden.",
      blocks: [
        {
          eyebrow: "Das Haus",
          title: "Sorgfältig ausgewählt, fachkundig geprüft",
          body: "Montévane beruht auf einer einfachen Überzeugung: Ein Luxusstück ist kein Accessoire, sondern eine Investition in Handwerk. Wir beziehen von den renommiertesten Häusern, und jede Tasche, Uhr und jedes Schmuckstück wird vor der Lieferung unabhängig auf Echtheit geprüft.",
        },
        {
          eyebrow: "Handwerk",
          title: "Jeder Stich erzählt von einem Atelier",
          body: "Von sattelgenähtem Leder bis zu handveredelten Uhrwerken – unsere Stücke stehen für Jahrzehnte, manchmal Jahrhunderte verfeinerter Technik.",
        },
        {
          eyebrow: "Der Service",
          title: "Persönlich, von der ersten Nachricht bis zur Lieferung",
          body: "Schreiben Sie uns per WhatsApp, Telegram, Signal oder rufen Sie an. Zahlung per Überweisung, Krypto oder Karte; voll versicherter Versand nach Deutschland, Österreich, in die Schweiz und weltweit.",
        },
      ],
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
      updated: "Stand: Oktober 2026",
      sections: [
        { title: "Wer wir sind", body: "Montévane ist eine unabhängige Luxus-Boutique. Diese Erklärung beschreibt, welche personenbezogenen Daten wir über diese Website erheben und wie wir sie verwenden." },
        { title: "Welche Daten wir erheben", body: "Bei einer Anfrage erheben wir Ihren Namen, Ihre Kontaktdaten (E-Mail, Telefon, Messenger), Ihr Land, die gewünschten Kontaktkanäle, Ihre bevorzugte Zahlungsart und Ihre Nachricht. Bei der Newsletter-Anmeldung erheben wir Ihre E-Mail-Adresse." },
        { title: "Zweck und Rechtsgrundlage", body: "Wir nutzen Ihre Daten ausschließlich zur Beantwortung Ihrer Anfrage, zur Abwicklung eines Kaufs und des Versands sowie – bei Anmeldung – für den Newsletter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. lit. a (Einwilligung)." },
        { title: "Empfänger", body: "Wir geben Daten nur an Dienste weiter, die für den Betrieb nötig sind – Hosting- und Datenbankanbieter, den von Ihnen gewählten Messenger, Zahlungsdienstleister und Versanddienstleister. Wir verkaufen keine Daten." },
        { title: "Speicherdauer", body: "Anfragen speichern wir bis zu 24 Monate bzw. so lange, wie steuerrechtliche Aufbewahrungspflichten es verlangen. Den Newsletter können Sie jederzeit abbestellen." },
        { title: "Ihre Rechte", body: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie auf Widerruf Ihrer Einwilligung. Sie können sich zudem bei einer Datenschutz-Aufsichtsbehörde beschweren." },
        { title: "Cookies", body: "Diese Website verwendet nur technisch notwendige Cookies. Werbe- oder Tracking-Cookies setzen wir nicht ein." },
      ],
    },
  },
  uz: {
    about: {
      eyebrow: "Bizning tariximiz",
      title: "Original brendlar uchun mustaqil butik",
      description: "Dunyoning eng mashhur brendlaridan sumkalar, soatlar va zargarlik buyumlari – ularning hech biriga aloqador emasmiz.",
      blocks: [
        {
          eyebrow: "Butik",
          title: "Puxta tanlangan, mutaxassislar tekshirgan",
          body: "Montévane oddiy g'oyaga asoslanadi: lyuks buyum shunchaki aksessuar emas, balki mahoratga qilingan sarmoya. Biz eng nufuzli brendlardan mahsulot olamiz va har bir sumka, soat va zargarlik buyumi sizga yetib borishidan oldin mustaqil tekshiruvdan o'tadi.",
        },
        {
          eyebrow: "Mahorat",
          title: "Har bir chok ustaxona tarixini so'zlaydi",
          body: "Qo'lda tikilgan charmdan tortib qo'lda pardozlangan mexanizmlargacha – biz taklif qiladigan buyumlar o'n yillar, ba'zan asrlar davomida sayqallangan mahoratdir.",
        },
        {
          eyebrow: "Xizmat",
          title: "Birinchi xabardan yetkazib berishgacha shaxsiy xizmat",
          body: "WhatsApp, Telegram, Signal orqali yozing yoki qo'ng'iroq qiling. To'lov: bank o'tkazmasi, kripto yoki karta. Toshkent, O'zbekiston bo'ylab va butun dunyoga sug'urtalangan yetkazib berish.",
        },
      ],
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
      updated: "Yangilangan: 2026-yil oktabr",
      sections: [
        { title: "Biz kimmiz", body: "Montévane – mustaqil lyuks butik. Ushbu siyosat sayt orqali qanday shaxsiy ma'lumotlarni yig'ishimiz va ulardan qanday foydalanishimizni tushuntiradi." },
        { title: "Qanday ma'lumot yig'amiz", body: "So'rov yuborganingizda ismingiz, aloqa ma'lumotlaringiz (email, telefon, messenjer), mamlakatingiz, tanlagan aloqa kanallaringiz, afzal to'lov usulingiz va xabaringizni yig'amiz. Obuna bo'lganingizda email manzilingizni saqlaymiz." },
        { title: "Nima uchun foydalanamiz", body: "Ma'lumotlaringizdan faqat so'rovingizga javob berish, xaridni rasmiylashtirish, buyurtmani yetkazish va – obuna bo'lsangiz – yangiliklar yuborish uchun foydalanamiz." },
        { title: "Kimga beramiz", body: "Ma'lumotlarni faqat do'kon ishlashi uchun zarur xizmatlarga beramiz – xosting va ma'lumotlar bazasi, siz tanlagan messenjer, to'lov va yetkazib berish xizmatlari. Ma'lumotlaringizni sotmaymiz." },
        { title: "Qancha saqlaymiz", body: "So'rovlar 24 oygacha yoki soliq qonunchiligi talab qilgan muddat davomida saqlanadi. Obunadan istalgan vaqtda chiqishingiz mumkin." },
        { title: "Huquqlaringiz", body: "Ma'lumotlaringizni ko'rish, tuzatish, o'chirish yoki rozilikni qaytarib olishni so'rashingiz mumkin. Buning uchun aloqa sahifasidagi kanallar orqali bog'laning." },
        { title: "Cookie fayllar", body: "Sayt faqat ishlashi uchun zarur cookie fayllardan foydalanadi. Reklama yoki kuzatuv cookie fayllari ishlatilmaydi." },
      ],
    },
  },
};
