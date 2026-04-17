'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { SCHOOL_DATA } from '../constants';

export function WelcomeSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-gold-heritage font-bold uppercase tracking-[0.2em] text-xs mb-4">
              A Message from the Principal
            </div>
            <h2 className="text-4xl font-serif font-bold text-navy mb-8 leading-tight">
              Welcome to Hapugala Vidyalaya Galle
            </h2>
            <div className="prose prose-lg text-midnight/80 font-serif italic leading-relaxed mb-8">
              &quot;To become the best school in Akmeemana division — creating a learning and teaching environment where national goals are achieved.&quot;
            </div>
            <p className="text-midnight/70 leading-relaxed mb-8">
              At Hapugala Vidyalaya Galle, we believe in nurturing a generation of knowledgeable, virtuous, and proud students who contribute meaningfully to society. Our 122-year heritage on the banks of the Gin River is a testament to our commitment to excellence.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-gold-heritage"></div>
              <div>
                <div className="font-serif font-bold text-navy">{SCHOOL_DATA.principal}</div>
                <div className="text-xs uppercase tracking-widest text-gold-heritage">Principal</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-blue-tint rounded-brand overflow-hidden relative">
              <Image
                src="https://picsum.photos/seed/principal/800/1000"
                alt="Principal"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
