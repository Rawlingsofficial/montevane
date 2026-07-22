"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_0_0_var(--border)]" : "bg-transparent"
      )}
    >
      {/* Mobile bar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:hidden">
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className={cn("size-5", solid ? "text-foreground" : "text-white")} />
          ) : (
            <Menu className={cn("size-5", solid ? "text-foreground" : "text-white")} />
          )}
        </button>

        <Link href="/" aria-label="Montévane — home">
          <Logo light={!solid} height={20} />
        </Link>

        <div className="flex items-center gap-4">
          <Search className={cn("size-[18px] cursor-pointer", solid ? "text-foreground" : "text-white")} />
          <ShoppingBag className={cn("size-[18px] cursor-pointer", solid ? "text-foreground" : "text-white")} />
        </div>
      </div>

      {/* Desktop bar */}
      <div className="mx-auto hidden h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-10 lg:grid">
        <nav className="flex justify-self-start gap-8">
          {NAV_LINKS.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-medium tracking-[0.15em] uppercase transition-colors hover:text-[var(--gold)] whitespace-nowrap",
                solid ? "text-foreground" : "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" aria-label="Montévane — home" className="justify-self-center">
          <Logo light={!solid} height={24} />
        </Link>

        <div className="flex items-center justify-self-end gap-8">
          <nav className="flex gap-8">
            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-medium tracking-[0.15em] uppercase transition-colors hover:text-[var(--gold)] whitespace-nowrap",
                  solid ? "text-foreground" : "text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Search className={cn("size-[18px] cursor-pointer", solid ? "text-foreground" : "text-white")} />
            <Heart className={cn("size-[18px] cursor-pointer", solid ? "text-foreground" : "text-white")} />
            <User className={cn("size-[18px] cursor-pointer", solid ? "text-foreground" : "text-white")} />
            <ShoppingBag className={cn("size-[18px] cursor-pointer", solid ? "text-foreground" : "text-white")} />
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-white px-6 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 text-sm tracking-[0.1em] uppercase text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
