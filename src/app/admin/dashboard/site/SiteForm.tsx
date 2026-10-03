"use client";

import { useRef, useState, useTransition } from "react";
import type { SiteContentRow } from "@/lib/data/types";
import {
  saveSiteContent,
  uploadProfilePicture,
  removeProfilePicture,
  uploadSocialImage,
  removeSocialImage,
} from "./actions";

import { inputCls, labelCls, cardCls } from "@/components/admin/ui";

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

  const [siteUrl, setSiteUrl] = useState(site.site_url ?? "");
  const [metaDescription, setMetaDescription] = useState(site.meta_description ?? "");
  const [metaKeywords, setMetaKeywords] = useState(site.meta_keywords ?? "");
  const [twitterHandle, setTwitterHandle] = useState(site.twitter_handle ?? "");
  const [ogImageUrl, setOgImageUrl] = useState(site.og_image_url);
  const [uploadingOg, setUploadingOg] = useState(false);
  const ogInputRef = useRef<HTMLInputElement>(null);

  async function handleOgChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingOg(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      await uploadSocialImage(fd);
      setOgImageUrl(URL.createObjectURL(file));
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    } finally {
      setUploadingOg(false);
      if (ogInputRef.current) ogInputRef.current.value = "";
    }
  }

  function removeOg() {
    startTransition(async () => {
      await removeSocialImage();
      setOgImageUrl(null);
    });
  }

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
        site_url: siteUrl,
        meta_description: metaDescription,
        meta_keywords: metaKeywords,
        twitter_handle: twitterHandle,
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
                className="text-sm text-rose-600 mt-2 block"
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

      {/* ── SEO & social sharing ───────────────────────────────────── */}
      <section className={cardCls}>
        <h2 className="font-semibold mb-1">SEO &amp; social sharing</h2>
        <p className="text-xs text-neutral-500 mb-4">
          Controls what shows up in Google results and when the site is
          shared on social media.
        </p>

        <div className="mb-4">
          <label className={labelCls}>
            Site URL (your live domain, no trailing slash)
          </label>
          <input
            className={inputCls}
            placeholder="https://yourdomain.com"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
          />
          <p className="text-xs text-neutral-400 mt-1">
            Required for the sitemap, canonical URLs, and social preview
            links to work correctly.
          </p>
        </div>

        <div className="mb-4">
          <label className={labelCls}>Meta description</label>
          <textarea
            className={inputCls}
            rows={2}
            placeholder="Shown under the title in Google search results. Falls back to your tagline if left blank."
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className={labelCls}>Meta keywords (optional, comma separated)</label>
          <input
            className={inputCls}
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className={labelCls}>Twitter / X handle (optional)</label>
          <input
            className={inputCls}
            placeholder="@yourhandle"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
          />
        </div>

        <div>
          <label className={labelCls}>Social share image (OG image)</label>
          {ogImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ogImageUrl}
              alt=""
              className="w-48 h-auto aspect-[1200/630] object-cover rounded-lg border mb-2"
            />
          ) : (
            <p className="text-xs text-neutral-400 mb-2">
              No image set — your profile picture will be used instead, if
              you've uploaded one.
            </p>
          )}
          <input
            ref={ogInputRef}
            type="file"
            accept="image/*"
            disabled={uploadingOg}
            onChange={handleOgChange}
          />
          {uploadingOg && <span className="text-xs text-neutral-500 ml-2">Uploading…</span>}
          {ogImageUrl && !uploadingOg && (
            <button type="button" onClick={removeOg} className="text-sm text-rose-600 mt-2 block">
              Remove image
            </button>
          )}
          <p className="text-xs text-neutral-400 mt-1">
            Recommended size: 1200×630px.
          </p>
        </div>
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
              className="text-rose-600 text-sm px-2"
              onClick={() => setSocial(social.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-indigo-600 mt-1"
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
              className="text-rose-600 text-sm px-2"
              onClick={() => setShortInfo(shortInfo.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-indigo-600 mt-1"
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
              className="text-rose-600 text-sm px-2"
              onClick={() => setCounters(counters.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-indigo-600 mt-1"
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
              className="text-rose-600 text-sm px-2"
              onClick={() => setSkills(skills.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-indigo-600 mt-1"
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
              className="text-rose-600 text-sm px-2"
              onClick={() => setSkillList(skillList.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-indigo-600 mt-1"
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
          className="bg-indigo-600 text-white text-sm font-medium py-2 px-5 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
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