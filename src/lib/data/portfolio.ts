import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/auth";
import type { PortfolioItemRow } from "./types";

export async function getPortfolioItems(
  supabase: SupabaseClient,
): Promise<PortfolioItemRow[]> {
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as PortfolioItemRow[];
}

export type PortfolioItemInput = Omit<PortfolioItemRow, "id" | "created_at">;

export async function createPortfolioItem(input: PortfolioItemInput) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("portfolio_items")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as PortfolioItemRow;
}

export async function updatePortfolioItem(
  id: string,
  input: Partial<PortfolioItemInput>,
) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("portfolio_items")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PortfolioItemRow;
}

export async function deletePortfolioItem(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("portfolio_items")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

/** Uploads an image to the portfolio-media bucket and returns its public URL. */
export async function uploadPortfolioImage(file: File) {
  const { supabase } = await requireAdmin();
  const path = `portfolio-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error } = await supabase.storage
    .from("portfolio-media")
    .upload(path, file, { upsert: false, contentType: file.type });
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-media").getPublicUrl(path);
  return publicUrl;
}
