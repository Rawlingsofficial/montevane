"use client";

import { useState } from "react";

import { AssetImage } from "@/components/common/AssetImage";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <AssetImage base="newsletter_bg" alt="" sizes="100vw" className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-white/80" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-6 py-28 lg:items-end lg:px-10">
        <div className="w-full max-w-md lg:text-right">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">Stay In Touch</p>
        <h2 className="mt-3 text-4xl">Join the House</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Be the first to know about new arrivals, exclusive drops, and members-only offers.
        </p>

        {submitted ? (
          <p className="mt-8 text-sm text-[var(--gold)]">Thank you for subscribing.</p>
        ) : (
          <form
            className="mt-8 flex w-full gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="Email address"
              suppressHydrationWarning
              className="w-full border-b border-foreground/30 bg-transparent px-1 py-3 text-sm placeholder:text-muted-foreground focus:border-[var(--gold)] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 border-b border-foreground px-2 text-xs font-medium tracking-[0.15em] uppercase transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              Subscribe
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}
