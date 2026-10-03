"use client";

import { useState, useTransition } from "react";
import type { PortfolioCategoryRow } from "@/lib/data/types";
import { slugify } from "@/lib/slug";

import { inputCls } from "@/components/admin/ui";

export function CategoryManager({
  categories,
  createAction,
  updateAction,
  deleteAction,
}: {
  categories: PortfolioCategoryRow[];
  createAction: (input: {
    slug: string;
    label: string;
    sort_order: number;
  }) => Promise<unknown>;
  updateAction: (id: string, input: { label: string }) => Promise<unknown>;
  deleteAction: (id: string) => Promise<unknown>;
}) {
  const [pending, startTransition] = useTransition();
  const [newLabel, setNewLabel] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState("");

  function addCategory() {
    const label = newLabel.trim();
    if (!label) return;
    startTransition(async () => {
      await createAction({
        slug: slugify(label),
        label,
        sort_order: categories.length,
      });
      setNewLabel("");
    });
  }

  function saveEdit(id: string) {
    const label = editingLabel.trim();
    if (!label) return;
    startTransition(async () => {
      await updateAction(id, { label });
      setEditingId(null);
    });
  }

  function remove(id: string, label: string) {
    if (
      !confirm(
        `Delete the "${label}" category? Portfolio items using it will keep their existing tag but won't be selectable under it anymore.`,
      )
    )
      return;
    startTransition(async () => {
      await deleteAction(id);
    });
  }

  return (
    <div className="border border-neutral-200 rounded-xl p-5 bg-white mb-6">
      <h2 className="font-semibold mb-3">Portfolio categories</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-1 bg-neutral-100 rounded-full pl-3 pr-1 py-1"
          >
            {editingId === c.id ? (
              <input
                autoFocus
                className="text-sm bg-transparent outline-none w-28"
                value={editingLabel}
                onChange={(e) => setEditingLabel(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(c.id)}
                onBlur={() => saveEdit(c.id)}
              />
            ) : (
              <button
                type="button"
                className="text-sm"
                onClick={() => {
                  setEditingId(c.id);
                  setEditingLabel(c.label);
                }}
                title="Click to rename"
              >
                {c.label}
              </button>
            )}
            <button
              type="button"
              disabled={pending}
              onClick={() => remove(c.id, c.label)}
              className="text-neutral-400 hover:text-rose-600 text-xs w-5 h-5 rounded-full flex items-center justify-center"
              aria-label={`Delete ${c.label}`}
            >
              ✕
            </button>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-neutral-500">No categories yet.</p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className={inputCls}
          placeholder="New category name"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
        />
        <button
          type="button"
          disabled={pending || !newLabel.trim()}
          onClick={addCategory}
          className="bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 shrink-0"
        >
          Add
        </button>
      </div>
    </div>
  );
}
