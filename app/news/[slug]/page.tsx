import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import { formatNewsDate, type NewsPost } from '@/lib/news';

export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('news_posts')
    .select('title,excerpt,cover_image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!data) return { title: 'News · Hapugala Vidyalaya Galle' };

  return {
    title: `${data.title} · Hapugala Vidyalaya Galle`,
    description: data.excerpt ?? undefined,
    openGraph: data.cover_image_url
      ? { images: [{ url: data.cover_image_url }] }
      : undefined,
  };
}

export default async function NewsDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from('news_posts')
    .select(
      'id,title,slug,excerpt,content,cover_image_url,status,published_at,created_at',
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!data) notFound();

  const post = data as NewsPost;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <article className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 hover:text-gold-heritage transition mb-8"
            >
              <ArrowLeft size={14} />
              All news
            </Link>

            <div className="flex items-center gap-2 text-xs text-gold-heritage font-bold uppercase tracking-widest mb-4">
              <Calendar size={14} />
              {formatNewsDate(post.published_at)}
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-balance leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-white/75 leading-relaxed mb-10 text-pretty">
                {post.excerpt}
              </p>
            )}
          </div>

          {post.cover_image_url && (
            <div className="max-w-5xl mx-auto px-4 mb-12">
              <div className="relative aspect-video w-full overflow-hidden rounded-brand border border-white/10 shadow-2xl shadow-black/40">
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-cream border border-border-grey rounded-brand p-8 sm:p-12 shadow-xl">
              <div className="prose prose-lg max-w-none text-midnight/80 leading-relaxed whitespace-pre-line font-sans">
                {post.content}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-gold-heritage hover:text-midnight hover:border-gold-heritage transition"
              >
                <ArrowLeft size={14} />
                Back to news
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
