import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { isAdmin, supabase } = await getCurrentAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, slug, fields, is_published } = body;

    const { data, error } = await supabase
      .from('forms')
      .insert({
        title,
        description,
        slug,
        fields,
        is_published
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { isAdmin, supabase } = await getCurrentAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, description, slug, fields, is_published } = body;

    const { data, error } = await supabase
      .from('forms')
      .update({
        title,
        description,
        slug,
        fields,
        is_published,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
