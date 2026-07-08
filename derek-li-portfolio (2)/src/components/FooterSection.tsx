/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface FooterNavItemProps {
  name: string;
  href: string;
  isAction?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  id: string;
  key?: React.Key | number | string;
}

function FooterNavItem({ name, href, isAction, onClick, id }: FooterNavItemProps) {
  const [displayText, setDisplayText] = useState(name);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789X_@[#]-";

  const triggerGlitch = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return name
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return name[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      if (iteration >= name.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(name);
      }
      iteration += 1 / 2;
    }, 30);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    triggerGlitch();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(name);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const content = (
    <div className="flex items-center justify-between py-4 sm:py-5 w-full cursor-pointer group text-left">
      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#E1E0CC]/35 group-hover:text-[#E1E0CC] transition-colors duration-300 font-sans">
        {displayText}
      </span>
      <span className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pr-2 sm:pr-4">
        <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-[#E1E0CC]" />
      </span>
    </div>
  );

  return (
    <li
      id={id}
      className={`relative w-full border-b border-[#E1E0CC]/10 transition-all duration-300 ${
        isHovered ? 'border-[#E1E0CC]/60 bg-[#E1E0CC]/5 px-2' : 'px-0'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isAction ? (
        <button
          onClick={onClick}
          className="w-full text-left bg-transparent border-none outline-none block p-0"
        >
          {content}
        </button>
      ) : (
        <a href={href} className="w-full block">
          {content}
        </a>
      )}
    </li>
  );
}

export default function FooterSection() {
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');
  
  // High-performance pointer tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [pixelCoords, setPixelCoords] = useState({ x: 0, y: 0 });

  // Spring animations for high-tech scanning reticle
  const springX = useSpring(mouseX, { damping: 24, stiffness: 320 });
  const springY = useSpring(mouseY, { damping: 24, stiffness: 320 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    setIsHovered(true);
    setPixelCoords({ x: Math.round(x), y: Math.round(y) });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      // Calculate Brisbane, Australia Localised clock values
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Australia/Brisbane',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Australia/Brisbane',
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };

      setTimeString(now.toLocaleTimeString('en-US', timeOptions));
      setDateString(now.toLocaleDateString('en-US', dateOptions) + ' (GMT+10)');
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openResume = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-resume-modal'));
  };

  const navigationItems = [
    { name: 'About', href: '#our-story' },
    { name: 'Work', href: '#workshops' },
    { name: 'Resume', href: '#resume', isAction: true },
    { name: 'Inquiries', href: '#inquiries' },
  ];

  const socialItems = [
    { name: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/kindaderek' },
    { name: 'Instagram ↗', href: 'https://www.instagram.com/_derek.li_' },
    { name: 'GitHub ↗', href: 'https://github.com' },
    { name: 'YouTube ↗', href: 'https://youtube.com' },
  ];

  return (
    <footer 
      id="footer-section" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-black text-[#E1E0CC]/90 relative z-30 pt-20 pb-12 px-6 sm:px-12 md:px-16 w-screen border-t border-[#E1E0CC]/15 shadow-[0_-25px_60px_rgba(0,0,0,0.95)] select-none transition-all duration-200 ${
        isHovered ? 'cursor-none' : ''
      }`}
      style={{ overscrollBehavior: 'bounce' }}
    >
      {/* High-Tech Square Data Scan Cursor */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            left: springX,
            top: springY,
          }}
        >
          {/* Tracking Square Reticle Frame */}
          <div className="relative w-14 h-14 border border-[#E1E0CC]/20 rounded-md bg-black/25 backdrop-blur-[1px] flex items-center justify-center">
            
            {/* Brackets for four corners */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#E1E0CC]/90 rounded-tl" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#E1E0CC]/90 rounded-tr" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#E1E0CC]/90 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#E1E0CC]/90 rounded-br" />

            {/* Crosshair target dots / indicators */}
            <div className="absolute top-1/2 left-1.5 right-1.5 h-[1px] bg-[#E1E0CC]/10 -translate-y-1/2" />
            <div className="absolute left-1/2 top-1.5 bottom-1.5 w-[1px] bg-[#E1E0CC]/10 -translate-x-1/2" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]/80 animate-ping absolute" />
            <div className="w-1 h-1 rounded-full bg-[#E1E0CC]" />

            {/* Dynamic Sweep Scan Line */}
            <motion.div
              className="absolute left-0 right-0 h-[1.5px] bg-[#E1E0CC]/80 shadow-[0_0_6px_#E1E0CC]"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: 'easeInOut',
              }}
            />

            {/* Live Data Scanning metadata overlay */}
            <div className="absolute left-full ml-3 top-0 bg-black/85 backdrop-blur-sm px-1.5 py-1 rounded border border-[#E1E0CC]/15 font-mono text-[8.5px] leading-3 tracking-wider text-[#E1E0CC]/70 whitespace-nowrap min-w-[90px] shadow-lg">
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#E1E0CC] animate-pulse" />
                <span className="font-bold text-white uppercase text-[7px]">SCANNING MATRIX</span>
              </div>
              <div className="text-[7px] text-zinc-500 mt-0.5">COORD: X{pixelCoords.x} Y{pixelCoords.y}</div>
              <div className="text-[7px] text-[#E1E0CC] font-bold">STATUS: ACTIVE</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Immersive background media layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out origin-center"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_3EhnQeL7oPOm46sDThCZlWI5Xv5/hf_20260605_133953_32c2c5d0-8b73-484b-b2a9-9fe8c8e57b3f.mp4"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10 pointer-events-none" />

        {/* Noise overlay on top */}
        <div className="noise-overlay opacity-[0.7] mix-blend-overlay absolute inset-0 z-20 pointer-events-none" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between h-full">
        
        {/* Core Multi-Column Brand Blocks */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-16 md:gap-8 pb-16 relative z-40 -mt-36 pt-12 pb-12 px-8 sm:px-12 bg-black/85 backdrop-blur-md rounded-3xl border border-[#E1E0CC]/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          {/* Column Left: High-Contrast Giant Navigation Menu */}
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 text-zinc-500 uppercase font-mono text-[10px] sm:text-xs tracking-[0.18em] mb-8 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/75 animate-pulse" />
              Navigation
            </div>
            <ul className="w-full flex flex-col gap-0">
              {navigationItems.map((item, idx) => (
                <FooterNavItem
                  key={idx}
                  id={`footer-nav-li-${idx}`}
                  name={item.name}
                  href={item.href}
                  isAction={item.isAction}
                  onClick={item.isAction ? openResume : undefined}
                />
              ))}
            </ul>
          </div>

          {/* Column Direct Communications */}
          <div className="flex-initial text-left md:pl-12 lg:pl-16">
            <div className="text-zinc-500 uppercase font-mono text-[10px] sm:text-xs tracking-[0.18em] mb-8 font-semibold">
              (Direct Connections)
            </div>
            <ul className="flex flex-col gap-6 items-start">
              <li>
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block mb-1 font-bold">[ EMAIL ]</span>
                <a
                  href="mailto:derekli.business.work@gmail.com"
                  className="text-base sm:text-lg font-light text-zinc-400 hover:text-white transition-colors duration-200 underline decoration-zinc-800 underline-offset-4 hover:decoration-white/40 block break-all"
                >
                  derekli.business.work@gmail.com
                </a>
              </li>
              <li>
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block mb-1 font-bold">[ PHONE ]</span>
                <a
                  href="tel:+61478704698"
                  className="text-base sm:text-lg font-light text-zinc-400 hover:text-white transition-colors duration-200 underline decoration-zinc-800 underline-offset-4 hover:decoration-white/40 block"
                >
                  +61 4787 04698
                </a>
              </li>
            </ul>
          </div>

          {/* Column Right: Elegant Social Connections details */}
          <div className="flex-initial text-left md:pl-12 lg:pl-16">
            <div className="text-zinc-500 uppercase font-mono text-[10px] sm:text-xs tracking-[0.18em] mb-8 font-semibold">
              (Social Matrix)
            </div>
            <ul className="flex flex-col gap-4 items-start">
              {socialItems.map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg sm:text-xl font-light text-zinc-400 hover:text-white transition-colors duration-200 underline decoration-zinc-800 underline-offset-4 hover:decoration-white/40 block pb-1 border-b border-transparent hover:border-white/10"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Minimal High-Contrast Divider Line */}
        <div className="border-t border-[#E1E0CC]/10 my-12 opacity-60" />

        {/* Dynamic Metadata & Copyright Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0 font-mono text-[10px] sm:text-xs text-zinc-500 w-full">
          
          {/* Interactive Brisbane Coordinates & dynamic clock */}
          <div className="space-y-1.5 text-left leading-relaxed">
            <div className="text-zinc-300 font-medium tracking-wide">
              BRISBANE, AU // 27.4679° S, 153.0281° E
            </div>
            <div className="opacity-80">
              {dateString}
            </div>
            <div className="opacity-80 text-primary">
              {timeString}
            </div>
          </div>

          {/* Center Column: Reset / Return to cockpit */}
          <div className="flex md:justify-center w-full md:w-auto">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-[0.15em] cursor-pointer font-bold border-b border-transparent hover:border-white/10 pb-0.5"
            >
              Return to Home ↑
            </button>
          </div>

          {/* Right Column: Clean, humble layout copyright line */}
          <div className="tracking-[0.08em] text-left md:text-right w-full md:w-auto font-medium text-zinc-400">
            © 2026 DEREK LI. ALL RIGHTS RESERVED
          </div>

        </div>

      </div>
    </footer>
  );
}
