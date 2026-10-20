# Montévane

Luxury boutique storefront and admin. Next.js 16, Neon Postgres (Drizzle ORM), Neon Object Storage.

There is no online checkout: customers contact the boutique (WhatsApp, Telegram, Signal, text, call, email) or leave an inquiry, and payment is arranged directly.

## Setup

```bash
npm install
neon deploy              # provisions the "assets" bucket from neon.ts and pulls env vars into .env.local
npm run db:migrate       # create tables (drizzle/)
npm run db:seed          # brands, categories, collections, 4 reference products
npm run admin:create -- you@example.com "a-long-password"
npm run dev
```

`.env.local` also needs `AUTH_SECRET` (any random 32+ character string — `openssl rand -base64 48`) and `NEXT_PUBLIC_SITE_URL` (the live domain). See `.env.example`.

**Deploying:** storefront pages are pre-rendered at build time from the database, so the host's build step needs `DATABASE_URL` (and every other variable in `.env.example`) set — a missing `DATABASE_URL` fails the build.

## Day to day

- **Contact details** — Admin → Settings → Customer Contact. Set once; they appear on every product.
- **New category or brand** (e.g. Watches, Rolex) — Admin → Settings → Categories & Brands.
- **Inquiries** — Admin → Inquiries, with the channels each customer asked to be reached on.
- **Schema changes** — edit `lib/db/schema.ts`, then `npm run db:generate` and `npm run db:migrate`.

## SEO

- **Languages:** English at `/…` (US + UK), German at `/de/…` (DE, AT, CH), Uzbek at `/uz/…`. Every page carries canonical + hreflang tags; `/sitemap.xml` lists every page in every language.
- **Landing pages:** `/shop/bags|watches|jewelry`, `/models/<model>` (Birkin, Kelly, Submariner, Daytona, Love bracelet… — copy in `lib/seo/models.ts`), `/brands/<brand>`, `/payment-shipping`.
- **Per product:** Admin → product → *Search (SEO) & Languages*. Pick a focus keyword (the **Suggest** button pulls matches from the keyword research), optionally write titles/descriptions and German/Uzbek text. Empty fields use generated, keyword-targeted text — the Google preview shows exactly what will be used.
- **Keyword research:** paste a new keyword-tool export into `seo/raw/keywords-unrefined.txt` and run `python3 -I scripts/seo/refine_keywords.py`. It removes negatives (replicas, fakes, competitors, sell-side, off-catalog, other countries), maps each keyword to a page, and writes `seo/refined/KEYWORD-MAP.md`, per-market CSVs, `content-ideas.csv` (questions to answer in Journal articles) and `removed.csv` (everything dropped, with the reason).
- **After launch:** add the site in [Google Search Console](https://search.google.com/search-console) (put the verification code in `GOOGLE_SITE_VERIFICATION`), submit `https://<domain>/sitemap.xml`,, then do the same in Bing Webmaster Tools (Bing also powers DuckDuckGo and ChatGPT search).
