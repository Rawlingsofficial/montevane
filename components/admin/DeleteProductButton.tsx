"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteProduct } from "@/lib/actions/products";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label={`Delete ${name}`}
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${name}"? This can't be undone.`)) {
          startTransition(() => {
            void deleteProduct(id);
          });
        }
      }}
      className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
    >
      <Trash2 className="size-4" strokeWidth={1.5} />
    </button>
  );
}
