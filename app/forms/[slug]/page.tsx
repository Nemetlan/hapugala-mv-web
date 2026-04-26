import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FormField } from '@/components/admin/FormBuilder';

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FormPage({ params }: FormPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: form } = await supabase
    .from('forms')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!form) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-12">
            <div className="text-gold-heritage font-bold uppercase tracking-[0.3em] text-xs mb-4">
              Official Form
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-navy mb-4">
              {form.title}
            </h1>
            {form.description && (
              <p className="text-midnight/60 max-w-xl mx-auto leading-relaxed">
                {form.description}
              </p>
            )}
          </header>

          <DynamicForm 
            formId={form.id} 
            fields={form.fields as FormField[]} 
            title={form.title} 
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
