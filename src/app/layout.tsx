import "@/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/data/site";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = await createClient();
    const site = await getSiteContent(supabase);
    return {
      title: `${site.name} - ${site.role}`,
      description:
        site.tagline || site.about_bio || "Personal portfolio website.",
    };
  } catch {
    // Fallback if Supabase isn't reachable/configured yet.
    return {
      title: "Portfolio",
      description: "Personal portfolio website.",
    };
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}