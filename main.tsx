/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export default function WordsPullUp({ text, className = "", showAsterisk = false }: WordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Trigger when 10% of component is in viewport
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom cinematic exit ease
      },
    },
  };

  return (
    <motion.div
      id="words-pull-up-container"
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-[0.25em] last:mr-0 relative"
          >
            {isLastWord && showAsterisk ? (
              <span className="relative inline-block pr-[0.3em]">
                {word}
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] select-none text-primary" id="superscript-asterisk">
                  *
                </span>
              </span>
            ) : (
              word
            )}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
