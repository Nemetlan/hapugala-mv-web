import { createClient } from '@/lib/supabase/server';

/**
 * Returns { user, isAdmin } for the current request. If there is no user,
 * isAdmin is false. Admin status is determined by membership in
 * public.admins.
 */
export async function getCurrentAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, isAdmin: false, supabase };
  }

  const { data: adminRow } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  return { user, isAdmin: Boolean(adminRow), supabase };
}
