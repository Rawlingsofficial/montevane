"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { wishlist } from "@/lib/client-list-store";
import { cn } from "@/lib/utils";

export function WishlistCount({ href, label, className }: { href: string; label: string; className?: string }) {
  const count = wishlist.useItems().length;
  return (
    <Link href={href} aria-label={count ? `${label} (${count})` : label} className={cn("relative flex size-11 items-center justify-center transition-colors hover:text-[var(--gold)]", className)}>
      <Heart className="size-4" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute top-1.5 right-1 flex min-w-4 items-center justify-center rounded-full bg-[var(--gold)] px-1 text-[10px] leading-4 text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
