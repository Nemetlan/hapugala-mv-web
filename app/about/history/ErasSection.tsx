'use client';

import { motion } from 'motion/react';
import { Calendar, Award } from 'lucide-react';

export default function ErasSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-24">
          {/* Pethangoda Era */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-blue-tint text-navy flex items-center justify-center rounded-full">
                <Calendar size={20} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy">The Transformative Era (1978–1992)</h3>
            </div>
            <p className="text-midnight/80 leading-relaxed mb-6">
              Under <strong>Mr. S. Pethangoda</strong>, the school saw remarkable progress. Student enrollment surged to over 800, and the school expanded to Grade 13. The Arts and Commerce streams were introduced, marking the school&apos;s evolution into a fully-fledged secondary institution.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
              <li className="flex gap-3 text-midnight/70"><Award className="text-gold-heritage shrink-0" size={18} /> Expanded to Grade 13</li>
              <li className="flex gap-3 text-midnight/70"><Award className="text-gold-heritage shrink-0" size={18} /> Introduced A/L Streams</li>
              <li className="flex gap-3 text-midnight/70"><Award className="text-gold-heritage shrink-0" size={18} /> Established Music Room</li>
              <li className="flex gap-3 text-midnight/70"><Award className="text-gold-heritage shrink-0" size={18} /> 5 Parallel Streams</li>
            </ul>
          </motion.div>

          {/* Digital Age */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-right"
          >
            <div className="flex items-center gap-4 mb-6 justify-end">
              <h3 className="text-2xl font-serif font-bold text-navy">The Digital Age & Modernization</h3>
              <div className="w-10 h-10 bg-gold-tint text-gold-heritage flex items-center justify-center rounded-full">
                <Calendar size={20} />
              </div>
            </div>
            <p className="text-midnight/80 leading-relaxed mb-6">
              From 2000 onwards, under principals like <strong>Mr. S. Kulasinha</strong> and <strong>Mr. Siril Kalansuriya</strong>, the school entered the digital age. A Computer Unit was established, a modern library building was constructed, and infrastructure like the Buddha statue and new classrooms were added.
            </p>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy text-white p-12 rounded-brand shadow-xl"
          >
            <h3 className="text-2xl font-serif font-bold mb-6 text-gold-heritage text-center">A New Era of Excellence (2010–Present)</h3>
            <p className="text-white/80 leading-relaxed mb-8 text-center">
              The leadership of <strong>Mr. K.P.K. Wipul Milinda Padikkorale</strong> and current principal <strong>Mr. Dinesh Hettiarachchi</strong> has focused on holistic development. From all-island musical honors to high academic pass rates, the school continues to shine.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gold-heritage mb-1">86%</div>
                <div className="text-xs uppercase tracking-widest text-white/60">A/L Commerce Pass Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-heritage mb-1">All-Island</div>
                <div className="text-xs uppercase tracking-widest text-white/60">Musical Honors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-heritage mb-1">117+</div>
                <div className="text-xs uppercase tracking-widest text-white/60">Years of History</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
