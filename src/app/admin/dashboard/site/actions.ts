"use server";

import { revalidatePath } from "next/cache";
import { updateSiteContent, type SiteContentUpdate } from "@/lib/data/site";

export async function saveSiteContent(update: SiteContentUpdate) {
  await updateSiteContent(update);
  revalidatePath("/", "layout");
  revalidatePath("/admin/dashboard/site");
}
