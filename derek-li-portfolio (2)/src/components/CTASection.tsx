/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import GlitchText from './GlitchText';
import TopographicLines from './TopographicLines';

function ScrollGlitchType({ 
  text, 
  active, 
  className = "", 
  delay = 0 
}: { 
  text: string; 
  active: boolean; 
  className?: string; 
  delay?: number; 
}) {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const GLYPHS = "X█▓░0101/*#$@!%&?_[]{}<>-=+^~";

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!active) {
      setDisplayText('');
      return;
    }

    const timeoutId = setTimeout(() => {
      let iteration = 0;
      intervalRef.current = setInterval(() => {
        setDisplayText(() => {
          return text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (index < iteration + 15) {
                if (char === " ") return " ";
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              }
              return "";
            })
            .join("");
        });

        if (iteration >= text.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setDisplayText(text);
        }

        iteration += Math.max(1, Math.floor(text.length / 45));
      }, 16);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [active, text, delay]);

  return <span className={className}>{displayText}</span>;
}

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (customDelay: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: customDelay,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
        setMessage('');
      }, 4000);
    }
  };

  return (
    <section 
      id="inquiries" 
      ref={containerRef}
      className="bg-[#050505] py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 relative z-20 w-screen overflow-hidden border-t border-[#E1E0CC]/15 shadow-[0_-30px_70px_rgba(0,0,0,0.95)] rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-20 sm:-mt-28 md:-mt-36 lg:-mt-40"
    >
      <TopographicLines className="opacity-[0.12] translate-y-[-10%]" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Floating icon */}
        <motion.div 
          variants={textVariants}
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="w-10 h-10 rounded-full bg-[#DEDBC8]/10 border border-[#DEDBC8]/30 flex items-center justify-center mb-6 text-primary"
        >
          <Mail className="w-4 h-4" />
        </motion.div>

        {/* Small subtitle label */}
        <motion.span 
          variants={textVariants}
          animate={isInView ? "visible" : "hidden"}
          custom={0.25}
          className="text-primary text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-4"
        >
          <ScrollGlitchType text="PROJECT COLLABORATION // INTERACTIVE LABS" active={isInView} delay={100} />
        </motion.span>

        {/* Heading */}
        <motion.h3 
          variants={textVariants}
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#E1E0CC] leading-[1.05] tracking-tight mb-8 font-sans max-w-2xl px-2"
        >
          <ScrollGlitchType text="Let's align our " active={isInView} delay={250} />
          <ScrollGlitchType text="perspectives." active={isInView} delay={450} className="font-serif italic text-primary/95 font-medium" />
        </motion.h3>

        {/* Description paragraph */}
        <motion.p
          variants={textVariants}
          animate={isInView ? "visible" : "hidden"}
          custom={0.45}
          style={{ color: "#DEDBC8" }}
          className="text-sm sm:text-base text-[#DEDBC8]/60 font-light max-w-xl mb-12 sm:mb-16 leading-[1.6]"
        >
          <ScrollGlitchType 
            text="I am ready to become a part of your team for the learning opportunity in being apart of the engineering work system. Don't hesitate to contact me. I am ready to take the next step and deploy my skillset and further the team and my experience" 
            active={isInView} 
            delay={400} 
          />
        </motion.p>

        {/* Form elements with success feedback animation */}
        <motion.div
          variants={textVariants}
          animate={isInView ? "visible" : "hidden"}
          custom={0.55}
          className="w-full max-w-xl px-4 sm:px-0"
        >
          {success ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-zinc-950 border border-primary/20 rounded-2xl p-8 flex flex-col items-center gap-4 text-center justify-center shadow-xl min-h-[220px]"
            >
              <CheckCircle2 className="w-12 h-12 text-[#DEDBC8] animate-bounce" />
              <h5 className="font-sans text-xl font-normal text-[#E1E0CC]">Transmission Received</h5>
              <p className="text-gray-400 text-sm max-w-sm">
                Inquiry securely recorded on the network. A terminal callback will be dispatched soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left w-full">
              {/* Email Address Input */}
              <div className="relative group">
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your visual terminal address (email)"
                  className="w-full bg-[#101010] border border-[#E1E0CC]/10 focus:border-[#E1E0CC]/40 focus:outline-none rounded-xl px-5 py-4 text-xs sm:text-sm text-white placeholder-gray-500 font-mono tracking-wide transition-all outline-none"
                />
              </div>

              {/* Message Details Input */}
              <div className="relative group">
                <textarea 
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you look at things differently?"
                  className="w-full bg-[#101010] border border-[#E1E0CC]/10 focus:border-[#E1E0CC]/40 focus:outline-none rounded-xl px-5 py-4 text-xs sm:text-sm text-white placeholder-gray-500 font-mono tracking-wide transition-all outline-none resize-none"
                />
              </div>

              {/* Submit Trigger Pillar */}
              <button
                type="submit"
                className="group flex items-center justify-between bg-[#DEDBC8] hover:bg-neutral-900 border border-transparent hover:border-[#DEDBC8] hover:text-[#DEDBC8] text-black font-semibold uppercase text-xs sm:text-sm tracking-[0.2em] font-mono rounded-xl p-4 transition-all duration-300 w-full cursor-pointer mt-2 shadow-lg"
              >
                <span>Initiate transmission</span>
                <div className="bg-black text-[#DEDBC8] rounded-lg w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#DEDBC8] group-hover:text-black">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
