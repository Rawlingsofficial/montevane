"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { localePath, stripLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export type NavLink = { label: string; href: string };
export type MenuGroup = {
  id: string;
  label: string;
  items: NavLink[];
  viewAll: NavLink;
  /** Featured tile in the desktop panel. */
  image: string;
  /** Many items (watch brands): more columns. */
  wide?: boolean;
};
type Labels = {
  open: string;
  close: string;
  home: string;
  language: string;
  search: string;
  searchPlaceholder: string;
  searchSubmit: string;
  searchClose: string;
  seeAll: string;
};
type Suggestion = { title: string; href: string; image: string | null; price: string };

// Pages that open on a dark hero get a transparent header until scrolled;
// everywhere else it is solid, so the links never fade into a light page.
const NO_HERO = /^\/(products\/(?!page\/)[^/]+|journal\/[^/]+|privacy|search)(\/|$)/;

export function NavbarClient({
  locale,
  groups,
  right,
  extra,
  homeHref,
  searchAction,
  labels,
  languages,
}: {
  locale: Locale;
  groups: MenuGroup[];
  right: NavLink[];
  extra: NavLink[];
  homeHref: string;
  searchAction: string;
  labels: Labels;
  languages: { locale: Locale; label: string }[];
}) {
  const pathname = usePathname();
  const basePath = stripLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [hero, setHero] = useState(!NO_HERO.test(basePath));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close everything when the page changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenGroup(null);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Confirm the guess against the rendered page (404s have no hero either).
  useEffect(() => {
    const check = () => setHero(document.querySelector("[data-page-hero]") !== null);
    check();
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen && !openGroup && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      setOpenGroup(null);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, openGroup, searchOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const solid = scrolled || !hero || mobileOpen || openGroup !== null || searchOpen;
  const tone = solid ? "text-foreground" : "text-white";
  const linkClass = cn(
    "text-xs font-medium tracking-[0.15em] uppercase whitespace-nowrap transition-colors hover:text-[var(--gold)]",
    tone
  );
  const iconButton = cn("flex size-11 items-center justify-center transition-colors hover:text-[var(--gold)]", tone);

  const switcher = (className: string) => (
    <nav aria-label={labels.language} className="flex items-center gap-1">
      {languages.map((l) => (
        <Link
          key={l.locale}
          href={localePath(l.locale, basePath)}
          hrefLang={l.locale}
          aria-current={l.locale === locale ? "true" : undefined}
          title={l.label}
          className={cn(className, "flex min-h-11 min-w-9 items-center justify-center", l.locale === locale ? "underline underline-offset-4" : "opacity-70")}
        >
          {l.locale.toUpperCase()}
        </Link>
      ))}
    </nav>
  );

  const toggleSearch = () => {
    setSearchOpen((v) => !v);
    setOpenGroup(null);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "bg-white shadow-[0_1px_0_0_var(--border)]" : "bg-transparent"
      )}
    >
      {/* Mobile bar */}
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-3 lg:hidden">
        <button
          type="button"
          aria-label={mobileOpen ? labels.close : labels.open}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            setMobileOpen((v) => !v);
            setSearchOpen(false);
          }}
          className={cn(iconButton, "justify-self-start")}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link href={homeHref} aria-label={labels.home}>
          <Logo light={!solid} height={20} />
        </Link>

        <button
          type="button"
          aria-label={searchOpen ? labels.searchClose : labels.search}
          aria-expanded={searchOpen}
          onClick={toggleSearch}
          className={cn(iconButton, "justify-self-end")}
        >
          {searchOpen ? <X className="size-5" /> : <Search className="size-5" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Desktop bar */}
      <div className="mx-auto hidden h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-10 lg:grid">
        <nav className="flex h-full gap-8 justify-self-start">
          {groups.map((g) => (
            <div key={g.id} className="flex h-full items-center" onMouseEnter={() => setOpenGroup(g.id)} onMouseLeave={() => setOpenGroup(null)}>
              <button
                type="button"
                aria-expanded={openGroup === g.id}
                aria-controls={`menu-${g.id}`}
                onClick={() => setOpenGroup((o) => (o === g.id ? null : g.id))}
                className={cn(linkClass, "flex h-full items-center gap-1")}
              >
                {g.label}
                <ChevronDown className={cn("size-3 transition-transform", openGroup === g.id && "rotate-180")} />
              </button>
              {openGroup === g.id && <MegaPanel group={g} />}
            </div>
          ))}
        </nav>

        <Link href={homeHref} aria-label={labels.home} className="justify-self-center">
          <Logo light={!solid} height={24} />
        </Link>

        <div className="flex items-center gap-6 justify-self-end">
          <nav className="flex gap-6">
            {right.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button type="button" aria-label={searchOpen ? labels.searchClose : labels.search} aria-expanded={searchOpen} onClick={toggleSearch} className={iconButton}>
            {searchOpen ? <X className="size-4" /> : <Search className="size-4" strokeWidth={1.5} />}
          </button>
          {switcher(cn(linkClass, "text-[11px]"))}
        </div>
      </div>

      {searchOpen && <SearchPanel locale={locale} action={searchAction} labels={labels} />}

      {mobileOpen && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-white px-6 pb-8 lg:hidden">
          <ul className="divide-y divide-border">
            {groups.map((g) => {
              const open = mobileGroup === g.id;
              return (
                <li key={g.id}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`mobile-${g.id}`}
                    onClick={() => setMobileGroup(open ? null : g.id)}
                    className="flex min-h-12 w-full items-center justify-between text-sm tracking-[0.1em] uppercase"
                  >
                    {g.label}
                    <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
                  </button>
                  {open && (
                    <ul id={`mobile-${g.id}`} className="pb-3">
                      {g.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="flex min-h-11 items-center pl-4 text-base text-foreground/80">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href={g.viewAll.href} className="flex min-h-11 items-center pl-4 text-sm font-medium tracking-[0.1em] uppercase">
                          {g.viewAll.label} →
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              );
            })}
            {[...right, ...extra].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex min-h-12 items-center text-sm tracking-[0.1em] uppercase">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-3 text-sm">
            <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase">{labels.language}</span>
            {switcher("text-sm text-foreground")}
          </div>
        </div>
      )}
    </header>
  );
}

function MegaPanel({ group }: { group: MenuGroup }) {
  return (
    <div id={`menu-${group.id}`} className="absolute inset-x-0 top-full border-t border-border bg-white shadow-[0_12px_24px_-16px_rgba(0,0,0,0.25)]">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_320px] gap-12 px-10 py-10">
        <div>
          <p className="mb-4 text-[11px] font-medium tracking-[0.2em] text-[var(--gold)] uppercase">{group.label}</p>
          <ul className={cn("grid gap-x-8", group.wide ? "grid-cols-[repeat(4,minmax(0,190px))]" : "grid-cols-[repeat(2,minmax(0,220px))]")}>
            {group.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={group.viewAll.href}
            className="mt-6 inline-block text-xs font-medium tracking-[0.15em] text-foreground uppercase underline underline-offset-4 hover:text-[var(--gold)]"
          >
            {group.viewAll.label} →
          </Link>
        </div>
        <Link href={group.viewAll.href} tabIndex={-1} aria-hidden="true" className="group relative block aspect-[4/3] overflow-hidden bg-[var(--ivory)]">
          <Image src={group.image} alt="" fill sizes="320px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
      </div>
    </div>
  );
}

function SearchPanel({ locale, action, labels }: { locale: Locale; action: string; labels: Labels }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const term = q.trim();

  useEffect(() => input.current?.focus(), []);

  useEffect(() => {
    if (term.length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}&locale=${locale}`, { signal: controller.signal });
        if (res.ok) setResults((await res.json()).results);
      } catch {
        // Aborted or offline: keep the last suggestions.
      }
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [term, locale]);

  const shown = term.length >= 2 ? results : [];
  const all = `${action}?q=${encodeURIComponent(term)}`;

  return (
    <div className="border-t border-border bg-white">
      <form
        action={action}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (term) router.push(all);
        }}
        className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-3"
      >
        <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
        <label htmlFor="header-search" className="sr-only">
          {labels.search}
        </label>
        <input
          ref={input}
          id="header-search"
          type="search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.searchPlaceholder}
          autoComplete="off"
          enterKeyHint="search"
          className="min-h-11 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none"
        />
        <button type="submit" className="min-h-11 px-2 text-xs font-medium tracking-[0.15em] text-foreground uppercase hover:text-[var(--gold)]">
          {labels.searchSubmit}
        </button>
      </form>
      {shown.length > 0 && (
        <div className="mx-auto max-w-3xl px-6 pb-4">
          <ul className="divide-y divide-border border-t border-border">
            {shown.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="flex items-center gap-4 py-2.5 hover:bg-[var(--ivory)]">
                  <span className="relative size-12 shrink-0 overflow-hidden bg-[var(--ivory)]">
                    {s.image && <Image src={s.image} alt="" fill sizes="48px" className="object-cover" />}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">{s.title}</span>
                  <span className="shrink-0 text-sm text-muted-foreground">{s.price}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={all} className="mt-3 inline-block text-xs font-medium tracking-[0.15em] text-foreground uppercase underline underline-offset-4">
            {labels.seeAll} →
          </Link>
        </div>
      )}
    </div>
  );
}
