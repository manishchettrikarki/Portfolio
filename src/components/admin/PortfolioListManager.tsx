"use client";

import { useRef, useState, useTransition } from "react";
import type { PortfolioItemRow } from "@/lib/data/types";

type Item = PortfolioItemRow;
type Input = Omit<Item, "id" | "created_at">;

const inputCls =
  "border border-gray-300 rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
const cardCls = "border border-neutral-200 rounded-lg p-5 bg-white mb-4";

const emptyForm: Input = {
  title: "",
  category: "",
  category_label: "",
  type: "image",
  client: "",
  project_date: "",
  url: "",
  image_url: null,
  description: "",
  technologies: [],
  sort_order: 0,
};

export function PortfolioListManager({
  items,
  createAction,
  updateAction,
  deleteAction,
  uploadImageAction,
}: {
  items: Item[];
  createAction: (input: Input) => Promise<unknown>;
  updateAction: (id: string, input: Partial<Input>) => Promise<unknown>;
  deleteAction: (id: string) => Promise<unknown>;
  uploadImageAction: (formData: FormData) => Promise<string>;
}) {
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<Input>(emptyForm);
  const [techInput, setTechInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function startEdit(item?: Item) {
    if (item) {
      setEditingId(item.id);
      setForm({
        title: item.title,
        category: item.category,
        category_label: item.category_label,
        type: item.type,
        client: item.client,
        project_date: item.project_date,
        url: item.url,
        image_url: item.image_url,
        description: item.description,
        technologies: item.technologies,
        sort_order: item.sort_order,
      });
      setTechInput(item.technologies.join(", "));
    } else {
      setEditingId("new");
      setForm({ ...emptyForm, sort_order: items.length });
      setTechInput("");
    }
  }

  function cancel() {
    setEditingId(null);
    setForm(emptyForm);
    setTechInput("");
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const url = await uploadImageAction(fd);
      setForm((f) => ({ ...f, image_url: url }));
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function save() {
    const technologies = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { ...form, technologies };

    startTransition(async () => {
      if (editingId === "new") await createAction(payload);
      else if (editingId) await updateAction(editingId, payload);
      cancel();
    });
  }

  function remove(id: string) {
    if (!confirm("Delete this portfolio item?")) return;
    startTransition(async () => {
      await deleteAction(id);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Portfolio</h1>
        {editingId === null && (
          <button
            onClick={() => startEdit()}
            className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700"
          >
            + Add project
          </button>
        )}
      </div>

      {editingId !== null && (
        <section className={cardCls}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input className={inputCls} placeholder="Title" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className={inputCls} placeholder="Client" value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })} />
            <input className={inputCls} placeholder="Category (slug, e.g. web)" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className={inputCls} placeholder="Category label (e.g. Web App)" value={form.category_label}
              onChange={(e) => setForm({ ...form, category_label: e.target.value })} />
            <select className={inputCls} value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as Item["type"] })}>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
            </select>
            <input className={inputCls} placeholder="Date (e.g. 2025)" value={form.project_date}
              onChange={(e) => setForm({ ...form, project_date: e.target.value })} />
            <input className={inputCls} placeholder="External URL (optional)" value={form.url ?? ""}
              onChange={(e) => setForm({ ...form, url: e.target.value })} />
            <input type="number" className={inputCls} placeholder="Sort order" value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          </div>

          <input className={inputCls + " mb-3"} placeholder="Technologies, comma separated"
            value={techInput} onChange={(e) => setTechInput(e.target.value)} />

          <textarea className={inputCls} rows={3} placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <div className="mt-3">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">Cover image</label>
            {form.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image_url} alt="" className="w-40 h-24 object-cover rounded-md mb-2 border" />
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
            {uploading && <span className="text-xs text-neutral-500 ml-2">Uploading…</span>}
          </div>

          <div className="flex gap-2 mt-4">
            <button disabled={pending || uploading} onClick={save}
              className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-60">
              {pending ? "Saving…" : "Save"}
            </button>
            <button onClick={cancel} className="text-sm text-neutral-600 py-2 px-4 rounded-md hover:bg-neutral-100">
              Cancel
            </button>
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.id} className={cardCls}>
            {item.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image_url} alt="" className="w-full h-32 object-cover rounded-md mb-2 border" />
            )}
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-neutral-600">{item.category_label} · {item.client}</p>
            <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => startEdit(item)} className="text-sm text-blue-600">Edit</button>
              <button onClick={() => remove(item.id)} className="text-sm text-red-600">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-neutral-500">No portfolio items yet.</p>}
      </div>
    </div>
  );
}
