'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy">
      <div className="relative">
        {/* Animated outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-32 w-32 rounded-full border-t-2 border-r-2 border-gold-heritage opacity-20"
        />
        
        {/* Logo container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
            className="relative h-16 w-16"
          >
            <Image
              src="/logos.svg"
              alt="Hapugala Vidyalaya logo"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
          Hapugala Vidyalaya
        </span>
        <div className="mt-2 h-[1px] w-12 bg-gold-heritage/30 overflow-hidden relative">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gold-heritage"
          />
        </div>
      </motion.div>
    </div>
  );
}
