import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, FormInput, ArrowUpRight, MessageSquare, Settings } from 'lucide-react';
import { getCurrentAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export default async function FormsAdminPage() {
  const { user, isAdmin, supabase } = await getCurrentAdmin();

  if (!user) {
    redirect('/admin/login');
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen p-8 sm:p-12 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-serif font-bold text-navy mb-4">Not Authorized</h1>
          <p className="text-midnight/60 mb-8">You do not have permission to manage forms.</p>
          <Link href="/admin" className="text-gold-heritage font-bold underline">Back to Dashboard</Link>
        </div>
      </main>
    );
  }

  const { data: forms } = await supabase
    .from('forms')
    .select('*, form_submissions(count)')
    .order('created_at', { ascending: false });

  return (
    <main className="p-8 sm:p-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold-heritage font-semibold mb-2">
              Forms
            </div>
            <h1 className="text-4xl font-serif font-bold text-white">
              Form Builder
            </h1>
          </div>
          <Link 
            href="/admin/forms/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-heritage text-midnight font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors shadow-lg shadow-gold-heritage/20"
          >
            <Plus size={16} />
            Create New Form
          </Link>
        </header>

        {(!forms || forms.length === 0) ? (
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 text-white/20 mb-6">
              <FormInput size={40} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white mb-2">No forms built yet</h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto">
              Create custom forms for registrations, feedback, or inquiries and collect submissions in one place.
            </p>
            <Link 
              href="/admin/forms/create"
              className="px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-midnight transition-all"
            >
              Start Building
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {forms.map((form) => (
              <div
                key={form.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-full ${
                        form.is_published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/10 text-white/40'
                      }`}>
                        {form.is_published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                        {new Date(form.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-heritage transition-colors">
                      {form.title}
                    </h3>
                    {form.description && (
                      <p className="text-sm text-white/40 line-clamp-1 mt-1">
                        {form.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/forms/${form.id}/submissions`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/60 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all"
                    >
                      <MessageSquare size={14} />
                      {form.form_submissions?.[0]?.count || 0} Submissions
                    </Link>
                    <Link
                      href={`/admin/forms/${form.id}/edit`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/60 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Settings size={14} />
                      Edit
                    </Link>
                    <Link
                      href={`/forms/${form.slug}`}
                      target="_blank"
                      className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-white/5 text-white/40 hover:bg-gold-heritage hover:text-midnight transition-all"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
