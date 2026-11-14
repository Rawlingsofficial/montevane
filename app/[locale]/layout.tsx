import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import "../globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CURRENCY_SCRIPT } from "@/components/common/CurrencySwitch";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppFloat } from "@/components/whatsapp/WhatsAppFloat";
import { getContactChannels } from "@/lib/data/catalog";
import { cormorant, inter } from "@/lib/fonts";
import { LOCALES, getDictionary, isLocale, siteUrl } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/seo/metadata";
import { organizationLd, websiteLd } from "@/lib/seo/structured-data";

// Unknown locales 404 in the layout itself (isLocale check), so child routes
// can still render products, pages 2+ etc. on demand (dynamicParams default).

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#ffffff" };

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t.meta.homeTitle, template: `%s | ${SITE_NAME}` },
    description: t.meta.homeDescription,
    applicationName: SITE_NAME,
    formatDetection: { telephone: false },
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION || "Hk2M437j8uWOxaoymiYUTvjDhKauQHpzwZxYs342Qoo" },
  };
}

export default async function StoreLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const channels = await getContactChannels();
  const t = getDictionary(locale);

  return (
    // data-currency: German visitors default to EUR; a saved choice wins (script below, before paint).
    <html
      lang={locale}
      data-currency={locale === "de" ? "EUR" : "USD"}
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} h-full scroll-pt-20 antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Script id="currency" strategy="beforeInteractive">
          {CURRENCY_SCRIPT}
        </Script>
        <Navbar locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} channels={channels} />
        <WhatsAppFloat lines={channels.whatsappLines} message={t.ui.wa.global} label={t.ui.wa.float} chooseLabel={t.ui.wa.choose} />
        <JsonLd data={[organizationLd(channels), websiteLd(locale)]} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
