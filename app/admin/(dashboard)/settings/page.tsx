import type { Metadata } from "next";

import { AdminUsersList } from "@/components/admin/AdminUsersList";
import { StoreSettingsForm } from "@/components/admin/StoreSettingsForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Settings — Admin | Montévane",
};

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const [{ data: settings }, { data: profiles }, {
    data: { user },
  }] = await Promise.all([
    supabase.from("store_settings").select("*").eq("id", 1).single(),
    supabase.from("profiles").select("id, email, full_name").order("email"),
    supabase.auth.getUser(),
  ]);

  return (
    <div>
      <h1 className="text-2xl">Settings</h1>

      <div className="mt-8">
        <StoreSettingsForm
          initial={{
            store_name: settings?.store_name ?? "Montévane",
            store_email: settings?.store_email ?? "",
            support_email: settings?.support_email ?? "",
            whatsapp_number: settings?.whatsapp_number ?? "",
            newsletter_sender_email: settings?.newsletter_sender_email ?? "",
          }}
        />
      </div>

      <div className="mt-12 max-w-xl">
        <h2 className="border-b border-border pb-3 text-sm font-medium tracking-[0.1em] uppercase">Admin Users</h2>
        <div className="pt-5">
          <AdminUsersList profiles={profiles ?? []} currentUserId={user?.id ?? ""} />
        </div>
      </div>

      <p className="mt-12 max-w-xl text-xs text-muted-foreground">
        Payment and shipping configuration aren&apos;t shown here yet — there&apos;s no
        Stripe or shipping integration wired up, so those settings wouldn&apos;t do
        anything until that&apos;s built.
      </p>
    </div>
  );
}
