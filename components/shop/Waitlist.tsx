"use client";

import { usePathname } from "next/navigation";
import { useId, useState } from "react";

import { joinWaitlist } from "@/lib/actions/waitlist";
import { cn } from "@/lib/utils";

type Labels = { title: string; body: string; email: string; submit: string; done: string; error: string; privacy: string };

const fill = (s: string, item: string) => s.replace("{item}", item);

/** "Notify me when a new <item> arrives": one email field, stored as an inquiry. */
export function Waitlist({ item, productId = "", labels, className }: { item: string; productId?: string; labels: Labels; className?: string }) {
  const id = useId();
  const path = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    const result = await joinWaitlist({ email, item, productId, path });
    setState(result.error ? "error" : "done");
  }

  return (
    <section className={cn("border border-border bg-[var(--ivory)] p-6 sm:p-8", className)}>
      <h2 className="text-xl">{labels.title}</h2>
      <p className="mt-2 max-w-xl text-sm text-foreground/80">{fill(labels.body, item)}</p>
      {state === "done" ? (
        <p role="status" className="mt-6 text-sm text-[var(--gold)]">
          {fill(labels.done, item)}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 flex max-w-md gap-3">
          <label className="sr-only" htmlFor={id}>
            {labels.email}
          </label>
          <input
            id={id}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={labels.email}
            suppressHydrationWarning
            className="w-full border-b border-foreground/30 bg-transparent px-1 py-3 text-sm placeholder:text-muted-foreground focus:border-[var(--gold)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="min-h-11 shrink-0 bg-foreground px-5 text-xs tracking-[0.15em] text-white uppercase transition-colors hover:bg-[var(--gold)] disabled:opacity-50"
          >
            {labels.submit}
          </button>
        </form>
      )}
      {state === "error" && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {labels.error}
        </p>
      )}
      <p className="mt-3 text-xs text-muted-foreground">{labels.privacy}</p>
    </section>
  );
}
