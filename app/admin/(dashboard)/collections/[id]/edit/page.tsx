import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CollectionForm } from "@/components/admin/CollectionForm";
import { eq } from "drizzle-orm";

import { db, schema } from "@/lib/db";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Edit Collection — Admin | Montévane",
};

export default async function EditCollectionPage({ params }: { params: Params }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const [collection] = await db.select().from(schema.collections).where(eq(schema.collections.id, id));

  if (!collection) notFound();

  return (
    <div>
      <h1 className="text-2xl">Edit Collection</h1>
      <div className="mt-8">
        <CollectionForm
          defaultValues={{
            id: collection.id,
            slug: collection.slug,
            name: collection.name,
            description: collection.description ?? "",
            cover_image_url: collection.coverImageUrl ?? "",
            featured: collection.featured,
          }}
        />
      </div>
    </div>
  );
}
