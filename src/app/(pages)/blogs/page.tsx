import type { Metadata } from "next";
import { BlogsView } from "@/components/views/blogs";
import { getPageMetadata } from "@/lib/pageSeo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    "/blogs",
    "Blog",
    "Articles, insights, and updates.",
  );
}

export default function BlogsPage() {
  return <BlogsView />;
}
