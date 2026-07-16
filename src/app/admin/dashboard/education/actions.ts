"use server";

import { revalidatePath } from "next/cache";
import {
  createEducation,
  updateEducation,
  deleteEducation,
  type EducationInput,
} from "@/lib/data/education";

export async function create(input: EducationInput) {
  const row = await createEducation(input);
  revalidatePath("/admin/dashboard/education");
  revalidatePath("/", "layout");
  return row;
}

export async function update(id: string, input: Partial<EducationInput>) {
  const row = await updateEducation(id, input);
  revalidatePath("/admin/dashboard/education");
  revalidatePath("/", "layout");
  return row;
}

export async function remove(id: string) {
  await deleteEducation(id);
  revalidatePath("/admin/dashboard/education");
  revalidatePath("/", "layout");
}
