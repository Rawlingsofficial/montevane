"use server";

import { z } from "zod";

import { db, schema } from "@/lib/db";

export async function subscribe(email: string): Promise<{ error?: string }> {
  const parsed = z.string().trim().toLowerCase().email().max(200).safeParse(email);
  if (!parsed.success) return { error: "invalid" };

  await db
    .insert(schema.newsletterSubscribers)
    .values({ email: parsed.data })
    .onConflictDoUpdate({ target: schema.newsletterSubscribers.email, set: { subscribed: true } });
  return {};
}
