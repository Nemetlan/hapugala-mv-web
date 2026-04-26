import { redirect } from 'next/navigation';
import { LayoutDashboard, Newspaper, FormInput, ArrowUpRight } from 'lucide-react';
import { getCurrentAdmin } from '@/lib/supabase/admin';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const { user, isAdmin, supabase } = await getCurrentAdmin();

  if (!user) {
    redirect('/admin/login');
  }

  if (!isAdmin) {
    return <NotAuthorized email={user.email ?? null} />;
  }

  // Fetch counts
  const { count: newsCount } = await supabase
    .from('news_posts')
    .select('*', { count: 'exact', head: true });

  // Note: forms table might not exist yet if SQL hasn't been run manually by user
  // but we assume it will be there.
  const { count: formsCount } = await supabase
    .from('forms')
    .select('*', { count: 'exact', head: true });

  const stats = [
    { label: 'News Posts', value: newsCount || 0, icon: Newspaper, href: '/admin/news', color: 'text-blue-400' },
    { label: 'Active Forms', value: formsCount || 0, icon: FormInput, href: '/admin/forms', color: 'text-gold-heritage' },
  ];

  return (
    <main className="p-8 sm:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold-heritage font-semibold mb-2">
            Overview
          </div>
          <h1 className="text-4xl font-serif font-bold text-white">
            Welcome, Administrator
          </h1>
          <p className="text-white/60 mt-2">
            Manage your school's digital presence from this central console.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {stats.map((stat) => (
            <Link 
              key={stat.label}
              href={stat.href}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <ArrowUpRight size={20} className="text-white/20 group-hover:text-gold-heritage transition-colors" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm font-semibold uppercase tracking-widest text-white/40">{stat.label}</div>
            </Link>
          ))}
        </div>

        <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-serif font-bold text-white mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/admin/news" 
              className="px-6 py-3 rounded-full bg-gold-heritage text-midnight font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
            >
              Post News
            </Link>
            <Link 
              href="/admin/forms" 
              className="px-6 py-3 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-midnight transition-all"
            >
              Build Form
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function NotAuthorized({ email }: { email: string | null }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-brand border border-border-grey p-10 text-center shadow-xl">
        <h1 className="text-2xl font-serif font-bold text-navy mb-3">
          Not Authorized
        </h1>
        <p className="text-midnight/70 mb-8 leading-relaxed">
          {email ? `The account ${email} is not authorized.` : 'You are not authorized to access this page.'}
        </p>
        <Link href="/admin/login" className="text-gold-heritage font-bold underline">
          Return to Login
        </Link>
      </div>
    </main>
  );
}
