import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import "../globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContactChannels } from "@/lib/data/catalog";
import { cormorant, inter } from "@/lib/fonts";
import { LOCALES, getDictionary, isLocale, siteUrl } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/seo/metadata";
import { organizationLd, websiteLd } from "@/lib/seo/structured-data";

export const dynamicParams = false;

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

  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} channels={channels} />
        <JsonLd data={[organizationLd(channels), websiteLd(locale)]} />
      </body>
    </html>
  );
}
