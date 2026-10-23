import type { StoreProduct } from "@/lib/data/catalog";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { truncate } from "@/lib/seo/metadata";

// Search title/description for a product page. Anything the admin typed wins;
// otherwise these templates — built from the buyer-intent phrasing in the
// keyword research ("buy … authentic", "… kaufen original", "… narxi") —
// fill in. A focus keyword is worked into the title when it isn't there yet.

const capitalize = (s: string) => s.replace(/(^|\s)\S/g, (c) => c.toUpperCase());

/** The product fields the templates use (the admin preview builds this from form values). */
export type SeoInput = Pick<StoreProduct, "brand" | "name" | "title" | "color" | "condition" | "metaTitle" | "metaDescription" | "seo">;

function templates(p: SeoInput, locale: Locale) {
  const item = p.title;
  const used = p.condition !== "new";
  const condition = getDictionary(locale).product.condition[p.condition];

  switch (locale) {
    case "de":
      return {
        title: `${item} kaufen – Original${used ? ", gebraucht" : ""}`,
        description: `Original ${item}${p.color ? ` in ${p.color}` : ""} kaufen. Zustand: ${condition}. Echtheit geprüft, versicherter Versand nach Deutschland, Österreich & Schweiz. Zahlung per Überweisung, Krypto oder Karte.`,
      };
    case "uz":
      return {
        title: `${item} – original, narxi`,
        description: `Original ${item}${p.color ? ` (${p.color})` : ""} sotib oling. Holati: ${condition}. Haqiqiyligi tekshirilgan, Toshkentga va butun dunyoga yetkazib berish. To'lov: bank o'tkazmasi, kripto yoki karta.`,
      };
    default:
      return {
        title: `${item} for Sale — Authentic${used ? ", Pre-Owned" : ""}`,
        description: `Buy the authentic ${item}${p.color ? ` in ${p.color}` : ""}. Condition: ${condition}, verified by experts. Insured worldwide shipping to the US, UK and Europe; pay by bank wire, crypto or card.`,
      };
  }
}

export function productSeo(p: SeoInput, locale: Locale): { title: string; description: string } {
  const auto = templates(p, locale);
  let title = p.metaTitle || auto.title;
  const focus = p.seo.focusKeyword?.trim();
  if (focus && !title.toLowerCase().includes(focus.toLowerCase())) {
    title = `${capitalize(focus)} — ${p.title}`;
  }
  return { title, description: truncate(p.metaDescription || auto.description) };
}
