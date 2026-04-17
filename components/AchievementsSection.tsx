'use client';

import { motion } from 'motion/react';
import { Trophy, Star, Music } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ACHIEVEMENTS: { year: string; title: string; category: string; icon: LucideIcon }[] = [
  { year: "2017", title: "All Island Award", category: "Song Version Primary", icon: Music },
  { year: "2016", title: "Music Section 1st Place", category: "Junior Song Translation", icon: Star },
  { year: "2010", title: "New Pavilion & Theatre", category: "Infrastructure Milestone", icon: Trophy }
];

export function AchievementsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
            Excellence
          </div>
          <h2 className="text-4xl font-serif font-bold text-navy">Recent Achievements</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative p-12 bg-blue-tint rounded-brand text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-navy rounded-full mb-6 shadow-sm">
                <item.icon size={32} />
              </div>
              <div className="text-gold-heritage font-bold text-xl mb-2">{item.year}</div>
              <h3 className="text-xl font-serif font-bold text-navy mb-2">{item.title}</h3>
              <p className="text-sm text-midnight/60 uppercase tracking-widest">{item.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
