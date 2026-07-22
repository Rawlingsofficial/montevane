import type { Metadata } from "next";

import { ProductForm } from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "New Product — Admin | Montévane",
};

export default async function NewProductPage() {
  const supabase = await createClient();
  const [{ data: brands }, { data: collections }] = await Promise.all([
    supabase.from("brands").select("slug, name").order("name"),
    supabase.from("collections").select("slug, name").order("name"),
  ]);

  return (
    <div>
      <h1 className="text-2xl">New Product</h1>
      <div className="mt-8">
        <ProductForm brands={brands ?? []} collections={collections ?? []} />
      </div>
    </div>
  );
}
