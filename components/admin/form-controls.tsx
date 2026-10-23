import { cn } from "@/lib/utils";

export const inputClass =
  "mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm focus:border-[var(--gold)] focus:outline-none";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="border-b border-border pb-3 text-sm font-medium tracking-[0.1em] uppercase">{title}</h2>
      <div className="pt-5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  error,
  className,
  children,
}: {
  label: React.ReactNode;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(className)}>
      <label className="text-xs tracking-[0.1em] text-muted-foreground uppercase">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
