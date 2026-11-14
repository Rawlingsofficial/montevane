import { NavbarClient, type MenuGroup } from "@/components/layout/NavbarClient";
import { HERMES_CATEGORIES } from "@/lib/catalog/taxonomy";
import { getCategories, getSubcategories } from "@/lib/data/catalog";
import { LOCALE_LABEL, LOCALES, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { asset, categoryImage } from "@/lib/images";

// Mega-menu: Hermès › categories, Watches › brands, Jewelry › types.
// Built from live stock only, so a category or brand with nothing in it never shows.

export async function Navbar({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.nav;
  const link = (label: string, path: string) => ({ label, href: localePath(locale, path) });
  const live = new Set((await getCategories()).map((c) => c.slug));
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

  return (
    <NavbarClient
      locale={locale}
      groups={groups}
      right={[link(t.collections, "/collections"), link(t.contact, "/contact")]}
      extra={[link(t.brands, "/brands"), link(t.authenticity, "/authenticity"), link(t.payment, "/payment-shipping"), link(t.about, "/about"), link(t.journal, "/journal")]}
      homeHref={localePath(locale, "/")}
      searchAction={localePath(locale, "/search")}
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
      }}
      languages={LOCALES.map((l) => ({ locale: l, label: LOCALE_LABEL[l] }))}
    />
  );
}
