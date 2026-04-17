'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { SCHOOL_DATA } from '../constants';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-midnight">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full"
        >
          <Image
            src="https://picsum.photos/seed/college/1920/1080"
            alt="Hapugala Vidyalaya Galle Campus"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl font-handwriting text-white mb-4 leading-tight tracking-normal">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="block"
            >
              Let&apos;s Go Forward
            </motion.span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-gold-heritage font-serif italic text-xl md:text-2xl tracking-widest"
          >
            Since 1902
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer hover:text-gold-heritage transition-colors"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
          <ChevronDown size={20} />
        </div>
      </motion.div>
    </section>
  );
}
