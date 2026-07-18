import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/auth";
import type { SiteContentRow } from "./types";

export async function getSiteContent(
  supabase: SupabaseClient,
): Promise<SiteContentRow> {
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) throw error;
  return data as SiteContentRow;
}

export type SiteContentUpdate = Partial<
  Omit<
    SiteContentRow,
    "id" | "updated_at" | "cv_url" | "cv_filename" | "profile_image_url"
  >
>;

export async function updateSiteContent(update: SiteContentUpdate) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("site_content")
    .update(update)
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;
  return data as SiteContentRow;
}

// ─── CV file (stored in the `cv` storage bucket) ───────────────────────────
export async function uploadCv(file: File) {
  const { supabase } = await requireAdmin();

  const path = `cv-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error: uploadError } = await supabase.storage
    .from("cv")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("cv").getPublicUrl(path);

  const { data, error } = await supabase
    .from("site_content")
    .update({ cv_url: publicUrl, cv_filename: file.name })
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;
  return data as SiteContentRow;
}

export async function deleteCv() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("site_content")
    .update({ cv_url: null, cv_filename: null })
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;
  return data as SiteContentRow;
}

// ─── Profile picture (stored in the `portfolio-media` storage bucket) ─────
export async function uploadProfileImage(file: File) {
  const { supabase } = await requireAdmin();

  const path = `profile-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error: uploadError } = await supabase.storage
    .from("portfolio-media")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio-media").getPublicUrl(path);

  const { data, error } = await supabase
    .from("site_content")
    .update({ profile_image_url: publicUrl })
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;
  return data as SiteContentRow;
}

export async function deleteProfileImage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("site_content")
    .update({ profile_image_url: null })
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;
  return data as SiteContentRow;
}