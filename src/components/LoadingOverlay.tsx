/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LoadingOverlayProps {
  isDone: boolean;
  key?: string;
}

export default function LoadingOverlay({ isDone }: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING DATALINK...');

  useEffect(() => {
    // Elegant progression through calibration phases
    const texts = [
      'INITIALIZING DATALINK...',
      'CALIBRATING TOPOGRAPHIC GRID...',
      'ESTABLISHING GEOGRAPHIC PROJECTION...',
      'STREAMING SPATIAL FEED...',
      'SYNCHRONIZING COORDINATES...',
      'RENDERING SPECTRAL CORRIDORS...',
      'COCKPIT ONLINE'
    ];

    let textIdx = 0;
    const textInterval = setInterval(() => {
      textIdx = Math.min(textIdx + 1, texts.length - 1);
      setLoadingText(texts[textIdx]);
    }, 400);

    // Smoothly animate progress count up
    const timer = setInterval(() => {
      setProgress((prev) => {
        // If the asset is done loading, we can fill the remaining progress instantly/quickly
        if (isDone) {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(prev + 12, 100);
        }
        // Otherwise, progress holds around 88% until video notifies us
        if (prev < 88) {
          return prev + Math.floor(Math.random() * 3) + 1;
        }
        return prev;
      });
    }, 60);

    return () => {
      clearInterval(timer);
      clearInterval(textInterval);
    };
  }, [isDone]);

  // Center SVG organic topographic swirls
  const loaderPaths = [
    "M 50,20 C 150,20 200,80 300,50 S 400,20 500,60 S 550,150 650,120 S 750,220 850,180",
    "M 30,50 C 120,40 180,110 280,80 S 370,50 480,90 S 520,200 620,160 S 710,270 820,230",
    "M 10,80 C 100,70 160,140 260,110 S 340,90 460,130 S 490,240 590,200 S 680,310 790,270",
    "M 0,110 C 80,100 140,170 240,140 S 310,120 440,170 S 460,280 560,240 S 650,350 760,310",
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-50 bg-[#000000] flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none pointer-events-auto"
    >
      {/* Absolute Noise Overlay */}
      <div className="noise-overlay opacity-[0.25] mix-blend-overlay pointer-events-none absolute inset-0 z-10" />

      {/* SVG Topographic Graphic drawing & dissolving in loading design */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 select-none overflow-hidden max-w-full">
        <svg
          viewBox="0 0 1000 400"
          className="w-[90%] max-w-5xl h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {loaderPaths.map((d, index) => (
            <motion.path
              key={index}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1],
                opacity: [0, 0.7, 0.3],
                y: [0, (index % 2 === 0 ? 5 : -5), 0]
              }}
              transition={{
                pathLength: { duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
                opacity: { duration: 2.5, ease: "easeInOut" },
                y: { duration: 6 + index * 1.5, ease: "easeInOut", repeat: Infinity }
              }}
              d={d}
              stroke="#DEDBC8"
              strokeWidth="1.2"
              strokeDasharray="5 7"
            />
          ))}
        </svg>
      </div>

      {/* Top section: Clean minimalist taglines */}
      <div className="relative z-20 flex justify-between items-start w-full text-[10px] md:text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DEDBC8] animate-ping" />
          SYSTEM.DEREK.LI
        </div>
        <div className="text-right">
          BRISBANE, AU // 27.4679° S, 153.0281° E
        </div>
      </div>

      {/* Center Section: Immersive typographic loading indicators */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto">
        {/* Pulsing loading state */}
        <motion.div
          animate={{ scale: [0.98, 1, 0.98], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          className="text-[#DEDBC8] font-bold text-lg sm:text-2xl md:text-3xl tracking-[0.25em] font-sans"
        >
          {loadingText}
        </motion.div>

        {/* Minimalist modern progress counter */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="font-mono text-xs text-zinc-400 tracking-[0.15em] flex items-center gap-4">
            <span>PROG CODE_</span>
            <span className="text-[#DEDBC8] font-bold w-12 text-right">
              {progress}%
            </span>
          </div>
          {/* Symmetrical fine progress line matching monolog aesthetics */}
          <div className="w-48 h-[1px] bg-zinc-800 relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
              className="absolute left-0 top-0 h-full bg-[#DEDBC8]"
            />
          </div>
        </div>
      </div>

      {/* Bottom status elements */}
      <div className="relative z-20 flex flex-col sm:flex-row justify-between items-center w-full text-[9px] md:text-[10px] font-mono text-zinc-600 tracking-[0.15em] uppercase gap-2 sm:gap-0 border-t border-zinc-900 pt-6">
        <div>
          ACTIVE CORRIDORS: 4 // MEMORY LOCK STATUS: DEPLOYED
        </div>
        <div className="text-zinc-500">
          © 2026 DEREK LI // SPECTRUM PIPELINE
        </div>
      </div>
    </motion.div>
  );
}
