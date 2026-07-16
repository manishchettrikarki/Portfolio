"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogCoverImage,
  slugify,
  type BlogInput,
} from "@/lib/data/blogs";

export async function create(input: BlogInput) {
  const slug = input.slug?.trim() || slugify(input.title);
  const row = await createBlog({ ...input, slug });
  revalidatePath("/admin/dashboard/blogs");
  revalidatePath("/", "layout");
  redirect("/admin/dashboard/blogs");
}

export async function update(id: string, input: Partial<BlogInput>) {
  await updateBlog(id, input);
  revalidatePath("/admin/dashboard/blogs");
  revalidatePath("/", "layout");
  redirect("/admin/dashboard/blogs");
}

export async function remove(id: string) {
  await deleteBlog(id);
  revalidatePath("/admin/dashboard/blogs");
  revalidatePath("/", "layout");
}

export async function uploadCoverImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("No file provided");
  return uploadBlogCoverImage(file);
}
