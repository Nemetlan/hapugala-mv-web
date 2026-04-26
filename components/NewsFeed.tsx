'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { formatNewsDate, type NewsPost } from '@/lib/news';

const FALLBACK_IMAGE = 'https://picsum.photos/seed/hapugala-news/600/400';

export function NewsFeed({
  posts,
  emptyMessage = 'No news posted yet.',
}: {
  posts: NewsPost[];
  emptyMessage?: string;
}) {
  if (posts.length === 0) {
    return (
      <div className="bg-white border border-border-grey rounded-brand p-12 text-center text-midnight/60">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, idx) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: Math.min(idx, 5) * 0.08 }}
          whileHover={{ y: -10 }}
          className="bg-white rounded-brand overflow-hidden border border-border-grey shadow-sm group flex flex-col"
        >
          <Link href={`/news/${post.slug}`} className="flex flex-col h-full">
            <div className="aspect-video overflow-hidden relative bg-cream">
              <Image
                src={post.cover_image_url || FALLBACK_IMAGE}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs text-gold-heritage font-bold uppercase tracking-widest mb-4">
                <Calendar size={14} />
                {formatNewsDate(post.published_at)}
              </div>
              <h3 className="text-xl font-serif font-bold text-navy mb-4 group-hover:text-gold-heritage transition-colors text-balance">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-midnight/70 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <span className="mt-auto text-xs font-bold uppercase tracking-widest text-navy group-hover:text-gold-heritage transition-colors">
                Read More →
              </span>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
