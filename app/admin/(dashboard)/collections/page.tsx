import Link from "next/link";
import type { Metadata } from "next";
import { Pencil, Plus } from "lucide-react";

import { DeleteCollectionButton } from "@/components/admin/DeleteCollectionButton";
import { asc, count, eq } from "drizzle-orm";

import { db, schema } from "@/lib/db";

export const metadata: Metadata = {
  title: "Collections — Admin | Montévane",
};

export default async function AdminCollectionsPage() {
  const c = schema.collections;
  const collections = await db
    .select({ id: c.id, slug: c.slug, name: c.name, featured: c.featured, productCount: count(schema.products.id) })
    .from(c)
    .leftJoin(schema.products, eq(schema.products.collectionSlug, c.slug))
    .groupBy(c.id)
    .orderBy(asc(c.name));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Collections</h1>
        <Link
          href="/admin/collections/new"
          className="flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-medium tracking-[0.15em] text-primary-foreground uppercase hover:bg-[var(--gold)] hover:text-primary"
        >
          <Plus className="size-3.5" />
          New Collection
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-[0.1em] text-muted-foreground uppercase">
              <th className="py-3 font-medium">Name</th>
              <th className="py-3 font-medium">Slug</th>
              <th className="py-3 font-medium">Products</th>
              <th className="py-3 font-medium">Featured</th>
              <th className="py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {collections && collections.length > 0 ? (
              collections.map((collection) => (
                <tr key={collection.id}>
                  <td className="py-3">{collection.name}</td>
                  <td className="py-3 text-muted-foreground">{collection.slug}</td>
                  <td className="py-3 text-muted-foreground">{collection.productCount}</td>
                  <td className="py-3 text-muted-foreground">{collection.featured ? "Yes" : "—"}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/collections/${collection.id}/edit`}
                        aria-label={`Edit ${collection.name}`}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="size-4" strokeWidth={1.5} />
                      </Link>
                      <DeleteCollectionButton id={collection.id} slug={collection.slug} name={collection.name} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-muted-foreground">
                  No collections yet — create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
