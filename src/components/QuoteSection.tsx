/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, ShieldCheck } from 'lucide-react';
import TopographicLines from './TopographicLines';

export default function QuoteSection() {
  const [fallbackIdx, setFallbackIdx] = useState(0);

  // Fallbacks for Theodore von Kármán's portrait to guarantee it never appears as a broken image
  const imageFallbacks = [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3EhnQeL7oPOm46sDThCZlWI5Xv5%2Fhf_20260605_075228_ea892852-3702-45d4-b2ef-1b0abffae219.png&w=1280&q=85',
    '/Dr Theodore.png',
    'Dr Theodore.png',
    '/Dr_Theodore.png',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
  ];

  const handleImgError = () => {
    if (fallbackIdx < imageFallbacks.length - 1) {
      setFallbackIdx((prev) => prev + 1);
    }
  };

  return (
    <div 
      className="relative w-screen h-[105vh] bg-black pointer-events-none" 
      id="quote-scroll-track"
    >
      {/* Sticky container that stays locked in viewport while parent track scrolls */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#070707] overflow-hidden pointer-events-auto select-none"
        style={{ zIndex: 10 }}
      >
        {/* Subtle noise overlay on quote canvas */}
        <div className="noise-overlay opacity-[0.15] mix-blend-overlay pointer-events-none absolute inset-0 z-1" />

        {/* Dynamic Topographic background decoration */}
        <TopographicLines className="opacity-[0.14] scale-x-110 translate-y-[-10%]" />

        {/* Minimal grid pattern to tie with other layouts */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/10 to-transparent" />

        {/* Inner Responsive Bento Box container */}
        <div className="max-w-6xl w-full mx-auto px-6 sm:px-10 md:px-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 py-10">
          
          {/* Left Column: Typographic quote statement (col-span-12 to col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 flex flex-col items-start text-left"
          >
            {/* Elegant large Quote icon decorative mark */}
            <div className="w-12 h-12 rounded-2xl bg-[#DEDBC8]/10 border border-[#DEDBC8]/20 flex items-center justify-center mb-6 sm:mb-8 text-primary">
              <Quote className="w-5 h-5 text-primary" />
            </div>

            {/* Quote details */}
            <blockquote className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4.5xl font-light text-[#E1E0CC] leading-[1.3] md:leading-[1.25] tracking-tight font-sans">
                “Scientists study the world as it is; <span className="font-serif italic text-primary/95 font-medium">engineers create</span> the world that has never been.”
              </h3>

              <div className="pt-4 border-t border-[#E1E0CC]/10 w-24" />

              <cite className="not-italic block mt-4">
                <span className="text-base sm:text-lg font-serif italic text-[#DEDBC8] font-medium tracking-wide">
                  Dr. Theodore von Kármán
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mt-1">
                  Aerodynamicist & Physicist // 1881–1963
                </span>
              </cite>
            </blockquote>
          </motion.div>

          {/* Right Column: Historical monochrome portrait (col-span-12 to col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex justify-center w-full"
          >
            <div className="relative group overflow-hidden rounded-3xl border border-[#E1E0CC]/10 bg-[#0c0c0c] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-sm w-full aspect-[4/5]">
              {/* Symmetrical fine guidelines corners for mechanical feel */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#E1E0CC]/35 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-[#E1E0CC]/35 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-[#E1E0CC]/35 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-[#E1E0CC]/35 rounded-br-xl pointer-events-none" />

              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-zinc-950">
                <img 
                  src={imageFallbacks[fallbackIdx]} 
                  alt="Dr. Theodore von Kármán" 
                  onError={handleImgError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-[1.15] brightness-[1.05] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                
                {/* Visual shadow contour blend layout */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 mix-blend-multiply pointer-events-none" />
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2.5 py-1 rounded-md border border-white/5 font-mono text-[8px] tracking-wider text-zinc-400">
                  <ShieldCheck className="w-2.5 h-2.5 text-primary" /> CERTIFIED HISTORIC BLOCK
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Minimal dynamic indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] text-zinc-600 tracking-[0.25em] uppercase">
          STABILITY RANGE [ 27.4679° S / 153.0281° E ]
        </div>
      </div>
    </div>
  );
}
