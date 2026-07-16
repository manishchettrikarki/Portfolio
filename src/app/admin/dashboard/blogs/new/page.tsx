import { BlogForm } from "../BlogForm";
import { create, uploadCoverImage } from "../actions";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">New blog post</h1>
      <BlogForm onSubmit={create} uploadCoverImageAction={uploadCoverImage} />
    </div>
  );
}
