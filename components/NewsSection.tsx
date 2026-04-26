import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { NewsFeed } from './NewsFeed';
import type { NewsPost } from '@/lib/news';

export async function NewsSection() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('news_posts')
    .select(
      'id,title,slug,excerpt,content,cover_image_url,status,published_at,created_at',
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3);

  const posts = (data ?? []) as NewsPost[];

  return (
    <section
      id="news"
      className="py-24 bg-cream border-t border-border-grey scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-6 justify-between items-start mb-16 md:flex-row md:items-end">
          <div>
            <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Updates
            </div>
            <h2 className="text-4xl font-serif font-bold text-navy">
              Latest News
            </h2>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-navy hover:bg-navy hover:text-white transition"
          >
            View all news
            <ArrowRight size={14} />
          </Link>
        </div>

        <NewsFeed
          posts={posts}
          emptyMessage="No news posted yet. Check back soon for updates."
        />
      </div>
    </section>
  );
}
