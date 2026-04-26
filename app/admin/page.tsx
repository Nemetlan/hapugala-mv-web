import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ArrowUpRight, ShieldAlert } from 'lucide-react';
import { getCurrentAdmin } from '@/lib/supabase/admin';
import { CreatePostForm } from '@/components/admin/CreatePostForm';
import { SignOutButton } from '@/components/admin/SignOutButton';
import { formatNewsDate, type NewsPost } from '@/lib/news';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
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
    .limit(5);

  const posts = (recentPosts ?? []) as NewsPost[];
  const adminEmail = user.email ?? user.user_metadata?.email ?? '';

  return (
    <main className="min-h-screen px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-white/10">
              <Image
                src="/logos.svg"
                alt="Hapugala Vidyalaya logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold-heritage font-semibold">
                Admin Console
              </div>
              <div className="text-white text-lg font-serif font-bold leading-tight">
                Publish News
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/news"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:border-gold-heritage hover:text-gold-heritage transition"
            >
              View public feed
              <ArrowUpRight size={14} />
            </Link>
            <SignOutButton />
          </div>
        </header>

        <p className="text-white/60 text-xs uppercase tracking-[0.25em] mb-2">
          Signed in as
        </p>
        <p className="text-white text-sm mb-10 font-mono break-all">
          {adminEmail}
        </p>

        <section className="bg-white rounded-brand border border-border-grey shadow-xl p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-navy">
              Create a new post
            </h1>
            <p className="text-sm text-midnight/60 mt-2 leading-relaxed">
              Fill in the form below and publish to make the post appear on the
              public news feed instantly.
            </p>
          </div>

          <CreatePostForm />
        </section>

        <section className="mt-10">
          <h2 className="text-white text-sm uppercase tracking-[0.25em] font-bold mb-4">
            Recent posts
          </h2>
          {posts.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-brand p-8 text-center text-white/60 text-sm">
              No posts yet. Your first published post will appear here.
            </div>
          ) : (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="bg-white/5 border border-white/10 rounded-brand p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-gold-heritage font-bold mb-1">
                      {post.status} · {formatNewsDate(post.published_at)}
                    </div>
                    <div className="text-white font-serif font-bold text-lg">
                      {post.title}
                    </div>
                  </div>
                  <Link
                    href={`/news/${post.slug}`}
                    target="_blank"
                    className="self-start sm:self-center inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 hover:text-gold-heritage transition"
                  >
                    View
                    <ArrowUpRight size={14} />
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
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-brand border border-border-grey p-10 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <ShieldAlert size={28} />
        </div>
        <h1 className="text-2xl font-serif font-bold text-navy mb-3">
          Not an administrator
        </h1>
        <p className="text-midnight/70 mb-2 leading-relaxed">
          {email ? (
            <>
              The account <span className="font-mono">{email}</span> is signed
              in but is not authorised to publish news.
            </>
          ) : (
            'Your account is not authorised to publish news.'
          )}
        </p>
        <p className="text-midnight/60 text-sm mb-8 leading-relaxed">
          Ask an existing administrator to add your user to the{' '}
          <span className="font-mono">public.admins</span> table.
        </p>
        <SignOutButton />
      </div>
    </main>
  );
}
