import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/auth";
import type { ExperienceRow } from "./types";

export async function getExperience(
  supabase: SupabaseClient,
): Promise<ExperienceRow[]> {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as ExperienceRow[];
}

export type ExperienceInput = Omit<ExperienceRow, "id" | "created_at">;

export async function createExperience(input: ExperienceInput) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("experience")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as ExperienceRow;
}

export async function updateExperience(
  id: string,
  input: Partial<ExperienceInput>,
) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("experience")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ExperienceRow;
}

export async function deleteExperience(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw error;
}
