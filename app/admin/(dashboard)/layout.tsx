import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/supabase/admin';
import { Sidebar } from '@/components/admin/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin } = await getCurrentAdmin();

  if (!user) {
    redirect('/admin/login');
  }

  // We still allow the children to handle "NotAuthorized" state 
  // if they want to show a specific message, or we can handle it here.
  // For now, let's just let it pass through as most pages will check isAdmin.

  return (
    <div className="min-h-screen bg-midnight">
      <Sidebar />
      <div className="pl-64">
        {children}
      </div>
    </div>
  );
}
