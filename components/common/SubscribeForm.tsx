"use client";

import { useState } from "react";

import { subscribe } from "@/lib/actions/newsletter";
import { cn } from "@/lib/utils";

export function SubscribeForm({
  labels,
  dark = false,
  className,
}: {
  labels: { placeholder: string; subscribe: string; thanks: string; error: string };
  dark?: boolean;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const result = await subscribe(String(new FormData(e.currentTarget).get("email") ?? ""));
    setState(result.error ? "error" : "done");
  }

  if (state === "done") return <p className={cn("text-sm text-[var(--gold)]", className)}>{labels.thanks}</p>;

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full gap-3", className)}>
      <label className="sr-only" htmlFor={dark ? "subscribe-footer" : "subscribe"}>
        {labels.placeholder}
      </label>
      <input
        id={dark ? "subscribe-footer" : "subscribe"}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={labels.placeholder}
        suppressHydrationWarning
        className={cn(
          "w-full border-b bg-transparent px-1 py-3 text-sm focus:border-[var(--gold)] focus:outline-none",
          dark ? "border-white/20 text-white placeholder:text-white/50" : "border-foreground/30 placeholder:text-muted-foreground"
        )}
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className={cn(
          "shrink-0 border-b px-2 text-xs font-medium tracking-[0.15em] uppercase transition-colors disabled:opacity-50",
          dark ? "border-[var(--gold)] text-[var(--gold)]" : "border-foreground hover:border-[var(--gold)] hover:text-[var(--gold)]"
        )}
      >
        {labels.subscribe}
      </button>
      {state === "error" && <p className="sr-only" role="alert">{labels.error}</p>}
    </form>
  );
}
