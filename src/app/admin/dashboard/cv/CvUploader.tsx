"use client";

import { useRef, useTransition } from "react";
import { upload, remove } from "./actions";

const cardCls = "border border-neutral-200 rounded-lg p-5 bg-white";

export function CvUploader({
  cvUrl,
  cvFilename,
}: {
  cvUrl: string | null;
  cvFilename: string | null;
}) {
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.set("file", file);
    startTransition(async () => {
      try {
        await upload(fd);
      } catch (err) {
        alert((err as Error).message);
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    });
  }

  return (
    <section className={cardCls}>
      {cvUrl ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{cvFilename ?? "cv.pdf"}</p>
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600"
            >
              View / download current CV ↗
            </a>
          </div>
          <button
            disabled={pending}
            onClick={() => startTransition(() => remove())}
            className="text-sm text-red-600 disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      ) : (
        <p className="text-sm text-neutral-500 mb-3">No CV uploaded yet.</p>
      )}

      <div className="mt-4">
        <label className="text-xs font-medium text-neutral-600 mb-1 block">
          {cvUrl ? "Replace with a new PDF" : "Upload a PDF"}
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          disabled={pending}
          onChange={handleUpload}
        />
        {pending && <span className="text-xs text-neutral-500 ml-2">Uploading…</span>}
      </div>
    </section>
  );
}
