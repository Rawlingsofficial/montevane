"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/** Long intro text: clamped on phones with a "Read more" toggle, always full on desktop. */
export function Expandable({ children, more, less, className }: { children: React.ReactNode; more: string; less: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <div className={cn(!open && "max-lg:line-clamp-2")}>{children}</div>
      <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="mt-2 min-h-11 text-xs tracking-[0.15em] uppercase underline underline-offset-4 lg:hidden">
        {open ? less : more}
      </button>
    </div>
  );
}
