import { put } from '@vercel/blob';
import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentAdmin } from '@/lib/supabase/admin';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  const { isAdmin } = await getCurrentAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: 'Image must be under 5MB' },
        { status: 400 },
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const pathname = `news/${Date.now()}-${safeName}`;

    const blob = await put(pathname, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (error) {
    console.error('[v0] news upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
