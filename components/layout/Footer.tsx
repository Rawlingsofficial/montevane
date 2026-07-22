import Image from "next/image";
import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { LOGO } from "@/lib/images";

const CUSTOMER_CARE = [
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.14-1.42V15.5a4.5 4.5 0 1 1-3.87-4.46v2.62a1.88 1.88 0 1 0 1.37 1.84V2h2.5a4.28 4.28 0 0 0 3.14 3.66v.16Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0d0d0d] text-white/70">
      <AssetImage base="footer_bg" alt="" className="absolute inset-0 opacity-30" sizes="100vw" />
      <div className="absolute inset-0 bg-[#0d0d0d]/70" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-16 grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-heading text-2xl font-light text-white">Join the House</h3>
            <p className="mt-2 max-w-md text-sm text-white/50">
              Early access to new arrivals, curated picks, and luxury insights.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-3 lg:ml-auto">
            <input
              type="email"
              placeholder="Email address"
              suppressHydrationWarning
              className="w-full border-b border-white/20 bg-transparent px-1 py-3 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 border-b border-[var(--gold)] px-2 text-xs tracking-[0.15em] text-[var(--gold)] uppercase"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Image
              src={LOGO.full}
              alt="Montévane"
              width={178}
              height={72}
              className="h-16 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm text-white/40">
              An independent luxury multi-brand boutique. Not affiliated with any fashion house.
            </p>
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-white/50 transition-colors hover:text-[var(--gold)]"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          </div>

          <div>
            <p className="text-xs tracking-[0.15em] text-white/40 uppercase">Navigate</p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-[var(--gold)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.15em] text-white/40 uppercase">Customer Care</p>
            <ul className="mt-4 space-y-2">
              {CUSTOMER_CARE.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-[var(--gold)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 text-xs text-white/30">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
