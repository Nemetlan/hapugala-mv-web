'use client';

import { motion } from 'motion/react';
import { SCHOOL_DATA } from '../constants';

export function HouseSection() {
  return (
    <section className="py-24 bg-white border-t border-border-grey">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
            Our Community
          </div>
          <h2 className="text-4xl font-serif font-bold text-navy">The Four Houses</h2>
          <p className="mt-4 text-midnight/60 max-w-2xl mx-auto">
            Our house system fosters healthy competition, leadership, and a sense of belonging among students.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHOOL_DATA.houses.map((house) => (
            <motion.div
              key={house.name}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden rounded-brand aspect-square flex flex-col items-center justify-center text-white group"
              style={{ backgroundColor: house.hex }}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <div className="relative z-10 text-center p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-white"></div>
                </div>
                <h3 className={`text-2xl font-serif font-bold mb-1 ${house.name === 'Vijaya House' ? 'text-midnight' : 'text-white'}`}>
                  {house.name}
                </h3>
                <div className={`text-xs uppercase tracking-[0.2em] opacity-80 ${house.name === 'Vijaya House' ? 'text-midnight' : 'text-white'}`}>
                  {house.color}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
