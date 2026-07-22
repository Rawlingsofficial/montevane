import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CollectionForm } from "@/components/admin/CollectionForm";
import { createClient } from "@/lib/supabase/server";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Edit Collection — Admin | Montévane",
};

export default async function EditCollectionPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: collection } = await supabase.from("collections").select("*").eq("id", id).single();

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
            cover_image_url: collection.cover_image_url ?? "",
            featured: collection.featured,
          }}
        />
      </div>
    </div>
  );
}
