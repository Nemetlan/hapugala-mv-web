'use client';

import { motion } from 'motion/react';
import { CLUBS } from '../constants';

export function ClubsSection() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Student Life
            </div>
            <h2 className="text-4xl font-serif font-bold text-navy">Clubs &amp; Co-Curricular</h2>
          </div>
          <a href="#clubs" className="text-sm font-bold uppercase tracking-widest text-navy border-b-2 border-gold-heritage pb-1 hover:text-gold-heritage transition-colors">
            View All 15+ Clubs
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CLUBS.slice(0, 8).map((club) => (
            <motion.div
              key={club.name}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-brand border border-border-grey group cursor-pointer"
            >
              <h3 className="font-serif font-bold text-navy mb-2 group-hover:text-gold-heritage transition-colors">
                {club.name}
              </h3>
              <p className="text-xs text-midnight/60 leading-relaxed">
                {club.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
