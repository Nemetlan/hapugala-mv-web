'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { History, ArrowRight } from 'lucide-react';

export default function HeritageSection() {
  return (
    <section className="py-24 bg-navy text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Our Heritage
            </div>
            <h2 className="text-4xl font-serif font-bold mb-8 leading-tight">
              Over a Century of Educational Excellence
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 text-lg">
              Founded in 1902, Hapugala Vidyalaya has grown from a humble coconut-thatched shed to a prestigious institution. Our history is a journey of resilience, philanthropy, and a steadfast commitment to the children of Hapugala.
            </p>
            <Link 
              href="/about/history"
              className="inline-flex items-center gap-2 bg-gold-heritage text-midnight px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
            >
              Explore Our Full History <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-video bg-white/10 rounded-brand overflow-hidden flex items-center justify-center">
               <History size={120} className="text-gold-heritage/20" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-serif font-bold text-gold-heritage mb-2">1902</div>
                    <div className="text-sm uppercase tracking-[0.3em] text-white/60">Founded</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
