"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

/**
 * The purchase request as a panel over the product: a sheet from the bottom
 * on phones, a centred card on larger screens. Every "#inquire" link on the
 * page (Buy now, the sticky bar) opens it.
 */
export function BuyNowPanel({ closeLabel, children }: { closeLabel: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => {
      const d = ref.current;
      if (d && !d.open) d.showModal();
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href="#inquire"]');
      if (!a) return;
      e.preventDefault();
      open();
    };
    document.addEventListener("click", onClick);
    if (window.location.hash === "#inquire") open();
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={ref}
      id="inquire"
      aria-labelledby="inquire-title"
      onClick={(e) => {
        // A click on the backdrop (the dialog element itself) closes it.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto bg-white p-0 text-foreground backdrop:bg-black/50 sm:m-auto sm:max-w-xl"
    >
      <div className="relative px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-8">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={closeLabel}
          className="absolute top-3 right-3 flex size-11 items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
