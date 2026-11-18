import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Price, priceAmounts } from "@/components/common/Price";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { PaymentMethods } from "@/components/common/PaymentMethods";
import { Waitlist } from "@/components/shop/Waitlist";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { ProductAccordion } from "@/components/products/ProductAccordion";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { BuyNowPanel } from "@/components/products/BuyNowPanel";
import { StickyProductBar } from "@/components/products/StickyProductBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { RecentlyViewed } from "@/components/shop/SavedItems";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { facetsFor } from "@/lib/catalog/facets";
import { SECURE_COURIER_FROM, shippingRates } from "@/lib/catalog/shipping";
import { groupSpecs } from "@/lib/catalog/spec-groups";
import { BRAND_SUBCATEGORIES, JEWELRY_TYPES } from "@/lib/catalog/taxonomy";
import { getContactChannels, getProduct, getProducts } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { MODELS } from "@/lib/seo/models";
import { productSeo } from "@/lib/seo/product";
import { productLd } from "@/lib/seo/structured-data";

// Pre-rendered at build; new products render on first visit, then stay
// static until an admin save revalidates them.
export const dynamic = "force-static";
export const dynamicParams = true;
// Hourly refresh so promo dates and the "Ships by" date stay current without a save.
export const revalidate = 3600;

// Only the newest pieces are pre-rendered at build (hundreds of product pages ×
// three languages would exhaust the database pool); the rest render on first
// visit and are cached like the others.
export async function generateStaticParams() {
  return (await getProducts({ limit: 24 })).map((p) => ({ slug: p.slug }));
}

type Props = PageProps<"/[locale]/products/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const product = await getProduct(slug, locale);
  if (!product) return {};
  const { title, description } = productSeo(product, locale);
  return pageMetadata({ locale, path: `/products/${slug}`, title, description, image: product.images[0].url });
}

/** "28 November 2026": to-order pieces ship within 14 days (the page refreshes hourly). */
function shipsByDate(locale: string): string {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(Date.now() + 14 * 86_400_000));
}

export default async function ProductPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const [product, channels] = await Promise.all([getProduct(slug, locale), getContactChannels()]);
  if (!product) notFound();

  const t = getDictionary(locale);
  const ui = t.ui;
  const item = product.title;
  const { description: seoDescription } = productSeo(product, locale);
  const model = MODELS.find((m) => m.brandSlug === product.brandSlug && m.match.some((term) => product.name.toLowerCase().includes(term)));
  const category = t.categories[product.categorySlug];
  const jewelryType = JEWELRY_TYPES.find((j) => j.piece === product.facets.piece_type);
  const amounts = priceAmounts(product);
  const reference = product.facets.reference;
  const refText = reference && !item.includes(reference) ? ` (ref. ${reference})` : "";
  const url = absoluteUrl(locale, `/products/${product.slug}`);
  const waMessage = fmt(ui.wa.product, { item, ref: refText, url });
  const hasWhatsApp = channels.whatsappLines.length > 0;
  const shipsBy = shipsByDate(locale);

  // Similar: same house in the same category first (a Daytona shows Rolex), then the category.
  const [sameBrand, sameCategory] = await Promise.all([
    getProducts({ category: product.categorySlug, brand: product.brandSlug, excludeSlug: product.slug, limit: 8 }, locale),
    getProducts({ category: product.categorySlug, excludeSlug: product.slug, limit: 8 }, locale),
  ]);
  const similar = [...sameBrand, ...sameCategory.filter((p) => !sameBrand.some((b) => b.slug === p.slug))].slice(0, 8);

  // Imported watches and jewelry carry full spec sheets; other pieces use the generic fields.
  const specRows = (
    product.specs.length && (product.categorySlug === "watches" || product.categorySlug === "jewelry")
      ? product.specs
      : [
          ...(["color", "materials", "dimensions", "weight"] as const).map((key) => ({ label: t.product.specLabels[key], value: product[key] })),
          ...facetsFor(product.categorySlug).map((f) => ({ label: f.label, value: product.facets[f.id] ?? "" })),
          ...product.specs,
        ]
  ).filter((row) => row.value);
  const specGroups = groupSpecs(specRows);

  const crumbs = [
    { name: t.nav.home, path: "/" },
    category ? { name: category.name, path: `/shop/${product.categorySlug}` } : { name: t.product.breadcrumbProducts, path: "/products" },
    ...(BRAND_SUBCATEGORIES.has(product.categorySlug) && product.showBrand
      ? [{ name: product.brand, path: `/shop/${product.categorySlug}/${product.brandSlug}` }]
      : []),
    ...(jewelryType && product.categorySlug === "jewelry" ? [{ name: t.jewelryTypes[jewelryType.slug], path: `/shop/jewelry/${jewelryType.slug}` }] : []),
    ...(model ? [{ name: model.model, path: `/models/${model.slug}` }] : []),
    { name: product.name, path: `/products/${product.slug}` },
  ];
  const rates = shippingRates(amounts.usd);
  const shippingLine =
    amounts.usd >= SECURE_COURIER_FROM
      ? ui.product.secureCourier
      : rates.us === 0
        ? ui.product.shippingFree
        : fmt(ui.product.shippingFrom, {
            rate: new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.min(rates.us, rates.europe, rates.world)),
          });
  const saved = { slug: product.slug, title: item, image: product.images[0]?.url ?? null, usd: amounts.usd, eur: amounts.eur };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-28 lg:px-10 lg:pt-32 lg:pb-16">
      <Breadcrumbs locale={locale} items={crumbs} />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery images={product.images} labels={ui.product.gallery} />
        </div>

        <div>
          {product.showBrand && (
            <Link
              href={localePath(locale, BRAND_SUBCATEGORIES.has(product.categorySlug) ? `/shop/${product.categorySlug}/${product.brandSlug}` : `/brands/${product.brandSlug}`)}
              className="text-xs font-medium tracking-[0.2em] text-[var(--gold)] uppercase hover:underline"
            >
              {product.brand}
            </Link>
          )}
          <h1 className="mt-2 font-heading text-3xl font-light sm:text-4xl">{item}</h1>
          {reference && <p className="mt-2 text-sm text-muted-foreground">Ref. {reference}</p>}

          <div className="mt-5 flex items-center justify-between gap-4">
            <Price amounts={amounts} locale={locale} className="text-2xl" />
            <WishlistButton item={saved} labels={{ add: ui.wishlistPage.add, remove: ui.wishlistPage.remove }} className="border border-border" />
          </div>
          <p className={`mt-2 text-xs font-medium tracking-[0.1em] uppercase ${product.availability === "in_stock" ? "text-[var(--gold)]" : "text-foreground/70"}`}>
            {product.availability === "pre_order" ? fmt(ui.product.shipsBy, { date: shipsBy }) : t.availability[product.availability]} ·{" "}
            <span className={product.condition === "new" ? "text-emerald-700" : undefined}>{t.product.condition[product.condition]}</span>
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">{shippingLine}</p>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/80">{product.shortDescription || product.description}</p>

          {product.availability === "sold_out" && <Waitlist item={item} productId={product.id} labels={t.waitlist} className="mt-8 max-w-lg" />}

          <div className="mt-8 max-w-lg space-y-3">
            {hasWhatsApp && (
              <WhatsAppLink
                lines={channels.whatsappLines}
                message={waMessage}
                location="product"
                itemId={product.slug}
                chooseLabel={ui.wa.choose}
                className="flex min-h-13 w-full items-center justify-center gap-2.5 bg-foreground px-6 text-xs font-medium tracking-[0.15em] text-white uppercase transition-colors hover:bg-[var(--gold)]"
              >
                <WhatsAppIcon className="size-4" />
                {ui.wa.enquire}
              </WhatsAppLink>
            )}
            <a
              href="#inquire"
              className="flex min-h-12 items-center justify-center border border-border px-3 text-center text-xs font-medium tracking-[0.1em] uppercase transition-colors hover:border-foreground"
            >
              {ui.product.sendEnquiry}
            </a>
            <div className="pt-2">
              <p className="mb-2 text-xs tracking-[0.1em] text-muted-foreground uppercase">{ui.product.enquireOr}</p>
              <ContactButtons
                channels={{ ...channels, whatsapp: hasWhatsApp ? null : channels.whatsapp }}
                message={fmt(t.product.message, { item })}
                subject={fmt(t.product.subject, { item })}
                labels={t.contact.channels}
              />
            </div>
            <PaymentMethods label={ui.weAccept} className="pt-5" />
          </div>

          <div className="mt-10">
            <ProductAccordion
              items={[
                ...(product.shortDescription && product.description
                  ? [{ title: t.product.description, content: <p className="whitespace-pre-line">{product.description}</p> }]
                  : []),
                ...(product.modifications
                  ? [{ title: t.product.modifications, content: <p className="whitespace-pre-line">{product.modifications}</p> }]
                  : []),
                {
                  title: t.product.authenticity,
                  content: (
                    <>
                      <p>{product.authenticityNotes || t.product.authenticityDefault}</p>
                      <Link href={localePath(locale, "/authenticity")} className="mt-2 inline-block underline underline-offset-4 hover:text-[var(--gold)]">
                        {t.product.authenticityLink}
                      </Link>
                    </>
                  ),
                },
                { title: ui.product.shippingReturns, content: ui.product.shippingReturnsBody },
                {
                  title: t.product.paymentShipping,
                  content: (
                    <>
                      <p>{t.payment.note}</p>
                      <Link href={localePath(locale, "/payment-shipping")} className="mt-2 inline-block underline underline-offset-4 hover:text-[var(--gold)]">
                        {t.nav.payment}
                      </Link>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {specGroups.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl">{ui.product.specifications}</h2>
          <div className="mt-8 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {specGroups.map(({ group, rows }) => (
              <div key={group}>
                <h3 className="border-b border-foreground pb-2 text-xs font-medium tracking-[0.15em] uppercase">{ui.product.groups[group]}</h3>
                <dl className="divide-y divide-border">
                  {rows.map((row) => (
                    <div key={row.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-2.5 text-sm">
                      <dt className="text-muted-foreground">{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}

      <BuyNowPanel closeLabel={t.form.close}>
        <div className="flex items-center gap-3 border-b border-border pr-10 pb-4">
          {product.images[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.images[0].url} alt="" className="size-12 shrink-0 bg-[#f6f4f0] object-contain" />
          )}
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm leading-snug">{item}</p>
            <Price amounts={amounts} locale={locale} className="mt-0.5 block text-sm text-muted-foreground" />
          </div>
        </div>
        <h2 id="inquire-title" className="mt-5 text-2xl">
          {t.product.inquireTitle}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.product.purchaseBody}</p>
        <div className="mt-5">
          <InquiryForm
            locale={locale}
            product={{ id: product.id, name: item }}
            labels={{ ...t.form, submit: t.product.purchaseSubmit, messageDefault: t.product.purchaseMessage }}
            privacyHref={localePath(locale, "/privacy")}
            purchase
          />
        </div>
      </BuyNowPanel>

      {similar.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 text-2xl">{ui.product.similar}</h2>
          <ProductGrid products={similar} locale={locale} />
        </section>
      )}

      <RecentlyViewed current={saved} locale={locale} title={ui.product.recentlyViewed} />

      <StickyProductBar
        locale={locale}
        amounts={amounts}
        lines={channels.whatsappLines}
        message={waMessage}
        itemId={product.slug}
        labels={{ enquire: ui.product.sendEnquiry, whatsapp: ui.wa.enquire, choose: ui.wa.choose }}
      />

      <JsonLd data={productLd(product, locale, seoDescription)} />
    </div>
  );
}
