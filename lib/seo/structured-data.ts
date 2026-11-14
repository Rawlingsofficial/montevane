import { displayPrice } from "@/lib/catalog/pricing";
import type { ContactChannels, StoreProduct } from "@/lib/data/catalog";
import { siteUrl, type Locale } from "@/lib/i18n/config";
import { MAPS_URL, STORE_ADDRESS } from "@/lib/constants";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/metadata";

// schema.org objects for <JsonLd>. Google uses these for rich results
// (price, availability, breadcrumbs, sitelinks search).

const AVAILABILITY: Record<StoreProduct["availability"], string> = {
  in_stock: "https://schema.org/InStock",
  pre_order: "https://schema.org/BackOrder",
  sold_out: "https://schema.org/SoldOut",
  coming_soon: "https://schema.org/PreOrder",
};

const absoluteImage = (url: string) => (url.startsWith("http") ? url : `${siteUrl()}${url}`);

/** 14-day returns, worldwide (see /payment-shipping and /authenticity). */
function returnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: ["US", "GB", "DE", "AT", "CH", "FR", "IT", "MC", "UZ"],
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    merchantReturnLink: `${siteUrl()}/authenticity`,
  };
}

export function merchantReturnLd() {
  return { "@context": "https://schema.org", ...returnPolicy() };
}

export function organizationLd(channels: ContactChannels) {
  const contactPoint = [
    channels.phone && { "@type": "ContactPoint", telephone: channels.phone, contactType: "sales" },
    channels.whatsapp && { "@type": "ContactPoint", telephone: channels.whatsapp, contactType: "sales", name: "WhatsApp" },
    channels.email && { "@type": "ContactPoint", email: channels.email, contactType: "customer service" },
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Store"],
    "@id": `${siteUrl()}/#organization`,
    name: SITE_NAME,
    url: siteUrl(),
    logo: `${siteUrl()}/images/web_optimized/logo_montevane_full.webp`,
    image: `${siteUrl()}/images/web_optimized/about_boutique.webp`,
    description: "Hermès & rare watches specialist in Monaco: authentic Birkin, Kelly and Hermès accessories, rare watches and jewelry.",
    address: {
      "@type": "PostalAddress",
      streetAddress: STORE_ADDRESS.street,
      postalCode: STORE_ADDRESS.postalCode,
      addressLocality: STORE_ADDRESS.locality,
      addressCountry: STORE_ADDRESS.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: STORE_ADDRESS.lat, longitude: STORE_ADDRESS.lng },
    hasMap: MAPS_URL,
    ...(channels.phone ? { telephone: channels.phone } : {}),
    priceRange: "$$$$",
    hasMerchantReturnPolicy: returnPolicy(),
    areaServed: ["MC", "FR", "US", "GB", "DE", "AT", "CH", "UZ", "EU"],
    sameAs: channels.tiktok ? [channels.tiktok] : undefined,
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
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl(locale, "/search")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
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
  const price = displayPrice(product, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.title,
    description,
    sku: product.slug,
    image: product.images.map((img) => absoluteImage(img.url)),
    ...(product.showBrand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    ...(product.color ? { color: product.color } : {}),
    ...(product.materials ? { material: product.materials } : {}),
    offers: {
      "@type": "Offer",
      url,
      price: price.amount.toFixed(2),
      priceCurrency: price.currency,
      availability: AVAILABILITY[product.availability],
      itemCondition: product.condition === "new" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
      seller: { "@id": `${siteUrl()}/#organization` },
      hasMerchantReturnPolicy: returnPolicy(),
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
      name: p.title,
    })),
  };
}
