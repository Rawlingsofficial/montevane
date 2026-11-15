// Generates docs/journal-calendar.md: the full publishing calendar.
// Written posts come from lib/journal/posts; planned slots (April 2027 –
// January 2028) are listed below in publishing order per weekday.
//   Monday = educational · Wednesday = industry insight / guide · Friday = comparison / buying guide
// Flags: "timely" = write in the 2–3 weeks before the date (needs fresh facts);
// "owner" = needs a detail from the owner (dates, offers).
// Run: node scripts/journal-calendar.mjs
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";

const I = "informational", C = "commercial", T = "transactional";
// [slug, title, primary keyword, intent, supporting keywords, flag?]
const MON = [
  ["how-to-measure-ring-size", "How to Measure Ring Size at Home (Even Secretly)", "how to measure ring size", I, "ring size chart; find ring size secretly; resize a ring"],
  ["what-is-a-chronometer", "What Is a Chronometer? COSC and Superlative Chronometers", "what is a chronometer", I, "cosc certified; superlative chronometer; master chronometer"],
  ["hermes-leather-glossary", "Hermès Leather Glossary: Every Leather Explained", "hermes leather types", I, "togo clemence swift; barenia; box calf"],
  ["watch-water-resistance-explained", "Watch Water Resistance Explained: 30 m to 300 m", "watch water resistance", I, "can i swim with my rolex; 100m water resistant; screw-down crown"],
  ["diamond-fluorescence-explained", "Diamond Fluorescence: Good, Bad or Irrelevant?", "diamond fluorescence", I, "strong blue fluorescence; does fluorescence affect price; gia fluorescence"],
  ["hermes-heat-stamps", "Hermès Heat Stamps: Reading Every Mark on Your Bag", "hermes stamp", I, "hermes paris made in france stamp; artisan mark; hermes stamp fake"],
  ["what-is-a-tourbillon", "What Is a Tourbillon, and Is It Worth It?", "what is a tourbillon", I, "tourbillon watch; flying tourbillon; breguet tourbillon"],
  ["rolex-serial-numbers", "Rolex Serial Numbers: How to Date Your Rolex", "rolex serial number lookup", I, "rolex year by serial; random serial rolex; where is rolex serial"],
  ["gold-karats-explained", "14k vs 18k Gold: Karats Explained", "14k vs 18k gold", I, "gold purity; rose gold vs yellow gold; 750 gold"],
  ["store-a-birkin-long-term", "How to Store a Birkin Long-Term", "how to store a birkin", I, "birkin storage; handbag storage; dust bag"],
  ["skeleton-watches-explained", "Skeleton Watches Explained", "skeleton watch", I, "openworked watch; royal oak openworked; richard mille skeleton"],
  ["platinum-vs-white-gold", "Platinum vs White Gold: Which Metal for Fine Jewelry?", "platinum vs white gold", I, "platinum ring; rhodium plating; white gold yellowing"],
  ["guilloche-explained", "Guilloché: The Art Behind the Dial", "guilloche dial", I, "tapisserie dial; clous de paris; hand guilloche"],
  ["coloured-gemstones-guide", "Sapphire, Ruby, Emerald: A Coloured Gemstone Guide", "precious gemstones", I, "sapphire vs ruby; emerald clarity; gemstone treatment"],
  ["hermes-barenia-leather", "Hermès Barenia: The Leather That Tells Your Story", "hermes barenia", I, "barenia faubourg; barenia patina; barenia care"],
  ["rolex-bracelets-explained", "Rolex Bracelets: Oyster, Jubilee, President, Oysterflex", "rolex bracelet types", I, "oyster vs jubilee; president bracelet; oysterflex"],
  ["watch-crystals-explained", "Sapphire vs Acrylic: Watch Crystals Explained", "sapphire crystal watch", I, "acrylic crystal; cyclops lens; anti-reflective coating"],
  ["how-to-wind-and-set-a-watch", "How to Wind and Set a Mechanical Watch", "how to wind a watch", I, "set date rolex; screw-down crown; hand-wind"],
  ["togo-vs-clemence-leather", "Clemence Leather Explained (and How It Differs from Togo)", "hermes clemence leather", I, "clemence vs togo; clemence weight; taurillon clemence"],
  ["what-makes-a-diamond-sparkle", "What Makes a Diamond Sparkle", "diamond brilliance", I, "fire and scintillation; diamond cut grade; ideal cut"],
  ["rolex-cerachrom-bezel", "Rolex Cerachrom: Why Ceramic Bezels Changed Everything", "rolex ceramic bezel", I, "cerachrom; aluminium vs ceramic bezel; faded bezel"],
  ["hermes-swift-leather", "Hermès Swift Leather: Soft, Vivid and Delicate", "hermes swift leather", I, "swift vs epsom; swift scratches; swift kelly"],
  ["how-to-tell-real-gold", "How to Tell if Gold Is Real", "how to tell if gold is real", I, "gold hallmark; 750 stamp; gold testing"],
  ["what-is-a-gmt-watch", "What Is a GMT Watch?", "what is a gmt watch", I, "gmt vs world time; how to use gmt bezel; true gmt"],
  ["hermes-box-calf", "Hermès Box Calf: The Original Leather", "hermes box calf", I, "box leather kelly; box calf patina; box scratches"],
  ["rolex-oysterflex", "The Rolex Oysterflex Strap Explained", "rolex oysterflex", I, "oysterflex vs oyster; daytona oysterflex; rubber strap rolex"],
  ["photograph-your-collection", "How to Photograph and Document Your Collection", "document watch collection", I, "insurance photos; serial numbers; collection inventory"],
  ["diamond-carat-vs-size", "Carat vs Size: How Big Does a Diamond Look?", "diamond carat size chart", I, "1 carat diameter; spread; carat weight"],
  ["kelly-sizes-explained", "Kelly Sizes Explained: Mini to 40", "kelly bag sizes", I, "kelly 25 dimensions; kelly 28 vs 32; mini kelly"],
  ["daily-watch-care", "Everyday Watch Care: Simple Habits That Matter", "how to take care of a watch", I, "clean rolex; magnetism; watch shocks"],
  ["moon-phase-explained", "The Moon Phase Complication Explained", "moon phase watch", I, "how moon phase works; set moon phase; astronomical moon"],
  ["hermes-chevre-leather", "Hermès Chèvre: Goatskin Explained", "hermes chevre leather", I, "chevre mysore; chevre vs epsom; goatskin kelly"],
  ["clean-a-watch-bracelet", "How to Clean a Watch Bracelet Safely", "clean watch bracelet", I, "clean rolex bracelet; ultrasonic watch; jubilee stretch"],
  ["fancy-pink-diamonds", "Fancy Pink Diamonds: Rarity, Colour and Value", "pink diamonds", I, "argyle pink; fancy intense pink; pink diamond price"],
  ["hermes-constance-explained", "The Hermès Constance: The H on the Flap", "hermes constance", I, "constance sizes; constance 18 vs 24; constance to go"],
  ["enamel-dials-explained", "Enamel Dials: Grand Feu, Cloisonné and Champlevé", "enamel dial watch", I, "grand feu enamel; cloisonne dial; patek enamel"],
  ["hermes-stitching", "Hermès Saddle Stitching: What to Look For", "hermes saddle stitch", I, "slanted stitching; hand stitched birkin; stitch count"],
  ["perpetual-calendar-deep-dive", "Inside a Perpetual Calendar", "perpetual calendar watch", I, "patek 5320; royal oak perpetual calendar; leap year indicator"],
  ["emerald-cut-diamonds", "Emerald Cut Diamonds: The Collector's Guide", "emerald cut diamond", I, "emerald cut clarity; emerald cut ratio; step cut"],
  ["movement-finishing", "Movement Finishing: Côtes de Genève, Perlage, Anglage", "watch movement finishing", I, "geneva stripes; perlage; hand bevelling"],
  ["hermes-bags-beyond-birkin", "Hermès Bags Beyond the Birkin and Kelly", "hermes bag models", I, "lindy; picotin; evelyne; constance"],
  ["vintage-rolex-dial-terms", "Vintage Rolex Dial Terms: Tropical, Gilt, Spider", "tropical dial rolex", I, "gilt dial; spider dial; patina"],
  ["asscher-vs-emerald-cut", "Asscher vs Emerald Cut", "asscher cut diamond", I, "asscher vs emerald; square step cut; art deco ring"],
  ["watch-magnetism", "Is Your Watch Magnetised? How to Tell and Fix It", "magnetized watch", I, "watch running fast; demagnetise; antimagnetic"],
];
const WED = [
  ["richard-mille-models-guide", "Richard Mille Models: A Guide to the Key References", "richard mille models", C, "rm 011; rm 35; rm 67; rm 72"],
  ["mothers-day-luxury-gifts", "Mother's Day Luxury Gifts", "luxury mothers day gifts", C, "mothers day jewelry; hermes gift mom; watch for mom", "owner"],
  ["watches-and-wonders-2027", "Watches and Wonders 2027: What Mattered", "watches and wonders 2027", I, "new rolex 2027; new patek 2027; new tudor", "timely"],
  ["rolex-new-releases-2027", "New Rolex 2027: Every Release Explained", "new rolex 2027", I, "rolex novelties; rolex 2027 release; rolex discontinued", "timely"],
  ["patek-new-releases-2027", "New Patek Philippe 2027", "new patek philippe 2027", I, "patek novelties; patek discontinued; patek 2027", "timely"],
  ["monaco-watch-season", "Monaco's Season of Watches, Yachts and Racing", "monaco luxury", I, "monaco grand prix watch; monaco yacht show; monaco boutique"],
  ["rolex-discontinued-2027", "Discontinued Rolex Models in 2027", "discontinued rolex", I, "rolex discontinued 2027; collectible rolex; rolex retired", "timely"],
  ["fathers-day-watch-gifts", "Father's Day Watch Gifts", "fathers day watch gift", C, "watch gift for dad; luxury gifts for dad; first rolex dad", "owner"],
  ["summer-watches", "Summer Watches: Rubber Straps, Titanium and Colour", "summer watch", C, "aquanaut tropical strap; offshore rubber; oysterflex summer"],
  ["hermes-constance-guide", "Hermès Constance Buying Guide", "hermes constance buying guide", C, "constance price; constance 18; constance to go"],
  ["independent-watchmakers", "Independent Watchmakers Every Collector Should Know", "independent watchmakers", I, "fp journe; mb&f; de bethune; akrivia"],
  ["a-lange-sohne-guide", "A. Lange & Söhne: A Collector's Guide", "a lange sohne", C, "lange 1; datograph; saxonia"],
  ["vacheron-overseas-guide", "Vacheron Constantin Overseas Buying Guide", "vacheron constantin overseas", C, "overseas 4500v; overseas dual time; overseas vs royal oak"],
  ["watch-market-midyear-2027", "The Pre-Owned Watch Market: Mid-2027", "pre-owned watch market 2027", I, "rolex prices 2027; watch market trends; secondary market", "timely"],
  ["jacob-and-co-guide", "Jacob & Co: Astronomia, Epic X and Beyond", "jacob and co watches", C, "jacob co astronomia; epic x; jacob co price"],
  ["hublot-big-bang-guide", "Hublot Big Bang Buying Guide", "hublot big bang", C, "big bang unico; hublot price; hublot ceramic"],
  ["franck-muller-vanguard-guide", "Franck Muller Vanguard Buying Guide", "franck muller vanguard", C, "vanguard crazy hours; franck muller price; cintree curvex"],
  ["ap-code-11-59-guide", "Audemars Piguet Code 11.59: Worth a Second Look", "code 11.59", C, "code 11.59 review; code 11.59 chronograph; ap code price"],
  ["rolex-yacht-master-guide", "Rolex Yacht-Master Buying Guide", "rolex yacht-master", C, "yacht-master 40; yacht-master 42; everose rolesium"],
  ["rolex-gmt-master-ii-guide", "Rolex GMT-Master II Buying Guide", "rolex gmt-master ii buying guide", C, "126710blro; 126720vtnr sprite; gmt rootbeer"],
  ["rolex-submariner-guide", "Rolex Submariner Buying Guide", "rolex submariner buying guide", C, "submariner references; submariner price; vintage submariner"],
  ["birkin-market-2027", "The Birkin Market in 2027", "birkin resale prices 2027", I, "birkin price 2027; hermes resale; birkin market", "timely"],
  ["best-office-bags", "The Best Hermès Bags for Work", "best work bag hermes", C, "birkin 35 work; kelly 32; laptop birkin"],
  ["patek-nautilus-guide", "Patek Philippe Nautilus Buying Guide", "patek nautilus buying guide", C, "nautilus references; 5712; 5990; ladies nautilus"],
  ["patek-grand-complications", "Patek Philippe Grand Complications Explained", "patek grand complications", I, "5270; 5327; minute repeater patek"],
  ["royal-oak-concept-guide", "Royal Oak Concept: AP's Laboratory", "royal oak concept", C, "concept flying tourbillon; concept gmt; ap concept price"],
  ["rolex-oyster-perpetual-guide", "Rolex Oyster Perpetual: Colours, Sizes, Prices", "rolex oyster perpetual", C, "op 41; op 36 colour dials; candy op"],
  ["how-auctions-work", "Buying at Auction vs from a Dealer", "how watch auctions work", I, "buyer's premium; phillips watches; christie's handbags"],
  ["kelly-pochette-guide", "The Kelly Pochette Guide", "hermes kelly pochette", C, "kelly cut; pochette price; kelly clutch"],
  ["mini-kelly-guide", "The Mini Kelly II Guide", "hermes mini kelly", C, "mini kelly 20; mini kelly price; mini kelly strap"],
  ["christmas-gifts-her-2027", "Luxury Christmas Gifts for Her 2027", "luxury christmas gifts for her", C, "hermes gift; diamond gift; rolex for her", "owner"],
  ["christmas-gifts-him-2027", "Luxury Watch Gifts for Him 2027", "luxury watch gift for him", C, "christmas watch; first rolex; gift for husband", "owner"],
  ["christmas-delivery-2027", "Christmas Delivery 2027", "luxury gifts delivered before christmas", T, "christmas cutoff; insured delivery; gift shipping", "owner"],
  ["luxury-and-black-friday", "Why True Luxury Doesn't Do Black Friday", "luxury black friday", I, "hermes sale; rolex discount; luxury pricing"],
  ["art-basel-miami-guide", "Art Basel Miami Beach: A Collector's Week", "art basel miami beach", I, "miami design district; art basel watches; miami luxury", "timely"],
  ["bag-organizer-guide", "Birkin Organisers: Protect the Interior", "birkin organizer", C, "bag insert; baginizer; bag bestie"],
  ["hermes-price-increase-2028", "Hermès Price Increase 2028", "hermes price increase 2028", I, "birkin price 2028; kelly price 2028", "timely"],
  ["year-in-review-2027", "2027 in Watches and Hermès: The Year in Review", "luxury market 2027", I, "watch market 2027; birkin market 2027", "timely"],
  ["rolex-certified-pre-owned", "Rolex Certified Pre-Owned Explained", "rolex certified pre-owned", I, "rolex cpo; cpo warranty; cpo vs dealer"],
  ["watch-trends-2028", "Watch Trends for 2028", "watch trends 2028", I, "watches to buy 2028; dial trends; size trends", "timely"],
  ["small-birkin-trend", "Birkin 20 and 25: Why Small Bags Rule", "birkin 25", C, "birkin 20 faubourg; small birkin; birkin 25 price"],
  ["valentines-gifts-2028", "Valentine's Day Luxury Gifts 2028", "luxury valentines day gifts", C, "valentines jewelry; hermes valentines", "owner"],
  ["what-to-buy-2028", "What to Buy in 2028: Our Collectors' Picks", "best luxury purchases 2028", C, "watches to buy; bags to buy", "timely"],
];
const FRI = [
  ["rolex-explorer-vs-submariner", "Rolex Explorer vs Submariner", "explorer vs submariner", C, "explorer 124270; submariner 124060; everyday rolex"],
  ["kelly-25-vs-28", "Kelly 25 vs 28", "kelly 25 vs 28", C, "kelly 25 size; kelly 28 size; which kelly"],
  ["birkin-25-vs-kelly-25", "Birkin 25 vs Kelly 25", "birkin 25 vs kelly 25", C, "small hermes bag; kelly 25 strap"],
  ["datejust-vs-day-date", "Rolex Datejust vs Day-Date", "datejust vs day-date", C, "president vs jubilee; day-date gold; datejust steel"],
  ["royal-oak-37-vs-41", "Royal Oak 37 vs 41", "royal oak 37 vs 41", C, "15550st; 15510st; royal oak size"],
  ["nautilus-5711-vs-5712", "Nautilus 5711 vs 5712", "5711 vs 5712", C, "5712 power reserve moon phase; nautilus complications"],
  ["togo-vs-clemence", "Togo vs Clemence", "togo vs clemence", C, "clemence slouch; togo structure; birkin leather"],
  ["gmt-master-vs-explorer-ii", "GMT-Master II vs Explorer II", "gmt-master ii vs explorer ii", C, "explorer ii polar; gmt bezel"],
  ["yacht-master-vs-submariner", "Yacht-Master vs Submariner", "yacht-master vs submariner", C, "platinum bezel; rolesium; sailing watch"],
  ["richard-mille-vs-audemars-piguet", "Richard Mille vs Audemars Piguet", "richard mille vs audemars piguet", C, "rm vs royal oak offshore; luxury sports watch"],
  ["tank-vs-calatrava", "Cartier Tank vs Patek Calatrava", "best dress watch", C, "tank louis cartier; calatrava 5196"],
  ["platinum-vs-gold-rolex", "Platinum vs Gold Rolex", "platinum rolex", C, "ice blue dial; 950 platinum; yellow gold rolex"],
  ["constance-vs-kelly", "Constance vs Kelly", "constance vs kelly", C, "hermes evening bag; crossbody hermes"],
  ["royal-oak-vs-overseas", "Royal Oak vs Overseas", "royal oak vs overseas", C, "vacheron overseas; integrated bracelet"],
  ["nautilus-vs-overseas", "Nautilus vs Overseas", "nautilus vs overseas", C, "holy trinity sports watch"],
  ["daytona-steel-vs-gold", "Daytona in Steel or Gold?", "daytona steel vs gold", C, "116508; 126500ln; everose daytona"],
  ["round-vs-oval-diamond", "Round vs Oval Diamond", "round vs oval diamond", C, "oval looks bigger; round sparkle"],
  ["halo-vs-solitaire", "Halo vs Solitaire Engagement Ring", "halo vs solitaire", C, "halo ring; solitaire ring; engagement setting"],
  ["white-vs-yellow-gold-jewelry", "White Gold vs Yellow Gold Jewelry", "white gold vs yellow gold", C, "skin tone gold; yellow diamond setting"],
  ["epsom-vs-swift", "Epsom vs Swift", "epsom vs swift", C, "kelly leather; swift scratches"],
  ["matte-vs-shiny-alligator", "Matte vs Shiny Alligator", "matte vs shiny alligator birkin", C, "lisse alligator; water spots"],
  ["fp-journe-vs-patek", "F.P. Journe vs Patek Philippe", "fp journe vs patek", C, "independent vs manufacture"],
  ["hublot-vs-audemars-piguet", "Hublot Big Bang vs Royal Oak Offshore", "hublot vs audemars piguet", C, "big bang vs offshore"],
  ["oyster-vs-jubilee", "Oyster vs Jubilee Bracelet", "oyster vs jubilee", C, "jubilee comfort; oyster sport"],
  ["tudor-vs-omega", "Tudor vs Omega", "tudor vs omega", C, "black bay vs seamaster; speedmaster vs pelagos"],
  ["grand-seiko-vs-rolex", "Grand Seiko vs Rolex", "grand seiko vs rolex", C, "spring drive; zaratsu polishing"],
  ["navitimer-vs-speedmaster", "Breitling Navitimer vs Omega Speedmaster", "navitimer vs speedmaster", C, "pilot chronograph"],
  ["panerai-luminor-vs-radiomir", "Panerai Luminor vs Radiomir", "luminor vs radiomir", C, "crown guard; cushion case"],
  ["lady-datejust-vs-cartier-panthere", "Lady-Datejust vs Cartier Panthère", "best women's luxury watch", C, "panthere de cartier; datejust 28"],
  ["birkin-35-vs-40", "Birkin 35 vs 40", "birkin 35 vs 40", C, "birkin 40 size; men's birkin"],
  ["kelly-pochette-vs-mini-kelly", "Kelly Pochette vs Mini Kelly", "kelly pochette vs mini kelly", C, "evening hermes; small kelly"],
  ["new-vs-pre-owned-rolex", "New vs Pre-Owned Rolex", "new vs pre-owned rolex", C, "rolex waitlist; pre-owned value"],
  ["full-set-vs-watch-only", "Full Set vs Watch Only", "rolex box and papers value", C, "watch papers; full set premium"],
  ["dealer-vs-auction", "Buying from a Dealer vs at Auction", "dealer vs auction watch", C, "buyer's premium; auction guarantee"],
  ["rm-011-vs-rm-035", "Richard Mille RM 011 vs RM 35", "rm 011 vs rm 35", C, "rm 35-02; rm 011 felipe massa"],
  ["code-11-59-vs-royal-oak", "Code 11.59 vs Royal Oak", "code 11.59 vs royal oak", C, "ap dress watch"],
  ["aquanaut-luce-vs-lady-datejust", "Aquanaut Luce vs Lady-Datejust", "women's sports watch luxury", C, "aquanaut luce; diamond bezel"],
  ["day-date-vs-sky-dweller", "Day-Date vs Sky-Dweller", "day-date vs sky-dweller", C, "precious metal rolex; annual calendar"],
  ["submariner-vs-seamaster", "Submariner vs Omega Seamaster", "submariner vs seamaster", C, "diver 300m; best dive watch"],
  ["cushion-vs-radiant", "Cushion vs Radiant Cut", "cushion vs radiant", C, "fancy yellow cushion; radiant sparkle"],
  ["pear-vs-marquise", "Pear vs Marquise", "pear vs marquise diamond", C, "elongated diamonds"],
  ["fancy-yellow-vs-white-diamond", "Fancy Yellow vs White Diamond", "yellow vs white diamond", C, "canary diamond value"],
  ["kelly-28-vs-32", "Kelly 28 vs 32", "kelly 28 vs 32", C, "kelly 32 size; everyday kelly"],
  ["sky-dweller-vs-yacht-master-ii", "Sky-Dweller vs Yacht-Master II", "sky-dweller vs yacht-master ii", C, "regatta chronograph; annual calendar"],
];

const iso = (d) => d.toISOString().slice(0, 10);
function slots(startIso, endIso, weekday) {
  const out = [], d = new Date(startIso + "T00:00:00Z"), end = new Date(endIso + "T00:00:00Z");
  while (d.getUTCDay() !== weekday) d.setUTCDate(d.getUTCDate() + 1);
  for (; d <= end; d.setUTCDate(d.getUTCDate() + 7)) out.push(iso(d));
  return out;
}
const planned = [];
for (const [list, day, type] of [[MON, 1, "Educational"], [WED, 3, "Insight / guide"], [FRI, 5, "Comparison"]]) {
  const dates = slots("2027-04-01", "2028-01-31", day);
  if (dates.length !== list.length) throw new Error(`${type}: ${dates.length} slots, ${list.length} topics`);
  dates.forEach((date, i) => planned.push({ date, type, row: list[i] }));
}
planned.sort((a, b) => a.date.localeCompare(b.date));

const dir = new URL("../lib/journal/posts/", import.meta.url);
const written = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "all.ts")) written.push((await import(new URL(f, dir).href)).post);
written.sort((a, b) => a.date.localeCompare(b.date));
const TYPE = { 1: "Educational", 3: "Insight / guide", 5: "Comparison" };

const lines = [
  "# Montévane Journal – publishing calendar",
  "",
  "Generated by `scripts/journal-calendar.mjs`. Three posts a week: **Monday** educational, **Wednesday** industry insight / guide, **Friday** comparison / buying guide.",
  "",
  `- Written and scheduled: **${written.length}** posts (go live automatically on their date).`,
  `- Planned (April 2027 – January 2028): **${planned.length}** slots with keyword and intent.`,
  "- *timely* = write 2–3 weeks before the date with fresh facts. *owner* = needs a detail from the owner (delivery dates, offers).",
  "",
  "## Written",
  "",
  "| Date | Day type | Post | Primary keyword |",
  "|---|---|---|---|",
  ...written.map((p) => `| ${p.date} | ${TYPE[new Date(p.date + "T00:00:00Z").getUTCDay()] ?? "Launch"} | [${p.title}](/journal/${p.slug}) | ${p.keyword} |`),
  "",
  "## Planned",
  "",
  "| Date | Day type | Title | Primary keyword | Intent | Supporting keywords | Note |",
  "|---|---|---|---|---|---|---|",
  ...planned.map(({ date, type, row: [, title, kw, intent, sup, flag] }) => `| ${date} | ${type} | ${title} | ${kw} | ${intent} | ${sup.replace(/;/g, ",")} | ${flag ?? ""} |`),
  "",
];
mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
writeFileSync(new URL("../docs/journal-calendar.md", import.meta.url), lines.join("\n"));
console.log(`${written.length} written, ${planned.length} planned`);
