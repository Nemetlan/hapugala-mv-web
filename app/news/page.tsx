import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NewsFeed } from '@/components/NewsFeed';
import { createClient } from '@/lib/supabase/server';
import type { NewsPost } from '@/lib/news';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'News · Hapugala Vidyalaya Galle',
  description:
    'Latest news, events, and announcements from Hapugala Vidyalaya Galle.',
};

export default async function NewsIndexPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('news_posts')
    .select(
      'id,title,slug,excerpt,content,cover_image_url,status,published_at,created_at',
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[v0] news index error:', error);
  }

  const posts = (data ?? []) as NewsPost[];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="pt-36 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Updates
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white text-balance">
              School News &amp; Announcements
            </h1>
            <p className="mt-6 text-white/70 max-w-2xl leading-relaxed">
              Catch up on everything happening at Hapugala Vidyalaya Galle —
              from sports meets to academic milestones and house events.
            </p>
          </div>
        </section>

        <section className="bg-cream border-t border-border-grey py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <NewsFeed posts={posts} emptyMessage="No news posted yet. Check back soon." />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
