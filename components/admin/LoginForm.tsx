'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.replace(nextPath);
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setOauthLoading(true);

    const supabase = createClient();
    const redirectTo =
      process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
      `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        nextPath,
      )}`;

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });

    if (oauthError) {
      setError(oauthError.message);
      setOauthLoading(false);
    }
  };

  const isBusy = loading || oauthLoading;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isBusy}
        className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-border-grey bg-white px-4 py-3 text-sm font-semibold text-midnight transition hover:border-navy hover:bg-cream disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {oauthLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        Continue with Google
      </button>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-midnight/40">
        <span className="flex-grow h-px bg-border-grey" />
        or
        <span className="flex-grow h-px bg-border-grey" />
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-midnight/70">
            Email
          </span>
          <div className="relative mt-2">
            <Mail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/40"
            />
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@hapugala.lk"
              className="w-full rounded-brand border border-border-grey bg-cream pl-11 pr-4 py-3 text-sm text-midnight placeholder:text-midnight/40 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-midnight/70">
            Password
          </span>
          <div className="relative mt-2">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/40"
            />
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              className="w-full rounded-brand border border-border-grey bg-cream pl-11 pr-4 py-3 text-sm text-midnight placeholder:text-midnight/40 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
            />
          </div>
        </label>

        {error && (
          <div
            role="alert"
            className="rounded-brand border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isBusy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-gold-heritage hover:text-midnight disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Sign in
        </button>
      </form>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.12A6.91 6.91 0 0 1 5.46 12c0-.74.13-1.46.36-2.12V7.04H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.96l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
