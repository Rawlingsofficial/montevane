"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Section, inputClass } from "@/components/admin/form-controls";
import { addCatalogEntry } from "@/lib/actions/catalog";

type Entry = { slug: string; name: string };

export function CatalogListsForm({ categories, brands }: { categories: Entry[]; brands: Entry[] }) {
  return (
    <Section title="Categories & Brands">
      <div className="grid gap-8 sm:grid-cols-2">
        <EntryList kind="categories" label="Category" entries={categories} placeholder="e.g. Sunglasses" />
        <EntryList kind="brands" label="Brand" entries={brands} placeholder="e.g. Rolex" />
      </div>
    </Section>
  );
}

function EntryList({
  kind,
  label,
  entries,
  placeholder,
}: {
  kind: "categories" | "brands";
  label: string;
  entries: Entry[];
  placeholder: string;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const result = await addCatalogEntry(kind, name);
    setPending(false);
    if (result.error) return setError(result.error);
    setName("");
    router.refresh();
  }

  return (
    <div>
      <p className="text-xs tracking-[0.1em] text-muted-foreground uppercase">{kind === "brands" ? "Brands" : "Categories"}</p>
      <p className="mt-2 text-sm leading-relaxed">{entries.map((e) => e.name).join(", ") || "None yet"}</p>
      <form onSubmit={handleAdd} className="mt-3 flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={placeholder} className={inputClass} />
        <button
          type="submit"
          disabled={pending || !name.trim()}
          className="mt-2 shrink-0 border border-border px-4 text-xs tracking-[0.1em] uppercase hover:border-foreground disabled:opacity-50"
        >
          Add {label}
        </button>
      </form>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
