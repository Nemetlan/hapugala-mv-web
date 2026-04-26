'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Newspaper, 
  FormInput, 
  Globe,
  Settings
} from 'lucide-react';
import { SignOutButton } from './SignOutButton';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/forms', label: 'Form Builder', icon: FormInput },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-navy border-r border-white/10 flex flex-col z-50">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
            <Image
              src="/logos.svg"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold-heritage font-semibold leading-none mb-1">
              Admin
            </div>
            <div className="text-white text-sm font-serif font-bold leading-none">
              Console
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = link.exact 
            ? pathname === link.href 
            : pathname.startsWith(link.href);
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? 'bg-gold-heritage text-midnight shadow-lg shadow-gold-heritage/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
        >
          <Globe size={18} />
          View Website
        </Link>
        <div className="px-4 py-2">
           <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
