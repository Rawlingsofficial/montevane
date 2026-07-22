"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export function AddToCart({ disabled = false }: { disabled?: boolean }) {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="mt-8 flex gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setAdded(true)}
        className="flex-1 bg-primary px-6 py-4 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:hover:bg-muted disabled:hover:text-muted-foreground"
      >
        {disabled ? "Sold Out" : added ? "Added" : "Quick Add"}
      </button>
      <button
        type="button"
        aria-label="Add to wishlist"
        onClick={() => setWishlisted((v) => !v)}
        className="flex size-[52px] shrink-0 items-center justify-center border border-border transition-colors hover:border-foreground"
      >
        <Heart className={`size-4 ${wishlisted ? "fill-foreground text-foreground" : "text-foreground"}`} />
      </button>
    </div>
  );
}
