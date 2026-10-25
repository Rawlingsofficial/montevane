import Image from "next/image";
import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";
import { SubscribeForm } from "@/components/common/SubscribeForm";
import { SITE_NAME } from "@/lib/constants";
import type { ContactChannels } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { LOGO } from "@/lib/images";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.14-1.42V15.5a4.5 4.5 0 1 1-3.87-4.46v2.62a1.88 1.88 0 1 0 1.37 1.84V2h2.5a4.28 4.28 0 0 0 3.14 3.66v.16Z" />
    </svg>
  );
}

export function Footer({ locale, channels }: { locale: Locale; channels: ContactChannels }) {
  const t = getDictionary(locale);
  const href = (path: string) => localePath(locale, path);

  const navigate = [
    { label: t.nav.bags, href: href("/shop/bags") },
    { label: t.nav.watches, href: href("/shop/watches") },
    { label: t.nav.jewelry, href: href("/shop/jewelry") },
    { label: t.nav.brands, href: href("/brands") },
    { label: t.nav.collections, href: href("/collections") },
    { label: t.nav.journal, href: href("/journal") },
  ];
  const care = [
    { label: t.nav.contact, href: href("/contact") },
    { label: t.nav.payment, href: href("/payment-shipping") },
    { label: t.nav.about, href: href("/about") },
    { label: t.nav.privacy, href: href("/privacy") },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0d0d0d] text-white/70">
      <AssetImage base="footer_bg" alt="" className="absolute inset-0 opacity-30" sizes="100vw" />
      <div className="absolute inset-0 bg-[#0d0d0d]/70" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-16 grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-heading text-2xl font-light text-white">{t.home.newsletterTitle}</p>
            <p className="mt-2 max-w-md text-sm text-white/60">{t.home.newsletterBody}</p>
          </div>
          <SubscribeForm labels={t.newsletter} dark className="max-w-md lg:ml-auto" />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src={LOGO.full}
              alt={SITE_NAME}
              width={178}
              height={72}
              className="h-16 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm text-white/60">{t.footer.tagline}</p>
            {channels.phone && (
              <a
                href={`tel:${channels.phone.replace(/[^\d+]/g, "")}`}
                className="mt-5 block text-sm text-white/80 transition-colors hover:text-[var(--gold)]"
              >
                {channels.phone}
              </a>
            )}
            {channels.tiktok && (
              <a
                href={channels.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-white/60 transition-colors hover:text-[var(--gold)]"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
            )}
          </div>

          <FooterList title={t.footer.navigate} links={navigate} />
          <FooterList title={t.footer.care} links={care} />
          <div>
            <p className="text-xs tracking-[0.15em] text-white/60 uppercase">{t.footer.locations}</p>
            <ul className="mt-4 space-y-2">
              {t.footer.cities.map((city) => (
                <li key={city} className="font-heading text-lg font-light text-white/80">
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 text-xs text-white/50">
          © {new Date().getFullYear()} {SITE_NAME}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs tracking-[0.15em] text-white/60 uppercase">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm transition-colors hover:text-[var(--gold)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
