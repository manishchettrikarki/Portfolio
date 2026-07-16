"use server";

import { revalidatePath } from "next/cache";
import { markMessageRead, deleteMessage } from "@/lib/data/messages";

export async function markRead(id: string, isRead: boolean) {
  await markMessageRead(id, isRead);
  revalidatePath("/admin/dashboard/messages");
}

export async function remove(id: string) {
  await deleteMessage(id);
  revalidatePath("/admin/dashboard/messages");
}
