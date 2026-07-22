"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-border p-8">
        <p className="text-sm">
          Thank you for reaching out. A member of our concierge team will respond within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" name="name" type="text" required />
        <Field label="Email Address" name="email" type="email" required />
      </div>
      <Field label="Subject" name="subject" type="text" />
      <div>
        <label htmlFor="message" className="text-xs tracking-[0.1em] text-muted-foreground uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full border border-border bg-transparent px-3 py-3 text-sm focus:border-[var(--gold)] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-primary px-10 py-4 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary"
      >
        Send Message
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs tracking-[0.1em] text-muted-foreground uppercase">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        suppressHydrationWarning
        className="mt-2 w-full border border-border bg-transparent px-3 py-3 text-sm focus:border-[var(--gold)] focus:outline-none"
      />
    </div>
  );
}
