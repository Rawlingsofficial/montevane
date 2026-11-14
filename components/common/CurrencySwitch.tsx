"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

// The chosen currency lives on <html data-currency> (set before paint by the
// inline script in the layout) and in localStorage.

const KEY = "mv-currency";
const CURRENCIES = ["USD", "EUR"] as const;

const subscribe = (listener: () => void) => {
  window.addEventListener("mv-currency", listener);
  return () => window.removeEventListener("mv-currency", listener);
};
const current = () => document.documentElement.dataset.currency ?? "USD";

function applyCurrency(c: string) {
  document.documentElement.dataset.currency = c;
  try {
    localStorage.setItem(KEY, c);
  } catch {
    // Blocked storage: the choice lasts for this page.
  }
  window.dispatchEvent(new Event("mv-currency"));
}

export function CurrencySwitch({ label, fallback, className, itemClassName }: { label: string; fallback: string; className?: string; itemClassName?: string }) {
  const value = useSyncExternalStore(subscribe, current, () => fallback);
  return (
    <div role="group" aria-label={label} className={cn("flex items-center gap-1", className)}>
      {CURRENCIES.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={value === c}
          onClick={() => applyCurrency(c)}
          className={cn("flex min-h-11 min-w-9 items-center justify-center", itemClassName, value === c ? "underline underline-offset-4" : "opacity-70")}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

/** Runs in <head> before paint: applies the saved currency so prices never flicker. */
export const CURRENCY_SCRIPT = `try{var c=localStorage.getItem("${KEY}");if(c==="USD"||c==="EUR")document.documentElement.dataset.currency=c}catch(e){}`;
