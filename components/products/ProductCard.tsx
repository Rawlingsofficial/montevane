"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { AssetImage } from "@/components/common/AssetImage";
import type { Product } from "@/lib/constants";
import { productImage } from "@/lib/images";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden">
        <AssetImage
          base={productImage(product.slug)}
          alt={`${product.brand} ${product.name}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="aspect-square transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {product.availability !== "In Stock" && (
          <span className="absolute top-4 left-4 bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.1em] text-foreground uppercase">
            {product.availability}
          </span>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute top-4 right-4 rounded-full bg-white/90 p-2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="size-4 text-foreground" />
        </button>
      </div>
      <p className="mt-4 text-xs tracking-[0.15em] text-[var(--gold)] uppercase">{product.brand}</p>
      <h3 className="mt-1 text-base font-light">{product.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{currency.format(product.price)}</p>
    </Link>
  );
}
