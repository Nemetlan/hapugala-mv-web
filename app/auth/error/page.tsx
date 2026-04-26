import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-brand border border-border-grey p-10 text-center shadow-sm">
        <h1 className="text-2xl font-serif font-bold text-navy mb-4">
          Authentication failed
        </h1>
        <p className="text-midnight/70 mb-8 leading-relaxed">
          Something went wrong while signing you in. Please try again.
        </p>
        <Link
          href="/admin/login"
          className="inline-block rounded-full bg-navy text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-heritage hover:text-midnight transition"
        >
          Back to login
        </Link>
      </div>
    </main>
  );
}
