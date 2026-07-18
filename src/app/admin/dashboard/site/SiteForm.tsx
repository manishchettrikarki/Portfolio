"use client";

import { useRef, useState, useTransition } from "react";
import type { SiteContentRow } from "@/lib/data/types";
import { saveSiteContent, uploadProfilePicture, removeProfilePicture } from "./actions";

const inputCls =
  "border border-gray-300 rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls = "text-xs font-medium text-neutral-600 mb-1 block";
const cardCls = "border border-neutral-200 rounded-lg p-5 bg-white mb-6";

export function SiteForm({ site }: { site: SiteContentRow }) {
  const [pending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const [profileImageUrl, setProfileImageUrl] = useState(site.profile_image_url);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      await uploadProfilePicture(fd);
      setProfileImageUrl(URL.createObjectURL(file)); // optimistic preview
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    } finally {
      setUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  }

  function removePhoto() {
    startTransition(async () => {
      await removeProfilePicture();
      setProfileImageUrl(null);
    });
  }

  const [name, setName] = useState(site.name);
  const [role, setRole] = useState(site.role);
  const [tagline, setTagline] = useState(site.tagline);
  const [email, setEmail] = useState(site.email);
  const [phone, setPhone] = useState(site.phone);
  const [location, setLocation] = useState(site.location);
  const [aboutBio, setAboutBio] = useState(site.about_bio);

  const [social, setSocial] = useState(site.social);
  const [shortInfo, setShortInfo] = useState(site.short_info);
  const [counters, setCounters] = useState(site.counters);
  const [skills, setSkills] = useState(site.skills);
  const [skillList, setSkillList] = useState(site.skill_list);

  function save() {
    startTransition(async () => {
      await saveSiteContent({
        name,
        role,
        tagline,
        email,
        phone,
        location,
        about_bio: aboutBio,
        social,
        short_info: shortInfo,
        counters,
        skills,
        skill_list: skillList,
      });
      setSavedAt(Date.now());
    });
  }

  return (
    <div>
      {/* ── Profile picture ────────────────────────────────────────── */}
      <section className={cardCls}>
        <h2 className="font-semibold mb-4">Profile picture</h2>
        <div className="flex items-center gap-4">
          {profileImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profileImageUrl}
              alt=""
              className="w-24 h-24 object-cover rounded-full border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-neutral-100 border flex items-center justify-center text-xs text-neutral-400">
              No photo
            </div>
          )}
          <div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              disabled={uploadingPhoto}
              onChange={handlePhotoChange}
            />
            {uploadingPhoto && (
              <p className="text-xs text-neutral-500 mt-1">Uploading…</p>
            )}
            {profileImageUrl && !uploadingPhoto && (
              <button
                type="button"
                onClick={removePhoto}
                className="text-sm text-red-600 mt-2 block"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Basic info ─────────────────────────────────────────────── */}
      <section className={cardCls}>
        <h2 className="font-semibold mb-4">Basic info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Name</label>
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Role / title</label>
            <input className={inputCls} value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Tagline</label>
            <input className={inputCls} value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Location</label>
            <input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
      </section>

      {/* ── About bio ──────────────────────────────────────────────── */}
      <section className={cardCls}>
        <h2 className="font-semibold mb-4">About bio</h2>
        <textarea
          className={inputCls}
          rows={5}
          value={aboutBio}
          onChange={(e) => setAboutBio(e.target.value)}
        />
      </section>

      {/* ── Social links ───────────────────────────────────────────── */}
      <section className={cardCls}>
        <h2 className="font-semibold mb-4">Social links</h2>
        {social.map((s, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_1fr_auto] gap-2 mb-2">
            <input
              className={inputCls}
              placeholder="icon (e.g. linkedin)"
              value={s.icon}
              onChange={(e) =>
                setSocial(social.map((x, j) => (j === i ? { ...x, icon: e.target.value } : x)))
              }
            />
            <input
              className={inputCls}
              placeholder="url"
              value={s.url}
              onChange={(e) =>
                setSocial(social.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))
              }
            />
            <input
              className={inputCls}
              placeholder="label"
              value={s.label}
              onChange={(e) =>
                setSocial(social.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
              }
            />
            <button
              type="button"
              className="text-red-600 text-sm px-2"
              onClick={() => setSocial(social.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-blue-600 mt-1"
          onClick={() => setSocial([...social, { icon: "", url: "", label: "" }])}
        >
          + Add social link
        </button>
      </section>

      {/* ── Short info ─────────────────────────────────────────────── */}
      <section className={cardCls}>
        <h2 className="font-semibold mb-4">Short info (sidebar list)</h2>
        {shortInfo.map((s, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_2fr_auto] gap-2 mb-2">
            <input
              className={inputCls}
              placeholder="label"
              value={s.label}
              onChange={(e) =>
                setShortInfo(shortInfo.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
              }
            />
            <input
              className={inputCls}
              placeholder="value"
              value={s.value}
              onChange={(e) =>
                setShortInfo(shortInfo.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))
              }
            />
            <input
              className={inputCls}
              placeholder="href (optional)"
              value={s.href ?? ""}
              onChange={(e) =>
                setShortInfo(shortInfo.map((x, j) => (j === i ? { ...x, href: e.target.value } : x)))
              }
            />
            <button
              type="button"
              className="text-red-600 text-sm px-2"
              onClick={() => setShortInfo(shortInfo.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-blue-600 mt-1"
          onClick={() => setShortInfo([...shortInfo, { label: "", value: "" }])}
        >
          + Add row
        </button>
      </section>

      {/* ── Counters ───────────────────────────────────────────────── */}
      <section className={cardCls}>
        <h2 className="font-semibold mb-4">Counters</h2>
        {counters.map((c, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_2fr_auto] gap-2 mb-2">
            <input
              type="number"
              className={inputCls}
              placeholder="value"
              value={c.value}
              onChange={(e) =>
                setCounters(counters.map((x, j) => (j === i ? { ...x, value: Number(e.target.value) } : x)))
              }
            />
            <input
              className={inputCls}
              placeholder="suffix (e.g. +)"
              value={c.suffix}
              onChange={(e) =>
                setCounters(counters.map((x, j) => (j === i ? { ...x, suffix: e.target.value } : x)))
              }
            />
            <input
              className={inputCls}
              placeholder="label"
              value={c.label}
              onChange={(e) =>
                setCounters(counters.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
              }
            />
            <button
              type="button"
              className="text-red-600 text-sm px-2"
              onClick={() => setCounters(counters.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-blue-600 mt-1"
          onClick={() => setCounters([...counters, { value: 0, suffix: "+", label: "" }])}
        >
          + Add counter
        </button>
      </section>

      {/* ── Skills (progress bars) ─────────────────────────────────── */}
      <section className={cardCls}>
        <h2 className="font-semibold mb-4">Skills (with %)</h2>
        {skills.map((s, i) => (
          <div key={i} className="grid grid-cols-[2fr_1fr_auto] gap-2 mb-2">
            <input
              className={inputCls}
              placeholder="skill name"
              value={s.name}
              onChange={(e) =>
                setSkills(skills.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
              }
            />
            <input
              type="number"
              min={0}
              max={100}
              className={inputCls}
              placeholder="0-100"
              value={s.value}
              onChange={(e) =>
                setSkills(skills.map((x, j) => (j === i ? { ...x, value: Number(e.target.value) } : x)))
              }
            />
            <button
              type="button"
              className="text-red-600 text-sm px-2"
              onClick={() => setSkills(skills.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-blue-600 mt-1"
          onClick={() => setSkills([...skills, { name: "", value: 50 }])}
        >
          + Add skill
        </button>
      </section>

      {/* ── Skill list (tags) ──────────────────────────────────────── */}
      <section className={cardCls}>
        <h2 className="font-semibold mb-4">Skill tags</h2>
        {skillList.map((s, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto] gap-2 mb-2">
            <input
              className={inputCls}
              value={s}
              onChange={(e) => setSkillList(skillList.map((x, j) => (j === i ? e.target.value : x)))}
            />
            <button
              type="button"
              className="text-red-600 text-sm px-2"
              onClick={() => setSkillList(skillList.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-blue-600 mt-1"
          onClick={() => setSkillList([...skillList, ""])}
        >
          + Add tag
        </button>
      </section>

      <div className="flex items-center gap-3 sticky bottom-4">
        <button
          type="button"
          disabled={pending}
          onClick={save}
          className="bg-blue-600 text-white text-sm font-medium py-2 px-5 rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {savedAt && !pending && (
          <span className="text-sm text-green-600">Saved ✓</span>
        )}
      </div>
    </div>
  );
}