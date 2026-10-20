import "server-only";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

import { db, schema } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

export type Admin = { id: string; email: string; fullName: string | null };

export async function getAdmin(): Promise<Admin | null> {
  const adminId = verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  if (!adminId) return null;

  const [admin] = await db
    .select({ id: schema.admins.id, email: schema.admins.email, fullName: schema.admins.fullName })
    .from(schema.admins)
    .where(eq(schema.admins.id, adminId));
  return admin ?? null;
}

/**
 * Every admin Server Action must call this first. The proxy only guards
 * /admin pages — Server Actions are POST endpoints anyone can call.
 */
export async function requireAdmin(): Promise<Admin> {
  const admin = await getAdmin();
  if (!admin) throw new Error("Not authorized.");
  return admin;
}
