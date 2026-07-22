import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { OrderStatusForm } from "@/components/admin/OrderStatusForm";
import { createClient } from "@/lib/supabase/server";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Order Detail — Admin | Montévane",
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" });

export default async function AdminOrderDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: order } = await supabase.from("orders").select("*").eq("id", id).single();

  if (!order) notFound();

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">{order.order_number}</h1>
        <p className="text-xs text-muted-foreground">{dateFormatter.format(new Date(order.created_at))}</p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="border-b border-border pb-3 text-sm font-medium tracking-[0.1em] uppercase">Items</h2>
            <div className="divide-y divide-border">
              {items.length > 0 ? (
                items.map((item: Record<string, unknown>, i: number) => (
                  <div key={i} className="flex items-center justify-between py-3 text-sm">
                    <JsonRow value={item} />
                  </div>
                ))
              ) : (
                <p className="py-4 text-sm text-muted-foreground">No line items recorded.</p>
              )}
            </div>
          </section>

          <section className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="border-b border-border pb-3 text-sm font-medium tracking-[0.1em] uppercase">
                Shipping Address
              </h2>
              <div className="pt-3 text-sm text-muted-foreground">
                <JsonBlock value={order.shipping_address} />
              </div>
            </div>
            <div>
              <h2 className="border-b border-border pb-3 text-sm font-medium tracking-[0.1em] uppercase">
                Billing Address
              </h2>
              <div className="pt-3 text-sm text-muted-foreground">
                <JsonBlock value={order.billing_address} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="border-b border-border pb-3 text-sm font-medium tracking-[0.1em] uppercase">Customer</h2>
            <div className="pt-3 text-sm">
              <p>{order.user_name}</p>
              <p className="text-muted-foreground">{order.user_email}</p>
            </div>
          </section>

          <section>
            <h2 className="border-b border-border pb-3 text-sm font-medium tracking-[0.1em] uppercase">Payment</h2>
            <div className="grid grid-cols-2 gap-2 pt-3 text-sm">
              <p className="text-muted-foreground">Subtotal</p>
              <p className="text-right">{currency.format(order.subtotal)}</p>
              <p className="text-muted-foreground">Shipping</p>
              <p className="text-right">{currency.format(order.shipping_cost)}</p>
              <p className="text-muted-foreground">Tax</p>
              <p className="text-right">{currency.format(order.tax)}</p>
              <p className="font-medium">Total</p>
              <p className="text-right font-medium">{currency.format(order.total)}</p>
            </div>
            {order.payment_method && (
              <p className="mt-2 text-xs text-muted-foreground">Method: {order.payment_method}</p>
            )}
            {order.stripe_payment_intent_id && (
              <p className="text-xs text-muted-foreground">Stripe: {order.stripe_payment_intent_id}</p>
            )}
          </section>
        </div>

        <div>
          <h2 className="border-b border-border pb-3 text-sm font-medium tracking-[0.1em] uppercase">
            Manage Order
          </h2>
          <div className="pt-5">
            <OrderStatusForm
              id={order.id}
              initialStatus={order.status}
              initialTrackingNumber={order.tracking_number ?? ""}
              initialNotes={order.notes ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function JsonBlock({ value }: { value: unknown }) {
  if (!value || typeof value !== "object") return <p>—</p>;
  return <JsonRow value={value as Record<string, unknown>} />;
}

function JsonRow({ value }: { value: Record<string, unknown> }) {
  return (
    <div className="space-y-0.5">
      {Object.entries(value).map(([key, val]) => (
        <p key={key}>
          <span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}: </span>
          {String(val)}
        </p>
      ))}
    </div>
  );
}
