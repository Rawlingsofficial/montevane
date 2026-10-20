import { NavbarClient } from "@/components/layout/NavbarClient";
import { LOCALE_LABEL, LOCALES, getDictionary, localePath, type Locale } from "@/lib/i18n";

export function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).nav;
  const link = (label: string, path: string) => ({ label, href: localePath(locale, path) });

  return (
    <NavbarClient
      locale={locale}
      left={[link(t.bags, "/shop/bags"), link(t.watches, "/shop/watches"), link(t.jewelry, "/shop/jewelry")]}
      right={[link(t.brands, "/brands"), link(t.collections, "/collections"), link(t.contact, "/contact")]}
      extra={[link(t.payment, "/payment-shipping"), link(t.about, "/about"), link(t.journal, "/journal")]}
      homeHref={localePath(locale, "/")}
      labels={{ open: t.openMenu, close: t.closeMenu, home: t.homeLabel, language: t.language }}
      languages={LOCALES.map((l) => ({ locale: l, label: LOCALE_LABEL[l] }))}
    />
  );
}
