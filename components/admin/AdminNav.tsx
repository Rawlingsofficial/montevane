import Link from "next/link";
import { BarChart3, Inbox, LayoutDashboard, LogOut, Package, Settings, Tags } from "lucide-react";

import { signOut } from "@/lib/actions/auth";

const LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Collections", href: "/admin/collections", icon: Tags },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
] as const;

export function AdminNav({ email }: { email: string }) {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-[var(--ivory)]">
      <div className="px-6 py-6">
        <p className="font-heading text-lg font-light tracking-[0.15em] uppercase">Montévane</p>
        <p className="mt-1 text-xs text-muted-foreground">{email}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-white hover:text-foreground"
          >
            <link.icon className="size-4" strokeWidth={1.5} />
            {link.label}
          </Link>
        ))}
      </nav>

      <form action={signOut} className="border-t border-border p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-white hover:text-foreground"
        >
          <LogOut className="size-4" strokeWidth={1.5} />
          Sign Out
        </button>
      </form>
    </aside>
  );
}
