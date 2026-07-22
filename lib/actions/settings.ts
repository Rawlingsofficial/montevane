"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type StoreSettingsInput = {
  store_name: string;
  store_email: string;
  support_email: string;
  whatsapp_number: string;
  newsletter_sender_email: string;
};

export async function updateStoreSettings(input: StoreSettingsInput): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("store_settings")
    .update({
      store_name: input.store_name || "Montévane",
      store_email: input.store_email || null,
      support_email: input.support_email || null,
      whatsapp_number: input.whatsapp_number || null,
      newsletter_sender_email: input.newsletter_sender_email || null,
    })
    .eq("id", 1);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/settings");
  return {};
}
