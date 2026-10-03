import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact";
import { getPageMetadata } from "@/lib/pageSeo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    "/contact",
    "Contact",
    "Get in touch.",
  );
}

export default function ContactPage() {
  return <ContactView />;
}
