import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Minimal API route to prevent Supabase from pausing on the free tier.
 * This should be triggered by a Cron job (e.g., Vercel Cron or GitHub Actions).
 * 
 * Schedule: Every 4 days is sufficient.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  // Basic protection: Optional secret key to prevent abuse
  if (process.env.CRON_SECRET && key !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = await createClient();
    
    // Perform a very light query to ensure the DB is active
    const { error } = await supabase
      .from('news_posts')
      .select('id')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ 
      status: 'success', 
      message: 'Keep-alive ping successful',
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Keep-alive failed:', message);
    return NextResponse.json({ 
      status: 'error', 
      message 
    }, { status: 500 });
  }
}
