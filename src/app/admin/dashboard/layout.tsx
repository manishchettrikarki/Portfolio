import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Middleware already redirects unauthenticated visitors, but we double
  // check here (and confirm admin_users membership) as defense in depth.
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const supabase = await createClient();
  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!adminRow) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 p-8 max-w-5xl">{children}</main>
    </div>
  );
}
