"use client";

import { useActionState } from "react";

import { signIn, type SignInState } from "@/lib/actions/auth";

const initialState: SignInState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="text-xs tracking-[0.1em] text-muted-foreground uppercase">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          suppressHydrationWarning
          className="mt-2 w-full border border-border bg-transparent px-3 py-3 text-sm focus:border-[var(--gold)] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-xs tracking-[0.1em] text-muted-foreground uppercase">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          suppressHydrationWarning
          className="mt-2 w-full border border-border bg-transparent px-3 py-3 text-sm focus:border-[var(--gold)] focus:outline-none"
        />
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-primary px-6 py-3.5 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50"
      >
        {pending ? "Signing In…" : "Sign In"}
      </button>
    </form>
  );
}
