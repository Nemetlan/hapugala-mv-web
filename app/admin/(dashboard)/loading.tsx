import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="p-8 sm:p-12 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <div className="h-3 w-20 bg-white/5 rounded-full mb-4 animate-pulse" />
          <div className="h-10 w-64 bg-white/5 rounded-xl animate-pulse" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="h-48 bg-white/5 border border-white/10 rounded-3xl animate-pulse" />
          <div className="h-48 bg-white/5 border border-white/10 rounded-3xl animate-pulse" />
        </div>

        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gold-heritage" size={32} />
        </div>
      </div>
    </div>
  );
}
