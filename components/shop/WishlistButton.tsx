"use client";

import { Heart } from "lucide-react";

import { wishlist, type SavedItem } from "@/lib/client-list-store";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function WishlistButton({ item, labels, className }: { item: SavedItem; labels: { add: string; remove: string }; className?: string }) {
  const saved = wishlist.useItems().some((i) => i.slug === item.slug);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? labels.remove : labels.add}
      title={saved ? labels.remove : labels.add}
      onClick={() => {
        wishlist.toggle(item);
        if (!saved) track("add_to_wishlist", { item_id: item.slug });
      }}
      className={cn("flex size-11 items-center justify-center transition-colors hover:text-[var(--gold)]", className)}
    >
      <Heart className={cn("size-[18px]", saved && "fill-current text-[var(--gold)]")} strokeWidth={1.5} />
    </button>
  );
}
