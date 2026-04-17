'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NAV_ITEMS, SCHOOL_DATA } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { fonts } from '../fonts/fonts';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          width: isScrolled ? 'auto' : '100%',
          maxWidth: isScrolled ? '600px' : '1280px',
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`mx-auto pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-navy/80 backdrop-blur-xl border border-white/10 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
            style={{ mixBlendMode: 'screen' }}
          />
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:block"
            >
              <div className="font-serif font-bold text-white text-xs tracking-wider leading-tight">
                <div className={fonts.parma.className}>HAPUGALA VIDYALAYA</div>
              </div>
              <div className="text-[8px] text-gold-heritage font-medium tracking-[0.3em] uppercase">
                GALLE
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 md:gap-8">
          <a href="#" className="text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:text-gold-heritage transition-colors">Home</a>
          <a href="#about" className="text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:text-gold-heritage transition-colors">About</a>
          <a href="#academic" className="hidden sm:block text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:text-gold-heritage transition-colors">Academic</a>
          <a href="#contact" className="text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:text-gold-heritage transition-colors">Contact</a>

          <a
            href="#visit"
            className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              isScrolled
                ? 'bg-gold-heritage text-midnight hover:bg-white'
                : 'bg-white/10 text-white hover:bg-white hover:text-midnight border border-white/20'
            }`}
          >
            News
          </a>
        </div>
      </motion.nav>
    </div>
  );
}
