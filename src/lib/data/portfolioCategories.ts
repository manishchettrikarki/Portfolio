import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/auth";
import type { PortfolioCategoryRow } from "./types";

export async function getPortfolioCategories(
  supabase: SupabaseClient,
): Promise<PortfolioCategoryRow[]> {
  const { data, error } = await supabase
    .from("portfolio_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as PortfolioCategoryRow[];
}

export type PortfolioCategoryInput = Omit<
  PortfolioCategoryRow,
  "id" | "created_at"
>;

export async function createPortfolioCategory(input: PortfolioCategoryInput) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("portfolio_categories")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as PortfolioCategoryRow;
}

export async function updatePortfolioCategory(
  id: string,
  input: Partial<PortfolioCategoryInput>,
) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("portfolio_categories")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PortfolioCategoryRow;
}

/**
 * Deletes a category. Portfolio items that used its slug keep the text
 * value they already had (no cascade), so nothing breaks — they'll just
 * show a category label that no longer matches a managed category until
 * reassigned.
 */
export async function deletePortfolioCategory(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("portfolio_categories")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
