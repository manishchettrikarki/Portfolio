"use server";

import { revalidatePath } from "next/cache";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type TestimonialInput,
} from "@/lib/data/testimonials";

export async function create(input: TestimonialInput) {
  const row = await createTestimonial(input);
  revalidatePath("/admin/dashboard/testimonials");
  revalidatePath("/", "layout");
  return row;
}

export async function update(id: string, input: Partial<TestimonialInput>) {
  const row = await updateTestimonial(id, input);
  revalidatePath("/admin/dashboard/testimonials");
  revalidatePath("/", "layout");
  return row;
}

export async function remove(id: string) {
  await deleteTestimonial(id);
  revalidatePath("/admin/dashboard/testimonials");
  revalidatePath("/", "layout");
}
