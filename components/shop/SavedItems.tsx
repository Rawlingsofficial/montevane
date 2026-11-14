"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";

import { Price } from "@/components/common/Price";
import { recentlyViewed, wishlist, type SavedItem } from "@/lib/client-list-store";
import { localePath, type Locale } from "@/lib/i18n/config";

function Grid({ items, locale, onRemove, removeLabel }: { items: SavedItem[]; locale: Locale; onRemove?: (slug: string) => void; removeLabel?: string }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.slug} className="relative">
          <Link href={localePath(locale, `/products/${item.slug}`)} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-white">
              {item.image && (
                <Image src={item.image} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
              )}
            </div>
            <p className="mt-3 line-clamp-2 text-sm font-light">{item.title}</p>
            <Price amounts={{ usd: item.usd, eur: item.eur, usdWas: null, eurWas: null }} locale={locale} className="mt-1 block text-sm text-muted-foreground" />
          </Link>
          {onRemove && (
            <button type="button" aria-label={removeLabel} onClick={() => onRemove(item.slug)} className="absolute top-1 right-1 flex size-11 items-center justify-center bg-white/80 hover:text-[var(--gold)]">
              <X className="size-4" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export function WishlistItems({ locale, labels }: { locale: Locale; labels: { empty: string; remove: string; browse: string } }) {
  const items = wishlist.useItems();
  if (!items.length)
    return (
      <div>
        <p className="text-base text-muted-foreground">{labels.empty}</p>
        <Link href={localePath(locale, "/products")} className="mt-6 inline-block border border-foreground px-6 py-3 text-xs font-medium tracking-[0.15em] uppercase hover:bg-foreground hover:text-background">
          {labels.browse}
        </Link>
      </div>
    );
  return <Grid items={items} locale={locale} onRemove={wishlist.remove} removeLabel={labels.remove} />;
}

/** Records this product as viewed and shows the others (product pages). */
export function RecentlyViewed({ current, locale, title }: { current: SavedItem; locale: Locale; title: string }) {
  const items = recentlyViewed.useItems().filter((i) => i.slug !== current.slug).slice(0, 8);
  return (
    <>
      <RecordView item={current} />
      {items.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 text-2xl">{title}</h2>
          <Grid items={items} locale={locale} />
        </section>
      )}
    </>
  );
}

function RecordView({ item }: { item: SavedItem }) {
  useEffect(() => recentlyViewed.add(item), [item]);
  return null;
}
