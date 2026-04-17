'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { fonts } from '../fonts/fonts';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[url('https://picsum.photos/seed/college/1920/1080')] bg-cover bg-center min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/95" />
        <div className="absolute -left-16 top-10 h-60 w-60 rounded-full bg-gold-heritage/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 flex flex-col justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl rounded-[2rem] border border-white/15 bg-black/30 p-6 shadow-[0_40px_120px_-55px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-10"
        >
          <div className="text-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/80 shadow-sm sm:text-xs mb-6">
              <span className={fonts.parma.className}>Hapugala National College</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-handwriting italic text-white leading-[0.95] sm:leading-[0.98] mb-5">
              <span className={fonts.samthing.className}>Let&apos;s Go Forward</span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/80 leading-7 sm:leading-8 tracking-wide">
              A proud legacy since 1902, empowering young leaders in Galle with academic excellence, character formation, and community spirit.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-heritage to-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-midnight shadow-lg shadow-gold-heritage/20 transition duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                Explore
              </button>
              <a
                href="#about"
                className="text-sm sm:text-base font-semibold uppercase tracking-[0.18em] text-white/80 transition duration-300 hover:text-white"
              >
                Discover more
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full p-3 text-white/90 shadow-xl shadow-black/25 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold-heritage"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <ChevronDown size={28} />
          </div>
          <span className="text-[11px] uppercase tracking-[0.35em] text-white/75">Scroll</span>
        </div>
      </motion.button>
    </section>
  );
}
