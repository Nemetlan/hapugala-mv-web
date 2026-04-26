-- News module: admins + news_posts with RLS
-- Idempotent: safe to re-run.

-------------------------------------------------------------------------------
-- 1. Admins table (controls who can publish news)
-------------------------------------------------------------------------------
create table if not exists public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Authenticated users can read their own admin row (used to detect admin status)
drop policy if exists "admins_select_own" on public.admins;
create policy "admins_select_own"
  on public.admins
  for select
  using (auth.uid() = id);

-- Helper function: returns true if the calling user is in public.admins.
-- security definer lets RLS policies on other tables call it without recursion.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

-------------------------------------------------------------------------------
-- 2. News posts table
-------------------------------------------------------------------------------
create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  status text not null default 'published' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_posts_published_at_idx
  on public.news_posts (published_at desc);

create index if not exists news_posts_status_idx
  on public.news_posts (status);

alter table public.news_posts enable row level security;

-- Public can read published posts; admins can read everything.
drop policy if exists "news_posts_select" on public.news_posts;
create policy "news_posts_select"
  on public.news_posts
  for select
  using (status = 'published' or public.is_admin());

-- Only admins can insert/update/delete.
drop policy if exists "news_posts_insert_admin" on public.news_posts;
create policy "news_posts_insert_admin"
  on public.news_posts
  for insert
  with check (public.is_admin());

drop policy if exists "news_posts_update_admin" on public.news_posts;
create policy "news_posts_update_admin"
  on public.news_posts
  for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "news_posts_delete_admin" on public.news_posts;
create policy "news_posts_delete_admin"
  on public.news_posts
  for delete
  using (public.is_admin());

-- Auto-update updated_at on row changes.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists news_posts_touch_updated_at on public.news_posts;
create trigger news_posts_touch_updated_at
  before update on public.news_posts
  for each row execute function public.touch_updated_at();
