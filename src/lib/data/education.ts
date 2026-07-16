import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/auth";
import type { EducationRow } from "./types";

export async function getEducation(
  supabase: SupabaseClient,
): Promise<EducationRow[]> {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as EducationRow[];
}

export type EducationInput = Omit<EducationRow, "id" | "created_at">;

export async function createEducation(input: EducationInput) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("education")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as EducationRow;
}

export async function updateEducation(
  id: string,
  input: Partial<EducationInput>,
) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("education")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as EducationRow;
}

export async function deleteEducation(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("education").delete().eq("id", id);
  if (error) throw error;
}
