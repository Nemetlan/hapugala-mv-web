-- Forms module: forms + form_submissions
-- Idempotent: safe to re-run.

-------------------------------------------------------------------------------
-- 1. Forms table
-------------------------------------------------------------------------------
create table if not exists public.forms (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  fields jsonb not null default '[]'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists forms_slug_idx on public.forms (slug);

alter table public.forms enable row level security;

-- Public can read published forms.
drop policy if exists "forms_select_public" on public.forms;
create policy "forms_select_public"
  on public.forms
  for select
  using (is_published = true or public.is_admin());

-- Only admins can insert/update/delete.
drop policy if exists "forms_insert_admin" on public.forms;
create policy "forms_insert_admin"
  on public.forms
  for insert
  with check (public.is_admin());

drop policy if exists "forms_update_admin" on public.forms;
create policy "forms_update_admin"
  on public.forms
  for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "forms_delete_admin" on public.forms;
create policy "forms_delete_admin"
  on public.forms
  for delete
  using (public.is_admin());

-- Auto-update updated_at on row changes.
drop trigger if exists forms_touch_updated_at on public.forms;
create trigger forms_touch_updated_at
  before update on public.forms
  for each row execute function public.touch_updated_at();

-------------------------------------------------------------------------------
-- 2. Form submissions table
-------------------------------------------------------------------------------
create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists form_submissions_form_id_idx on public.form_submissions (form_id);

alter table public.form_submissions enable row level security;

-- Public can insert (submit) to published forms.
drop policy if exists "form_submissions_insert_public" on public.form_submissions;
create policy "form_submissions_insert_public"
  on public.form_submissions
  for insert
  with check (
    exists (
      select 1 from public.forms
      where id = form_submissions.form_id
      and is_published = true
    )
  );

-- Only admins can read submissions.
drop policy if exists "form_submissions_select_admin" on public.form_submissions;
create policy "form_submissions_select_admin"
  on public.form_submissions
  for select
  using (public.is_admin());

-- Only admins can delete submissions.
drop policy if exists "form_submissions_delete_admin" on public.form_submissions;
create policy "form_submissions_delete_admin"
  on public.form_submissions
  for delete
  using (public.is_admin());
