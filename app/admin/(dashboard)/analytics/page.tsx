import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Analytics — Admin | Montévane",
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();

  const [{ data: orders }, { count: publishedCount }, { data: topProducts }] = await Promise.all([
    supabase
      .from("orders")
      .select("total, status, created_at")
      .not("status", "in", '("cancelled","refunded")'),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase
      .from("products")
      .select("id, name, brand_slug, view_count, wishlist_count")
      .order("view_count", { ascending: false })
      .limit(5),
  ]);

  const totalRevenue = (orders ?? []).reduce((sum, o) => sum + Number(o.total), 0);
  const totalOrders = orders?.length ?? 0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const months: { key: string; label: string; total: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: monthFormatter.format(d), total: 0 });
  }
  for (const order of orders ?? []) {
    const d = new Date(order.created_at);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = months.find((m) => m.key === key);
    if (bucket) bucket.total += Number(order.total);
  }
  const maxMonthTotal = Math.max(1, ...months.map((m) => m.total));

  const stats = [
    { label: "Total Revenue", value: currency.format(totalRevenue) },
    { label: "Total Orders", value: totalOrders },
    { label: "Average Order Value", value: currency.format(averageOrderValue) },
    { label: "Published Products", value: publishedCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl">Analytics</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border p-5">
            <p className="text-2xl font-light">{stat.value}</p>
            <p className="mt-1 text-xs tracking-[0.1em] text-muted-foreground uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg">Revenue by Month</h2>
        <div className="mt-5 space-y-3">
          {months.map((month) => (
            <div key={month.key} className="flex items-center gap-4">
              <span className="w-10 shrink-0 text-xs text-muted-foreground">{month.label}</span>
              <div className="h-3 flex-1 bg-muted">
                <div
                  className="h-3 max-h-6 rounded-r-sm bg-[var(--gold)]"
                  style={{ width: `${(month.total / maxMonthTotal) * 100}%` }}
                />
              </div>
              <span className="w-20 shrink-0 text-right text-xs text-muted-foreground">
                {currency.format(month.total)}
              </span>
            </div>
          ))}
        </div>
        {totalOrders === 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            No orders yet — this chart will populate once checkout is live.
          </p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-lg">Top Products</h2>
        <div className="mt-4 divide-y divide-border border-t border-b border-border">
          {topProducts && topProducts.length > 0 ? (
            topProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between py-3 text-sm">
                <span>
                  <span className="text-muted-foreground">{product.brand_slug}</span> — {product.name}
                </span>
                <span className="flex gap-6 text-xs text-muted-foreground uppercase">
                  <span>{product.view_count} views</span>
                  <span>{product.wishlist_count} wishlisted</span>
                </span>
              </div>
            ))
          ) : (
            <p className="py-6 text-sm text-muted-foreground">No product view data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
