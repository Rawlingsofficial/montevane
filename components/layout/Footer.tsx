import Image from "next/image";
import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";
import { PaymentMethods } from "@/components/common/PaymentMethods";
import { SubscribeForm } from "@/components/common/SubscribeForm";
import { SITE_NAME, STORE_LOCATIONS, cityLine } from "@/lib/constants";
import { getCategories, type ContactChannels } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { LOGO } from "@/lib/images";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.14-1.42V15.5a4.5 4.5 0 1 1-3.87-4.46v2.62a1.88 1.88 0 1 0 1.37 1.84V2h2.5a4.28 4.28 0 0 0 3.14 3.66v.16Z" />
    </svg>
  );
}

export async function Footer({ locale, channels }: { locale: Locale; channels: ContactChannels }) {
  const t = getDictionary(locale);
  const href = (path: string) => localePath(locale, path);
  // Only categories with products in stock (bag organizers live under the brands).
  const categories = (await getCategories()).filter((c) => c.slug !== "bag-organizers");

  const navigate = [
    ...categories.map((c) => ({ label: t.categories[c.slug]?.title ?? c.name, href: href(`/shop/${c.slug}`) })),
    { label: t.nav.brands, href: href("/brands") },
    { label: t.nav.collections, href: href("/collections") },
    { label: t.nav.journal, href: href("/journal") },
  ];
  const care = [
    { label: t.nav.contact, href: href("/contact") },
    { label: t.nav.authenticity, href: href("/authenticity") },
    { label: t.nav.payment, href: href("/payment-shipping") },
    { label: t.nav.about, href: href("/about") },
    { label: t.nav.privacy, href: href("/privacy") },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0d0d0d] text-white/70">
      <AssetImage base="footer_bg" alt="" className="absolute inset-0 opacity-30" sizes="100vw" />
      <div className="absolute inset-0 bg-[#0d0d0d]/70" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div id="newsletter" className="mb-16 grid scroll-mt-24 gap-10 border-b border-white/10 pb-16 lg:grid-cols-2 lg:items-center">
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
            <div className="mt-4 space-y-5">
              {STORE_LOCATIONS.map((l) => (
                <div key={l.city}>
                  <address className="font-heading text-lg leading-snug font-light text-white/80 not-italic">
                    {SITE_NAME} {l.city}
                    <br />
                    {l.street}
                    <br />
                    {cityLine(l)}
                  </address>
                  <a
                    href={l.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block text-sm underline-offset-4 transition-colors hover:text-[var(--gold)] hover:underline"
                  >
                    {t.footer.directions}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-6 border-t border-white/10 pt-8">
          <PaymentMethods label={t.ui.weAccept} tone="dark" />
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {SITE_NAME}. {t.footer.rights}
          </p>
        </div>
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
