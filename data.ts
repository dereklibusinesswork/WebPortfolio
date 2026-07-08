/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedLetterProps {
  key?: number;
  index: number;
  totalChars: number;
  progress: MotionValue<number>;
  char: string;
}

function AnimatedLetter({ index, totalChars, progress, char }: AnimatedLetterProps) {
  // Staggering formula: charProgress = index / totalChars
  const charProgress = index / totalChars;
  // Offset ranges: [charProgress - 0.1, charProgress + 0.05]
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  // Map progress to letter opacity from 0.2 to 1.0
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span id={`char-${index}`} style={{ opacity }} className="whitespace-pre inline-block">
      {char}
    </motion.span>
  );
}

interface ScrollRevealParagraphProps {
  text: string;
  className?: string;
}

export default function ScrollRevealParagraph({ text, className = "" }: ScrollRevealParagraphProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // useScroll with target offset ['start 0.8', 'end 0.2']
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const characters = text.split("");
  const totalChars = characters.length;

  return (
    <p
      id="scroll-reveal-paragraph"
      ref={paragraphRef}
      className={`inline flex-wrap leading-relaxed ${className}`}
    >
      {characters.map((char, index) => (
        <AnimatedLetter
          key={index}
          index={index}
          totalChars={totalChars}
          progress={scrollYProgress}
          char={char}
        />
      ))}
    </p>
  );
}
