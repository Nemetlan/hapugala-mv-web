import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { formId, data } = body;

    if (!formId || !data) {
      return NextResponse.json({ error: 'Missing formId or data' }, { status: 400 });
    }

    // Verify form is published
    const { data: form, error: formError } = await supabase
      .from('forms')
      .select('is_published')
      .eq('id', formId)
      .single();

    if (formError || !form?.is_published) {
      return NextResponse.json({ error: 'Form not found or not published' }, { status: 404 });
    }

    const { error } = await supabase
      .from('form_submissions')
      .insert({
        form_id: formId,
        data
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
