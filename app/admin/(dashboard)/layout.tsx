import { redirect } from "next/navigation";

import { AdminNav } from "@/components/admin/AdminNav";
import { getAdmin } from "@/lib/auth";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdmin();

  // The proxy already redirects unauthenticated requests, but data should
  // never be fetched below without this Data Access Layer check as well.
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav email={admin.email} />
      <main className="flex-1 overflow-y-auto px-10 py-8">{children}</main>
    </div>
  );
}
