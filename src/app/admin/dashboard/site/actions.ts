"use server";

import { revalidatePath } from "next/cache";
import {
  updateSiteContent,
  uploadProfileImage,
  deleteProfileImage,
  type SiteContentUpdate,
} from "@/lib/data/site";

export async function saveSiteContent(update: SiteContentUpdate) {
  await updateSiteContent(update);
  revalidatePath("/", "layout");
  revalidatePath("/admin/dashboard/site");
}

export async function uploadProfilePicture(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("No file provided");
  await uploadProfileImage(file);
  revalidatePath("/", "layout");
  revalidatePath("/admin/dashboard/site");
}

export async function removeProfilePicture() {
  await deleteProfileImage();
  revalidatePath("/", "layout");
  revalidatePath("/admin/dashboard/site");
}