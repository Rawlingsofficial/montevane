import { NavbarClient, type MenuColumn, type MenuGroup } from "@/components/layout/NavbarClient";
import { BAG_COPY, allWatchesCopy } from "@/lib/catalog/listing-copy";
import { CONDITION_SUBS, HERMES_CATEGORIES } from "@/lib/catalog/taxonomy";
import { getCategories, getContactChannels, getSubcategories } from "@/lib/data/catalog";
import { LOCALE_LABEL, LOCALES, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { asset, categoryImage } from "@/lib/images";

// Mega-menu: Hermès › categories, Watches › brands, Jewelry › types, Services.
// Built from live stock only, so a category or brand with nothing in it never shows.

const COLUMNS: Record<Locale, { accessories: string; shopBy: string; houses: string; allWatches: string; rareWatches: string }> = {
  en: { accessories: "Accessories", shopBy: "Shop by", houses: "Houses", allWatches: "All Watches", rareWatches: "Rare Watches" },
  de: { accessories: "Accessoires", shopBy: "Entdecken", houses: "Manufakturen", allWatches: "Alle Uhren", rareWatches: "Seltene Uhren" },
  uz: { accessories: "Aksessuarlar", shopBy: "Tanlash", houses: "Brendlar", allWatches: "Barcha soatlar", rareWatches: "Noyob soatlar" },
};

export async function Navbar({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.nav;
  const link = (label: string, path: string) => ({ label, href: localePath(locale, path) });
  const [categories, channels] = await Promise.all([getCategories(), getContactChannels()]);
  const live = new Set(categories.map((c) => c.slug));
  const [watchBrands, jewelryTypes, birkinPages, kellyPages] = await Promise.all([
    live.has("watches") ? getSubcategories("watches") : [],
    live.has("jewelry") ? getSubcategories("jewelry") : [],
    live.has("birkin-bags") ? getSubcategories("birkin-bags") : [],
    live.has("kelly-bags") ? getSubcategories("kelly-bags") : [],
  ]);
  const c = COLUMNS[locale];
  // A bag column: the category itself, then its landing pages (pre-owned, exotic, HSS…).
  const bagColumn = (slug: "birkin-bags" | "kelly-bags", title: string, pages: { slug: string }[]): MenuColumn => ({
    title,
    lead: true,
    items: [
      link(d.categories[slug]?.name ?? slug, `/shop/${slug}`),
      ...pages.map((p) => link(BAG_COPY[slug][p.slug]?.[locale].name ?? p.slug, `/shop/${slug}/${p.slug}`)),
    ],
  });

  const groups: MenuGroup[] = [];
  const hermes = HERMES_CATEGORIES.filter((slug) => live.has(slug));
  if (hermes.length) {
    const accessories = hermes.filter((slug) => slug !== "birkin-bags" && slug !== "kelly-bags");
    groups.push({
      id: "hermes",
      label: t.hermes,
      items: hermes.map((slug) => link(d.categories[slug]?.name ?? slug, `/shop/${slug}`)),
      columns: [
        ...(live.has("birkin-bags") ? [bagColumn("birkin-bags", "Birkin", birkinPages)] : []),
        ...(live.has("kelly-bags") ? [bagColumn("kelly-bags", "Kelly", kellyPages)] : []),
        ...(accessories.length ? [{ title: c.accessories, items: accessories.map((slug) => link(d.categories[slug]?.name ?? slug, `/shop/${slug}`)) }] : []),
      ],
      viewAll: link(t.viewAllHermes, "/brands/hermes"),
      image: asset(categoryImage("birkin-bags")),
    });
  }
  if (live.has("watches")) {
    groups.push({
      id: "watches",
      label: t.watches,
      items: watchBrands.map((b) => link(b.name, `/shop/watches/${b.slug}`)),
      columns: [
        {
          title: c.shopBy,
          lead: true,
          items: [
            link(c.allWatches, "/shop/watches"),
            ...CONDITION_SUBS.map((x) => link(allWatchesCopy(x.condition, locale).name, `/shop/watches/${x.slug}`)),
            link(c.rareWatches, "/collections/rare-watches"),
          ],
        },
        { title: c.houses, wide: true, items: watchBrands.map((b) => link(b.name, `/shop/watches/${b.slug}`)) },
      ],
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
