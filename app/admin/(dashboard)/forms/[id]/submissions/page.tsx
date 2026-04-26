import { redirect, notFound } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/supabase/admin';
import Link from 'next/link';
import { ChevronLeft, Download, Trash2 } from 'lucide-react';

interface SubmissionsPageProps {
  params: Promise<{ id: string }>;
}

export default async function FormSubmissionsPage({ params }: SubmissionsPageProps) {
  const { id } = await params;
  const { isAdmin, supabase } = await getCurrentAdmin();

  if (!isAdmin) {
    redirect('/admin');
  }

  const { data: form } = await supabase
    .from('forms')
    .select('title, fields')
    .eq('id', id)
    .single();

  if (!form) {
    notFound();
  }

  const { data: submissions } = await supabase
    .from('form_submissions')
    .select('*')
    .eq('form_id', id)
    .order('created_at', { ascending: false });

  const fields = form.fields as any[];

  return (
    <main className="p-8 sm:p-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <Link 
            href="/admin/forms"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-gold-heritage transition-colors mb-4"
          >
            <ChevronLeft size={14} />
            Back to Forms
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold-heritage font-semibold mb-2">
                Submissions
              </div>
              <h1 className="text-4xl font-serif font-bold text-white">
                {form.title}
              </h1>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-midnight transition-all border border-white/10">
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </header>

        {(!submissions || submissions.length === 0) ? (
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-20 text-center">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">No submissions yet</h2>
            <p className="text-white/40">When users fill out your form, their responses will appear here.</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden overflow-x-auto shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Date</th>
                  {fields.map(f => (
                    <th key={f.id} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40 min-w-[150px]">
                      {f.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-xs text-white/60 whitespace-nowrap">
                      {new Date(sub.created_at).toLocaleString()}
                    </td>
                    {fields.map(f => (
                      <td key={f.id} className="px-6 py-4 text-sm text-white/80">
                        {typeof sub.data[f.id] === 'boolean' 
                          ? (sub.data[f.id] ? 'Yes' : 'No') 
                          : (sub.data[f.id] || <span className="text-white/20 italic">Empty</span>)
                        }
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <button className="text-white/20 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
