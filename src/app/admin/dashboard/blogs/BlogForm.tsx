"use client";

import { useRef, useState, useTransition } from "react";
import type { BlogRow } from "@/lib/data/types";
import { slugify } from "@/lib/slug";

type Input = Omit<BlogRow, "id" | "created_at" | "updated_at">;

const inputCls =
  "border border-gray-300 rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
const cardCls = "border border-neutral-200 rounded-lg p-5 bg-white mb-4";

export function BlogForm({
  initial,
  onSubmit,
  uploadCoverImageAction,
}: {
  initial?: BlogRow;
  onSubmit: (input: Input) => Promise<void>;
  uploadCoverImageAction: (formData: FormData) => Promise<string>;
}) {
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [dateLabel, setDateLabel] = useState(initial?.date_label ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [readTime, setReadTime] = useState(initial?.read_time ?? "");
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [tagsInput, setTagsInput] = useState(initial?.tags?.join(", ") ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.cover_image_url ?? null);
  const [published, setPublished] = useState(initial?.published ?? true);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const url = await uploadCoverImageAction(fd);
      setCoverImageUrl(url);
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function save() {
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    startTransition(async () => {
      await onSubmit({
        title,
        slug: slug.trim() || slugify(title),
        excerpt,
        content,
        date_label: dateLabel,
        category,
        author,
        read_time: readTime,
        quote: quote || null,
        tags,
        cover_image_url: coverImageUrl,
        published,
      });
    });
  }

  return (
    <div>
      <section className={cardCls}>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input className={inputCls} placeholder="Title" value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!initial) setSlug(slugify(e.target.value));
            }} />
          <input className={inputCls} placeholder="Slug (URL)" value={slug}
            onChange={(e) => setSlug(e.target.value)} />
          <input className={inputCls} placeholder="Category" value={category}
            onChange={(e) => setCategory(e.target.value)} />
          <input className={inputCls} placeholder="Author" value={author}
            onChange={(e) => setAuthor(e.target.value)} />
          <input className={inputCls} placeholder="Date (e.g. 2026)" value={dateLabel}
            onChange={(e) => setDateLabel(e.target.value)} />
          <input className={inputCls} placeholder="Read time (e.g. 5 min read)" value={readTime}
            onChange={(e) => setReadTime(e.target.value)} />
        </div>

        <textarea className={inputCls + " mb-3"} rows={2} placeholder="Excerpt" value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)} />

        <input className={inputCls + " mb-3"} placeholder="Pull quote (optional)" value={quote}
          onChange={(e) => setQuote(e.target.value)} />

        <textarea className={inputCls + " mb-3 font-mono"} rows={10}
          placeholder="Content (HTML is supported, e.g. <p>...</p>)"
          value={content} onChange={(e) => setContent(e.target.value)} />

        <input className={inputCls + " mb-3"} placeholder="Tags, comma separated" value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)} />

        <div className="mb-3">
          <label className="text-xs font-medium text-neutral-600 mb-1 block">Cover image</label>
          {coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverImageUrl} alt="" className="w-48 h-28 object-cover rounded-md mb-2 border" />
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
          {uploading && <span className="text-xs text-neutral-500 ml-2">Uploading…</span>}
        </div>

        <label className="flex items-center gap-2 text-sm mb-4">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Published (visible on the site)
        </label>

        <button
          disabled={pending || uploading}
          onClick={save}
          className="bg-blue-600 text-white text-sm font-medium py-2 px-5 rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save post"}
        </button>
      </section>
    </div>
  );
}
