"use client";

import { useState } from "react";

import { inputClass } from "@/components/admin/form-controls";
import { updateInquiryStatus } from "@/lib/actions/inquiries";

type Status = "new" | "contacted" | "closed";

export function InquiryStatusSelect({ id, status }: { id: string; status: Status }) {
  const [value, setValue] = useState(status);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(next: Status) {
    const previous = value;
    setValue(next);
    setError(null);
    const result = await updateInquiryStatus(id, next);
    if (result.error) {
      setValue(previous);
      setError(result.error);
    }
  }

  return (
    <div className="w-36">
      <select value={value} onChange={(e) => handleChange(e.target.value as Status)} className={`${inputClass} mt-0 capitalize`}>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="closed">Closed</option>
      </select>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
