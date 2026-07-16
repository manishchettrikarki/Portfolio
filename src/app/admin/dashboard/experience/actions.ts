"use server";

import { revalidatePath } from "next/cache";
import {
  createExperience,
  updateExperience,
  deleteExperience,
  type ExperienceInput,
} from "@/lib/data/experience";

export async function create(input: ExperienceInput) {
  const row = await createExperience(input);
  revalidatePath("/admin/dashboard/experience");
  revalidatePath("/", "layout");
  return row;
}

export async function update(id: string, input: Partial<ExperienceInput>) {
  const row = await updateExperience(id, input);
  revalidatePath("/admin/dashboard/experience");
  revalidatePath("/", "layout");
  return row;
}

export async function remove(id: string) {
  await deleteExperience(id);
  revalidatePath("/admin/dashboard/experience");
  revalidatePath("/", "layout");
}
