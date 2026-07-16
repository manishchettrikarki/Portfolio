import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/auth";
import type { ContactMessageRow } from "./types";

/** Public: anyone can submit a message (RLS allows anon insert only). */
export async function submitContactMessage(
  supabase: SupabaseClient,
  input: { name: string; email: string; subject?: string; message: string },
) {
  const { error } = await supabase.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    subject: input.subject ?? null,
    message: input.message,
  });
  if (error) throw error;
}

export async function getMessages(): Promise<ContactMessageRow[]> {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as ContactMessageRow[];
}

export async function markMessageRead(id: string, isRead: boolean) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: isRead })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteMessage(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
