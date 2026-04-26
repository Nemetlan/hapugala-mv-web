-- Form Builder module: forms + submissions
-- Idempotent — safe to re-run.

create table if not exists public.forms (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  schema jsonb not null default '{"fields": []}'::jsonb,
  status text not null default 'published' check (status in ('draft', 'published')),
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists forms_slug_idx on public.forms (slug);
create index if not exists forms_status_idx on public.forms (status);
create index if not exists forms_created_at_idx on public.forms (created_at desc);

alter table public.forms enable row level security;

drop policy if exists "forms_select" on public.forms;
create policy "forms_select"
  on public.forms
  for select
  using (status = 'published' or public.is_admin());

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

drop trigger if exists forms_touch_updated_at on public.forms;
create trigger forms_touch_updated_at
  before update on public.forms
  for each row execute function public.touch_updated_at();

-- Submissions
create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now()
);

create index if not exists form_submissions_form_id_idx
  on public.form_submissions (form_id, submitted_at desc);

alter table public.form_submissions enable row level security;

-- Anyone can submit to a published form (the API also enforces this).
drop policy if exists "form_submissions_insert_public" on public.form_submissions;
create policy "form_submissions_insert_public"
  on public.form_submissions
  for insert
  with check (
    exists (
      select 1 from public.forms f
      where f.id = form_id and f.status = 'published'
    )
  );

drop policy if exists "form_submissions_select_admin" on public.form_submissions;
create policy "form_submissions_select_admin"
  on public.form_submissions
  for select
  using (public.is_admin());

drop policy if exists "form_submissions_delete_admin" on public.form_submissions;
create policy "form_submissions_delete_admin"
  on public.form_submissions
  for delete
  using (public.is_admin());
