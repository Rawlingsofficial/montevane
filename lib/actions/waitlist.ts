"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { z } from "zod";

import { db, schema } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { siteUrl } from "@/lib/i18n/config";

const waitlistSchema = z.object({
  email: z.string().trim().email().max(200),
  /** What they're waiting for, e.g. "Rolex Daytona" or a product title. */
  item: z.string().trim().min(1).max(200),
  productId: z.string().uuid().or(z.literal("")),
  /** Page it was sent from (for the team's context). */
  path: z.string().max(300),
});

/**
 * Waitlist sign-ups are stored as inquiries ("Waitlist: <item>") so they show
 * in Admin → Inquiries with the rest, and the team writes when a piece arrives.
 */
export async function joinWaitlist(input: z.input<typeof waitlistSchema>): Promise<{ error?: string }> {
  const parsed = waitlistSchema.safeParse(input);
  if (!parsed.success) return { error: "invalid" };
  const v = parsed.data;
  const item = `Waitlist: ${v.item}`;

  try {
    await db.insert(schema.inquiries).values({
      name: "Waitlist",
      email: v.email,
      productId: v.productId || null,
      productName: item,
      message: `Notify when a new ${v.item} arrives. Signed up on ${siteUrl()}${v.path}`,
      contactMethods: ["email"],
    });
  } catch {
    return { error: "failed" };
  }

  revalidatePath("/admin/inquiries");
  after(async () => {
    const [s] = await db.select().from(schema.storeSettings).where(eq(schema.storeSettings.id, 1));
    const storeEmail = s?.contactEmail || s?.storeEmail;
    if (storeEmail) {
      await sendEmail({ to: storeEmail, subject: `New waitlist sign-up — ${v.item}`, text: `${v.email} wants to hear when a new ${v.item} arrives.\n\nPage: ${siteUrl()}${v.path}`, replyTo: v.email });
    }
  });
  return {};
}
