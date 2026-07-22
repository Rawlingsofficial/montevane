import Link from "next/link";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard — Admin | Montévane",
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: total }, { count: published }, { count: draft }, { count: preOrder }, { count: soldOut }, { data: recent }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("availability_status", "pre_order"),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("availability_status", "sold_out"),
      supabase
        .from("products")
        .select("id, name, brand_slug, price, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const stats = [
    { label: "Total Products", value: total ?? 0 },
    { label: "Published", value: published ?? 0 },
    { label: "Draft", value: draft ?? 0 },
    { label: "Pre-Order", value: preOrder ?? 0 },
    { label: "Sold Out", value: soldOut ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl">Dashboard</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border p-5">
            <p className="text-2xl font-light">{stat.value}</p>
            <p className="mt-1 text-xs tracking-[0.1em] text-muted-foreground uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg">Recent Uploads</h2>
        <Link href="/admin/products" className="text-xs font-medium tracking-[0.1em] text-[var(--gold)] uppercase">
          View All
        </Link>
      </div>

      <div className="mt-4 divide-y divide-border border-t border-b border-border">
        {recent && recent.length > 0 ? (
          recent.map((product) => (
            <Link
              key={product.id}
              href={`/admin/products/${product.id}/edit`}
              className="flex items-center justify-between py-3 text-sm hover:bg-muted"
            >
              <span>
                <span className="text-muted-foreground">{product.brand_slug}</span> — {product.name}
              </span>
              <span className="flex items-center gap-4">
                <span className="text-muted-foreground">{currency.format(product.price)}</span>
                <span className="text-xs tracking-[0.1em] uppercase">{product.status}</span>
              </span>
            </Link>
          ))
        ) : (
          <p className="py-6 text-sm text-muted-foreground">No products yet.</p>
        )}
      </div>
    </div>
  );
}
