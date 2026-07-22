"use server";

import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function inviteAdmin(email: string): Promise<{ error?: string }> {
  if (!email || !email.includes("@")) {
    return { error: "Enter a valid email address." };
  }

  const adminClient = createAdminClient();
  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email);

  if (error) {
    return { error: error.message };
  }

  const { error: profileError } = await adminClient.from("profiles").insert({
    id: data.user.id,
    email,
    role: "admin",
  });

  if (profileError) {
    return { error: profileError.message };
  }

  revalidatePath("/admin/settings");
  return {};
}

export async function removeAdmin(userId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id === userId) {
    return { error: "You can't remove your own account." };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/settings");
  return {};
}
