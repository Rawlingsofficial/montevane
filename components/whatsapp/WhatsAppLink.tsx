"use client";

import { useEffect, useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { waHref } from "@/lib/whatsapp";

export type WhatsAppLine = { label: string; number: string };

/**
 * Opens WhatsApp with a pre-filled message. One number: a plain link. Several:
 * a short list to pick from. Every click is sent to GA4 as `whatsapp_click`.
 */
export function WhatsAppLink({
  lines,
  message,
  location,
  itemId,
  chooseLabel,
  className,
  menuClassName,
  children,
  ariaLabel,
}: {
  lines: WhatsAppLine[];
  message: string;
  /** Where the click happened, e.g. "header", "product", "float". */
  location: string;
  itemId?: string;
  chooseLabel: string;
  className?: string;
  /** Position of the number list, e.g. "bottom-full right-0 mb-2". */
  menuClassName?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  if (!lines.length) return null;
  const onClick = (line: WhatsAppLine) => track("whatsapp_click", { location, item_id: itemId, line: line.label });

  if (lines.length === 1) {
    return (
      <a href={waHref(lines[0].number, message)} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} onClick={() => onClick(lines[0])} className={className}>
        {children}
      </a>
    );
  }

  return (
    <div ref={box} className="relative inline-flex">
      <button type="button" aria-expanded={open} aria-haspopup="true" aria-label={ariaLabel} onClick={() => setOpen((v) => !v)} className={className}>
        {children}
      </button>
      {open && (
        <div className={cn("absolute z-50 min-w-56 border border-border bg-white py-2 text-left text-foreground shadow-lg", menuClassName ?? "top-full left-0 mt-2")}>
          <p className="px-4 pt-1 pb-2 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">{chooseLabel}</p>
          {lines.map((line) => (
            <a
              key={line.number}
              href={waHref(line.number, message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onClick(line);
                setOpen(false);
              }}
              className="flex min-h-11 items-center justify-between gap-6 px-4 text-sm normal-case tracking-normal hover:bg-[var(--ivory)]"
            >
              <span>{line.label}</span>
              <span className="text-muted-foreground">{line.number}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
