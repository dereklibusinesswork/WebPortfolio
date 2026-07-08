/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import ScrollRevealParagraph from './ScrollRevealParagraph';
import { aboutHeadingSegments, aboutBodyText } from '../data';
import TopographicLines from './TopographicLines';
import { Quote } from 'lucide-react';

export default function AboutSection() {
  return (
    <section 
      id="our-story" 
      className="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 relative w-screen overflow-hidden"
    >
      {/* Decorative Topo line backdrops shifting positions */}
      <TopographicLines className="opacity-[0.15] scale-x-[-1] translate-y-[20%]" />

      {/* Inner Centered Card */}
      <div 
        id="about-card"
        className="bg-[#101010] border border-[#E1E0CC]/5 rounded-3xl max-w-6xl mx-auto px-6 py-12 sm:p-16 md:py-24 md:px-20 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl"
      >
        {/* Cinematic Grid Crosshairs decorative design elements */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/20 pointer-events-none" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary/20 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-primary/20 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/20 pointer-events-none" />

        {/* Small Creative Top Label */}
        <div className="flex flex-col items-center gap-1.5 mb-6 md:mb-10 animate-pulse">
          <Quote className="w-5  h-5 text-primary/40 rotate-180" />
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono">
            Personal Background // Profile
          </span>
        </div>

        {/* Multi-styled pull-up heading (Marcus Chen story) */}
        <div className="mb-10 md:mb-16 select-none overflow-visible max-w-4xl mx-auto">
          <WordsPullUpMultiStyle 
            segments={aboutHeadingSegments} 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl text-center leading-[1.15] tracking-tight text-white gap-2"
          />
        </div>

        {/* Scroll-Linked Text reveals characters dynamically on track scroll */}
        <div className="max-w-2xl mx-auto border-t border-[#E1E0CC]/10 pt-8 sm:pt-10 md:pt-12">
          <div className="text-[#DEDBC8] text-sm sm:text-base md:text-lg leading-[1.6] tracking-wide text-center">
            <ScrollRevealParagraph text={aboutBodyText} className="font-light" />
          </div>
        </div>

        {/* Subtle camera coordinates watermark */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] sm:text-[9px] text-[#DEDBC8]/15 tracking-widest uppercase">
          LAT // 52.5200° N • LON // 13.4050° E
        </div>
      </div>
    </section>
  );
}
