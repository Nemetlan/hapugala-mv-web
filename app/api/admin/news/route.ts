import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentAdmin } from '@/lib/supabase/admin';
import { slugify } from '@/lib/news';

type Body = {
  title?: string;
  excerpt?: string | null;
  content?: string;
  cover_image_url?: string | null;
  status?: 'draft' | 'published';
};

export async function POST(request: NextRequest) {
  const { user, isAdmin, supabase } = await getCurrentAdmin();
  if (!user || !isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const title = body.title?.trim();
  const content = body.content?.trim();
  const status = body.status === 'draft' ? 'draft' : 'published';
  const coverImageUrl = body.cover_image_url ?? null;
  const excerpt = body.excerpt?.trim() || null;

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }
  if (!content) {
    return NextResponse.json(
      { error: 'Content is required' },
      { status: 400 },
    );
  }

  // Generate a unique slug.
  const baseSlug = slugify(title);
  let slug = baseSlug;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { data: existing } = await supabase
      .from('news_posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (!existing) break;
    slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
  }

  const { data, error } = await supabase
    .from('news_posts')
    .insert({
      title,
      slug,
      excerpt,
      content,
      cover_image_url: coverImageUrl,
      status,
      author_id: user.id,
      published_at: new Date().toISOString(),
    })
    .select('id, slug, status')
    .single();

  if (error) {
    console.error('[v0] insert news error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: 201 });
}
