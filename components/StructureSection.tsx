'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const SECTIONS = [
  { title: "Primary", description: "Grade 1 to 5", image: "https://picsum.photos/seed/primary/600/400" },
  { title: "Secondary", description: "Grade 6 to 11", image: "https://picsum.photos/seed/secondary/600/400" },
  { title: "A/L Commerce", description: "Advanced Level", image: "https://picsum.photos/seed/commerce/600/400" },
  { title: "A/L Science", description: "Advanced Level", image: "https://picsum.photos/seed/science/600/400" }
];

export function StructureSection() {
  return (
    <section id="academic" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
            Academic Pathways
          </div>
          <h2 className="text-4xl font-serif font-bold text-navy">School Structure</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTIONS.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-brand overflow-hidden mb-4">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors"></div>
              </div>
              <h3 className="text-xl font-serif font-bold text-navy group-hover:text-gold-heritage transition-colors">
                {section.title}
              </h3>
              <p className="text-sm text-midnight/60 uppercase tracking-widest mt-1">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
