"use client";

import { useState } from "react";

import { updateOrder, type OrderStatus } from "@/lib/actions/orders";
import { inputClass } from "@/components/admin/form-controls";

const STATUSES: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"];

export function OrderStatusForm({
  id,
  initialStatus,
  initialTrackingNumber,
  initialNotes,
}: {
  id: string;
  initialStatus: OrderStatus;
  initialTrackingNumber: string;
  initialNotes: string;
}) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);

    const result = await updateOrder(id, { status, tracking_number: trackingNumber, notes });

    setSaving(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSaved(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-xs tracking-[0.1em] text-muted-foreground uppercase">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
          className={inputClass}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs tracking-[0.1em] text-muted-foreground uppercase">Tracking Number</label>
        <input
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-xs tracking-[0.1em] text-muted-foreground uppercase">Internal Notes</label>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {saved && !error && <p className="text-sm text-[var(--gold)]">Order updated.</p>}

      <button
        type="submit"
        disabled={saving}
        className="bg-primary px-8 py-3 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50"
      >
        {saving ? "Saving…" : "Update Order"}
      </button>
    </form>
  );
}
