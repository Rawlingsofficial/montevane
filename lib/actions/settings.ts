"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { isInternationalPhone } from "@/lib/phone";

export type StoreSettingsInput = {
  store_name: string;
  store_email: string;
  support_email: string;
  whatsapp_numbers: { label: string; number: string }[];
  telegram_username: string;
  signal_number: string;
  phone_number: string;
  contact_email: string;
  tiktok_url: string;
  instagram_url: string;
  facebook_url: string;
  pinterest_url: string;
  owner_name: string;
  owner_title: string;
  google_review_url: string;
  newsletter_sender_email: string;
};

/** Accepts a full profile URL or just a handle ("@montevane"). */
function profileUrl(value: string, base: string): string | null {
  const v = value.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  if (/^(www\.)?[a-z]+\.com\//i.test(v)) return `https://${v}`;
  return base + v.replace(/^@/, "");
}

export async function updateStoreSettings(input: StoreSettingsInput): Promise<{ error?: string }> {
  await requireAdmin();

  const lines = input.whatsapp_numbers
    .map((l) => ({ label: l.label.trim(), number: l.number.trim() }))
    .filter((l) => l.number);
  const bad = lines.find((l) => !isInternationalPhone(l.number));
  if (bad) return { error: `WhatsApp number "${bad.number}" needs the country code, e.g. +44 7700 900123.` };

  const values = {
    storeName: input.store_name || "Montévane",
    storeEmail: input.store_email || null,
    supportEmail: input.support_email || null,
    whatsappNumbers: lines.map((l, i) => ({ label: l.label || (i === 0 ? "WhatsApp" : `WhatsApp ${i + 1}`), number: l.number })),
    whatsappNumber: lines[0]?.number ?? null,
    telegramUsername: input.telegram_username.replace(/^@/, "") || null,
    signalNumber: input.signal_number || null,
    phoneNumber: input.phone_number || null,
    contactEmail: input.contact_email || null,
    tiktokUrl: profileUrl(input.tiktok_url, "https://www.tiktok.com/@"),
    instagramUrl: profileUrl(input.instagram_url, "https://www.instagram.com/"),
    facebookUrl: profileUrl(input.facebook_url, "https://www.facebook.com/"),
    pinterestUrl: profileUrl(input.pinterest_url, "https://www.pinterest.com/"),
    ownerName: input.owner_name.trim() || null,
    ownerTitle: input.owner_title.trim() || null,
    googleReviewUrl: input.google_review_url.trim() || null,
    newsletterSenderEmail: input.newsletter_sender_email || null,
  };

  await db
    .insert(schema.storeSettings)
    .values({ id: 1, ...values })
    .onConflictDoUpdate({ target: schema.storeSettings.id, set: values });

  // Contact channels appear on every storefront page.
  revalidatePath("/[locale]", "layout");
  return {};
}
