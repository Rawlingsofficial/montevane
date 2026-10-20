import Link from "next/link";
import type { Metadata } from "next";

import { count, desc, sql } from "drizzle-orm";

import { db, schema } from "@/lib/db";

export const metadata: Metadata = {
  title: "Dashboard — Admin | Montévane",
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default async function AdminDashboardPage() {
  const p = schema.products;
  const [[counts], recent] = await Promise.all([
    db
      .select({
        total: count(),
        published: count(sql`case when ${p.status} = 'published' then 1 end`),
        draft: count(sql`case when ${p.status} = 'draft' then 1 end`),
        preOrder: count(sql`case when ${p.availabilityStatus} = 'pre_order' then 1 end`),
        soldOut: count(sql`case when ${p.availabilityStatus} = 'sold_out' then 1 end`),
      })
      .from(p),
    db
      .select({ id: p.id, name: p.name, brand_slug: p.brandSlug, price: p.price, status: p.status })
      .from(p)
      .orderBy(desc(p.createdAt))
      .limit(5),
  ]);
  const { total, published, draft, preOrder, soldOut } = counts;

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
