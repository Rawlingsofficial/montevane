"""Refine the raw keyword-tool export into targeted keyword lists.

    python3 -I scripts/seo/refine_keywords.py

Input:  seo/raw/keywords-unrefined.txt — autosuggest export. Each seed group
        opens with "[seed" and closes with "}]"; groups appear market by
        market (US, UK, Uzbekistan, Germany) in the order of SECTION_STARTS.
Output: seo/refined/<market>.csv        kept keywords, scored and mapped to a page
        seo/refined/removed.csv         every dropped keyword and why
        seo/refined/content-ideas.csv   informational queries → journal articles
        lib/seo/keywords.json           top keywords per page cluster, used by the site
        seo/refined/KEYWORD-MAP.md      readable summary: which keywords each page targets
        lib/seo/longtail.json           every buyer-intent keyword per language, for
                                        per-product suggestions in admin

There are no search volumes in the export, so keywords are ranked by how
often autosuggest surfaced them across seeds (a popularity signal), buyer
intent, and how "head" (short) the phrase is. Re-run after pasting a new
export; nothing here is edited by hand.
"""

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "seo/raw/keywords-unrefined.txt"
OUT = ROOT / "seo/refined"

# First seed of each market section, in file order.
SECTION_STARTS = [
    ("us", "hermes birkin 25"),
    ("uk", "designer handbags uk"),
    ("uz", "брендовые сумки ташкент"),
    ("de", "designer handtaschen original"),
]

# --- removal rules -----------------------------------------------------------

NEGATIVE = r"replica|replika|repl?ica|fake|faux|dupe|knock ?off|copy|kopie|kopiya|nusxa|копи|реплик|подделк|паль\b|inspired|look ?alike|imitat|counterfeit|fälschung|nachgemacht|\b[1-9]a\b|\baaa+\b|mirror|first copy|superfake|\bmega\b|unauthori[sz]ed"
CHEAP = r"\bcheap|cheapest|billig|arzon|deshevo|дешев|\bwholesale|\bdhgate|aliexpress|\btemu\b|shein|\bfree\b"
COMPETITOR = r"fashionphile|real ?real|rebag|vestiaire|farfetch|ebay|poshmark|mercari|depop|craigslist|marketplace|chrono24|bob'?s watches|watchbox|jomashop|ssense|net-?a-?porter|mytheresa|selfridges|harrods|nordstrom|neiman|saks|bloomingdale|uzum|\bolx\b|wildberries|ozon|zalando|vinted|kleinanzeigen|amazon|walmart|costco|tj ?maxx|marshalls|ross\b|instagram|tiktok|reddit|youtube|pinterest|etsy|stockx|goat\b|grailed|luxify|luxury closet|madison avenue couture|privé porter|prive porter|sotheby|christie|bonhams|beyer|wempe|bucherer|tourneau|mayors|ben bridge|kay jewel|zales|pandora|swarovski"
NAVIGATIONAL = r"near me|in der nähe|opening times|öffnungszeiten|hours\b|store locat|boutique locat|locations?\b|careers?|\bjobs?\b|hiring|\bstock\b|share price|net worth|\bceo\b|founder|who owns|owner of|headquarter|customer service|phone number|contact number|\bapp\b|website|\.com\b|login|sign in|appointment|waitlist|wait list|quota"
OFF_TOPIC = r"\blogo\b|\bpng\b|svg|drawing|clipart|wallpaper|costume|tattoo|\bcake\b|meme|lyrics|\bsong\b|movie|\bfilm\b|episode|\bgame\b|lego|\btoy|\bkids?\b|\bbaby\b|\bdog\b|\bpet\b|\bcat\b|rental|\brent\b|mieten|repair|reparatur|restoration|cleaning|clean\b|reinigung|perfume|fragrance|cologne|parfum|parfüm|atir|духи|lipstick|makeup|nail|shoe|sandal|sneaker|slides?\b|boots?\b|loafer|scarf|twilly|\bbelt\b|gürtel|blanket|pillow|plate|\btie\b|sunglass|glasses|brille|\bhat\b|\bcap\b|hoodie|shirt|jacket|dress\b|kleid|phone case|iphone|airpods|keychain|key ring|charm\b|\bstrap|straps|\bparts?\b|replacement|spare|ersatz|yasash|how to make|\bdiy\b|selber machen|basteln|crochet|knit|sewing|pattern\b|template|printable|coloring|craft|\bfont\b|\bpdf\b|\bmp3\b|\bmod\b|\bnft\b|apple watch|smart ?watch|galaxy watch|garmin|fitbit|casio|g-shock|seiko|invicta|fossil|michael kors|coach\b|kate spade|tory burch|steve madden|guess\b|calvin klein|tommy|lacoste|zara\b|\bh&m\b|mango\b|tabriklash|mart\b|bayram|xrustal|toqilgan|yuk sumka|lokatsiya|novza|chorsu|ryukzak|barsetka|kompaniyasi|telefon|smart|miss dior|\d+ ?ml\b|eau de|sauvage|tufli|krossovka|oyoq kiyim|\bten\b|kitob|\bwatch \d|\brasm|\bnomi\b|\bfoto|фото|\by8c\b|\bst9\b"
# Geographic modifiers outside the target markets.
OTHER_GEO = r"australia|sydney|melbourne|canada|toronto|vancouver|dubai|\buae\b|abu dhabi|qatar|saudi|india|mumbai|delhi|singapore|hong ?kong|japan|tokyo|korea|seoul|china|shanghai|beijing|taiwan|thailand|bangkok|philippines|manila|malaysia|indonesia|vietnam|nigeria|lagos|south africa|kenya|mexico|brazil|argentina|turkey|istanbul|israel|pakistan|bangladesh|sri lanka|nepal|new zealand|ireland|dublin|scotland|wales|paris|france|italy|italia|milan|rome|spain|madrid|barcelona|portugal|lisbon|netherlands|amsterdam|belgium|brussels|sweden|norway|denmark|finland|poland|russia|moscow|москв|россия|казахстан|kazakhstan|almaty|kyrgyz|tajik|bishkek|sacramento|hawaii|las vegas|vegas|\bdk\b|denmark|copenhagen"
DIGIT_JUNK = r"\$|£|€|\bfor \d|\bunder \d|\d+ ?(dollars?|pounds?|euro)|\b\d+k\b|\b[1-9]\d*00\b"
# Autosuggest "a–z / 0–9" expansions: a lone letter or a leading small number.
# ("tiffany t" is a real model name.)
ALPHABET_JUNK = r"(?<![\w.])(?<!tiffany )[a-z](?![\w.'])|^\d{1,3}\s"
# People selling to us, not buying from us.
SELL_SIDE = r"\bsell|selling|\bbuyers?\b|we buy|cash for|pawn|trade in|verkaufen|ankauf|\bsotish|sotaman|продать|скупка"
# "designer" as a job title, not a product.
JOBS = r"\b(ux|ui|graphic|print|3d|web|interior|fashion|young|retail|game|grafik)\s+designers?|designers? (berlin|münchen|hamburg|london)|outlet"

RULES = [
    ("negative (fakes/replicas)", re.compile(NEGATIVE, re.I)),
    ("bargain-hunter", re.compile(CHEAP, re.I)),
    ("competitor / marketplace", re.compile(COMPETITOR, re.I)),
    ("navigational (brand stores, jobs, stock)", re.compile(NAVIGATIONAL, re.I)),
    ("off-catalog / off-topic", re.compile(OFF_TOPIC, re.I)),
    ("outside target markets", re.compile(OTHER_GEO, re.I)),
    ("price-number junk", re.compile(DIGIT_JUNK, re.I)),
    ("autosuggest a–z / 0–9 filler", re.compile(ALPHABET_JUNK, re.I)),
    ("sell-side (people selling to us)", re.compile(SELL_SIDE, re.I)),
    ("designer jobs / outlets", re.compile(JOBS, re.I)),
]

# A keyword must name a brand, a model, or a category we sell.
RELEVANT = re.compile(
    r"herm[eè]s|birkin|kelly|chanel|dior|louis vuitton|\blv\b|vuitton|neverfull|speedy|goyard|gucci|prada|saint laurent|\bysl\b|celine|loewe|burberry|givenchy|chlo[eé]|bottega|fendi|balenciaga|valentino|rolex|submariner|daytona|datejust|patek|nautilus|audemars|royal oak|cartier|santos|van cleef|alhambra|tiffany|bvlgari|bulgari|serpenti|omega|"
    r"\bbag|handbag|purse|tote|clutch|crossbody|designer|luxury|luxus|tasche|sumk|сумк|watch|uhr|\bsoat|часы|jewel|schmuck|zargarlik|taqinchoq|uzuk|bilaguzuk|zirak|marjon|украшен|ювелир|bracelet|armband|necklace|kette|ring\b|earring|ohrring|oltin|brend|original",
    re.I,
)

ALLOW_SHORT = re.compile(r"2\.55|11\.12|\b\d{4,6}[a-z]{0,4}\b")  # model refs like 126610ln

# --- clustering --------------------------------------------------------------

# Order matters: the first match wins, so specific models precede brands,
# brands precede categories. `page` is the site route each cluster feeds.
CLUSTERS = [
    ("hermes-birkin", r"birkin|биркин", "/models/hermes-birkin"),
    ("hermes-kelly", r"\bkelly\b", "/models/hermes-kelly"),
    ("chanel-classic-flap", r"classic flap|timeless flap|chanel flap|flap bag|2\.55|11\.12|classic.*chanel|chanel.*classic", "/models/chanel-classic-flap"),
    ("lady-dior", r"lady.{0,12}dior|dior.{0,20}\blady\b", "/models/lady-dior"),
    ("lv-neverfull", r"neverfull", "/models/louis-vuitton-neverfull"),
    ("lv-speedy", r"speedy", "/models/louis-vuitton-speedy"),
    ("goyard", r"goyard", "/models/goyard-tote"),
    ("rolex-submariner", r"submariner", "/models/rolex-submariner"),
    ("rolex-daytona", r"daytona", "/models/rolex-daytona"),
    ("rolex-datejust", r"datejust", "/models/rolex-datejust"),
    ("patek-nautilus", r"nautilus|patek", "/models/patek-philippe-nautilus"),
    ("ap-royal-oak", r"royal oak|audemars", "/models/audemars-piguet-royal-oak"),
    ("cartier-santos", r"santos", "/models/cartier-santos"),
    ("cartier-love", r"love (bracelet|ring|armband|bilaguzuk|uzuk|necklace|earring|ohrring)|cartier love|juste un clou", "/models/cartier-love-bracelet"),
    ("vca-alhambra", r"alhambra|van cleef", "/models/van-cleef-alhambra"),
    ("tiffany", r"tiffany", "/models/tiffany-t"),
    ("bvlgari-serpenti", r"serpenti|bvlgari|bulgari", "/models/bvlgari-serpenti"),
    ("pay-crypto", r"crypto|bitcoin|\bbtc\b|krypto|usdt|ethereum|bitpay", "/payment-shipping"),
    ("shipping", r"shipping|delivery|versand|lieferung|yetkazib|доставк", "/payment-shipping"),
    ("rolex", r"rolex", "/brands/rolex"),
    ("cartier", r"cartier", "/brands/cartier"),
    ("hermes", r"herm[eè]s", "/brands/hermes"),
    ("chanel", r"chanel", "/brands/chanel"),
    ("louis-vuitton", r"vuitton|\blv\b", "/brands/louis-vuitton"),
    ("dior", r"dior", "/brands/dior"),
    ("watches", r"watch|uhr|\bsoat|часы", "/shop/watches"),
    ("jewelry", r"jewel|schmuck|zargarlik|taqinchoq|uzuk|bilaguzuk|zirak|marjon|украшен|ювелир|bracelet|armband|necklace|kette|ring\b|earring|ohrring|oltin", "/shop/jewelry"),
    ("bags", r"bag|handbag|purse|tote|clutch|tasche|sumk|сумк", "/shop/bags"),
]
CLUSTERS = [(cid, re.compile(rx, re.I), page) for cid, rx, page in CLUSTERS]
FALLBACK = ("luxury-general", "/")

INFORMATIONAL = re.compile(
    r"\bhow\b|\bwhat\b|\bwhy\b|\bwhen\b|\bwho\b|\bis it\b|\bvs\.?\b|versus|difference|history|meaning|authentic(ate|ation)|real or|real vs|date code|serial|made in|which country|review|worth it|size guide|sizes?\b|dimensions|weight|how much does|explained|guide|tips|ideas|wie\b|was\b|warum|unterschied|erkennen|echtheit|qanday|nima\b|как\b|что\b",
    re.I,
)
TRANSACTIONAL = re.compile(r"\bbuy|for sale|\bshop\b|order|purchase|kaufen|bestellen|sotib|купить|zakaz|\bsale\b|available|in stock|online", re.I)
COMMERCIAL = re.compile(r"price|cost|preis|kosten|narx|цена|value|worth|investment|resale|retail|wert|pre-?owned|preloved|second hand|gebraucht|used\b|vintage|rare|limited|authentic|original|echt", re.I)


# Which site language a keyword belongs to — by its words, not by which
# market section it came from (the German export contains Uzbek and English
# queries too). Russian queries come only from the Uzbekistan run (Russia is
# not a target), so they feed the Uzbek locale's Russian-speaking audience.
UZBEK = re.compile(r"sumk|soat|narx|sotib|nabor|klatch|dvoyka|buqa|\btush\b|tarixi|tilla|kumush|uzbekistan|o'?zbekiston|\buz\b|uzuk|bilaguzuk|zirak|zargarlik|taqinchoq|oltin|ayollar|erkaklar|toshkent|tashkent|o'zbek|yetkazib|brend|\w+lar(i)?\b", re.I)
GERMAN = re.compile(r"tasche|taschen|kaufen|preis|gebraucht|\buhr|uhren|schmuck|armband|kette|damen|herren|echt|\bfür\b|\bmit\b|\bund\b|\bneu\b|ä|ö|ü|ß|versand|zweite hand|zürich|wien|berlin|münchen|hamburg|deutschland|schweiz|österreich|ohrring|ring gold|weiß|schwarz|braun|klein|groß", re.I)


def lang_of(kw: str) -> str:
    if re.search(r"[а-яё]", kw, re.I) or UZBEK.search(kw):
        return "uz"
    if GERMAN.search(kw):
        return "de"
    return "en"


def intent_of(kw: str) -> str:
    if INFORMATIONAL.search(kw):
        return "informational"
    if TRANSACTIONAL.search(kw):
        return "transactional"
    if COMMERCIAL.search(kw):
        return "commercial"
    return "product"  # model/colour/material phrasing — product & model pages


def cluster_of(kw: str) -> tuple[str, str]:
    for cid, rx, page in CLUSTERS:
        if rx.search(kw):
            return cid, page
    return FALLBACK


def reason_dropped(kw: str) -> str | None:
    for reason, rx in RULES:
        if rx.search(kw):
            return reason
    if not RELEVANT.search(kw):
        return "not about what we sell"
    if cluster_of(kw)[0] == FALLBACK[0] and not re.search(r"luxury|luxus|preloved|pre-?owned|concierge|investment|designer (bag|purse|handbag|tasche)", kw, re.I):
        return "not about what we sell"
    alpha = [t for t in re.findall(r"[^\W\d_]{3,}", kw)]
    if len(alpha) < 2 and not ALLOW_SHORT.search(kw):
        return "too vague / fragment"
    return None


def clean(line: str) -> str:
    line = line.replace("[", " ").replace("]", " ").replace("}", " ")
    line = line.split("{")[-1]  # "[seed {seed" → "seed"
    return re.sub(r"\s+", " ", line).strip().lower()


def main() -> None:
    lines = RAW.read_text(encoding="utf-8").splitlines()

    # Split into markets by the first seed of each section.
    starts = []
    for market, seed in SECTION_STARTS:
        idx = next(i for i, l in enumerate(lines) if l.lower().lstrip("[").startswith(seed))
        starts.append((idx, market))
    starts.sort()
    by_market: dict[str, list[str]] = defaultdict(list)
    for n, (idx, market) in enumerate(starts):
        end = starts[n + 1][0] if n + 1 < len(starts) else len(lines)
        by_market[market] += [k for k in (clean(l) for l in lines[idx:end]) if k]

    OUT.mkdir(parents=True, exist_ok=True)
    removed_rows, ideas_rows = [], []
    all_kept: list[tuple[float, str, str, str]] = []
    summary = []

    for market, raw in by_market.items():
        popularity = Counter(raw)  # repeats across seeds ≈ popularity
        kept = []
        drops = Counter()
        for kw in popularity:
            reason = reason_dropped(kw)
            if reason:
                drops[reason] += 1
                removed_rows.append((market, kw, reason))
                continue
            intent = intent_of(kw)
            cid, page = cluster_of(kw)
            words = len(kw.split())
            # Popularity is capped so autosuggest repeats can't outrank intent.
            score = min(popularity[kw], 3) * 2 + {"transactional": 4, "commercial": 3, "product": 2, "informational": 0}[intent] - words * 0.6
            kept.append((round(score, 1), kw, cid, intent, page, lang_of(kw)))

        kept.sort(key=lambda r: (-r[0], r[1]))
        with open(OUT / f"{market}.csv", "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["keyword", "language", "cluster", "intent", "target_page", "score"])
            for score, kw, cid, intent, page, lang in kept:
                w.writerow([kw, lang, cid, intent, page, score])

        for score, kw, cid, intent, page, lang in kept:
            if intent == "informational":
                ideas_rows.append((market, lang, cid, kw))
            else:
                all_kept.append((score, kw, cid, lang))
        summary.append((market, len(raw), len(popularity), len(kept), drops))

    with open(OUT / "removed.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["market", "keyword", "reason"])
        w.writerows(sorted(removed_rows))
    with open(OUT / "content-ideas.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["market", "language", "cluster", "question"])
        w.writerows(ideas_rows)

    # Site map: per language → per cluster → best keywords (deduped across markets).
    site_map: dict[str, dict[str, list[str]]] = defaultdict(lambda: defaultdict(list))
    seen: set[tuple[str, str]] = set()
    for score, kw, cid, lang in sorted(all_kept, key=lambda r: (-r[0], len(r[1]))):
        if (lang, kw) in seen:
            continue
        seen.add((lang, kw))
        if len(site_map[lang][cid]) < 15:
            site_map[lang][cid].append(kw)

    (ROOT / "lib/seo").mkdir(parents=True, exist_ok=True)
    (ROOT / "lib/seo/keywords.json").write_text(json.dumps(site_map, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    longtail: dict[str, list[str]] = defaultdict(list)
    for lang, kw in sorted(seen, key=lambda r: r[1]):
        longtail[lang].append(kw)
    (ROOT / "lib/seo/longtail.json").write_text(json.dumps(longtail, ensure_ascii=False) + "\n", encoding="utf-8")

    pages = {cid: page for cid, _, page in CLUSTERS}
    pages[FALLBACK[0]] = FALLBACK[1]
    lines = ["# Keyword map", "", "Generated by `scripts/seo/refine_keywords.py` — do not edit by hand.", ""]
    lines += ["| Market | Raw | Unique | Kept | Removed |", "|---|---|---|---|---|"]
    lines += [f"| {m} | {t} | {u} | {k} | {u - k} |" for m, t, u, k, _ in summary]
    labels = {"en": "English (US + UK)", "de": "German (DE, AT, CH)", "uz": "Uzbekistan (Uzbek + Russian)"}
    for lang in ("en", "de", "uz"):
        lines += ["", f"## {labels[lang]}", "", "| Page | Top keywords |", "|---|---|"]
        for cid, kws in sorted(site_map.get(lang, {}).items(), key=lambda kv: pages.get(kv[0], "")):
            lines.append(f"| `{pages.get(cid, '/')}` | {', '.join(kws[:6])} |")
    (OUT / "KEYWORD-MAP.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    for market, total, unique, kept, drops in summary:
        print(f"{market}: {total} lines, {unique} unique, kept {kept}, removed {unique - kept}")
        for reason, n in drops.most_common():
            print(f"    - {reason}: {n}")


if __name__ == "__main__":
    main()
