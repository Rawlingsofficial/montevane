import { displayPrice } from "@/lib/catalog/pricing";
import type { ContactChannels, StoreProduct } from "@/lib/data/catalog";
import { siteUrl, type Locale } from "@/lib/i18n/config";
import { MAPS_URL, SITE_NAME as BRAND, STORE_ADDRESS, STORE_LOCATIONS } from "@/lib/constants";
import { REGION_COUNTRIES, shippingRates, type Region } from "@/lib/catalog/shipping";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/metadata";

// schema.org objects for <JsonLd>. Google uses these for rich results
// (price, availability, breadcrumbs, sitelinks search).

const AVAILABILITY: Record<StoreProduct["availability"], string> = {
  in_stock: "https://schema.org/InStock",
  pre_order: "https://schema.org/InStock", // ships within 14 days (longer handling time)
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
    image: `${siteUrl()}/images/gallery/share.webp`,
    description: "Hermès & rare watches specialist in Monaco and Miami: authentic Birkin, Kelly and Hermès accessories, rare watches and jewelry.",
    address: {
      "@type": "PostalAddress",
      streetAddress: STORE_ADDRESS.street,
      postalCode: STORE_ADDRESS.postalCode,
      addressLocality: STORE_ADDRESS.locality,
      addressCountry: STORE_ADDRESS.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: STORE_ADDRESS.lat, longitude: STORE_ADDRESS.lng },
    hasMap: MAPS_URL,
    // Each boutique as its own Store, matching its Google Business Profile.
    department: STORE_LOCATIONS.map((l) => ({
      "@type": "Store",
      "@id": `${siteUrl()}/#store-${l.city.toLowerCase()}`,
      name: `${BRAND} ${l.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: l.street,
        postalCode: l.postalCode,
        addressLocality: l.locality,
        ...(l.region ? { addressRegion: l.region } : {}),
        addressCountry: l.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lng },
      hasMap: l.mapsUrl,
      ...(channels.phone ? { telephone: channels.phone } : {}),
    })),
    ...(channels.phone ? { telephone: channels.phone } : {}),
    priceRange: "$$$$",
    hasMerchantReturnPolicy: returnPolicy(),
    areaServed: ["MC", "FR", "US", "GB", "DE", "AT", "CH", "UZ", "EU"],
    sameAs: (() => {
      const links = [channels.instagram, channels.facebook, channels.pinterest, channels.tiktok].filter((u): u is string => !!u);
      return links.length ? links : undefined;
    })(),
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
    sku: product.sku,
    ...(product.facets.reference ? { mpn: product.facets.reference } : {}),
    image: product.images.map((img) => absoluteImage(img.url)),
    // Unbranded pieces carry the house name, as in the feeds, so every product has a brand identifier.
    brand: { "@type": "Brand", name: product.showBrand ? product.brand : SITE_NAME },
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
      shippingDetails: shippingDetails(product),
    },
  };
}

/** Insured express, arranged by us: one entry per region, complimentary over $5,000. */
function shippingDetails(product: StoreProduct) {
  const rates = shippingRates(product.promoPrice && product.promoPrice < product.price ? product.promoPrice : product.price);
  const toOrder = product.availability === "pre_order";
  return (Object.keys(REGION_COUNTRIES) as Region[]).map((region) => ({
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: rates[region].toFixed(2), currency: "USD" },
    shippingDestination: REGION_COUNTRIES[region].map((country) => ({ "@type": "DefinedRegion", addressCountry: country })),
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: toOrder ? 7 : 1, maxValue: toOrder ? 14 : 3, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: region === "world" ? 5 : 3, unitCode: "DAY" },
    },
  }));
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

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
}
