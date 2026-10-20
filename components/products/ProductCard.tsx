import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { contactLinks } from "@/lib/contact";
import type { ContactChannels, StoreProduct } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath, type Locale } from "@/lib/i18n";

export function ProductCard({
  product,
  channels,
  locale,
}: {
  product: StoreProduct;
  channels: ContactChannels;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const image = product.images[0];
  const item = `${product.brand} ${product.name}`;
  const quickContact = contactLinks(channels, fmt(t.product.message, { item }), fmt(t.product.subject, { item }))[0];
  const price = new Intl.NumberFormat(locale, { style: "currency", currency: product.currency, maximumFractionDigits: 0 });

  return (
    <div className="group relative">
      <Link href={localePath(locale, `/products/${product.slug}`)} className="block">
        <div className="relative aspect-square overflow-hidden bg-[var(--ivory)]">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {product.availability !== "in_stock" && (
            <span className="absolute top-4 left-4 bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.1em] text-foreground uppercase">
              {t.availability[product.availability]}
            </span>
          )}
        </div>
        <p className="mt-4 text-xs tracking-[0.15em] text-[var(--gold)] uppercase">{product.brand}</p>
        <h3 className="mt-1 text-base font-light">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{price.format(product.price)}</p>
      </Link>

      {quickContact && (
        // Sibling of the card link (links can't nest), laid over the photo.
        <a
          href={quickContact.href}
          target={quickContact.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={fmt(t.product.contactAbout, { channel: t.contact.channels[quickContact.method], item })}
          className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 px-2.5 py-1.5 text-[10px] font-medium tracking-[0.1em] text-foreground uppercase transition-colors hover:bg-[var(--gold)] lg:opacity-0 lg:group-hover:opacity-100"
        >
          <MessageCircle className="size-3.5" strokeWidth={1.5} />
          {t.contact.channels[quickContact.method]}
        </a>
      )}
    </div>
  );
}
