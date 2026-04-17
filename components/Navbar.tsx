'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { fonts } from '../fonts/fonts';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 px-1 pointer-events-none">
      <motion.nav
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex flex-wrap items-center justify-between gap-3 rounded-full border px-4 py-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-black/15 backdrop-blur-xl ${
          isScrolled ? 'border-white/15 bg-navy/90 shadow-2xl shadow-black/25' : 'border-white/10'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full bg-white/10 shadow-inner shadow-black/10">
            <Image
              src="/logos.svg"
              alt="Hapugala Vidyalaya logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-xs">
              <div className={fonts.parma.className}>Hapugala Vidyalaya</div>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold-heritage sm:text-[10px]">Galle</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <a href="#" className="text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:text-gold-heritage">
            Home
          </a>
          <a href="#about" className="text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:text-gold-heritage">
            About
          </a>
          <a href="#academic" className="text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:text-gold-heritage">
            Academic
          </a>
          <a href="#contact" className="text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:text-gold-heritage">
            Contact
          </a>
          <a
            href="#visit"
            className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 ${
              isScrolled ? 'bg-gold-heritage text-midnight hover:bg-white' : 'bg-white/10 text-white hover:bg-white hover:text-midnight border border-white/20'
            }`}
          >
            News
          </a>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white shadow-lg shadow-black/20 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-heritage"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.22 }}
            className="md:hidden mt-4 w-full rounded-[2rem] border border-white/10 bg-navy/95 backdrop-blur-3xl shadow-2xl shadow-black/30 overflow-hidden pointer-events-auto"
          >
            <div className="space-y-1 p-4">
              <a href="#" className="block rounded-3xl px-5 py-4 text-base font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10 hover:text-gold-heritage">
                Home
              </a>
              <a href="#about" className="block rounded-3xl px-5 py-4 text-base font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10 hover:text-gold-heritage">
                About
              </a>
              <a href="#academic" className="block rounded-3xl px-5 py-4 text-base font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10 hover:text-gold-heritage">
                Academic
              </a>
              <a href="#contact" className="block rounded-3xl px-5 py-4 text-base font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10 hover:text-gold-heritage">
                Contact
              </a>
              <a
                href="#visit"
                className="block rounded-full bg-gold-heritage px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-midnight transition hover:bg-white"
              >
                News
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
