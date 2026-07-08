/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import GlitchText from './GlitchText';
import TopographicLines from './TopographicLines';
import GlitchTyping from './GlitchTyping';
import ResumeModal from './ResumeModal';
import PixelSortedCharacter from './PixelSortedCharacter';

export default function HeroSection({ onLoaded }: { onLoaded?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const easeBezier = [0.16, 1, 0.3, 1];

  const fadeUpVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: (customDelay: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        delay: customDelay,
        ease: easeBezier
      }
    })
  };

  const navItems = [
    { name: "About Me", href: "#our-story", isAction: false },
    { name: "Projects", href: "#workshops", isAction: false },
    { name: "Resume", href: "#resume", isAction: true, action: () => setIsResumeOpen(true) },
    { name: "Contact me", href: "#inquiries", isAction: false },
  ];

  // Background video scale and opacity response to scroll for subtle parallax/depth coordinates
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  const handleLoaded = () => {
    if (onLoaded) onLoaded();
    window.dispatchEvent(new CustomEvent('hero-video-loaded'));
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      
      // If already ready, trigger loaded
      if (video.readyState >= 3) {
        handleLoaded();
      }
      
      video.play()
        .then(() => {
          handleLoaded();
        })
        .catch(() => {});
    }

    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume-modal', handleOpenResume);
    return () => {
      window.removeEventListener('open-resume-modal', handleOpenResume);
    };
  }, []);

  return (
    <section id="hero-section" className="w-screen h-screen min-h-[600px] p-4 md:p-6 bg-black relative select-none">
      
      {/* Outer inset border wrapper */}
      <div 
        ref={containerRef}
        className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden relative bg-[#060606] flex flex-col justify-between p-6 sm:p-10 md:p-12"
      >
        {/* Background video rendering */}
        <motion.video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_3EhnQeL7oPOm46sDThCZlWI5Xv5/hf_20260605_095709_c3c30a6f-8de6-4008-bd7f-4c2298c53944.mp4"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleLoaded}
          onCanPlay={handleLoaded}
          onCanPlayThrough={handleLoaded}
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Subtle grid/dot texture background replicating the Monolog style */}
        <div className="absolute inset-0 z-0 bg-topo opacity-40 pointer-events-none" />

        {/* Dynamic topographic overlay lines */}
        <TopographicLines className="opacity-[0.25] pointer-events-none" />

        {/* Noise overlay on top with opacity-[0.7] mix-blend-overlay pointer-events-none */}
        <div 
          id="noise-overlay" 
          className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none absolute inset-0 z-10"
        />

        {/* Gradient overlay: bg-gradient-to-b from-black/30 via-transparent to-black/60 */}
        <div 
          id="shadow-gradient" 
          className="bg-gradient-to-b from-black/30 via-transparent to-black/60 absolute inset-0 z-10 pointer-events-none"
        />

        {/* Floating Navbar Pill */}
        <nav
          id="main-navbar"
          className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-auto"
        >
          <div className="bg-black/90 backdrop-blur-md rounded-b-2xl md:rounded-b-3xl px-4 py-3 md:px-8 flex items-center justify-center shadow-2xl border-x border-b border-[#E1E0CC]/10">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12 text-center">
              {navItems.map((item, idx) => (
                <li key={idx} className="relative group px-1">
                  {item.isAction ? (
                    <button
                      onClick={item.action}
                      style={{ color: "rgba(225, 224, 204, 0.85)" }}
                      className="text-[10px] sm:text-xs tracking-widest font-light transition-colors duration-300 hover:text-[#E1E0CC] flex items-center gap-1 uppercase font-mono cursor-pointer"
                    >
                      <GlitchText text={item.name} className="tracking-widest" />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      style={{ color: "rgba(225, 224, 204, 0.85)" }}
                      className="text-[10px] sm:text-xs tracking-widest font-light transition-colors duration-300 hover:text-[#E1E0CC] flex items-center gap-1 uppercase font-mono"
                    >
                      <GlitchText text={item.name} className="tracking-widest" />
                    </a>
                  )}
                  {/* Active navigation hover indicator line */}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Unified Bottom Layout - Combines Vertical Name column with adjacent Globe/Statement columns */}
        <div className="relative z-20 mt-auto pb-4 sm:pb-8 pl-2 sm:pl-6 text-left self-start flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16 pointer-events-auto w-full md:max-w-5xl">
          
          {/* Vertical title "李錦平" with "Derek Li" sliding out perpendicular to it */}
          <div className="flex flex-col font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.15em] text-[#E1E0CC]/90 leading-[1.05] relative select-none shrink-0">
            <PixelSortedCharacter char="李" delay={0.2} />
            
            <div className="relative flex items-center">
              <PixelSortedCharacter char="錦" delay={0.4} />
              
              {/* Derek Li sliding out perpendicular to vertical text */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "240px", opacity: 1 }}
                transition={{ delay: 1.0, duration: 1.4, ease: easeBezier }}
                className="absolute left-[1.15em] overflow-hidden whitespace-nowrap pl-5 pr-8 py-2 border-l border-primary/25 bg-gradient-to-r from-black/80 to-transparent flex items-center shadow-xl"
              >
                <GlitchTyping 
                  text="Derek Li" 
                  delay={1300} 
                  className="text-2xl sm:text-3.5xl md:text-4xl text-primary font-bold tracking-wide font-mono" 
                />
              </motion.div>
            </div>

            <PixelSortedCharacter char="平" delay={0.6} />
          </div>

          {/* Left-Aligned Globe Wireframe & Sleek Quotes - Integrated side-by-side and vertically aligned */}
          <div className="flex flex-col items-start gap-4 max-w-xl pb-2 md:pb-4">
            {/* Animated custom wireframe globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#E1E0CC]/35 relative flex items-center justify-center mb-1"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-current stroke-[0.8] fill-none">
                  <circle cx="50" cy="50" r="45" strokeDasharray="2 2" className="opacity-40 animate-pulse" />
                  <circle cx="50" cy="50" r="42" />
                  <ellipse cx="50" cy="50" rx="42" ry="14" />
                  <ellipse cx="50" cy="50" rx="42" ry="28" />
                  <line x1="8" y1="50" x2="92" y2="50" />
                  <ellipse cx="50" cy="50" rx="14" ry="42" />
                  <ellipse cx="50" cy="50" rx="28" ry="42" />
                  <line x1="50" y1="8" x2="50" y2="92" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Majestic Left-Aligned Quote Statement */}
            <div className="max-w-xl flex flex-col items-start gap-1">
              <motion.h2
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={0.4}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#E1E0CC]/95 font-light tracking-tight leading-normal font-sans glitch-text cursor-pointer select-none"
              >
                Soon to be, <span className="font-serif-italic text-primary/95 font-medium underline decoration-primary/20 decoration-1 underline-offset-8">Mechanical and Aerospace Engineer</span>.
              </motion.h2>
            </div>
          </div>

        </div>

      </div>

      {/* Resume Popup Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
