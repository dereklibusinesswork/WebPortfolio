/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface GlitchTypingProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function GlitchTyping({ text, delay = 800, className = "" }: GlitchTypingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const GLYPHS = "█▓▒░$#@%!0101_?";
    let currentIndex = 0;
    
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(() => {
            const base = text.substring(0, currentIndex);
            if (currentIndex < text.length) {
              const rChar = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              return base + rChar;
            }
            return base;
          });
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsDone(true);
        }
      }, 100);

      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [text, delay]);

  // Infinite subtle glitch flicker after typing completes
  const [flickerOffset, setFlickerOffset] = useState("");
  useEffect(() => {
    if (!isDone) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setFlickerOffset("text-primary shadow-[0_0_15px_rgba(225,224,204,0.3)]");
        setTimeout(() => setFlickerOffset(""), 80);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [isDone]);

  return (
    <span className={`font-mono inline-flex items-center transition-all ${flickerOffset} ${className}`}>
      {displayedText}
      {!isDone && (
        <span className="w-[1.5px] h-[1.2em] bg-primary ml-1 animate-[pulse_0.8s_infinite]" />
      )}
    </span>
  );
}
