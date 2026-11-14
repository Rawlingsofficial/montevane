import { NavbarClient, type MenuGroup } from "@/components/layout/NavbarClient";
import { HERMES_CATEGORIES } from "@/lib/catalog/taxonomy";
import { getCategories, getContactChannels, getSubcategories } from "@/lib/data/catalog";
import { LOCALE_LABEL, LOCALES, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { asset, categoryImage } from "@/lib/images";

// Mega-menu: Hermès › categories, Watches › brands, Jewelry › types, Services.
// Built from live stock only, so a category or brand with nothing in it never shows.

export async function Navbar({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.nav;
  const link = (label: string, path: string) => ({ label, href: localePath(locale, path) });
  const [categories, channels] = await Promise.all([getCategories(), getContactChannels()]);
  const live = new Set(categories.map((c) => c.slug));
  const [watchBrands, jewelryTypes] = await Promise.all([
    live.has("watches") ? getSubcategories("watches") : [],
    live.has("jewelry") ? getSubcategories("jewelry") : [],
  ]);

  const groups: MenuGroup[] = [];
  const hermes = HERMES_CATEGORIES.filter((slug) => live.has(slug));
  if (hermes.length) {
    groups.push({
      id: "hermes",
      label: t.hermes,
      items: hermes.map((slug) => link(d.categories[slug]?.name ?? slug, `/shop/${slug}`)),
      viewAll: link(t.viewAllHermes, "/brands/hermes"),
      image: asset(categoryImage("birkin-bags")),
    });
  }
  if (live.has("watches")) {
    groups.push({
      id: "watches",
      label: t.watches,
      items: watchBrands.map((b) => link(b.name, `/shop/watches/${b.slug}`)),
      viewAll: link(t.viewAllWatches, "/shop/watches"),
      image: asset(categoryImage("watches")),
      wide: true,
    });
  }
  if (live.has("jewelry")) {
    groups.push({
      id: "jewelry",
      label: t.jewelry,
      items: jewelryTypes.map((j) => link(d.jewelryTypes[j.slug] ?? j.name, `/shop/jewelry/${j.slug}`)),
      viewAll: link(t.viewAllJewelry, "/shop/jewelry"),
      image: asset(categoryImage("jewelry")),
    });
  }
  groups.push({
    id: "services",
    label: t.services,
    items: [
      link(d.ui.sourcing, "/contact"),
      link(t.authenticity, "/authenticity"),
      link(t.payment, "/payment-shipping"),
      link(t.about, "/about"),
    ],
  });

  return (
    <NavbarClient
      locale={locale}
      groups={groups}
      links={[link(t.collections, "/collections"), link(t.brands, "/brands"), link(t.journal, "/journal"), link(t.contact, "/contact")]}
      homeHref={localePath(locale, "/")}
      searchAction={localePath(locale, "/search")}
      wishlistHref={localePath(locale, "/wishlist")}
      contactHref={localePath(locale, "/contact")}
      whatsapp={channels.whatsappLines}
      currencyFallback={locale === "de" ? "EUR" : "USD"}
      labels={{
        open: t.openMenu,
        close: t.closeMenu,
        home: t.homeLabel,
        language: t.language,
        search: d.search.label,
        searchPlaceholder: d.search.placeholder,
        searchSubmit: d.search.submit,
        searchClose: d.search.close,
        seeAll: d.search.seeAll,
        tagline: d.ui.tagline,
        firstAccess: d.ui.firstAccess,
        privateViewing: d.ui.privateViewing,
        currency: d.ui.currency,
        wishlist: d.ui.wishlist,
        whatsapp: d.ui.wa.chat,
        whatsappChoose: d.ui.wa.choose,
        whatsappMessage: d.ui.wa.global,
        viewingMessage: d.ui.wa.viewing,
      }}
      languages={LOCALES.map((l) => ({ locale: l, label: LOCALE_LABEL[l] }))}
    />
  );
}
