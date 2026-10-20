"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { hashPassword } from "@/lib/auth/session";
import { db, schema } from "@/lib/db";
import { pgErrorMessage } from "@/lib/db/errors";

/** Adds an admin with a password you share with them directly. */
export async function addAdmin(email: string, password: string): Promise<{ error?: string }> {
  await requireAdmin();

  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) return { error: "Enter a valid email address." };
  if (password.length < 10) return { error: "Password must be at least 10 characters." };

  try {
    await db.insert(schema.admins).values({ email: normalized, passwordHash: await hashPassword(password) });
  } catch (error) {
    return { error: pgErrorMessage(error, "That email is already an admin.") };
  }

  revalidatePath("/admin/settings");
  return {};
}

export async function removeAdmin(adminId: string): Promise<{ error?: string }> {
  const admin = await requireAdmin();
  if (admin.id === adminId) return { error: "You can't remove your own account." };

  await db.delete(schema.admins).where(eq(schema.admins.id, adminId));
  revalidatePath("/admin/settings");
  return {};
}
