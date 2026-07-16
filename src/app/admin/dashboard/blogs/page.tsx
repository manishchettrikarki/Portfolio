import Link from "next/link";
import { getAllBlogs } from "@/lib/data/blogs";
import { DeleteBlogButton, TogglePublishButton } from "./ListButtons";

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Blogs</h1>
        <Link
          href="/admin/dashboard/blogs/new"
          className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700"
        >
          + New post
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {blogs.map((post) => (
          <div
            key={post.id}
            className="border border-neutral-200 rounded-lg p-5 bg-white flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">{post.title}</p>
                <span
                  className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    post.published
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-sm text-neutral-500">{post.excerpt}</p>
              <p className="text-xs text-neutral-400 mt-1">
                /{post.slug} · {post.category} · {post.date_label ?? ""}
              </p>
            </div>
            <div className="flex gap-3 shrink-0 items-center">
              <TogglePublishButton id={post.id} published={post.published} />
              <Link
                href={`/admin/dashboard/blogs/${post.id}`}
                className="text-sm text-blue-600"
              >
                Edit
              </Link>
              <DeleteBlogButton id={post.id} />
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <p className="text-sm text-neutral-500">No blog posts yet.</p>
        )}
      </div>
    </div>
  );
}
