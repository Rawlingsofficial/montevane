"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { db, schema } from "@/lib/db";

export type StoreSettingsInput = {
  store_name: string;
  store_email: string;
  support_email: string;
  whatsapp_number: string;
  telegram_username: string;
  signal_number: string;
  phone_number: string;
  contact_email: string;
  tiktok_url: string;
  newsletter_sender_email: string;
};

/** Accepts a full profile URL or just a handle ("@montevane"). */
function tiktokUrl(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  return `https://www.tiktok.com/@${v.replace(/^@/, "")}`;
}

export async function updateStoreSettings(input: StoreSettingsInput): Promise<{ error?: string }> {
  await requireAdmin();

  const values = {
    storeName: input.store_name || "Montévane",
    storeEmail: input.store_email || null,
    supportEmail: input.support_email || null,
    whatsappNumber: input.whatsapp_number || null,
    telegramUsername: input.telegram_username.replace(/^@/, "") || null,
    signalNumber: input.signal_number || null,
    phoneNumber: input.phone_number || null,
    contactEmail: input.contact_email || null,
    tiktokUrl: tiktokUrl(input.tiktok_url),
    newsletterSenderEmail: input.newsletter_sender_email || null,
  };

  await db
    .insert(schema.storeSettings)
    .values({ id: 1, ...values })
    .onConflictDoUpdate({ target: schema.storeSettings.id, set: values });

  // Contact channels appear on every storefront page.
  revalidatePath("/", "layout");
  return {};
}
