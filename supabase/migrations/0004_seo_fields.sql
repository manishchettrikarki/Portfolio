-- SEO fields, all editable from the Site & About admin page.
alter table public.site_content
  add column if not exists site_url text,
  add column if not exists meta_description text,
  add column if not exists meta_keywords text,
  add column if not exists og_image_url text,
  add column if not exists twitter_handle text;
