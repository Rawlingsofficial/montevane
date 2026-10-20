import Link from "next/link";
import type { Metadata } from "next";

import { InquiryStatusSelect } from "@/components/admin/InquiryStatusSelect";
import { CONTACT_METHODS, PAYMENT_METHODS } from "@/lib/contact";
import { desc, eq } from "drizzle-orm";

import { db, schema } from "@/lib/db";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Inquiries — Admin | Montévane",
};

const STATUSES = ["new", "contacted", "closed"] as const;
const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const methodLabel = (v: string) => CONTACT_METHODS.find((m) => m.value === v)?.label ?? v;
const paymentLabel = (v: string) => PAYMENT_METHODS.find((m) => m.value === v)?.label ?? v;

type SearchParams = Promise<{ status?: string }>;

export default async function AdminInquiriesPage({ searchParams }: { searchParams: SearchParams }) {
  const { status } = await searchParams;
  const i = schema.inquiries;
  const inquiries = await db
    .select()
    .from(i)
    .where(STATUSES.includes(status as (typeof STATUSES)[number]) ? eq(i.status, status as (typeof STATUSES)[number]) : undefined)
    .orderBy(desc(i.createdAt));

  return (
    <div>
      <h1 className="text-2xl">Inquiries</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Customers who asked to be contacted. Reach them on the channels they picked, then mark them contacted.
      </p>

      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
        <FilterPill href="/admin/inquiries" active={!status} label="All" />
        {STATUSES.map((s) => (
          <FilterPill key={s} href={`/admin/inquiries?status=${s}`} active={status === s} label={s} />
        ))}
      </div>

      <div className="mt-6 divide-y divide-border border-t border-b border-border">
        {inquiries.length > 0 ? (
          inquiries.map((inq) => (
            <div key={inq.id} className="grid gap-4 py-5 lg:grid-cols-[1fr_1.4fr_auto]">
              <div className="text-sm">
                <p className="font-medium">{inq.name}</p>
                {inq.phone && <p className="text-muted-foreground">{inq.phone}</p>}
                {inq.email && <p className="text-muted-foreground">{inq.email}</p>}
                {inq.country && <p className="text-muted-foreground">{inq.country}</p>}
                <p className="mt-1 text-xs text-muted-foreground">{dateFormatter.format(inq.createdAt)}</p>
              </div>
              <div className="text-sm">
                {inq.productName && (
                  <p>
                    {inq.productId ? (
                      <Link href={`/admin/products/${inq.productId}/edit`} className="hover:text-[var(--gold)]">
                        {inq.productName}
                      </Link>
                    ) : (
                      inq.productName
                    )}
                  </p>
                )}
                <p className="mt-1 text-xs tracking-[0.05em] text-[var(--gold)] uppercase">
                  Reach via: {inq.contactMethods.map(methodLabel).join(", ")}
                </p>
                {inq.paymentMethod && (
                  <p className="mt-1 text-xs text-muted-foreground">Payment: {paymentLabel(inq.paymentMethod)}</p>
                )}
                {inq.message && <p className="mt-2 whitespace-pre-line text-muted-foreground">{inq.message}</p>}
              </div>
              <InquiryStatusSelect id={inq.id} status={inq.status} />
            </div>
          ))
        ) : (
          <p className="py-10 text-center text-sm text-muted-foreground">No inquiries yet.</p>
        )}
      </div>
    </div>
  );
}

function FilterPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1.5 text-xs font-medium tracking-[0.1em] capitalize transition-colors",
        active ? "bg-foreground text-background" : "bg-transparent text-foreground/60 hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
