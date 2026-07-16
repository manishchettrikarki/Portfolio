import "server-only";
import { createClient } from "@/lib/supabase/server";

/**
 * Verifies the current request comes from a logged-in admin.
 * Throws if not — call this at the top of every admin server action
 * or route handler that writes data. RLS enforces this at the DB
 * layer too, but failing fast here gives clearer error messages.
 */
export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data: adminRow, error: adminError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (adminError || !adminRow) {
    throw new Error("Not authorized");
  }

  return { supabase, user };
}

/** Returns the current user without throwing (for read-only checks in UI). */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
