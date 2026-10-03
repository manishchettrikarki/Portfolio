-- Optional video for blog posts (uploaded to portfolio-media bucket).
-- Default Supabase Storage free-tier limit is 50MB per file; raise it in
-- Dashboard > Storage > Settings if you need larger uploads.
alter table public.blogs
  add column if not exists video_url text;

-- ─── Portfolio categories (admin-managed, replaces hardcoded filters) ──────
create table if not exists public.portfolio_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.portfolio_categories enable row level security;

create policy "public can read portfolio_categories"
  on public.portfolio_categories for select using (true);

create policy "admin can write portfolio_categories"
  on public.portfolio_categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- Seed with the categories already in use so existing portfolio items keep
-- a matching category out of the box.
insert into public.portfolio_categories (slug, label, sort_order)
values ('qa', 'QA Project', 0), ('web', 'Web App', 1)
on conflict (slug) do nothing;

-- portfolio_items.category now references a managed category's slug rather
-- than being freely typed. Not a hard foreign key (categories are looked up
-- by slug, and we don't want deleting a category to cascade-delete items),
-- but the admin UI only lets you pick from existing categories going forward.
