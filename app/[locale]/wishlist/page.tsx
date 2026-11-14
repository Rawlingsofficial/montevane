import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { WishlistItems } from "@/components/shop/SavedItems";
import { getDictionary } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

// Saved pieces live in the visitor's browser; the page itself is a static shell.
export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/wishlist">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).ui.wishlistPage;
  return pageMetadata({ locale, path: "/wishlist", title: t.metaTitle, description: t.metaDescription, noindex: true });
}

export default async function WishlistPage({ params }: PageProps<"/[locale]/wishlist">) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const w = t.ui.wishlistPage;
  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-10">
      <Breadcrumbs
        locale={locale}
        items={[
          { name: t.nav.home, path: "/" },
          { name: w.title, path: "/wishlist" },
        ]}
      />
      <h1 className="mb-10 text-4xl font-light">{w.title}</h1>
      <WishlistItems locale={locale} labels={{ empty: w.empty, remove: w.remove, browse: w.browse }} />
    </div>
  );
}
