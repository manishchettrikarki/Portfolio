"use client";

import { useTransition } from "react";
import { update, remove } from "./actions";

export function TogglePublishButton({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      className="text-sm text-neutral-700 hover:underline disabled:opacity-50"
      onClick={() =>
        startTransition(async () => {
          await update(id, { published: !published });
        })
      }
    >
      {published ? "Unpublish" : "Publish"}
    </button>
  );
}

export function DeleteBlogButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      className="text-sm text-red-600 disabled:opacity-50"
      onClick={() => {
        if (!confirm("Delete this blog post?")) return;
        startTransition(async () => {
          await remove(id);
        });
      }}
    >
      Delete
    </button>
  );
}
