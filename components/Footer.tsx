import Image from 'next/image';
import { SCHOOL_DATA, NAV_ITEMS } from '../constants';

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={48}
                height={48}
                className="object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
              <div>
                <div className="font-serif font-bold text-white text-xl leading-tight">
                  {SCHOOL_DATA.name.toUpperCase()}
                </div>
                <div className="text-xs text-gold-heritage font-medium tracking-widest uppercase">
                  {SCHOOL_DATA.province}
                </div>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed max-w-md mb-8">
              Established in 1902, Hapugala Vidyalaya Galle is a premier educational institution dedicated to nurturing excellence and character in every student.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-8 text-gold-heritage">Quick Links</h4>
            <ul className="space-y-4">
              {NAV_ITEMS.map(item => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/60 hover:text-gold-heritage transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-8 text-gold-heritage">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>{SCHOOL_DATA.location}</li>
              <li>{SCHOOL_DATA.province}, Sri Lanka</li>
              <li>Phone: {SCHOOL_DATA.phone}</li>
              <li>Email: {SCHOOL_DATA.email}</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 uppercase tracking-widest">
          <div>© {new Date().getFullYear()} {SCHOOL_DATA.name}. All Rights Reserved.</div>
          <div className="flex gap-8">
            <a href="/admin" className="hover:text-gold-heritage transition-colors">Admin Pannel</a>
            <a href="#" className="hover:text-gold-heritage transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
