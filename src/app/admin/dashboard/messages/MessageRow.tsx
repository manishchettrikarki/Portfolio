"use client";

import { useTransition } from "react";
import type { ContactMessageRow } from "@/lib/data/types";
import { markRead, remove } from "./actions";

export function MessageRow({ message }: { message: ContactMessageRow }) {
  const [pending, startTransition] = useTransition();

  return (
    <div
      className={`border rounded-lg p-5 bg-white ${
        message.is_read ? "border-neutral-200" : "border-blue-300"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">
            {message.name}{" "}
            <span className="font-normal text-neutral-500">
              &lt;{message.email}&gt;
            </span>
          </p>
          {message.subject && (
            <p className="text-sm text-neutral-600 mt-0.5">{message.subject}</p>
          )}
          <p className="text-sm text-neutral-500 mt-2 whitespace-pre-wrap">
            {message.message}
          </p>
          <p className="text-xs text-neutral-400 mt-2">
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-3 shrink-0 items-center">
          <button
            disabled={pending}
            className="text-sm text-blue-600 disabled:opacity-50"
            onClick={() =>
              startTransition(() => markRead(message.id, !message.is_read))
            }
          >
            {message.is_read ? "Mark unread" : "Mark read"}
          </button>
          <button
            disabled={pending}
            className="text-sm text-red-600 disabled:opacity-50"
            onClick={() => {
              if (!confirm("Delete this message?")) return;
              startTransition(() => remove(message.id));
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
