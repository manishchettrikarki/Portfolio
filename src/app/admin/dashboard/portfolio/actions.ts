"use server";

import { revalidatePath } from "next/cache";
import {
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  uploadPortfolioImage,
  type PortfolioItemInput,
} from "@/lib/data/portfolio";
import {
  createPortfolioCategory,
  updatePortfolioCategory,
  deletePortfolioCategory,
  type PortfolioCategoryInput,
} from "@/lib/data/portfolioCategories";

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

export async function createCategory(input: PortfolioCategoryInput) {
  const row = await createPortfolioCategory(input);
  revalidatePath("/admin/dashboard/portfolio");
  revalidatePath("/", "layout");
  return row;
}

export async function updateCategory(
  id: string,
  input: Partial<PortfolioCategoryInput>,
) {
  const row = await updatePortfolioCategory(id, input);
  revalidatePath("/admin/dashboard/portfolio");
  revalidatePath("/", "layout");
  return row;
}

export async function removeCategory(id: string) {
  await deletePortfolioCategory(id);
  revalidatePath("/admin/dashboard/portfolio");
  revalidatePath("/", "layout");
}
