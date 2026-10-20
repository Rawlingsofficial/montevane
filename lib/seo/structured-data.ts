import type { ContactChannels, StoreProduct } from "@/lib/data/catalog";
import { siteUrl, type Locale } from "@/lib/i18n/config";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/metadata";

// schema.org objects for <JsonLd>. Google uses these for rich results
// (price, availability, breadcrumbs, sitelinks search).

const AVAILABILITY: Record<StoreProduct["availability"], string> = {
  in_stock: "https://schema.org/InStock",
  pre_order: "https://schema.org/PreOrder",
  sold_out: "https://schema.org/SoldOut",
  coming_soon: "https://schema.org/PreOrder",
};

const absoluteImage = (url: string) => (url.startsWith("http") ? url : `${siteUrl()}${url}`);

export function organizationLd(channels: ContactChannels) {
  const contactPoint = [
    channels.phone && { "@type": "ContactPoint", telephone: channels.phone, contactType: "sales" },
    channels.whatsapp && { "@type": "ContactPoint", telephone: channels.whatsapp, contactType: "sales", name: "WhatsApp" },
    channels.email && { "@type": "ContactPoint", email: channels.email, contactType: "customer service" },
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl()}/#organization`,
    name: SITE_NAME,
    url: siteUrl(),
    logo: `${siteUrl()}/images/web_optimized/logo_montevane_full.webp`,
    description: "Independent boutique for authentic luxury bags, watches and jewelry with worldwide shipping.",
    areaServed: ["US", "GB", "DE", "AT", "CH", "UZ", "EU"],
    sameAs: ["https://www.tiktok.com/@montevane"],
    ...(contactPoint.length ? { contactPoint } : {}),
  };
}

export function websiteLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl()}/#website`,
    name: SITE_NAME,
    url: absoluteUrl(locale, "/"),
    inLanguage: locale,
    publisher: { "@id": `${siteUrl()}/#organization` },
  };
}

export function breadcrumbLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function productLd(product: StoreProduct, locale: Locale, description: string) {
  const url = absoluteUrl(locale, `/products/${product.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: `${product.brand} ${product.name}`,
    description,
    sku: product.slug,
    image: product.images.map((img) => absoluteImage(img.url)),
    brand: { "@type": "Brand", name: product.brand },
    color: product.color,
    material: product.materials,
    offers: {
      "@type": "Offer",
      url,
      price: product.price.toFixed(2),
      priceCurrency: product.currency,
      availability: AVAILABILITY[product.availability],
      itemCondition: product.condition === "new" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
      seller: { "@id": `${siteUrl()}/#organization` },
    },
  };
}

/** ItemList of products on a listing / landing page. */
export function itemListLd(locale: Locale, products: StoreProduct[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(locale, `/products/${p.slug}`),
      name: `${p.brand} ${p.name}`,
    })),
  };
}
