import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — Montévane",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--ivory)] px-6">
      <div className="w-full max-w-sm">
        <p className="text-center font-heading text-xl font-light tracking-[0.2em] uppercase">Montévane</p>
        <p className="mt-1 text-center text-xs tracking-[0.15em] text-muted-foreground uppercase">Admin</p>

        <div className="mt-10 bg-background p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
