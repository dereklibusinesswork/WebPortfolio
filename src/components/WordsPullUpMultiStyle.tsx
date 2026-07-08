/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { WordSegment } from '../types';

interface WordsPullUpMultiStyleProps {
  segments: WordSegment[];
  className?: string; // Container className
}

export default function WordsPullUpMultiStyle({ segments, className = "" }: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });

  const flattenedWords: { word: string; className: string }[] = [];
  segments.forEach((segment) => {
    const words = segment.text.split(" ");
    words.forEach((w) => {
      if (w !== "") {
        flattenedWords.push({
          word: w,
          className: segment.className || "",
        });
      }
    });
  });

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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      id="words-pull-up-multi-style"
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {flattenedWords.map((item, index) => {
        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={`inline-block mr-[0.22em] last:mr-0 ${item.className}`}
          >
            {item.word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
