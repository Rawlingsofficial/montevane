import { LandingTiles, type LandingTile } from "@/components/home/LandingTiles";
import { BAG_COPY, conditionCopy } from "@/lib/catalog/listing-copy";
import { getBrandConditions, getListingCover, getSubcategories, subcategoryFilter } from "@/lib/data/catalog";
import { fmt, getDictionary, type Locale } from "@/lib/i18n";

// Two guided paths into the new landing pages, right under the hero:
// "The Birkin Edit" (pre-owned, new, exotic, HSS) and "Watches by House"
// (the six leading houses, each with its New / Pre-Owned pages).

const BIRKIN_EDIT = ["pre-owned", "new-unused", "exotic-leather", "hss"];
const HOUSES = ["rolex", "patek-philippe", "audemars-piguet", "richard-mille", "fp-journe", "cartier"];

const COPY: Record<Locale, { birkinEyebrow: string; birkinTitle: string; birkinAll: string; housesEyebrow: string; housesTitle: string; housesAll: string }> = {
  en: {
    birkinEyebrow: "Hermès",
    birkinTitle: "The Birkin Edit",
    birkinAll: "All Birkin bags",
    housesEyebrow: "Fine Watches",
    housesTitle: "Watches by House",
    housesAll: "All watch houses",
  },
  de: {
    birkinEyebrow: "Hermès",
    birkinTitle: "Die Birkin-Auswahl",
    birkinAll: "Alle Birkin Bags",
    housesEyebrow: "Feine Uhren",
    housesTitle: "Uhren nach Manufaktur",
    housesAll: "Alle Uhrenmarken",
  },
  uz: {
    birkinEyebrow: "Hermès",
    birkinTitle: "Birkin to'plami",
    birkinAll: "Barcha Birkin sumkalar",
    housesEyebrow: "Nafis soatlar",
    housesTitle: "Soat brendlari",
    housesAll: "Barcha soat brendlari",
  },
};

export async function HomeLandings({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const listing = getDictionary(locale).listing;
  const pieces = (n: number) => (n === 1 ? listing.piece : fmt(listing.pieces, { n }));

  const [birkinPages, watchBrands] = await Promise.all([getSubcategories("birkin-bags"), getSubcategories("watches")]);

  const birkinTiles: LandingTile[] = await Promise.all(
    BIRKIN_EDIT.flatMap((slug) => {
      const page = birkinPages.find((p) => p.slug === slug);
      if (!page) return [];
      return [
        (async () => {
          const found = await subcategoryFilter("birkin-bags", slug);
          return {
            href: `/shop/birkin-bags/${slug}`,
            title: BAG_COPY["birkin-bags"][slug][locale].name,
            count: page.count,
            cover: found ? await getListingCover(found.filter) : null,
          };
        })(),
      ];
    })
  );

  const houseTiles: LandingTile[] = await Promise.all(
    HOUSES.flatMap((slug) => {
      const brand = watchBrands.find((b) => b.slug === slug);
      if (!brand) return [];
      return [
        (async () => {
          const [cover, conditions] = await Promise.all([getListingCover({ category: "watches", brand: slug }), getBrandConditions(slug)]);
          return {
            href: `/shop/watches/${slug}`,
            title: brand.name,
            count: brand.count,
            cover,
            links: conditions.map((c) => ({ label: conditionCopy(c.condition, brand.name, locale).name, href: `/shop/watches/${slug}/${c.slug}` })),
          };
        })(),
      ];
    })
  );

  return (
    <>
      <LandingTiles
        locale={locale}
        eyebrow={t.birkinEyebrow}
        title={t.birkinTitle}
        tiles={birkinTiles}
        viewAll={{ label: t.birkinAll, href: "/shop/birkin-bags" }}
        pieces={pieces}
        columns="four"
      />
      <LandingTiles
        locale={locale}
        eyebrow={t.housesEyebrow}
        title={t.housesTitle}
        tiles={houseTiles}
        viewAll={{ label: t.housesAll, href: "/shop/watches" }}
        pieces={pieces}
        columns="six"
        className="bg-[var(--ivory)]"
      />
    </>
  );
}
