/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-[#050505] border border-[#E1E0CC]/15 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl p-6 sm:p-10 select-none custom-scrollbar"
          >
            {/* Corner styling crosshairs */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-primary/30" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-primary/30" />
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-primary/30" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-primary/30" />

            {/* Header section with closing cross */}
            <div className="flex justify-between items-start border-b border-[#E1E0CC]/15 pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/35 flex items-center justify-center text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-extrabold font-sans tracking-wide text-white">DEREK LI</h3>
                  <p className="text-[#E1E0CC]/50 text-xs sm:text-sm font-mono tracking-widest uppercase mt-0.5">
                    Engineering Work Register // Resume
                  </p>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-primary hover:bg-primary/15 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Direct contact connection telemetry header block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-6 mb-8 border-b border-[#E1E0CC]/15 text-left text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-zinc-600 font-bold">[ MOBILE ]</span>
                <a href="tel:+61478704698" className="hover:text-white transition-colors">04 7870 4698</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-600 font-bold">[ EMAIL ]</span>
                <a href="mailto:DerekLi.Business.Work@gmail.com" className="hover:text-white transition-colors break-all">DerekLi.Business.Work@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 mb-1 sm:mb-0">
                <span className="text-zinc-600 font-bold">[ LINKEDIN ]</span>
                <a href="https://www.linkedin.com/in/derek-li-844742247" target="_blank" rel="noreferrer" className="hover:text-white transition-colors truncate underline decoration-zinc-800 underline-offset-2">linkedin.com/in/derek-li-844742247</a>
              </div>
            </div>

            {/* Resume Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
              
              {/* Left Column: Experience, Education & Extracurriculars */}
              <div className="col-span-1 md:col-span-8 space-y-8">
                
                {/* EXPERIENCE */}
                <div>
                  <h4 className="font-mono text-xs text-primary uppercase tracking-[0.2em] font-bold mb-4 border-l-2 border-primary pl-2.5">
                    Experience
                  </h4>
                  <div className="space-y-4">
                    
                    {/* SAE Team */}
                    <div className="bg-[#0c0c0c] p-5 border border-white/5 rounded-2xl space-y-3.5 hover:border-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                        <div>
                          <span className="font-sans text-base font-semibold text-[#E1E0CC] block">UQ Racing Formula SAE Team</span>
                          <span className="text-primary font-mono text-[10px] tracking-wider uppercase">Structural Team Member</span>
                        </div>
                        <span className="font-mono text-[11px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">2021 – 2022</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-[12px] text-zinc-400 leading-relaxed font-light">
                        <li>Fabricated 3D Aerodynamic packages for the UQ 2022 EV &ldquo;Capybara&rdquo; Car, increasing the performance of the vehicle using lightweight carbon fiber composites.</li>
                        <li>Learnt Vacuum bagging composite process in a hands-on environment.</li>
                        <li>Collaborated in Modelling and Creating 3D Aerodynamics packages.</li>
                        <li>Construct and maintain the Capybara EV for competition.</li>
                      </ul>
                    </div>

                    {/* SPACE Team */}
                    <div className="bg-[#0c0c0c] p-5 border border-white/5 rounded-2xl space-y-3.5 hover:border-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                        <div>
                          <span className="font-sans text-base font-semibold text-[#E1E0CC] block">UQ SPACE Team</span>
                          <span className="text-primary font-mono text-[10px] tracking-wider uppercase">Aerostructure Team Member</span>
                        </div>
                        <span className="font-mono text-[11px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">2025 – Current</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-2 text-[12px] text-zinc-400 leading-relaxed font-light">
                        <li>Collaborated with the Aerostructure team to construct the fiberglass composite of the EPIMETHEUS using various techniques, Vacuum bagging, Lathe and polymer reactions.</li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* EDUCATION */}
                <div>
                  <h4 className="font-mono text-xs text-primary uppercase tracking-[0.2em] font-bold mb-4 border-l-2 border-primary pl-2.5">
                    Education
                  </h4>
                  <div className="space-y-4">
                    
                    {/* UQ */}
                    <div className="bg-[#0c0c0c] p-5 border border-white/5 rounded-2xl space-y-1 hover:border-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                        <div>
                          <span className="font-sans text-base font-semibold text-[#E1E0CC] block">University of Queensland</span>
                          <span className="text-primary font-mono text-[10px] tracking-wider uppercase">Bachelor of Engineering (Honours)</span>
                        </div>
                        <span className="font-mono text-[11px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">Current</span>
                      </div>
                    </div>

                    {/* High school */}
                    <div className="bg-[#0c0c0c] p-5 border border-white/5 rounded-2xl space-y-3 hover:border-white/10 transition-colors font-light">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 mb-2">
                        <div>
                          <span className="font-sans text-base font-semibold text-[#E1E0CC] block">Toowoomba Grammar School</span>
                          <span className="text-primary font-mono text-[10px] tracking-wider uppercase">High School Graduation</span>
                        </div>
                        <span className="font-mono text-[11px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">2020</span>
                      </div>
                      <div className="bg-black/40 p-3.5 border border-white/5 rounded-xl space-y-2 mt-1">
                        <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1">
                          <span className="text-zinc-400 text-xs font-mono">Chemistry, Mathematics B, English, Psychology, Physics</span>
                          <span className="font-mono text-[#E1E0CC] text-[11px] font-bold bg-white/5 px-2 py-0.5 rounded border border-[#E1E0CC]/10">ATAR 97.5</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* EXTRACURRICULARS */}
                <div>
                  <h4 className="font-mono text-xs text-primary uppercase tracking-[0.2em] font-bold mb-4 border-l-2 border-primary pl-2.5">
                    Extracurricular Active Divisions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#0c0c0c]/80 p-4 border border-white/5 rounded-xl font-mono text-xs text-zinc-400 flex items-center justify-between">
                      <span className="text-zinc-600">[ 01 ]</span>
                      <span className="font-sans font-medium text-zinc-300">UQ SPACE Team</span>
                    </div>
                    <div className="bg-[#0c0c0c]/80 p-4 border border-white/5 rounded-xl font-mono text-xs text-zinc-400 flex items-center justify-between">
                      <span className="text-zinc-600">[ 02 ]</span>
                      <span className="font-sans font-medium text-zinc-300">UQ Racing Formula SAE (UQ SAE)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Skills */}
              <div className="col-span-1 md:col-span-4 space-y-8">
                
                {/* TOOLCHAIN & SKILLS */}
                <div className="space-y-4">
                  <h4 className="font-mono text-xs text-primary uppercase tracking-[0.2em] font-bold border-l-2 border-primary pl-2.5">
                    Skills
                  </h4>
                  <div className="space-y-3 font-mono text-xs text-zinc-400">
                    <div className="bg-[#0c0c0c] p-3.5 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                      <span className="text-[#E1E0CC]/80 block font-bold mb-1">Spreadsheet Calculations</span>
                      <p className="text-zinc-500 text-[11px] font-light leading-relaxed">Advanced Excel & Spreadsheet calculation pipelines</p>
                    </div>
                    <div className="bg-[#0c0c0c] p-3.5 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                      <span className="text-[#E1E0CC]/80 block font-bold mb-1">Programming Languages</span>
                      <p className="text-zinc-500 text-[11px] font-light leading-relaxed">Python, Basic SQL, Matlab, VBA scripts</p>
                    </div>
                    <div className="bg-[#0c0c0c] p-3.5 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                      <span className="text-[#E1E0CC]/80 block font-bold mb-1">Electrical & Hardware</span>
                      <p className="text-zinc-500 text-[11px] font-light leading-relaxed">Soldering, Wiring and Circuitry design</p>
                    </div>
                    <div className="bg-[#0c0c0c] p-3.5 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                      <span className="text-[#E1E0CC]/80 block font-bold mb-1">CAD & Solid Modeling</span>
                      <p className="text-zinc-500 text-[11px] font-light leading-relaxed">Inventor & SolidWorks 3D CAD design experience</p>
                    </div>
                    <div className="bg-[#0c0c0c] p-3.5 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                      <span className="text-[#E1E0CC]/80 block font-bold mb-1">Creative Suite</span>
                      <p className="text-zinc-500 text-[11px] font-light leading-relaxed">Proficient at Adobe Creative Suite products</p>
                    </div>
                    <div className="bg-[#0c0c0c] p-3.5 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                      <span className="text-[#E1E0CC]/80 block font-bold mb-1">Manufacturing & Fabrication</span>
                      <p className="text-zinc-500 text-[11px] font-light leading-relaxed">3D Printing, Laser Cutting & CNC Laser Processing</p>
                    </div>
                  </div>
                </div>

                {/* COORDINATES SUMMARY */}
                <div className="bg-black p-4 rounded-xl border border-white/5 space-y-2.5">
                  <h5 className="font-mono text-[9px] text-[#E1E0CC]/40 uppercase font-semibold tracking-wider">COGNITIVE SUMMARY</h5>
                  <div className="font-mono text-[9px] text-zinc-500 space-y-1.5">
                    <div className="flex justify-between">
                      <span>LOCATION:</span>
                      <span className="text-[#E1E0CC] font-bold">Queensland, AU</span>
                    </div>
                    <div className="flex justify-between">
                      <span>COORDS:</span>
                      <span className="text-[#E1E0CC] font-bold">27.4698° S, 153.0251° E</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SYS_STATUS:</span>
                      <span className="text-primary font-bold">ACTIVE SCAN</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

             {/* Footer trigger to print or close */}
             <div className="mt-8 pt-6 border-t border-[#E1E0CC]/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
               <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-wider">
                 system id v1.0.8-alpha
               </span>
               <button 
                 onClick={() => window.print()}
                 className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:text-white transition-colors cursor-pointer border border-primary/20 hover:border-white/30 px-3.5 py-1.5 rounded-lg bg-primary/5 hover:bg-white/5"
               >
                 <span>Download PDF</span>
                 <ExternalLink className="w-3.5 h-3.5" />
               </button>
             </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
