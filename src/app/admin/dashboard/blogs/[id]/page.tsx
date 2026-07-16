import { getBlogById } from "@/lib/data/blogs";
import { BlogForm } from "../BlogForm";
import { update, uploadCoverImage } from "../actions";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);
  const boundUpdate = update.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit blog post</h1>
      <BlogForm
        initial={blog}
        onSubmit={boundUpdate}
        uploadCoverImageAction={uploadCoverImage}
      />
    </div>
  );
}
