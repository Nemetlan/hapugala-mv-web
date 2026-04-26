import { FormBuilder } from '@/components/admin/FormBuilder';
import { getCurrentAdmin } from '@/lib/supabase/admin';
import { redirect, notFound } from 'next/navigation';

interface EditFormPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFormPage({ params }: EditFormPageProps) {
  const { id } = await params;
  const { isAdmin, supabase } = await getCurrentAdmin();

  if (!isAdmin) {
    redirect('/admin');
  }

  const { data: form } = await supabase
    .from('forms')
    .select('*')
    .eq('id', id)
    .single();

  if (!form) {
    notFound();
  }

  return (
    <main className="p-8 sm:p-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold-heritage font-semibold mb-2">
            Editor
          </div>
          <h1 className="text-4xl font-serif font-bold text-white">
            Edit Form
          </h1>
        </header>

        <FormBuilder initialData={form} />
      </div>
    </main>
  );
}
