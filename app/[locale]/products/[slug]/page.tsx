import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { ProductAccordion } from "@/components/products/ProductAccordion";
import { ProductGrid } from "@/components/products/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { facetsFor } from "@/lib/catalog/facets";
import { displayPrice } from "@/lib/catalog/pricing";
import { getContactChannels, getProduct, getProductIndex, getProducts } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { MODELS } from "@/lib/seo/models";
import { productSeo } from "@/lib/seo/product";
import { productLd } from "@/lib/seo/structured-data";

// Pre-rendered at build; new products render on first visit, then stay
// static until an admin save revalidates them.
export const dynamic = "force-static";
export const dynamicParams = true;
// Hourly refresh so promo start/end dates take effect without a save.
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getProductIndex()).map((p) => ({ slug: p.slug }));
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

export default async function ProductPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const [product, channels] = await Promise.all([getProduct(slug, locale), getContactChannels()]);
  if (!product) notFound();

  const t = getDictionary(locale);
  const item = product.title;
  const { description: seoDescription } = productSeo(product, locale);
  const model = MODELS.find((m) => m.brandSlug === product.brandSlug && m.match.some((term) => product.name.toLowerCase().includes(term)));
  const category = t.categories[product.categorySlug];

  const sameBrand = await getProducts({ brand: product.brandSlug, excludeSlug: product.slug, limit: 4 }, locale);
  const related = sameBrand.length > 0 ? sameBrand : await getProducts({ excludeSlug: product.slug, limit: 4 }, locale);
  const price = displayPrice(product, locale);
  const money = new Intl.NumberFormat(locale, { style: "currency", currency: price.currency, maximumFractionDigits: 0 });

  // Only filled-in values make it to the page.
  const specRows = [
    ...(["color", "materials", "dimensions", "weight"] as const).map((key) => ({ label: t.product.specLabels[key], value: product[key] })),
    ...facetsFor(product.categorySlug).map((f) => ({ label: f.label, value: product.facets[f.id] ?? "" })),
    ...product.specs,
  ].filter((row) => row.value);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 lg:px-10 lg:pb-16">
      <Breadcrumbs
        locale={locale}
        items={[
          { name: t.nav.home, path: "/" },
          category ? { name: category.name, path: `/shop/${product.categorySlug}` } : { name: t.product.breadcrumbProducts, path: "/products" },
          ...(model ? [{ name: `${model.brand} ${model.model}`, path: `/models/${model.slug}` }] : []),
          { name: product.name, path: `/products/${product.slug}` },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-3">
          {product.images.map((img, i) => (
            <div key={img.url + i} className={`relative aspect-square overflow-hidden bg-[var(--ivory)] ${i === 0 ? "col-span-2" : ""}`}>
              <Image
                src={img.url}
                alt={img.alt}
                fill
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div>
          {product.showBrand && (
            <Link
              href={localePath(locale, `/brands/${product.brandSlug}`)}
              className="text-xs font-medium tracking-[0.2em] text-[var(--gold)] uppercase hover:underline"
            >
              {product.brand}
            </Link>
          )}
          <h1 className="mt-2 font-heading text-3xl font-light sm:text-4xl">{item}</h1>
          <p className="mt-4 text-xl">
            {money.format(price.amount)}
            {price.was && <s className="ml-3 text-base text-muted-foreground">{money.format(price.was)}</s>}
          </p>
          <p
            className={`mt-2 text-xs font-medium tracking-[0.1em] uppercase ${
              product.availability === "in_stock" ? "text-[var(--gold)]" : "text-muted-foreground"
            }`}
          >
            {t.availability[product.availability]} · {t.product.condition[product.condition]}
          </p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/80">{product.shortDescription || product.description}</p>

          <div className="mt-8">
            <h2 className="mb-3 text-xs tracking-[0.1em] text-muted-foreground uppercase">{t.product.contactToBuy}</h2>
            <ContactButtons
              channels={channels}
              message={fmt(t.product.message, { item })}
              subject={fmt(t.product.subject, { item })}
              labels={t.contact.channels}
            />
            <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">{t.payment.note}</p>
          </div>

          <div className="mt-10">
            <ProductAccordion
              items={[
                ...(product.shortDescription && product.description
                  ? [{ title: t.product.description, content: <p className="whitespace-pre-line">{product.description}</p> }]
                  : []),
                ...(specRows.length
                  ? [
                      {
                        title: t.product.details,
                        content: (
                          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
                            {specRows.map((row) => (
                              <div key={row.label} className="contents">
                                <dt>{row.label}</dt>
                                <dd className="text-foreground/80">{row.value}</dd>
                              </div>
                            ))}
                          </dl>
                        ),
                      },
                    ]
                  : []),
                ...(product.modifications
                  ? [{ title: t.product.modifications, content: <p className="whitespace-pre-line">{product.modifications}</p> }]
                  : []),
                { title: t.product.paymentShipping, content: t.payment.note },
                { title: t.product.authenticity, content: product.authenticityNotes || t.product.authenticityDefault },
              ]}
            />
          </div>
        </div>
      </div>

      <section id="inquire" className="mt-24 max-w-3xl scroll-mt-24">
        <h2 className="text-2xl">{t.product.inquireTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.product.inquireBody}</p>
        <div className="mt-8">
          <InquiryForm locale={locale} product={{ id: product.id, name: item }} labels={t.form} privacyHref={localePath(locale, "/privacy")} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 text-2xl">{t.product.related}</h2>
          <ProductGrid products={related} channels={channels} locale={locale} />
        </section>
      )}

      <JsonLd data={productLd(product, locale, seoDescription)} />
    </div>
  );
}
