"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { localePath, stripLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type NavLink = { label: string; href: string };

export function NavbarClient({
  locale,
  left,
  right,
  extra,
  homeHref,
  labels,
  languages,
}: {
  locale: Locale;
  left: NavLink[];
  right: NavLink[];
  extra: NavLink[];
  homeHref: string;
  labels: { open: string; close: string; home: string; language: string };
  languages: { locale: Locale; label: string }[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || mobileOpen;
  const tone = solid ? "text-foreground" : "text-white";
  const linkClass = cn(
    "text-xs font-medium tracking-[0.15em] uppercase whitespace-nowrap transition-colors hover:text-[var(--gold)]",
    tone
  );
  // Same page in another language.
  const basePath = stripLocale(pathname);

  const switcher = (
    <nav aria-label={labels.language} className="flex items-center gap-3">
      {languages.map((l) => (
        <Link
          key={l.locale}
          href={localePath(l.locale, basePath)}
          hrefLang={l.locale}
          aria-current={l.locale === locale ? "true" : undefined}
          title={l.label}
          className={cn(linkClass, "text-[11px]", l.locale === locale ? "underline underline-offset-4" : "opacity-70")}
        >
          {l.locale.toUpperCase()}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "bg-white/95 shadow-[0_1px_0_0_var(--border)] backdrop-blur-sm" : "bg-transparent"
      )}
    >
      {/* Mobile bar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:hidden">
        <button
          type="button"
          aria-label={mobileOpen ? labels.close : labels.open}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="-m-2 p-2"
        >
          {mobileOpen ? <X className={cn("size-5", tone)} /> : <Menu className={cn("size-5", tone)} />}
        </button>

        <Link href={homeHref} aria-label={labels.home}>
          <Logo light={!solid} height={20} />
        </Link>

        {switcher}
      </div>

      {/* Desktop bar */}
      <div className="mx-auto hidden h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-10 lg:grid">
        <nav className="flex gap-8 justify-self-start">
          {left.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href={homeHref} aria-label={labels.home} className="justify-self-center">
          <Logo light={!solid} height={24} />
        </Link>

        <div className="flex items-center gap-8 justify-self-end">
          <nav className="flex gap-8">
            {right.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>
          {switcher}
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-white px-6 py-4 lg:hidden">
          {[...left, ...right, ...extra].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 text-sm tracking-[0.1em] text-foreground uppercase"
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
