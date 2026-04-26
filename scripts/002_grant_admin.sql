-- Grant admin access by email.
-- 1. Sign up at /auth/sign-up (or sign in with Google) so the user exists in auth.users.
-- 2. Replace the email below with the address that should be an admin.
-- 3. Run this script.

insert into public.admins (id, email)
select id, email
from auth.users
where email = 'admin@example.com'
on conflict (id) do nothing;
