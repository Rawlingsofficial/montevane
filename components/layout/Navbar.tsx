import { NavbarClient } from "@/components/layout/NavbarClient";
import { getCategories } from "@/lib/data/catalog";
import { LOCALE_LABEL, LOCALES, getDictionary, localePath, type Locale } from "@/lib/i18n";

// Main menu categories; each shows only while it has products in stock.
const MENU: [slug: string, label: "birkin" | "kelly" | "watches" | "jewelry"][] = [
  ["birkin-bags", "birkin"],
  ["kelly-bags", "kelly"],
  ["watches", "watches"],
  ["jewelry", "jewelry"],
];

export async function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).nav;
  const link = (label: string, path: string) => ({ label, href: localePath(locale, path) });
  const live = new Set((await getCategories()).map((c) => c.slug));

  return (
    <NavbarClient
      locale={locale}
      left={MENU.filter(([slug]) => live.has(slug)).map(([slug, label]) => link(t[label], `/shop/${slug}`))}
      right={[link(t.brands, "/brands"), link(t.collections, "/collections"), link(t.contact, "/contact")]}
      extra={[link(t.authenticity, "/authenticity"), link(t.payment, "/payment-shipping"), link(t.about, "/about"), link(t.journal, "/journal")]}
      homeHref={localePath(locale, "/")}
      labels={{ open: t.openMenu, close: t.closeMenu, home: t.homeLabel, language: t.language }}
      languages={LOCALES.map((l) => ({ locale: l, label: LOCALE_LABEL[l] }))}
    />
  );
}
