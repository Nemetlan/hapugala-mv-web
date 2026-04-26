import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { LoginForm } from '@/components/admin/LoginForm';

type SearchParams = Promise<{ next?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { next } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(next || '/admin');
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="flex items-center gap-3 mb-8 justify-center"
          aria-label="Back to home"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10">
            <Image
              src="/logos.svg"
              alt="Hapugala Vidyalaya"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              Hapugala Vidyalaya
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold-heritage">
              Admin Console
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-brand border border-border-grey shadow-xl p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-serif font-bold text-navy">
              Sign in to publish news
            </h1>
            <p className="text-sm text-midnight/60 mt-2 leading-relaxed">
              Restricted access. Only authorised administrators can post
              updates.
            </p>
          </div>

          <LoginForm nextPath={next || '/admin'} />
        </div>

        <p className="text-center text-xs text-white/50 mt-6 uppercase tracking-[0.2em]">
          <Link href="/news" className="hover:text-gold-heritage transition">
            Public news feed
          </Link>
        </p>
      </div>
    </main>
  );
}
