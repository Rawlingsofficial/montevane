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
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-10">{children}</main>
    </div>
  );
}
