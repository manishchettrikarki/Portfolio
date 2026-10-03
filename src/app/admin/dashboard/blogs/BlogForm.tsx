"use client";

import { useRef, useState, useTransition } from "react";
import type { BlogRow } from "@/lib/data/types";
import { slugify } from "@/lib/slug";

type Input = Omit<BlogRow, "id" | "created_at" | "updated_at">;

import { inputCls, cardCls } from "@/components/admin/ui";

export function BlogForm({
  initial,
  onSubmit,
  uploadCoverImageAction,
  uploadVideoAction,
}: {
  initial?: BlogRow;
  onSubmit: (input: Input) => Promise<void>;
  uploadCoverImageAction: (formData: FormData) => Promise<string>;
  uploadVideoAction: (formData: FormData) => Promise<string>;
}) {
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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
  const [videoUrl, setVideoUrl] = useState(initial?.video_url ?? null);
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

  async function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      alert("Video is larger than 50MB, the default Supabase Storage limit on the free tier. Raise the limit in Dashboard > Storage > Settings, or use a shorter/compressed clip.");
      return;
    }
    setUploadingVideo(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const url = await uploadVideoAction(fd);
      setVideoUrl(url);
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    } finally {
      setUploadingVideo(false);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  }

  function removeVideo() {
    setVideoUrl(null);
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
        video_url: videoUrl,
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
            <img src={coverImageUrl} alt="" className="w-48 h-28 object-cover rounded-lg mb-2 border" />
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
          {uploading && <span className="text-xs text-neutral-500 ml-2">Uploading…</span>}
        </div>

        <div className="mb-3">
          <label className="text-xs font-medium text-neutral-600 mb-1 block">Video (optional)</label>
          {videoUrl && (
            <div className="mb-2">
              <video src={videoUrl} controls className="w-64 rounded-lg border" />
              <button
                type="button"
                onClick={removeVideo}
                className="text-sm text-rose-600 mt-1 block"
              >
                Remove video
              </button>
            </div>
          )}
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            disabled={uploadingVideo}
          />
          {uploadingVideo && <span className="text-xs text-neutral-500 ml-2">Uploading…</span>}
          <p className="text-xs text-neutral-400 mt-1">Max 50MB on the free Supabase tier.</p>
        </div>

        <label className="flex items-center gap-2 text-sm mb-4">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Published (visible on the site)
        </label>

        <button
          disabled={pending || uploading || uploadingVideo}
          onClick={save}
          className="bg-indigo-600 text-white text-sm font-medium py-2 px-5 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save post"}
        </button>
      </section>
    </div>
  );
}
