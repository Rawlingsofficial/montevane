"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { z } from "zod";

import { CONTACT_METHODS, PAYMENT_METHODS } from "@/lib/contact";
import { requireAdmin } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { sendEmail } from "@/lib/email";

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
  after(() => notifyInquiry(v));
  return {};
}

const label = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((m) => m.value === value)?.label ?? value;

/** Emails the store about a new inquiry and confirms receipt to the customer. */
async function notifyInquiry(v: z.output<typeof inquirySchema>) {
  const [s] = await db.select().from(schema.storeSettings).where(eq(schema.storeSettings.id, 1));
  const storeEmail = s?.contactEmail || s?.storeEmail || "info@luxurybagsandwatches.com";
  const item = v.product_name || "General inquiry";

  const lines = [
    `Item: ${item}`,
    `Name: ${v.name}`,
    v.email && `Email: ${v.email}`,
    v.phone && `Phone: ${v.phone}`,
    v.country && `Country: ${v.country}`,
    `Contact via: ${v.contact_methods.map((m) => label(CONTACT_METHODS, m)).join(", ")}`,
    v.payment_method && `Payment: ${label(PAYMENT_METHODS, v.payment_method)}`,
    v.message && `\nMessage:\n${v.message}`,
  ].filter(Boolean);

  await Promise.allSettled([
    sendEmail({
      to: storeEmail,
      subject: `New inquiry — ${item}`,
      text: lines.join("\n"),
      replyTo: v.email || undefined,
    }),
    v.email &&
      sendEmail({
        to: v.email,
        subject: `We received your inquiry — ${item}`,
        text: [
          `Dear ${v.name},`,
          "",
          `Thank you for your interest in: ${item}.`,
          "A member of our team will contact you shortly using the method you chose.",
          "",
          "If you have anything to add, simply reply to this email.",
          "",
          s?.storeName || "Montévane",
          "https://www.luxurybagsandwatches.com",
        ].join("\n"),
        replyTo: storeEmail,
      }),
  ]);
}

export async function updateInquiryStatus(id: string, status: "new" | "contacted" | "closed"): Promise<{ error?: string }> {
  await requireAdmin();
  await db.update(schema.inquiries).set({ status }).where(eq(schema.inquiries.id, id));
  revalidatePath("/admin/inquiries");
  return {};
}
