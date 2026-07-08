/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function TopographicLines({ className = "opacity-30" }: { className?: string }) {
  // We can render custom organic wave paths mimicking geographic topo lines
  const paths = [
    "M-100,200 Q200,100 500,300 T1100,100 T1600,400",
    "M-100,250 Q220,130 520,330 T1120,130 T1600,450",
    "M-100,300 Q240,160 540,360 T1140,160 T1600,500",
    "M-100,350 Q260,190 560,390 T1160,190 T1600,550",
    "M-100,400 Q280,220 580,420 T1180,220 T1600,600",
    "M-100,450 Q300,250 600,450 T1200,250 T1600,650",
    "M-100,500 Q320,280 620,480 T1220,280 T1600,700",
    "M-100,550 Q340,310 640,510 T1240,310 T1600,750",
    "M-100,600 Q360,340 660,540 T1260,340 T1600,800"
  ];

  const pathVariants = {
    animate: (i: number) => ({
      strokeDashoffset: [1000, 0],
      y: [0, i % 2 === 0 ? 10 : -10, 0],
      transition: {
        strokeDashoffset: {
          duration: 35 + i * 5,
          repeat: Infinity,
          ease: "linear"
        },
        y: {
          duration: 8 + i * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    })
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`} id="topographic-svg-container">
      <svg
        className="w-full h-full min-w-[1200px]"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {paths.map((d, idx) => (
          <motion.path
            key={idx}
            custom={idx}
            variants={pathVariants}
            animate="animate"
            d={d}
            stroke="#DEDBC8"
            strokeWidth="0.8"
            strokeOpacity="0.08"
            strokeDasharray="4 8"
          />
        ))}
      </svg>
    </div>
  );
}
