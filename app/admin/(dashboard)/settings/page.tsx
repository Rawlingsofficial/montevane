import type { Metadata } from "next";

import { AdminUsersList } from "@/components/admin/AdminUsersList";
import { CatalogListsForm } from "@/components/admin/CatalogListsForm";
import { StoreSettingsForm } from "@/components/admin/StoreSettingsForm";
import { asc, eq } from "drizzle-orm";

import { getAdmin } from "@/lib/auth";
import { getCatalogOptions } from "@/lib/data/admin";
import { db, schema } from "@/lib/db";

export const metadata: Metadata = {
  title: "Settings — Admin | Montévane",
};

export default async function AdminSettingsPage() {
  const [[settings], admins, admin, { brands, categories }] = await Promise.all([
    db.select().from(schema.storeSettings).where(eq(schema.storeSettings.id, 1)),
    db
      .select({ id: schema.admins.id, email: schema.admins.email, fullName: schema.admins.fullName })
      .from(schema.admins)
      .orderBy(asc(schema.admins.email)),
    getAdmin(),
    getCatalogOptions(),
  ]);

  return (
    <div>
      <h1 className="text-2xl">Settings</h1>

      <div className="mt-8">
        <StoreSettingsForm
          initial={{
            store_name: settings?.storeName ?? "Montévane",
            store_email: settings?.storeEmail ?? "",
            support_email: settings?.supportEmail ?? "",
            whatsapp_number: settings?.whatsappNumber ?? "",
            telegram_username: settings?.telegramUsername ?? "",
            signal_number: settings?.signalNumber ?? "",
            phone_number: settings?.phoneNumber ?? "",
            contact_email: settings?.contactEmail ?? "",
            newsletter_sender_email: settings?.newsletterSenderEmail ?? "",
          }}
        />
      </div>

      <div className="mt-12 max-w-xl">
        <h2 className="border-b border-border pb-3 text-sm font-medium tracking-[0.1em] uppercase">Admin Users</h2>
        <div className="pt-5">
          <AdminUsersList profiles={admins} currentUserId={admin?.id ?? ""} />
        </div>
      </div>

      <div className="mt-12 max-w-xl">
        <CatalogListsForm categories={categories} brands={brands} />
      </div>
    </div>
  );
}
