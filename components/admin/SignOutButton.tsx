export function SignOutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button
        type="submit"
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:border-red-400 hover:text-red-300 transition"
      >
        Sign out
      </button>
    </form>
  );
}
