"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteCollection } from "@/lib/actions/collections";

export function DeleteCollectionButton({ id, slug, name }: { id: string; slug: string; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label={`Delete ${name}`}
      disabled={pending}
      onClick={() => {
        if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
        startTransition(async () => {
          const result = await deleteCollection(id, slug);
          if (result.error) alert(result.error);
        });
      }}
      className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
    >
      <Trash2 className="size-4" strokeWidth={1.5} />
    </button>
  );
}
