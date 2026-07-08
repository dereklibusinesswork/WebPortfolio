/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, X, Sparkles, Cpu, Globe, CheckCircle2, ChevronRight, Binary } from 'lucide-react';

interface ProjectItem {
  id: string;
  no: string;
  name: string;
  discipline: string;
  platform: string;
  desc: string;
  bulletPoints: string[];
  specs: { label: string; value: string }[];
  type: 'web' | 'pcb';
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-web-design",
    no: "01",
    name: "WEB PORTFOLIO DEVELOPMENT",
    discipline: "INTERFACE SYNTHESIS",
    platform: "WEB • MOTION • 2026",
    desc: "The website you are currently browsing, built and edited within Google AI Studio. This project serves as an ongoing experiment in modern web development, exploring the synergy between AI-guided generation and precise manual coding.",
    bulletPoints: [
      "Built and deployed live using Google AI Studio interface engines",
      "Designed with ultra-clean typography pairings and fluid physics-based micro-interactions",
      "Tailored integration of custom client-side canvas shaders and interactive element states"
    ],
    specs: [
      { label: "FRAMEWORK", value: "React 18 + Tailwind CSS" }
    ],
    type: "web"
  },
  {
    id: "project-pcb-nfc",
    no: "02",
    name: "NFC SMART CARD",
    discipline: "HARDWARE ARCHITECTURE",
    platform: "PCB • HARDWARE • 2026",
    desc: "An ultra-slim, contactless NFC business card designed entirely by me. It features a custom, hand-designed PCB layout utilizing the high-performance NXP NT3H2111W0FHKH RFID transponder to deliver reliable close-range digital coordinate routing.",
    bulletPoints: [
      "Custom dual-layer FR-4 board layout fully hand-routed by me for optimal signal fidelity",
      "Built-in high-Q HF spiral loop antenna matched precisely to 13.56 MHz resonant frequency",
      "Integrated NXP NT3H2111W0FHKH NTAG I2C plus RFID transponder delivering persistent contactless web routing",
      "Compact 0.8mm substrate with premium gold immersion (ENIG) surface finishing"
    ],
    specs: [
      { label: "DESIGNER", value: "Derek Li" },
      { label: "LAYOUT TYPE", value: "Custom Hand-Routed" },
      { label: "TRANSPONDER", value: "NXP NT3H2111W0FHKH" },
      { label: "FREQUENCY", value: "13.56 MHz (NFC Type 2)" }
    ],
    type: "pcb"
  }
];

// Helper: Custom Canvas that draws static wireframe schemas overlayed with a live pixel sorting glitch animation
function CyberPreviewCanvas({ type, active }: { type: 'web' | 'pcb'; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed internal size for pristine resolution
    canvas.width = 300;
    canvas.height = 200;

    let tick = 0;

    const drawGrid = (c: CanvasRenderingContext2D, width: number, height: number) => {
      c.strokeStyle = 'rgba(225, 224, 204, 0.04)';
      c.lineWidth = 1;
      const gridSize = 15;
      for (let x = 0; x < width; x += gridSize) {
        c.beginPath();
        c.moveTo(x, 0);
        c.lineTo(x, height);
        c.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        c.beginPath();
        c.moveTo(0, y);
        c.lineTo(width, y);
        c.stroke();
      }
    };

    const drawWebSchema = (c: CanvasRenderingContext2D, width: number, height: number, t: number) => {
      // Background gradient
      c.fillStyle = '#0a0a0a';
      c.fillRect(0, 0, width, height);
      drawGrid(c, width, height);

      // Browser border
      c.strokeStyle = 'rgba(225, 224, 204, 0.15)';
      c.lineWidth = 1.5;
      c.strokeRect(15, 15, width - 30, height - 30);

      // Browser top bar
      c.fillStyle = 'rgba(225, 224, 204, 0.08)';
      c.fillRect(15, 15, width - 30, 20);
      c.strokeRect(15, 15, width - 30, 20);

      // 3 small dots
      c.fillStyle = 'rgba(225, 224, 204, 0.3)';
      for (let i = 0; i < 3; i++) {
        c.beginPath();
        c.arc(28 + i * 10, 25, 2.5, 0, Math.PI * 2);
        c.fill();
      }

      // Sidebar
      c.fillStyle = 'rgba(225, 224, 204, 0.03)';
      c.fillRect(15, 35, 60, height - 50);
      c.beginPath();
      c.moveTo(75, 35);
      c.lineTo(75, height - 15);
      c.stroke();

      // Sidebar menu wireframes
      c.strokeStyle = 'rgba(225, 224, 204, 0.1)';
      for (let i = 0; i < 4; i++) {
        c.strokeRect(22, 45 + i * 15, 45, 8);
      }

      // Hero image box wireframe inside main content
      const offset = Math.sin(t * 0.05) * 4;
      c.strokeStyle = 'rgba(225, 224, 204, 0.25)';
      c.beginPath();
      c.moveTo(90, 50);
      c.lineTo(width - 40, 50);
      c.lineTo(width - 40, height - 55);
      c.lineTo(90, height - 55);
      c.closePath();
      c.stroke();

      // Slanted cross inside frame
      c.strokeStyle = 'rgba(225, 224, 204, 0.06)';
      c.beginPath();
      c.moveTo(90, 50);
      c.lineTo(width - 40, height - 55);
      c.moveTo(width - 40, 50);
      c.lineTo(90, height - 55);
      c.stroke();

      // Floating modern layout card
      c.fillStyle = '#121212';
      c.strokeStyle = '#E1E0CC';
      c.lineWidth = 1;
      const cardX = 120 + offset;
      const cardY = 80 - offset / 2;
      c.fillRect(cardX, cardY, 110, 50);
      c.strokeRect(cardX, cardY, 110, 50);

      // Card lines
      c.fillStyle = 'rgba(225, 224, 204, 0.7)';
      c.fillRect(cardX + 10, cardY + 12, 50, 4);
      c.fillStyle = 'rgba(225, 224, 204, 0.3)';
      c.fillRect(cardX + 10, cardY + 24, 90, 3);
      c.fillRect(cardX + 10, cardY + 32, 70, 3);

      // Tech grid coordinates
      c.fillStyle = 'rgba(225, 224, 204, 0.25)';
      c.font = '7px monospace';
      c.fillText(`GRID_LOCK: [${Math.floor(cardX)}, ${Math.floor(cardY)}]`, 91, height - 25);
    };

    const drawPcbSchema = (c: CanvasRenderingContext2D, width: number, height: number, t: number) => {
      // Dark green/grey PCB plate
      c.fillStyle = '#060a07';
      c.fillRect(0, 0, width, height);
      drawGrid(c, width, height);

      // PCB boundary border with rounded corners
      c.strokeStyle = 'rgba(225, 224, 204, 0.2)';
      c.lineWidth = 2;
      c.strokeRect(20, 20, width - 40, height - 40);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw concentric circular antenna traces
      c.strokeStyle = 'rgba(225, 224, 204, 0.12)';
      c.lineWidth = 1.2;
      for (let r = 25; r < 65; r += 7) {
        c.beginPath();
        c.arc(centerX - 35, centerY, r, 0, Math.PI * 2);
        c.stroke();
      }

      // PCB chips / Transponders
      c.fillStyle = '#141414';
      c.strokeStyle = '#E1E0CC';
      c.lineWidth = 1;
      const chipX = centerX + 40;
      const chipY = centerY - 25;
      c.fillRect(chipX, chipY, 30, 30);
      c.strokeRect(chipX, chipY, 30, 30);

      // Microchip pins
      c.fillStyle = 'rgba(225, 224, 204, 0.5)';
      for (let i = 0; i < 4; i++) {
        c.fillRect(chipX - 3, chipY + 4 + i * 7, 3, 3);
        c.fillRect(chipX + 30, chipY + 4 + i * 7, 3, 3);
        c.fillRect(chipX + 4 + i * 7, chipY - 3, 3, 3);
        c.fillRect(chipX + 4 + i * 7, chipY + 30, 3, 3);
      }

      // Signal traces routing from chip to coil antenna
      c.strokeStyle = '#E1E0CC';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(chipX, centerY - 10);
      c.lineTo(centerX + 15, centerY - 10);
      c.lineTo(centerX + 5, centerY);
      c.lineTo(centerX - 10, centerY);
      c.stroke();

      c.beginPath();
      c.moveTo(chipX, centerY + 10);
      c.lineTo(centerX + 15, centerY + 10);
      c.lineTo(centerX + 2, centerY + 20);
      c.lineTo(centerX - 15, centerY + 20);
      c.stroke();

      // Status LED dots representing signal broadcast
      const wave = (t * 0.04) % 1;
      c.strokeStyle = `rgba(225, 224, 204, ${1 - wave})`;
      c.lineWidth = 1.5;
      c.beginPath();
      c.arc(centerX - 35, centerY, 65 + wave * 25, 0, Math.PI * 2);
      c.stroke();

      c.fillStyle = '#e1e0cc';
      c.beginPath();
      c.arc(centerX - 35, centerY, 4, 0, Math.PI * 2);
      c.fill();

      // Technical markers
      c.fillStyle = 'rgba(225, 224, 204, 0.25)';
      c.font = '7px monospace';
      c.fillText('NXP NT3H2111W0FHKH // RFID 13.56MHz', 25, height - 25);
    };

    // Glitch effect: Pixel Sorting simulation
    const applyPixelSortGlitch = (c: CanvasRenderingContext2D, width: number, height: number, t: number) => {
      if (!active) return;
      
      // Let's grab some random rectangles or horizontal strips and shift them horizontally
      // also draw some white/green glitch lines
      const amount = Math.floor(Math.random() * 5) + 2; 
      for (let i = 0; i < amount; i++) {
        const sliceY = Math.floor(Math.random() * height);
        const sliceH = Math.floor(Math.random() * 18) + 2;
        const shift = Math.floor(Math.sin(t * 0.1) * (Math.random() * 25 - 12.5));
        
        const temp = c.getImageData(0, sliceY, width, sliceH);
        
        // Clear background for shift
        c.fillStyle = '#000000';
        c.fillRect(0, sliceY, width, sliceH);
        
        // Put shifted image back
        c.putImageData(temp, shift, sliceY);

        // Draw horizontal color fringe
        if (Math.random() > 0.6) {
          c.strokeStyle = 'rgba(225, 224, 204, 0.45)';
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(0, sliceY + sliceH / 2);
          c.lineTo(width, sliceY + sliceH / 2);
          c.stroke();
        }
      }

      // Random vertical noise lines representing sorting channels
      if (Math.random() > 0.4) {
        c.strokeStyle = 'rgba(225, 224, 204, 0.15)';
        c.lineWidth = 0.5;
        for (let j = 0; j < 3; j++) {
          const colX = Math.floor(Math.random() * width);
          c.beginPath();
          c.moveTo(colX, 0);
          c.lineTo(colX, height);
          c.stroke();
        }
      }
    };

    const render = () => {
      tick++;
      if (type === 'web') {
        drawWebSchema(ctx, canvas.width, canvas.height, tick);
      } else {
        drawPcbSchema(ctx, canvas.width, canvas.height, tick);
      }
      applyPixelSortGlitch(ctx, canvas.width, canvas.height, tick);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [type, active]);

  return (
    <div className="relative w-[300px] h-[200px] rounded-lg overflow-hidden border border-[#E1E0CC]/20 bg-black/90 shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/85 px-1.5 py-0.5 rounded border border-[#E1E0CC]/15">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC] animate-ping" />
        <span className="font-mono text-[7px] text-[#E1E0CC] tracking-widest font-semibold uppercase">SYS SCAN</span>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // States for active project details, hovered project, and mouse positions
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [scrolledCoordinates, setScrolledCoordinates] = useState({ x: 0, y: 0 });

  // Spring animations for pointer tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 350 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tableRef.current) return;
    const rect = tableRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    setScrolledCoordinates({ x: Math.round(x), y: Math.round(y) });
  };

  const handleRowMouseEnter = (project: ProjectItem) => {
    setHoveredProject(project);
  };

  const handleRowMouseLeave = () => {
    setHoveredProject(null);
  };

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section 
      id="workshops" 
      className="min-h-screen bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 relative z-20 w-screen overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
    >
      {/* Fractal noise layer */}
      <div 
        id="noise-background" 
        className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none z-0"
      />

      {/* Grid line accents */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Core Header resembling target image */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-24 pb-10 border-b border-[#E1E0CC]/15 gap-8">
          
          {/* Title Area left side */}
          <div className="text-left">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#E1E0CC]/40 block mb-3 font-semibold">
              03 INDEX / SELECTED LEDGER
            </span>
            <h2 className="font-extrabold tracking-widest text-[#E1E0CC] text-7xl sm:text-8xl md:text-9xl font-mono leading-none m-0 select-none">
              INDEX
            </h2>
          </div>

          {/* Description right side */}
          <div className="max-w-md text-left">
          </div>
        </div>

        {/* Ledger Table Container */}
        <div 
          ref={tableRef}
          onMouseMove={handleMouseMove}
          className="relative w-full border-t border-[#E1E0CC]/10"
        >
          {/* Header Row */}
          <div className="grid grid-cols-[60px_1fr_120px_110px] md:grid-cols-[80px_1.5fr_1fr_1fr] py-4 border-b border-[#E1E0CC]/10 text-left px-2 sm:px-4">
            <span className="font-mono text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest font-semibold">NO.</span>
            <span className="font-mono text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest font-semibold">PROJECT</span>
            <span className="font-mono text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest font-semibold block">DISCIPLINE</span>
            <span className="font-mono text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest font-semibold block text-right">PLATFORM</span>
          </div>

          {/* Project List Entries */}
          <div className="flex flex-col">
            {PROJECTS_DATA.map((proj) => {
              const isItemHovered = hoveredProject?.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onMouseEnter={() => handleRowMouseEnter(proj)}
                  onMouseLeave={handleRowMouseLeave}
                  onClick={() => openProjectModal(proj)}
                  className={`grid grid-cols-[60px_1fr_120px_110px] md:grid-cols-[80px_1.5fr_1fr_1fr] py-10 sm:py-14 border-b border-[#E1E0CC]/10 items-center px-2 sm:px-4 cursor-pointer transition-colors duration-200 ${
                    isItemHovered ? 'bg-[#0f0f0f]' : 'bg-transparent'
                  }`}
                >
                  {/* Number column */}
                  <span className="font-mono text-xs sm:text-sm text-zinc-600">
                    {proj.no}
                  </span>

                  {/* Project Name column with dynamic Hover Scale-Shift */}
                  <div className="flex items-center gap-4 text-left">
                    <h3 
                      className={`text-xl sm:text-3xl md:text-4xl font-normal tracking-tight font-sans transition-all duration-300 ${
                        isItemHovered ? 'text-white translate-x-2' : 'text-zinc-400'
                      }`}
                    >
                      {proj.name}
                    </h3>
                  </div>

                  {/* Discipline column */}
                  <span className="font-mono text-[10px] sm:text-xs tracking-wider text-zinc-500 text-left uppercase">
                    {proj.discipline}
                  </span>

                  {/* Platform / Date Column with diagonal arrow */}
                  <div className="flex items-center justify-end gap-2 text-right">
                    <span className="font-mono text-[10px] sm:text-xs text-zinc-500 whitespace-nowrap">
                      {proj.platform}
                    </span>
                    <ArrowUpRight 
                      className={`w-4 h-4 transition-all duration-300 ${
                        isItemHovered ? 'text-[#E1E0CC] rotate-45 scale-110' : 'text-zinc-600'
                      }`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mouse cursor-tracking Floating Preview Thumbnail */}
          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                className="absolute pointer-events-none z-40 hidden lg:block select-none -translate-x-[20%] -translate-y-[60%]"
                style={{
                  left: springX,
                  top: springY,
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
              >
                {/* Floating Preview Window Capsule container */}
                <div className="flex flex-col p-3 bg-zinc-950/95 backdrop-blur-md rounded-xl border border-[#E1E0CC]/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-w-[326px]">
                  
                  {/* Digital Canvas Drawing */}
                  <CyberPreviewCanvas type={hoveredProject.type} active={true} />

                  {/* Hover Meta Overlay */}
                  <div className="mt-3 text-left">
                    <div className="flex justify-between items-center text-zinc-500 uppercase font-mono text-[8.5px] tracking-widest font-semibold px-0.5">
                      <span>{hoveredProject.no} // INDEX_ENTRY</span>
                      <span>ACTIVE SCANNER</span>
                    </div>
                    <div className="mt-1 h-[1px] bg-[#E1E0CC]/10" />
                    <div className="mt-1 px-0.5 flex justify-between items-end">
                      <div className="font-mono text-[9px] text-[#E1E0CC] font-bold">
                        {hoveredProject.name}
                      </div>
                      <div className="font-mono text-[8px] text-zinc-500">
                        X:{scrolledCoordinates.x} Y:{scrolledCoordinates.y}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Dynamic bottom telemetry summary */}
        <div className="mt-12 flex justify-between items-center text-[#E1E0CC]/15 font-mono text-[9px] tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Binary className="w-3 h-3" /> LISTENING_ON // PORTFOLIO_INDEX_LEDGER
          </div>
          <div className="text-right">
            STATUS: ACTIVE // COORDS SYNCED
          </div>
        </div>

      </div>

      {/* High Fidelity Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Modal main card */}
            <motion.div
              className="bg-zinc-950 border border-[#E1E0CC]/15 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              
              {/* Close Button Anchor */}
              <button
                onClick={closeProjectModal}
                className="absolute top-6 right-6 w-11 h-11 rounded-full border border-[#E1E0CC]/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#E1E0CC]/35 hover:bg-white/5 transition-all outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Grid Layout inside modal */}
              <div className="p-6 sm:p-10 md:p-12 text-left">
                
                {/* Meta Head block to label project row */}
                <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs text-zinc-500 tracking-[0.2em] uppercase mb-6 font-bold pb-4 border-b border-white/5">
                  <span>{selectedProject.no}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
                  <span>PROJECT DETAIL LOCK // LEDGER</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                  
                  {/* Left Column: Visual & Spec values */}
                  <div className="md:col-span-5 flex flex-col gap-6">
                    
                    {/* Live schematic drawing embedded */}
                    <div className="w-full h-48 bg-black border border-[#E1E0CC]/10 rounded-2xl overflow-hidden flex items-center justify-center relative">
                      <div className="scale-125">
                        <CyberPreviewCanvas type={selectedProject.type} active={true} />
                      </div>
                    </div>

                    {/* Integrated mini-hardware/web physical specs */}
                    <div className="flex flex-col gap-3.5 bg-black/50 p-5 rounded-2xl border border-white/5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#E1E0CC]/30 font-bold block mb-1">
                        System Specifications
                      </span>
                      {selectedProject.specs.map((sp, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs font-mono py-1.5 border-b border-white/5 last:border-b-0">
                          <span className="text-zinc-600 uppercase tracking-widest text-[9px]">{sp.label}</span>
                          <span className="text-zinc-300 text-[11px] font-bold">{sp.value}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Right Column: Descriptions and custom details */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Name heading */}
                      <h2 style={{ color: "#E1E0CC" }} className="text-3xl sm:text-4xl md:text-5xl font-light font-sans tracking-tight mb-6">
                        {selectedProject.name}
                      </h2>

                      {/* Description body */}
                      <p className="text-sm sm:text-base leading-relaxed text-zinc-400 font-light mb-8">
                        {selectedProject.desc}
                      </p>

                      {/* Technical bullets */}
                      <div className="space-y-4">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#E1E0CC]/30 font-bold block">
                          Key Technical Milestones
                        </span>
                        {selectedProject.bulletPoints.map((pt, idx) => {
                          const IconComp = selectedProject.type === 'web' ? Globe : Cpu;
                          return (
                            <div key={idx} className="flex items-start gap-3 group">
                              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E1E0CC] shrink-0 mt-0.5">
                                <IconComp className="w-3 h-3 text-zinc-400" />
                              </div>
                              <p className="text-[#DEDBC8]/85 text-xs sm:text-sm leading-relaxed m-0 font-light">
                                {pt}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer closing button */}
                    <div className="mt-12 pt-6 border-t border-white/5 flex justify-end">
                      <button
                        onClick={closeProjectModal}
                        className="px-6 py-2.5 rounded-full bg-[#E1E0CC] hover:bg-white text-black font-semibold text-xs transition-colors flex items-center gap-1.5 shadow"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Close details
                      </button>
                    </div>

                  </div>

                </div>

              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
