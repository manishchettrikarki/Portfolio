"use server";

import { revalidatePath } from "next/cache";
import { uploadCv, deleteCv } from "@/lib/data/site";

export async function upload(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("No file provided");
  if (file.type !== "application/pdf") {
    throw new Error("Please upload a PDF file.");
  }
  await uploadCv(file);
  revalidatePath("/admin/dashboard/cv");
  revalidatePath("/", "layout");
}

export async function remove() {
  await deleteCv();
  revalidatePath("/admin/dashboard/cv");
  revalidatePath("/", "layout");
}
