import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/auth";
import type { TestimonialRow } from "./types";

export async function getTestimonials(
  supabase: SupabaseClient,
): Promise<TestimonialRow[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as TestimonialRow[];
}

export type TestimonialInput = Omit<TestimonialRow, "id" | "created_at">;

export async function createTestimonial(input: TestimonialInput) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("testimonials")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as TestimonialRow;
}

export async function updateTestimonial(
  id: string,
  input: Partial<TestimonialInput>,
) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("testimonials")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as TestimonialRow;
}

export async function deleteTestimonial(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}
