import Link from "next/link";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders — Admin | Montévane",
};

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"] as const;
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

type SearchParams = Promise<{ status?: string }>;

export default async function AdminOrdersPage({ searchParams }: { searchParams: SearchParams }) {
  const { status } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select("id, order_number, user_name, user_email, total, status, created_at")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data: orders } = await query;

  return (
    <div>
      <h1 className="text-2xl">Orders</h1>

      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
        <FilterPill href="/admin/orders" active={!status} label="All" />
        {STATUSES.map((s) => (
          <FilterPill key={s} href={`/admin/orders?status=${s}`} active={status === s} label={s} />
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-[0.1em] text-muted-foreground uppercase">
              <th className="py-3 font-medium">Order</th>
              <th className="py-3 font-medium">Customer</th>
              <th className="py-3 font-medium">Total</th>
              <th className="py-3 font-medium">Status</th>
              <th className="py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-3">
                    <Link href={`/admin/orders/${order.id}`} className="hover:text-[var(--gold)]">
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {order.user_name} <span className="text-xs">({order.user_email})</span>
                  </td>
                  <td className="py-3">{currency.format(order.total)}</td>
                  <td className="py-3 text-xs tracking-[0.05em] uppercase">{order.status}</td>
                  <td className="py-3 text-muted-foreground">{dateFormatter.format(new Date(order.created_at))}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-muted-foreground">
                  No orders yet — orders will appear here once checkout is live.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1.5 text-xs font-medium tracking-[0.1em] capitalize transition-colors",
        active ? "bg-foreground text-background" : "bg-transparent text-foreground/60 hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
