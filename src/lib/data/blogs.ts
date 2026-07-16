import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/auth";
import type { BlogRow } from "./types";
export { slugify } from "@/lib/slug";

/** Public: published posts only (RLS also enforces this for anon callers). */
export async function getPublishedBlogs(
  supabase: SupabaseClient,
): Promise<BlogRow[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as BlogRow[];
}

/** Admin: all posts, published or draft. */
export async function getAllBlogs(): Promise<BlogRow[]> {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as BlogRow[];
}

export async function getBlogById(id: string): Promise<BlogRow> {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as BlogRow;
}

export type BlogInput = Omit<BlogRow, "id" | "created_at" | "updated_at">;

export async function createBlog(input: BlogInput) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("blogs")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as BlogRow;
}

export async function updateBlog(id: string, input: Partial<BlogInput>) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("blogs")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as BlogRow;
}

export async function deleteBlog(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadBlogCoverImage(file: File) {
  const { supabase } = await requireAdmin();
  const path = `blog-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error } = await supabase.storage
    .from("portfolio-media")
    .upload(path, file, { upsert: false, contentType: file.type });
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-media").getPublicUrl(path);
  return publicUrl;
}
