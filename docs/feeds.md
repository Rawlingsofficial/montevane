# Product feeds

Every channel is built from the same product data (`lib/feeds/`), rebuilt hourly,
and fetched by each platform on a schedule. No uploads are needed: new, sold and
repriced pieces flow through automatically. Every file is also available gzipped
(add `.gz`); prefer the `.gz` URL wherever the platform accepts it.

| Channel | URL | Format | Prices / landing pages |
| --- | --- | --- | --- |
| Google Merchant Center | https://www.montevane.com/feeds/google-merchant.xml.gz | Google RSS, with shipping | USD, English |
| Microsoft Merchant Center | https://www.montevane.com/feeds/microsoft.txt | Tab-separated text (Microsoft sample format) | USD, English |
| Meta Commerce Manager | https://www.montevane.com/feeds/meta.xml | Google RSS | USD, English |
| Pinterest Catalogs | https://www.montevane.com/feeds/pinterest.xml | Google RSS | USD, English |
| TikTok Catalog | https://www.montevane.com/feeds/tiktok.xml | Google RSS | USD, English |
| Lyst | https://www.montevane.com/feeds/lyst.xml | Google RSS | USD, English |
| Connexity | https://www.montevane.com/feeds/connexity.tsv | TSV | USD, English |
| Kelkoo (Germany) | https://www.montevane.com/feeds/kelkoo-de.xml | Google RSS | EUR, /de pages |
| idealo.de | https://www.montevane.com/feeds/idealo-de.csv | CSV | EUR, /de pages |
| GLAMI | https://www.montevane.com/feeds/glami.xml | GLAMI XML | EUR, /de pages |

Prices in each feed always match the landing page: English pages show USD,
German pages show the product's EUR price. Other currencies (GBP, local EUR
markets in their own language) need localized landing pages first.

## Setting up each channel

- **Microsoft Merchant Center** (Microsoft Advertising → Tools → Merchant Center):
  create a store for www.montevane.com (verified through Bing Webmaster Tools),
  then Catalogs → Feeds → Create feed → Scheduled download, paste the URL, daily.
- **Meta Commerce Manager**: Catalog → Data sources → Data feed → Scheduled feed,
  paste the URL, hourly or daily, currency USD.
  Domain verification: set `META_DOMAIN_VERIFICATION` in Vercel.
- **Pinterest**: claim the website first (set `PINTEREST_VERIFICATION` to the
  `p:domain_verify` code), then Ads → Catalogs → Add data source, paste the URL,
  format XML, currency USD.
- **TikTok**: TikTok Shop / Ads Manager → Catalogs → Add products → Data feed
  → Scheduled, paste the URL.
- **Lyst, Connexity, Kelkoo, idealo, GLAMI**: these onboard merchants by
  application. Send them the URL from the table during onboarding.
  idealo and GLAMI map columns during review.

## Search engine verification

Set these in Vercel (Production) and redeploy. The meta tags appear only when a
value is set:

| Engine | Env var | Where to get the code |
| --- | --- | --- |
| Bing Webmaster Tools | `BING_SITE_VERIFICATION` | Add site → HTML meta tag (`msvalidate.01`), or import from Google Search Console (no code needed) |
| Yandex Webmaster | `YANDEX_VERIFICATION` | Add site → Meta tag |
| Naver Search Advisor | `NAVER_SITE_VERIFICATION` | Site registration → HTML tag |
| Baidu Ziyuan | `BAIDU_SITE_VERIFICATION` | Add site → HTML tag (needs a Chinese phone number) |
| Seznam Webmaster | `SEZNAM_VERIFICATION` | Add site → meta tag (`seznam-wmt`) |
| Pinterest | `PINTEREST_VERIFICATION` | Settings → Claimed accounts → Websites |
| Meta | `META_DOMAIN_VERIFICATION` | Business settings → Brand safety → Domains |

Submit both sitemaps in each tool: `/sitemap.xml` and `/sitemap-images.xml`.

## IndexNow

Bing, Yandex, Seznam and Naver are told about changes within minutes:

- **Product save or delete in the admin:** every language version of the
  product URL is submitted.
- **Daily cron at 01:15 UTC:** submits journal posts going live that day, the
  journal pages that list them, and products changed or scheduled in the last
  25 hours.
- **Key file:** `/de9756b0e9d52551f086988ee54bc149.txt`. It must keep matching
  `INDEXNOW_KEY` in `lib/seo/indexnow.ts`.

Baidu doesn't take part in IndexNow; it reads the sitemap.
