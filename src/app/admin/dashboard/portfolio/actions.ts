"use server";

import { revalidatePath } from "next/cache";
import {
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  uploadPortfolioImage,
  type PortfolioItemInput,
} from "@/lib/data/portfolio";

export async function create(input: PortfolioItemInput) {
  const row = await createPortfolioItem(input);
  revalidatePath("/admin/dashboard/portfolio");
  revalidatePath("/", "layout");
  return row;
}

export async function update(id: string, input: Partial<PortfolioItemInput>) {
  const row = await updatePortfolioItem(id, input);
  revalidatePath("/admin/dashboard/portfolio");
  revalidatePath("/", "layout");
  return row;
}

export async function remove(id: string) {
  await deletePortfolioItem(id);
  revalidatePath("/admin/dashboard/portfolio");
  revalidatePath("/", "layout");
}

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("No file provided");
  return uploadPortfolioImage(file);
}
