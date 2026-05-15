'use client';

import { motion } from 'motion/react';
import { fonts } from '../fonts/fonts';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
}

export function PageHero({ 
  title, 
  subtitle, 
  description, 
  backgroundImage = "https://picsum.photos/seed/college/1920/1080" 
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-cover bg-center h-[60vh] min-h-[400px] flex flex-col justify-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle && (
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/80 shadow-sm sm:text-xs mb-6">
               <span className={fonts.parma.className}>{subtitle}</span>
            </div>
          )}

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-handwriting italic text-white leading-tight mb-6">
            <span className={fonts.samthing.className}>{title}</span>
          </h1>

          {description && (
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed tracking-wide">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
