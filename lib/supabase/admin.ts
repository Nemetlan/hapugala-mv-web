import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

/**
 * Returns { user, isAdmin, supabase } for the current request.
 * Wrapped in React cache() to ensure it only runs once per request even if called
 * from multiple components (e.g., layout and page).
 */
export const getCurrentAdmin = cache(async () => {
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
});
