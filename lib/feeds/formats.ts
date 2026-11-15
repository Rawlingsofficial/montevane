import { SITE_NAME } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/i18n/config";

import { FEED_COUNTRIES, type FeedItem } from "./items";

const xml = (s: string) =>
  s
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const money = (n: number, currency: string) => `${n.toFixed(2)} ${currency}`;

/**
 * Google Shopping RSS (g: namespace). Read as-is by Google, Microsoft
 * Merchant Center, Meta, Pinterest, TikTok, Kelkoo and Lyst.
 */
export function googleRss(items: FeedItem[], opts: { shipping: boolean }): string {
  const g = (name: string, value: string | number | null | undefined) =>
    value === null || value === undefined || value === "" ? "" : `<g:${name}>${xml(String(value))}</g:${name}>`;
  const inTwoWeeks = new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10) + "T12:00:00Z";

  const item = (i: FeedItem) =>
    [
      "<item>",
      g("id", i.id),
      `<title>${xml(i.title)}</title>`,
      `<description>${xml(i.description)}</description>`,
      `<link>${xml(i.link)}</link>`,
      g("image_link", i.images[0]),
      ...i.images.slice(1, 11).map((url) => g("additional_image_link", url)),
      g("availability", i.availability),
      i.availability === "preorder" ? g("availability_date", inTwoWeeks) : "",
      g("price", money(i.price, i.currency)),
      i.salePrice ? g("sale_price", money(i.salePrice, i.currency)) : "",
      g("condition", i.condition),
      g("brand", i.brand),
      g("mpn", i.mpn),
      i.brand && i.mpn ? "" : g("identifier_exists", "no"),
      g("google_product_category", i.googleCategory),
      g("product_type", i.categoryPath),
      g("age_group", "adult"),
      g("gender", i.gender),
      g("color", i.color),
      g("material", i.material),
      g("min_handling_time", i.handling[0]),
      g("max_handling_time", i.handling[1]),
      opts.shipping && i.currency === "USD"
        ? i.shipping
            .flatMap((s) =>
              FEED_COUNTRIES[s.region].map(
                (country) => `<g:shipping><g:country>${country}</g:country><g:service>${s.service}</g:service><g:price>${money(s.price, "USD")}</g:price></g:shipping>`
              )
            )
            .join("")
        : "",
      "</item>",
    ].join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    "<channel>",
    `<title>${xml(SITE_NAME)}</title>`,
    `<link>${siteUrl()}</link>`,
    `<description>${xml(SITE_NAME)} product feed</description>`,
    ...items.map(item),
    "</channel>",
    "</rss>",
    "",
  ].join("\n");
}

/** CSV (comma, quoted) or TSV (tab, no quotes; tabs and newlines flattened). */
export function delimited(rows: Record<string, string | number | null>[], sep: "," | "\t"): string {
  if (!rows.length) return "";
  const head = Object.keys(rows[0]);
  const cell = (v: string | number | null) => {
    const s = v === null ? "" : String(v);
    // TSV: no quoting, so tabs/newlines are flattened and double quotes softened (parsers treat a leading quote as a quoted field).
    return sep === "\t" ? s.replace(/[\t\r\n]+/g, " ").replace(/"/g, "'") : `"${s.replace(/"/g, '""').replace(/[\r\n]+/g, " ")}"`;
  };
  return [head.map((h) => cell(h)).join(sep), ...rows.map((r) => head.map((h) => cell(r[h])).join(sep))].join("\n") + "\n";
}

/** idealo CSV (product data columns from idealo's feed specification). */
export function idealoCsv(items: FeedItem[]): string {
  return delimited(
    items.map((i) => ({
      sku: i.id,
      title: i.title,
      brand: i.brand,
      hans: i.mpn,
      categoryPath: i.categoryPath,
      url: i.link,
      price: (i.salePrice ?? i.price).toFixed(2),
      formerPrice: i.salePrice ? i.price.toFixed(2) : null,
      currency: i.currency,
      description: i.description.slice(0, 1000),
      imageUrls: i.images.join(";"),
      deliveryTime: i.toOrder ? "7-14 Werktage" : "1-3 Werktage",
      deliveryCosts: i.homeShipping.toFixed(2),
      condition: i.condition === "new" ? "NEW" : "USED",
      color: i.color,
      material: i.material,
      gender: i.gender,
    })),
    ","
  );
}

/** Connexity (Shopzilla / PriceGrabber) TSV. */
export function connexityTsv(items: FeedItem[]): string {
  return delimited(
    items.map((i) => ({
      "Unique ID": i.id,
      Title: i.title,
      Description: i.description.slice(0, 1000),
      Category: i.googleCategory,
      "Product URL": i.link,
      "Image URL": i.images[0],
      "Additional Image URL": i.images.slice(1, 4).join(","),
      Condition: i.condition === "new" ? "New" : "Used",
      Availability: i.availability === "in_stock" ? "In Stock" : i.availability === "preorder" ? "Preorder" : "Out of Stock",
      "Current Price": (i.salePrice ?? i.price).toFixed(2),
      "Original Price": i.salePrice ? i.price.toFixed(2) : null,
      Brand: i.brand,
      MPN: i.mpn,
      "Shipping Cost": i.homeShipping.toFixed(2),
      Gender: i.gender === "female" ? "Female" : "Unisex",
      "Age Group": "Adult",
      Color: i.color,
      Material: i.material,
    })),
    "\t"
  );
}

/** GLAMI XML (SHOP / SHOPITEM). */
export function glamiXml(items: FeedItem[]): string {
  const t = (name: string, value: string | number | null | undefined) => (value === null || value === undefined || value === "" ? "" : `<${name}>${xml(String(value))}</${name}>`);
  const param = (name: string, value: string | null | undefined) => (value ? `<PARAM><PARAM_NAME>${xml(name)}</PARAM_NAME><VAL>${xml(value)}</VAL></PARAM>` : "");
  const item = (i: FeedItem) =>
    [
      "<SHOPITEM>",
      t("ITEM_ID", i.id),
      t("PRODUCTNAME", i.title),
      t("DESCRIPTION", i.description.slice(0, 2000)),
      t("URL", i.link),
      t("IMGURL", i.images[0]),
      ...i.images.slice(1, 10).map((url) => t("IMGURL_ALTERNATIVE", url)),
      t("PRICE_VAT", (i.salePrice ?? i.price).toFixed(2)),
      i.salePrice ? t("PRICE_BEFORE_DISCOUNT", i.price.toFixed(2)) : "",
      t("MANUFACTURER", i.brand),
      t("CATEGORYTEXT", i.categoryPath),
      t("DELIVERY_DATE", i.handling[1]),
      param("color", i.color),
      param("material", i.material),
      param("gender", i.gender === "female" ? "women" : "unisex"),
      param("condition", i.condition),
      "</SHOPITEM>",
    ].join("");
  return ['<?xml version="1.0" encoding="UTF-8"?>', "<SHOP>", ...items.filter((i) => i.availability !== "out_of_stock").map(item), "</SHOP>", ""].join("\n");
}

/** Microsoft Merchant Center tab-separated text (columns from Microsoft's sample feed). */
export function microsoftTsv(items: FeedItem[]): string {
  return delimited(
    items.map((i) => ({
      id: i.id,
      title: i.title,
      // Unbranded pieces are the house's own (Microsoft rejects items without a brand).
      brand: i.brand ?? "Montévane",
      link: i.link,
      price: i.price.toFixed(2),
      description: i.description,
      image_link: i.images[0],
      additional_image_link: i.images.slice(1, 10).join(","),
      mpn: i.mpn,
      availability: i.availability === "in_stock" ? "In Stock" : i.availability === "preorder" ? "Preorder" : "Out of Stock",
      condition: i.condition === "new" ? "New" : "Used",
      product_type: i.categoryPath.replace(/ > /g, " | "),
      product_category: i.googleCategory,
      gender: i.gender,
      age_group: "adult",
      color: i.color,
      material: i.material,
      sale_price: i.salePrice ? i.salePrice.toFixed(2) : null,
    })),
    "\t"
  );
}
