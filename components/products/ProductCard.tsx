import Image from "next/image";
import Link from "next/link";

import { Price, priceAmounts } from "@/components/common/Price";
import { WishlistButton } from "@/components/shop/WishlistButton";
import type { StoreProduct } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ProductCard({ product, locale, priority = false }: { product: StoreProduct; locale: Locale; priority?: boolean }) {
  const t = getDictionary(locale);
  const image = product.images[0];
  const amounts = priceAmounts(product);
  const reference = product.facets.reference;
  const inStock = product.availability === "in_stock";

  return (
    <div className="group relative">
      <Link href={localePath(locale, `/products/${product.slug}`)} className="block">
        <div className="relative aspect-[4/5] overflow-hidden border border-border/60 bg-white">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading={priority ? "eager" : "lazy"}
            className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-6"
          />
          <div className="absolute bottom-3 left-3 flex gap-1.5 text-[10px] font-medium tracking-[0.1em] uppercase">
            {product.condition === "new" && <span className="bg-emerald-700 px-2 py-1 text-white">{t.product.condition.new}</span>}
            <span className={cn("px-2 py-1", inStock ? "bg-foreground text-white" : "bg-[var(--ivory)] text-foreground")}>
              {t.availability[product.availability]}
            </span>
          </div>
        </div>
        {product.showBrand && <p className="mt-4 text-xs tracking-[0.15em] text-[var(--gold)] uppercase">{product.brand}</p>}
        <h3 className={cn("line-clamp-2 text-base font-light", product.showBrand ? "mt-1" : "mt-4")}>{product.name}</h3>
        {reference && !product.name.includes(reference) && <p className="mt-0.5 text-xs text-muted-foreground">Ref. {reference}</p>}
        <Price amounts={amounts} locale={locale} className="mt-1 block text-sm text-foreground/80" />
      </Link>

      {/* Sibling of the card link (controls can't nest inside links). */}
      <WishlistButton
        item={{ slug: product.slug, title: product.title, image: image.url, usd: amounts.usd, eur: amounts.eur }}
        labels={{ add: t.ui.wishlistPage.add, remove: t.ui.wishlistPage.remove }}
        className="absolute top-1 right-1 text-foreground"
      />
    </div>
  );
}
