/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import LoadingOverlay from './components/LoadingOverlay';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import QuoteSection from './components/QuoteSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';

export default function App() {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Also listen to secondary custom event for absolute decoupling
    const handleLoadedEvent = () => {
      setIsHeroLoaded(true);
    };

    window.addEventListener('hero-video-loaded', handleLoadedEvent);
    
    // Safety timeout: If anything goes wrong or video takes too long, continue anyway
    const safetyTimeout = setTimeout(() => {
      setIsHeroLoaded(true);
    }, 6000);

    return () => {
      window.removeEventListener('hero-video-loaded', handleLoadedEvent);
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Delay actual overlay removal slightly after 100% progress for seamless visuals
  useEffect(() => {
    if (isHeroLoaded) {
      const dismissTimeout = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(dismissTimeout);
    }
  }, [isHeroLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <LoadingOverlay key="loader" isDone={isHeroLoaded} />
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-black text-[#E1E0CC] overflow-x-hidden selection:bg-[#DEDBC8] selection:text-black">
        {/* SECTION 1: HERO */}
        <HeroSection onLoaded={() => setIsHeroLoaded(true)} />

        {/* SECTION 2: ABOUT / QUOTE SECTION */}
        <AboutSection />

        {/* SECTION 3: FEATURES GRID */}
        <FeaturesSection />

        {/* SECTION 3.5: STICKY QUOTE SECTION REVEAL */}
        <QuoteSection />

        {/* SECTION 4: CALL TO ACTION FORM */}
        <CTASection />

        {/* SECTION 5: FOOTER */}
        <FooterSection />
      </main>
    </>
  );
}
