"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, verifyPassword } from "@/lib/auth/session";
import { db, schema } from "@/lib/db";

export type SignInState = { error?: string };

export async function signIn(_prevState: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const [admin] = await db.select().from(schema.admins).where(eq(schema.admins.email, email));
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return { error: "Invalid email or password." };
  }

  (await cookies()).set(SESSION_COOKIE, createSessionToken(admin.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/admin");
}

export async function signOut() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}
