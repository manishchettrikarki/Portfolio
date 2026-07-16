"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface LoginState {
    error?: string;
}

export async function login(
    _prevState: LoginState,
    formData: FormData,
): Promise<LoginState> {
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
        return { error: "Email and password are required." };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error || !data.user) {
        return { error: "Invalid email or password." };
    }

    // Confirm this user is actually an admin, not just any Supabase user.
    const { data: adminRow } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();

    if (!adminRow) {
        await supabase.auth.signOut();
        return { error: "This account is not authorized as an admin." };
    }

    redirect("/admin/dashboard");
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
}
