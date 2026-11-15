import type { Locale } from "@/lib/i18n/config";

// /sell — selling a piece to Montévane. Only states what the team confirmed:
// we buy authentic Hermès, watches and jewelry, every piece is authenticated
// before a purchase completes, and owners can bring pieces to either boutique.
type Sell = {
  nav: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  buyTitle: string;
  buy: string[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  helpTitle: string;
  help: string[];
  formTitle: string;
  formBody: string;
  messageDefault: string;
};

export const SELL: Record<Locale, Sell> = {
  en: {
    nav: "Sell to Us",
    metaTitle: "Sell Your Hermès Bag, Luxury Watch or Jewelry | Montévane",
    metaDescription: "Sell your Hermès Birkin or Kelly, Rolex, Patek Philippe, Audemars Piguet or diamond jewelry to Montévane. Send details and photos and we'll reply with an offer.",
    eyebrow: "Sell to Montévane",
    title: "Sell Your Hermès, Watch or Jewelry",
    intro: "We buy authentic Hermès bags and accessories, luxury watches and fine jewelry. Tell us about your piece and we'll reply with an offer.",
    buyTitle: "What we buy",
    buy: [
      "Hermès Birkin and Kelly bags – including exotic leathers and special orders – plus bag charms, Twillies and scarves.",
      "Watches from Rolex, Patek Philippe, Audemars Piguet, Richard Mille, F.P. Journe, Cartier, Vacheron Constantin and other fine watchmakers.",
      "Diamond and fine jewelry: engagement rings, earrings, necklaces and bracelets.",
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Tell us about it", body: "Send the model, size or reference, year, condition and what's included, using the form below. Photos help: reply to our confirmation email with them, or send them on WhatsApp." },
      { title: "Receive an offer", body: "A specialist reviews the details and replies with an offer and the next steps." },
      { title: "Authentication", body: "Every piece is authenticated before we complete a purchase. You're welcome to bring it to our boutique in Monaco or Miami." },
    ],
    helpTitle: "What helps us make the best offer",
    help: [
      "Clear photos of the front, back, sides, base, hardware and any stamps or serial numbers.",
      "For watches: the reference number, warranty card or papers, box and any service records.",
      "For Hermès: the date stamp, receipt if you have it, dust bag, box, lock, keys and clochette.",
      "For jewelry: any diamond grading report (GIA or similar) and the metal and carat weight.",
    ],
    formTitle: "Tell us about your piece",
    formBody: "We reply to every enquiry. Your details are only used to answer you.",
    messageDefault: "I'd like to sell: (brand, model, size or reference, year, condition, what's included)",
  },
  de: {
    nav: "An uns verkaufen",
    metaTitle: "Hermès-Tasche, Luxusuhr oder Schmuck verkaufen | Montévane",
    metaDescription: "Verkaufen Sie Ihre Hermès Birkin oder Kelly, Rolex, Patek Philippe, Audemars Piguet oder Diamantschmuck an Montévane. Senden Sie Details und Fotos – wir machen Ihnen ein Angebot.",
    eyebrow: "An Montévane verkaufen",
    title: "Hermès, Uhr oder Schmuck verkaufen",
    intro: "Wir kaufen originale Hermès-Taschen und Accessoires, Luxusuhren und feinen Schmuck. Erzählen Sie uns von Ihrem Stück – wir antworten mit einem Angebot.",
    buyTitle: "Was wir kaufen",
    buy: [
      "Hermès Birkin und Kelly – auch Exoten und Sonderanfertigungen – sowie Bag Charms, Twillys und Tücher.",
      "Uhren von Rolex, Patek Philippe, Audemars Piguet, Richard Mille, F.P. Journe, Cartier, Vacheron Constantin und anderen großen Manufakturen.",
      "Diamant- und Feinschmuck: Verlobungsringe, Ohrringe, Colliers und Armbänder.",
    ],
    stepsTitle: "So funktioniert es",
    steps: [
      { title: "Beschreiben Sie Ihr Stück", body: "Nennen Sie Modell, Größe oder Referenz, Jahr, Zustand und Lieferumfang über das Formular unten. Fotos helfen: Antworten Sie damit auf unsere Bestätigungs-E-Mail oder senden Sie sie per WhatsApp." },
      { title: "Angebot erhalten", body: "Ein Spezialist prüft die Angaben und antwortet mit einem Angebot und den nächsten Schritten." },
      { title: "Echtheitsprüfung", body: "Jedes Stück wird vor dem Abschluss des Kaufs auf Echtheit geprüft. Gerne können Sie es in unsere Boutique in Monaco oder Miami bringen." },
    ],
    helpTitle: "Was uns hilft, das beste Angebot zu machen",
    help: [
      "Klare Fotos von vorne, hinten, den Seiten, dem Boden, den Beschlägen und allen Stempeln oder Seriennummern.",
      "Bei Uhren: Referenznummer, Garantiekarte oder Papiere, Box und Servicenachweise.",
      "Bei Hermès: Datumsstempel, Kaufbeleg falls vorhanden, Staubbeutel, Box, Schloss, Schlüssel und Clochette.",
      "Bei Schmuck: Diamantzertifikat (GIA o. ä.) sowie Metall und Karatgewicht.",
    ],
    formTitle: "Erzählen Sie uns von Ihrem Stück",
    formBody: "Wir beantworten jede Anfrage. Ihre Angaben werden nur dafür verwendet.",
    messageDefault: "Ich möchte verkaufen: (Marke, Modell, Größe oder Referenz, Jahr, Zustand, Lieferumfang)",
  },
  uz: {
    nav: "Bizga soting",
    metaTitle: "Hermès sumkasi, hashamatli soat yoki zargarlikni soting | Montévane",
    metaDescription: "Hermès Birkin yoki Kelly, Rolex, Patek Philippe, Audemars Piguet yoki olmosli zargarlik buyumingizni Montévane'ga soting. Ma'lumot va suratlarni yuboring – taklif bilan javob beramiz.",
    eyebrow: "Montévane'ga soting",
    title: "Hermès, soat yoki zargarlik buyumingizni soting",
    intro: "Biz original Hermès sumkalari va aksessuarlari, hashamatli soatlar va zargarlik buyumlarini sotib olamiz. Buyumingiz haqida yozing – taklif bilan javob beramiz.",
    buyTitle: "Nimalarni sotib olamiz",
    buy: [
      "Hermès Birkin va Kelly sumkalari – ekzotik charm va maxsus buyurtmalar ham – hamda bag charm, Twilly va sharflar.",
      "Rolex, Patek Philippe, Audemars Piguet, Richard Mille, F.P. Journe, Cartier, Vacheron Constantin va boshqa mashhur soatsozlar soatlari.",
      "Olmosli va nafis zargarlik: nishon uzuklari, sirg'alar, marjonlar va bilaguzuklar.",
    ],
    stepsTitle: "Qanday ishlaydi",
    steps: [
      { title: "Buyum haqida yozing", body: "Quyidagi shakl orqali model, o'lcham yoki referens, yil, holat va to'plamni yozing. Suratlar foydali: ularni tasdiqlash emailimizga javob sifatida yoki WhatsApp orqali yuboring." },
      { title: "Taklif oling", body: "Mutaxassis ma'lumotlarni ko'rib chiqadi va taklif hamda keyingi qadamlar bilan javob beradi." },
      { title: "Haqiqiylik tekshiruvi", body: "Har bir buyum xarid yakunlanishidan oldin haqiqiyligi tekshiriladi. Uni Monako yoki Mayamidagi butigimizga olib kelishingiz mumkin." },
    ],
    helpTitle: "Eng yaxshi taklif uchun nima yordam beradi",
    help: [
      "Old, orqa, yon tomonlar, tag qismi, furnitura va barcha shtamp yoki seriya raqamlarining aniq suratlari.",
      "Soatlar uchun: referens raqami, kafolat kartasi yoki hujjatlar, quti va servis yozuvlari.",
      "Hermès uchun: sana shtampi, chek (bo'lsa), chang xaltasi, quti, qulf, kalitlar va clochette.",
      "Zargarlik uchun: olmos sertifikati (GIA yoki shunga o'xshash), metall va karat og'irligi.",
    ],
    formTitle: "Buyumingiz haqida yozing",
    formBody: "Har bir so'rovga javob beramiz. Ma'lumotlaringiz faqat javob berish uchun ishlatiladi.",
    messageDefault: "Sotmoqchiman: (brend, model, o'lcham yoki referens, yil, holat, to'plam)",
  },
};
