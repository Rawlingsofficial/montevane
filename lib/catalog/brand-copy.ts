import type { Locale } from "@/lib/i18n/config";

/**
 * A short, specific introduction for each watch brand page (/shop/watches/<brand>),
 * shown before the shared guarantee paragraph so every brand page reads differently.
 * Facts only: founding, signature models, what collectors look for.
 */
export const WATCH_BRAND_COPY: Record<string, Record<Locale, string>> = {
  rolex: {
    en: "Founded by Hans Wilsdorf in 1905 and based in Geneva, Rolex built its name on the waterproof Oyster case (1926) and the self-winding Perpetual rotor (1931). Today the Submariner, GMT-Master II, Daytona, Datejust and Day-Date are the most sought-after watches in the world – and the ones we are asked for most.",
    de: "Rolex wurde 1905 von Hans Wilsdorf gegründet und hat seinen Sitz in Genf. Bekannt wurde die Marke durch das wasserdichte Oyster-Gehäuse (1926) und den Perpetual-Rotor mit Selbstaufzug (1931). Submariner, GMT-Master II, Daytona, Datejust und Day-Date gehören heute zu den begehrtesten Uhren der Welt – und sind die Modelle, nach denen man uns am häufigsten fragt.",
    uz: "Rolex 1905-yilda Hans Vilsdorf tomonidan asos solingan va Jenevada joylashgan. Brend suv o'tkazmaydigan Oyster korpusi (1926) va avtomatik Perpetual rotori (1931) bilan mashhur bo'ldi. Bugun Submariner, GMT-Master II, Daytona, Datejust va Day-Date dunyodagi eng talabgir soatlardir – va bizdan eng ko'p so'raladigan modellar.",
  },
  "audemars-piguet": {
    en: "Audemars Piguet has made watches in Le Brassus, in the Vallée de Joux, since 1875 and is still owned by its founding families. In 1972 it launched the Royal Oak, Gérald Genta's octagonal steel sports watch that created the luxury sports watch category; the Royal Oak Offshore followed in 1993.",
    de: "Audemars Piguet fertigt seit 1875 Uhren in Le Brassus im Vallée de Joux und ist bis heute im Besitz der Gründerfamilien. 1972 erschien die Royal Oak – Gérald Gentas achteckige Stahl-Sportuhr, die die Kategorie der Luxus-Sportuhr begründete. 1993 folgte die Royal Oak Offshore.",
    uz: "Audemars Piguet 1875-yildan beri Vallée de Joux'dagi Le Brassus'da soat ishlab chiqaradi va hanuzgacha asoschi oilalarga tegishli. 1972-yilda Jerald Jentaning sakkiz qirrali po'lat sport soati – Royal Oak chiqdi va hashamatli sport soatlari toifasini yaratdi; 1993-yilda Royal Oak Offshore paydo bo'ldi.",
  },
  "patek-philippe": {
    en: "Founded in Geneva in 1839 and family-owned since 1932, Patek Philippe is the reference point for fine watchmaking. Collectors chase the steel sports models – the Nautilus (1976) and Aquanaut (1997) – as well as the Calatrava, the Annual and Perpetual Calendars and the Grand Complications.",
    de: "Patek Philippe wurde 1839 in Genf gegründet und ist seit 1932 in Familienbesitz – der Maßstab der hohen Uhrmacherkunst. Sammler suchen die Stahl-Sportmodelle Nautilus (1976) und Aquanaut (1997) ebenso wie die Calatrava, Jahres- und Ewige Kalender und die Grandes Complications.",
    uz: "1839-yilda Jenevada asos solingan va 1932-yildan beri oilaviy kompaniya bo'lgan Patek Philippe yuqori soatsozlikning mezonidir. Kolleksionerlar po'lat sport modellari – Nautilus (1976) va Aquanaut (1997) – hamda Calatrava, yillik va abadiy kalendarlar va Grand Complications modellarini izlaydi.",
  },
  "richard-mille": {
    en: "Richard Mille launched its first watch, the RM 001 tourbillon, in 2001. Its tonneau-shaped cases, skeletonised movements and racing-derived materials such as carbon TPT and titanium make each piece extremely light and instantly recognisable – and production is deliberately small.",
    de: "Richard Mille stellte 2001 seine erste Uhr vor, das Tourbillon RM 001. Tonneau-Gehäuse, skelettierte Werke und Materialien aus dem Rennsport wie Carbon TPT und Titan machen jedes Stück extrem leicht und sofort erkennbar – die Produktion ist bewusst klein.",
    uz: "Richard Mille o'zining birinchi soati – RM 001 turbiyonini 2001-yilda taqdim etdi. Tonneau shaklidagi korpuslar, skelet mexanizmlar va carbon TPT hamda titan kabi poygadan olingan materiallar har bir soatni juda yengil va darhol taniladigan qiladi – ishlab chiqarish ataylab kichik.",
  },
  "fp-journe": {
    en: "François-Paul Journe signs every watch with the motto Invenit et Fecit – invented and made. From his Geneva workshops come the Chronomètre Bleu, the Chronomètre à Résonance and the Tourbillon Souverain, with movements in rose gold. Annual output is small, which is why F.P. Journe is one of the most collected independent names.",
    de: "François-Paul Journe signiert jede Uhr mit dem Motto „Invenit et Fecit“ – erfunden und gefertigt. Aus seinen Genfer Werkstätten stammen der Chronomètre Bleu, der Chronomètre à Résonance und das Tourbillon Souverain, mit Werken aus Roségold. Die Jahresproduktion ist klein – deshalb gehört F.P. Journe zu den meistgesammelten unabhängigen Marken.",
    uz: "Fransua-Pol Jurn har bir soatini „Invenit et Fecit“ – ixtiro qildi va yasadi – shiori bilan imzolaydi. Uning Jenevadagi ustaxonalaridan Chronomètre Bleu, Chronomètre à Résonance va Tourbillon Souverain chiqadi, mexanizmlari pushti oltindan. Yillik ishlab chiqarish kichik, shuning uchun F.P. Journe eng ko'p yig'iladigan mustaqil brendlardan biri.",
  },
  cartier: {
    en: "Cartier, founded in Paris in 1847, shaped the wristwatch itself: the Santos was designed in 1904 for the aviator Alberto Santos-Dumont, and the Tank followed in 1917. Alongside them, the Ballon Bleu and Panthère make Cartier the house of choice for elegant everyday watches.",
    de: "Cartier, 1847 in Paris gegründet, prägte die Armbanduhr selbst: Die Santos entstand 1904 für den Flugpionier Alberto Santos-Dumont, 1917 folgte die Tank. Mit Ballon Bleu und Panthère ist Cartier die erste Adresse für elegante Alltagsuhren.",
    uz: "1847-yilda Parijda asos solingan Cartier qo'l soatining o'zini shakllantirdi: Santos 1904-yilda uchuvchi Alberto Santos-Dyumon uchun yaratilgan, 1917-yilda esa Tank paydo bo'ldi. Ballon Bleu va Panthère bilan birga Cartier nafis kundalik soatlar uchun birinchi tanlovdir.",
  },
  "vacheron-constantin": {
    en: "Founded in Geneva in 1755, Vacheron Constantin is the oldest watch manufacture in continuous production. Its Overseas is one of the great luxury sports watches, while the Patrimony and Traditionnelle carry the classical Geneva style, many bearing the Hallmark of Geneva.",
    de: "Vacheron Constantin wurde 1755 in Genf gegründet und ist die älteste Uhrenmanufaktur mit ununterbrochener Produktion. Die Overseas zählt zu den großen Luxus-Sportuhren, Patrimony und Traditionnelle stehen für den klassischen Genfer Stil – viele mit dem Genfer Siegel.",
    uz: "1755-yilda Jenevada asos solingan Vacheron Constantin uzluksiz ishlab kelayotgan eng qadimgi soat manufakturasidir. Overseas buyuk hashamatli sport soatlaridan biri, Patrimony va Traditionnelle esa klassik Jeneva uslubini davom ettiradi, ularning ko'pchiligida Jeneva tamg'asi bor.",
  },
  "franck-muller": {
    en: "Franck Muller was founded in Genthod, near Geneva, in 1991 and calls itself the Master of Complications. Its curved Cintrée Curvex tonneau case is its signature, carried by the Vanguard, the Casablanca and the playful Crazy Hours.",
    de: "Franck Muller wurde 1991 in Genthod bei Genf gegründet und nennt sich „Master of Complications“. Markenzeichen ist das gewölbte Tonneau-Gehäuse Cintrée Curvex – zu finden bei Vanguard, Casablanca und der verspielten Crazy Hours.",
    uz: "Franck Muller 1991-yilda Jeneva yaqinidagi Genthod'da asos solingan va o'zini „Murakkabliklar ustasi“ deb ataydi. Uning belgisi – egilgan Cintrée Curvex tonneau korpusi bo'lib, Vanguard, Casablanca va o'yinqaroq Crazy Hours modellarida uchraydi.",
  },
  hublot: {
    en: "Hublot was founded in 1980 and was the first to pair a gold watch with a natural rubber strap. Since the Big Bang of 2005, its 'Art of Fusion' has meant bold cases in ceramic, sapphire, titanium and its own scratch-resistant Magic Gold.",
    de: "Hublot wurde 1980 gegründet und kombinierte als Erste eine Golduhr mit einem Kautschukband. Seit der Big Bang von 2005 steht die „Art of Fusion“ für markante Gehäuse aus Keramik, Saphir, Titan und dem eigenen kratzfesten Magic Gold.",
    uz: "Hublot 1980-yilda asos solingan va birinchi bo'lib oltin soatni tabiiy kauchuk tasma bilan birlashtirgan. 2005-yildagi Big Bang'dan beri uning „Art of Fusion“ falsafasi keramika, sapfir, titan va o'zining tirnalmaydigan Magic Gold qotishmasidan yasalgan dadil korpuslarni anglatadi.",
  },
  breitling: {
    en: "Breitling was founded in Saint-Imier in 1884 by Léon Breitling and became the pilot's watchmaker. The Navitimer of 1952, with its slide-rule bezel, is a design icon; the Chronomat, Superocean and Premier complete a range built around robust chronographs.",
    de: "Breitling wurde 1884 von Léon Breitling in Saint-Imier gegründet und wurde zum Uhrmacher der Piloten. Die Navitimer von 1952 mit Rechenschieber-Lünette ist eine Design-Ikone; Chronomat, Superocean und Premier ergänzen eine Kollektion robuster Chronographen.",
    uz: "Breitling 1884-yilda Sen-Imye'da Leon Braytling tomonidan asos solingan va uchuvchilar soatsozi bo'lib tanildi. Logarifmik chizg'ichli bezelga ega 1952-yilgi Navitimer – dizayn ikonasi; Chronomat, Superocean va Premier mustahkam xronograflar to'plamini to'ldiradi.",
  },
  tudor: {
    en: "Tudor was created by Rolex founder Hans Wilsdorf to offer Rolex quality at a more accessible price. Today it makes its own movements, and the Black Bay, Pelagos and Ranger are among the best-value luxury watches you can buy.",
    de: "Tudor wurde von Rolex-Gründer Hans Wilsdorf geschaffen, um Rolex-Qualität zu einem zugänglicheren Preis anzubieten. Heute fertigt die Marke eigene Werke – Black Bay, Pelagos und Ranger gehören zu den preiswertesten Luxusuhren überhaupt.",
    uz: "Tudor Rolex asoschisi Hans Vilsdorf tomonidan Rolex sifatini qulayroq narxda taklif qilish uchun yaratilgan. Bugun brend o'z mexanizmlarini ishlab chiqaradi, Black Bay, Pelagos va Ranger esa narxiga eng arziydigan hashamatli soatlardan.",
  },
  omega: {
    en: "Omega was founded by Louis Brandt in 1848. The Speedmaster, introduced in 1957, became the Moonwatch when it was worn on the Moon in 1969; the Seamaster, Constellation and De Ville complete one of the broadest collections in Swiss watchmaking.",
    de: "Omega wurde 1848 von Louis Brandt gegründet. Die 1957 vorgestellte Speedmaster wurde zur Moonwatch, als sie 1969 auf dem Mond getragen wurde; Seamaster, Constellation und De Ville ergänzen eine der breitesten Kollektionen der Schweizer Uhrmacherei.",
    uz: "Omega 1848-yilda Lui Brandt tomonidan asos solingan. 1957-yilda taqdim etilgan Speedmaster 1969-yilda Oyda taqilgach, Moonwatch nomini oldi; Seamaster, Constellation va De Ville Shveytsariya soatsozligidagi eng keng to'plamlardan birini to'ldiradi.",
  },
  panerai: {
    en: "Panerai began in Florence in 1860 and supplied instruments to the Italian Navy, which shaped its large, legible cushion cases. The Luminor, with its crown-protecting bridge, and the Radiomir remain the two pillars of the collection.",
    de: "Panerai begann 1860 in Florenz und belieferte die italienische Marine – daher die großen, gut ablesbaren Kissengehäuse. Die Luminor mit ihrem Kronenschutzbügel und die Radiomir sind bis heute die beiden Säulen der Kollektion.",
    uz: "Panerai 1860-yilda Florensiyada boshlangan va Italiya harbiy dengiz floti uchun asboblar yetkazgan – katta, oson o'qiladigan yostiqsimon korpuslar shundan. Toj himoya ko'prigi bilan Luminor va Radiomir to'plamning ikki ustuni bo'lib qolmoqda.",
  },
  "jacob-co": {
    en: "Jacob & Co. was founded in New York by Jacob Arabo in 1986. It is known for high-jewelry watches and spectacular complications such as the Astronomia, whose movement rotates on itself inside a sapphire dome, and for the Epic X and Bugatti collaborations.",
    de: "Jacob & Co. wurde 1986 von Jacob Arabo in New York gegründet. Bekannt ist die Marke für Juwelenuhren und spektakuläre Komplikationen wie die Astronomia, deren Werk sich unter einer Saphirkuppel um sich selbst dreht, sowie für Epic X und die Bugatti-Kooperationen.",
    uz: "Jacob & Co. 1986-yilda Nyu-Yorkda Jeykob Arabo tomonidan asos solingan. Brend zargarlik soatlari va ajoyib murakkabliklari bilan mashhur – masalan, mexanizmi sapfir gumbaz ichida o'z atrofida aylanadigan Astronomia, shuningdek Epic X va Bugatti hamkorliklari.",
  },
  "a-lange-sohne": {
    en: "Ferdinand Adolph Lange founded his manufacture in Glashütte, Saxony, in 1845; his great-grandson Walter Lange revived it in 1990. The Lange 1, with its off-centre dial and outsize date, and the Datograph chronograph are among the most admired watches of the modern era.",
    de: "Ferdinand Adolph Lange gründete seine Manufaktur 1845 in Glashütte in Sachsen; sein Urenkel Walter Lange erweckte sie 1990 wieder zum Leben. Die Lange 1 mit dezentralem Zifferblatt und Großdatum sowie der Chronograph Datograph zählen zu den meistbewunderten Uhren der Gegenwart.",
    uz: "Ferdinand Adolf Lange o'z manufakturasini 1845-yilda Saksoniyaning Glashütte shahrida asos solgan; uning chevarasi Valter Lange uni 1990-yilda qayta tikladi. Markazdan siljigan siferblat va katta sanali Lange 1 hamda Datograph xronografi zamonaviy davrning eng qadrlangan soatlaridan.",
  },
};
