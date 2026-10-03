import { BlogForm } from "../BlogForm";
import { create, uploadCoverImage, uploadVideo } from "../actions";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900 tracking-tight mb-4">New blog post</h1>
      <BlogForm
        onSubmit={create}
        uploadCoverImageAction={uploadCoverImage}
        uploadVideoAction={uploadVideo}
      />
    </div>
  );
}
