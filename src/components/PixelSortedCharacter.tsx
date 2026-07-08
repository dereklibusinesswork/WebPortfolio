/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface PixelSortedCharacterProps {
  char: string;
  delay: number;
}

export default function PixelSortedCharacter({ char, delay }: PixelSortedCharacterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Measure exact rendered dimensions when hover starts or on mount
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.ceil(rect.width) || 120,
        height: Math.ceil(rect.height) || 120
      });
    }
  }, [char, isHovered]);

  useEffect(() => {
    if (!isHovered) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = dimensions.width || 120;
    const h = dimensions.height || 120;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    let frame = 0;

    // Draw baseline character text matching parent layout exactly
    const drawInitialChar = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Match the container's background color
      ctx.fillStyle = '#060606'; 
      ctx.fillRect(0, 0, w, h);

      // Character text styling mimicking global headers 
      ctx.fillStyle = '#E1E0CC'; 
      ctx.font = `bold ${Math.floor(h * 0.98)}px "Inter", sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      
      // Draw character centered
      ctx.fillText(char, w / 2, h / 2 + (h * 0.05));
    };

    // Glitch sorting simulation loop
    const tick = () => {
      frame++;
      
      // 1. Initial repaint
      drawInitialChar();

      // 2. Extract viewport pixel coordinates
      const imgData = ctx.getImageData(0, 0, w * dpr, h * dpr);
      const data = imgData.data;

      const pixelWidth = w * dpr;
      const pixelHeight = h * dpr;

      // 3. Pixel Sorting Routine (vertical and horizontal slices sorting)
      const numLines = Math.floor(Math.random() * 8) + 4;
      for (let s = 0; s < numLines; s++) {
        const sortDirection = Math.random() > 0.4 ? 0 : 1; 

        if (sortDirection === 0) {
          // Vertical sorting channel
          const colX = Math.floor(Math.random() * pixelWidth);
          const startY = Math.floor(Math.random() * (pixelHeight - 12));
          const length = Math.floor(Math.random() * (pixelHeight - startY)) + 6;

          const pixels: { r: number; g: number; b: number; a: number; brightness: number }[] = [];
          for (let y = 0; y < length; y++) {
            const idx = ((startY + y) * pixelWidth + colX) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            const brightness = r * 0.299 + g * 0.587 + b * 0.114;
            pixels.push({ r, g, b, a, brightness });
          }

          // Sort pixel intensity
          if (Math.random() > 0.5) {
            pixels.sort((a, b) => b.brightness - a.brightness);
          } else {
            pixels.sort((a, b) => a.brightness - b.brightness);
          }

          for (let y = 0; y < length; y++) {
            const idx = ((startY + y) * pixelWidth + colX) * 4;
            data[idx] = pixels[y].r;
            data[idx + 1] = pixels[y].g;
            data[idx + 2] = pixels[y].b;
            data[idx + 3] = pixels[y].a;
          }
        } else {
          // Horizontal sorting channel
          const rowY = Math.floor(Math.random() * pixelHeight);
          const startX = Math.floor(Math.random() * (pixelWidth - 12));
          const length = Math.floor(Math.random() * (pixelWidth - startX)) + 6;

          const pixels: { r: number; g: number; b: number; a: number; brightness: number }[] = [];
          for (let x = 0; x < length; x++) {
            const idx = (rowY * pixelWidth + (startX + x)) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            const brightness = r * 0.299 + g * 0.587 + b * 0.114;
            pixels.push({ r, g, b, a, brightness });
          }

          pixels.sort((a, b) => b.brightness - a.brightness);

          for (let x = 0; x < length; x++) {
            const idx = (rowY * pixelWidth + (startX + x)) * 4;
            data[idx] = pixels[x].r;
            data[idx + 1] = pixels[x].g;
            data[idx + 2] = pixels[x].b;
            data[idx + 3] = pixels[x].a;
          }
        }
      }

      // Chromatic offset displacement (R G B separate scan lines)
      if (Math.sin(frame * 0.4) > 0.2) {
        const shiftX = Math.floor(Math.random() * 5) + 1;
        for (let idx = 0; idx < data.length - shiftX * 4; idx += 4) {
          // Shift blue/red data for visual fringing
          data[idx] = data[idx + shiftX * 4];
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Draw high-contrast horizontal static noise segments
      if (Math.random() > 0.4) {
        const segmentsCount = Math.floor(Math.random() * 3) + 1;
        for (let b = 0; b < segmentsCount; b++) {
          const sliceY = Math.floor(Math.random() * h);
          const sliceW = Math.floor(Math.random() * (w * 0.6)) + 5;
          const sliceX = Math.floor(Math.random() * (w - sliceW));
          ctx.fillStyle = 'rgba(225, 224, 204, 0.75)';
          ctx.fillRect(sliceX, sliceY, sliceW, 1);
        }
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, dimensions, char]);

  return (
    <motion.span
      ref={containerRef}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer select-none inline-block leading-none"
    >
      <span className={`transition-opacity duration-150 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        {char}
      </span>
      {isHovered && dimensions.width > 0 && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: dimensions.width,
            height: dimensions.height,
            pointerEvents: 'none',
          }}
          className="rounded-sm"
        />
      )}
    </motion.span>
  );
}
