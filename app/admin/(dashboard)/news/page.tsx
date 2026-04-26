import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { getCurrentAdmin } from '@/lib/supabase/admin';
import { CreatePostForm } from '@/components/admin/CreatePostForm';
import { formatNewsDate, type NewsPost } from '@/lib/news';

export const dynamic = 'force-dynamic';

export default async function NewsAdminPage() {
  const { user, isAdmin, supabase } = await getCurrentAdmin();

  if (!user) {
    redirect('/admin/login');
  }

  if (!isAdmin) {
    return <NotAuthorized email={user.email ?? null} />;
  }

  const { data: recentPosts } = await supabase
    .from('news_posts')
    .select('id,title,slug,excerpt,cover_image_url,status,published_at,content,created_at')
    .order('published_at', { ascending: false })
    .limit(10);

  const posts = (recentPosts ?? []) as NewsPost[];

  return (
    <main className="p-8 sm:p-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold-heritage font-semibold mb-2">
            Publishing
          </div>
          <h1 className="text-4xl font-serif font-bold text-white">
            News Management
          </h1>
        </header>

        <section className="bg-white rounded-[2.5rem] border border-border-grey shadow-2xl p-6 sm:p-10 mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-navy">
              Create a new post
            </h2>
            <p className="text-sm text-midnight/60 mt-2 leading-relaxed">
              Fill in the form below and publish to make the post appear on the
              public news feed instantly.
            </p>
          </div>

          <CreatePostForm />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-sm uppercase tracking-[0.25em] font-bold">
              Recent posts
            </h2>
            <Link
              href="/news"
              target="_blank"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-heritage hover:text-white transition"
            >
              View public feed
              <ArrowUpRight size={12} />
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center text-white/40 text-sm">
              No posts yet. Your first published post will appear here.
            </div>
          ) : (
            <ul className="grid gap-4">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group hover:bg-white/10 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-full ${
                        post.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/10 text-white/60'
                      }`}>
                        {post.status}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                        {formatNewsDate(post.published_at)}
                      </span>
                    </div>
                    <div className="text-white font-serif font-bold text-xl group-hover:text-gold-heritage transition-colors">
                      {post.title}
                    </div>
                  </div>
                  <Link
                    href={`/news/${post.slug}`}
                    target="_blank"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40 group-hover:bg-gold-heritage group-hover:text-midnight transition-all shadow-lg"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

function NotAuthorized({ email }: { email: string | null }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
       <div className="max-w-md w-full bg-white rounded-brand border border-border-grey p-10 text-center shadow-xl">
        <h1 className="text-2xl font-serif font-bold text-navy mb-3">
          Not Authorized
        </h1>
        <p className="text-midnight/70 mb-8">
          The account {email} is not authorized to manage news.
        </p>
        <Link href="/admin/login" className="text-gold-heritage font-bold underline">
          Return to Login
        </Link>
      </div>
    </div>
  );
}
