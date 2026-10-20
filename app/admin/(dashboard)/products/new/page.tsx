import type { Metadata } from "next";

import { ProductForm } from "@/components/admin/ProductForm";
import { getCatalogOptions } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "New Product — Admin | Montévane",
};

export default async function NewProductPage() {
  const { brands, categories, collections } = await getCatalogOptions();

  return (
    <div>
      <h1 className="text-2xl">New Product</h1>
      <div className="mt-8">
        <ProductForm brands={brands} categories={categories} collections={collections} />
      </div>
    </div>
  );
}
