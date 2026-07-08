/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GLYPHS = "X█▓░0101/*#$@!%&?_[]{}<>-=+^~";

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef(false);

  // Instantly reset if the text prop itself updates
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const handleMouseEnter = () => {
    isHovering.current = true;
    let iteration = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            // Gradually resolve letters from left to right
            if (index < iteration) {
              return text[index];
            }
            // Scramble active area with random futuristic glyphs
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
      });

      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setDisplayText(text);
      }

      iteration += 1 / 3; // Speeds up or slows down the resolution
    }, 24);
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(text);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-pointer transition-colors duration-300 ${className}`}
    >
      {displayText}
    </span>
  );
}
