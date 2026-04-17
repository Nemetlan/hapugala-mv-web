'use client';

import { motion } from 'motion/react';
import { SCHOOL_DATA } from '../constants';
import { Target, Compass } from 'lucide-react';

export function EthosSection() {
  return (
    <section className="py-24 bg-cream border-y border-border-grey">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
            Our Ethos
          </div>
          <h2 className="text-4xl font-serif font-bold text-navy">Vision &amp; Mission</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-12 rounded-brand border border-border-grey shadow-sm"
          >
            <div className="w-16 h-16 bg-blue-tint text-navy flex items-center justify-center rounded-brand mb-8">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-navy mb-6">Our Vision</h3>
            <p className="text-midnight/70 leading-relaxed italic">
              {SCHOOL_DATA.vision}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white p-12 rounded-brand border border-border-grey shadow-sm"
          >
            <div className="w-16 h-16 bg-gold-tint text-gold-heritage flex items-center justify-center rounded-brand mb-8">
              <Compass size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-navy mb-6">Our Mission</h3>
            <p className="text-midnight/70 leading-relaxed italic">
              {SCHOOL_DATA.mission}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
