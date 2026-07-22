import type { Metadata } from "next";

import { CollectionForm } from "@/components/admin/CollectionForm";

export const metadata: Metadata = {
  title: "New Collection — Admin | Montévane",
};

export default function NewCollectionPage() {
  return (
    <div>
      <h1 className="text-2xl">New Collection</h1>
      <div className="mt-8">
        <CollectionForm />
      </div>
    </div>
  );
}
