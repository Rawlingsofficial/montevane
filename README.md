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

`.env.local` also needs `AUTH_SECRET` (any random 32+ character string — `openssl rand -base64 48`). See `.env.example`.

## Day to day

- **Contact details** — Admin → Settings → Customer Contact. Set once; they appear on every product.
- **New category or brand** (e.g. Watches, Rolex) — Admin → Settings → Categories & Brands.
- **Inquiries** — Admin → Inquiries, with the channels each customer asked to be reached on.
- **Schema changes** — edit `lib/db/schema.ts`, then `npm run db:generate` and `npm run db:migrate`.
