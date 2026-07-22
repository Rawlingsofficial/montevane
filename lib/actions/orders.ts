"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export async function updateOrder(
  id: string,
  input: { status: OrderStatus; tracking_number: string; notes: string }
): Promise<{ error?: string }> {
  if (!ORDER_STATUSES.includes(input.status)) {
    return { error: "Invalid status." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({
      status: input.status,
      tracking_number: input.tracking_number || null,
      notes: input.notes || null,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  return {};
}
