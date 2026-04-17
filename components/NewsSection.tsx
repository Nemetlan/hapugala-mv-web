'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

const NEWS = [
  { date: "Oct 20, 2025", title: "Annual Sports Meet 2025", excerpt: "Join us for a day of athletic excellence and house spirit on the banks of the Gin River.", image: "https://picsum.photos/seed/sports/600/400" },
  { date: "Sep 15, 2025", title: "Science Day Exhibition", excerpt: "Our students showcase innovative STEM projects and experiments in the school main hall.", image: "https://picsum.photos/seed/lab/600/400" },
  { date: "Aug 05, 2025", title: "New IT Lab Inauguration", excerpt: "Enhancing digital literacy with state-of-the-art computer facilities for all grades.", image: "https://picsum.photos/seed/tech/600/400" }
];

export function NewsSection() {
  return (
    <section id="news" className="py-24 bg-cream border-t border-border-grey">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-6 justify-between items-start mb-16 md:flex-row md:items-end">
          <div>
            <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Updates
            </div>
            <h2 className="text-4xl font-serif font-bold text-navy">Latest News</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {NEWS.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-brand overflow-hidden border border-border-grey shadow-sm group"
            >
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-xs text-gold-heritage font-bold uppercase tracking-widest mb-4">
                  <Calendar size={14} />
                  {item.date}
                </div>
                <h3 className="text-xl font-serif font-bold text-navy mb-4 group-hover:text-gold-heritage transition-colors">
                  {item.title}
                </h3>
                <p className="text-midnight/70 text-sm leading-relaxed mb-6">
                  {item.excerpt}
                </p>
                <a href="#" className="text-xs font-bold uppercase tracking-widest text-navy hover:text-gold-heritage transition-colors">
                  Read More
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
