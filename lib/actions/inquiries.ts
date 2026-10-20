"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { CONTACT_METHODS, PAYMENT_METHODS } from "@/lib/contact";
import { requireAdmin } from "@/lib/auth";
import { db, schema } from "@/lib/db";

const inquirySchema = z
  .object({
    name: z.string().trim().min(1, "Please enter your name.").max(120),
    email: z.string().trim().email("Please enter a valid email.").or(z.literal("")),
    phone: z.string().trim().max(40),
    country: z.string().trim().max(80),
    message: z.string().trim().max(2000),
    product_id: z.string().uuid().or(z.literal("")),
    product_name: z.string().max(200),
    contact_methods: z
      .array(z.enum(CONTACT_METHODS.map((m) => m.value) as [string, ...string[]]))
      .min(1, "Choose at least one way for us to reach you."),
    payment_method: z.enum(PAYMENT_METHODS.map((m) => m.value) as [string, ...string[]]).or(z.literal("")),
  })
  .refine((v) => v.email || v.phone, { message: "Leave an email or a phone number so we can reach you." });

export type InquiryInput = z.input<typeof inquirySchema>;

export async function submitInquiry(input: InquiryInput): Promise<{ error?: string }> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const v = parsed.data;

  try {
    await db.insert(schema.inquiries).values({
      name: v.name,
      email: v.email || null,
      phone: v.phone || null,
      country: v.country || null,
      message: v.message || null,
      productId: v.product_id || null,
      productName: v.product_name || null,
      contactMethods: v.contact_methods,
      paymentMethod: v.payment_method || null,
    });
  } catch {
    return { error: "Something went wrong. Please contact us directly using the buttons above." };
  }

  revalidatePath("/admin/inquiries");
  return {};
}

export async function updateInquiryStatus(id: string, status: "new" | "contacted" | "closed"): Promise<{ error?: string }> {
  await requireAdmin();
  await db.update(schema.inquiries).set({ status }).where(eq(schema.inquiries.id, id));
  revalidatePath("/admin/inquiries");
  return {};
}
