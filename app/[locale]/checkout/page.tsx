import Link from "next/link";
import type { Metadata } from "next";

import { InquiryForm } from "@/components/contact/InquiryForm";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProductsBySku } from "@/lib/data/catalog";
import { getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

// Checkout URL for the Facebook / Instagram shop ("checkout on another
// website"). Meta sends the chosen pieces as ?products=SKU:QTY,SKU:QTY
// (optionally &coupon=CODE). The store has no cart, so the page shows those
// pieces and the purchase request form, pre-filled with them. Never indexed.

type Props = PageProps<"/[locale]/checkout">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).product;
  return pageMetadata({ locale, path: "/checkout", title: t.inquireTitle, description: t.purchaseBody, noindex: true });
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/** "MV-W0051:1,MV-B0002:1" → ["MV-W0051", "MV-B0002"] (each piece is one of a kind). */
function requestedSkus(raw: string): string[] {
  const skus = raw
    .split(",")
    .map((entry) => entry.split(":")[0]?.trim())
    .filter((sku): sku is string => !!sku && /^[\w.-]{1,100}$/.test(sku));
  return [...new Set(skus)].slice(0, 50);
}

function joinNames(names: string[]): string {
  return names.length <= 1 ? (names[0] ?? "") : `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

export default async function CheckoutPage({ params, searchParams }: Props) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const query = await searchParams;
  const products = await getProductsBySku(requestedSkus(one(query.products)), locale);
  const coupon = one(query.coupon).replace(/[^\w-]/g, "").slice(0, 40);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl">{t.product.inquireTitle}</h1>

      {products.length === 0 ? (
        <div className="mt-6 max-w-2xl">
          <p className="text-base text-muted-foreground">{t.product.checkoutEmpty}</p>
          <Link href={localePath(locale, "/products")} className="mt-6 inline-block border-b border-foreground pb-0.5 text-sm tracking-[0.1em] uppercase">
            {t.hero.cta}
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-10">
            <ProductGrid products={products} locale={locale} />
          </div>
          <section id="inquire" className="mt-16 max-w-3xl scroll-mt-28">
            <p className="text-base text-muted-foreground">{t.product.purchaseBody}</p>
            <div className="mt-8">
              <InquiryForm
                locale={locale}
                product={{
                  id: products[0].id,
                  name: joinNames(products.map((p) => p.title)) + (coupon ? ` (code ${coupon})` : ""),
                }}
                labels={{ ...t.form, submit: t.product.purchaseSubmit, messageDefault: t.product.purchaseMessage }}
                privacyHref={localePath(locale, "/privacy")}
                purchase
                continueHref={localePath(locale, "/")}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
