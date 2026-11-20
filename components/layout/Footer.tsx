import { SELL } from "@/lib/i18n/dictionaries/sell";
import Image from "next/image";
import Link from "next/link";

import { PaymentMethods } from "@/components/common/PaymentMethods";
import { SubscribeForm } from "@/components/common/SubscribeForm";
import { SHOWN_LOCATIONS, SITE_NAME, cityLine } from "@/lib/constants";
import { getCategories, type ContactChannels } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { LOGO } from "@/lib/images";

const ICON = "size-[18px]";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON} aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.14-1.42V15.5a4.5 4.5 0 1 1-3.87-4.46v2.62a1.88 1.88 0 1 0 1.37 1.84V2h2.5a4.28 4.28 0 0 0 3.14 3.66v.16Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={ICON} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON} aria-hidden="true">
      <path d="M13.5 21.5v-8h2.7l.4-3.2h-3.1V8.3c0-.9.3-1.5 1.6-1.5h1.6V3.9a22 22 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.4H7.6v3.2h2.7v8h3.2Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={ICON} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.64 19.31c-.09-.79-.17-2 .04-2.86l1.17-4.96s-.3-.6-.3-1.48c0-1.39.8-2.42 1.8-2.42.85 0 1.26.64 1.26 1.4 0 .85-.54 2.12-.82 3.3-.24.99.5 1.8 1.47 1.8 1.77 0 3.13-1.87 3.13-4.56 0-2.38-1.71-4.05-4.16-4.05-2.83 0-4.5 2.13-4.5 4.33 0 .86.33 1.78.74 2.28.08.1.1.19.07.29l-.27 1.13c-.05.18-.15.22-.34.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.22-5.19 6.22-1.01 0-1.97-.53-2.3-1.15l-.62 2.38c-.23.87-.84 1.96-1.25 2.62A10 10 0 1 0 12 2Z" />
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
    { label: SELL[locale].nav, href: href("/sell") },
    { label: t.nav.about, href: href("/about") },
    { label: t.nav.privacy, href: href("/privacy") },
  ];

  const socials = [
    { label: "Instagram", url: channels.instagram, Icon: InstagramIcon },
    { label: "Facebook", url: channels.facebook, Icon: FacebookIcon },
    { label: "Pinterest", url: channels.pinterest, Icon: PinterestIcon },
    { label: "TikTok", url: channels.tiktok, Icon: TikTokIcon },
  ].filter((s): s is typeof s & { url: string } => !!s.url);

  return (
    <footer className="relative overflow-hidden bg-[#0d0d0d] text-white/70">
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
                href={`sms:${channels.phone.replace(/[^\d+]/g, "")}`}
                className="mt-5 block text-sm text-white/80 transition-colors hover:text-[var(--gold)]"
              >
                {channels.phone}
              </a>
            )}
            {channels.email && (
              <a
                href={`mailto:${channels.email}`}
                className="mt-1.5 block text-sm text-white/80 transition-colors hover:text-[var(--gold)]"
              >
                {channels.email}
              </a>
            )}
            {socials.length > 0 && (
              <div className="mt-5 flex items-center gap-4">
                {socials.map(({ label, url, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 transition-colors hover:text-[var(--gold)]"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          <FooterList title={t.footer.navigate} links={navigate} />
          <FooterList title={t.footer.care} links={care} />
          <div>
            <p className="text-xs tracking-[0.15em] text-white/60 uppercase">{t.footer.locations}</p>
            <div className="mt-4 space-y-5">
              {SHOWN_LOCATIONS.map((l) => (
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
