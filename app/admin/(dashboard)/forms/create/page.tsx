import { FormBuilder } from '@/components/admin/FormBuilder';
import { getCurrentAdmin } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';

export default async function CreateFormPage() {
  const { isAdmin } = await getCurrentAdmin();

  if (!isAdmin) {
    redirect('/admin');
  }

  return (
    <main className="p-8 sm:p-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold-heritage font-semibold mb-2">
            Builder
          </div>
          <h1 className="text-4xl font-serif font-bold text-white">
            Create New Form
          </h1>
        </header>

        <FormBuilder />
      </div>
    </main>
  );
}
