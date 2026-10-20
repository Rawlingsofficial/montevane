import Link from "next/link";
import type { Metadata } from "next";
import { Pencil, Plus } from "lucide-react";

import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { desc } from "drizzle-orm";

import { db, schema } from "@/lib/db";

export const metadata: Metadata = {
  title: "Products — Admin | Montévane",
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default async function AdminProductsPage() {
  const p = schema.products;
  const products = await db
    .select({
      id: p.id,
      name: p.name,
      brand_slug: p.brandSlug,
      sku: p.sku,
      price: p.price,
      status: p.status,
      availability_status: p.availabilityStatus,
    })
    .from(p)
    .orderBy(desc(p.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-medium tracking-[0.15em] text-primary-foreground uppercase hover:bg-[var(--gold)] hover:text-primary"
        >
          <Plus className="size-3.5" />
          New Product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-[0.1em] text-muted-foreground uppercase">
              <th className="py-3 font-medium">Name</th>
              <th className="py-3 font-medium">Brand</th>
              <th className="py-3 font-medium">SKU</th>
              <th className="py-3 font-medium">Price</th>
              <th className="py-3 font-medium">Availability</th>
              <th className="py-3 font-medium">Status</th>
              <th className="py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="py-3">{product.name}</td>
                  <td className="py-3 text-muted-foreground">{product.brand_slug}</td>
                  <td className="py-3 text-muted-foreground">{product.sku}</td>
                  <td className="py-3">{currency.format(product.price)}</td>
                  <td className="py-3 text-xs tracking-[0.05em] text-muted-foreground uppercase">
                    {product.availability_status.replace("_", " ")}
                  </td>
                  <td className="py-3 text-xs tracking-[0.05em] uppercase">{product.status}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        aria-label={`Edit ${product.name}`}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="size-4" strokeWidth={1.5} />
                      </Link>
                      <DeleteProductButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center text-muted-foreground">
                  No products yet — create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
