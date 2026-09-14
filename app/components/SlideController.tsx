'use client';

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSlideStore } from '@/app/store/use-slide-store';
import { ProgressIndicator } from './ProgressIndicator';
import { NavigationButtons } from './NavigationButtons';
import { SlideCover } from './slides/SlideCover';
import { SlideRiddle } from './slides/SlideRiddle';
import { SlideComparison } from './slides/SlideComparison';
import { SlideEvolution } from './slides/SlideEvolution';
import { SlideClosing } from './slides/SlideClosing';

const SLIDES = [SlideCover, SlideRiddle, SlideComparison, SlideEvolution, SlideClosing];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 200, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: 'spring' as const, stiffness: 200, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  }),
};

export function SlideController() {
  const { currentSlide, direction, nextSlide, prevSlide } = useSlideStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    },
    [nextSlide, prevSlide]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const CurrentSlideComponent = SLIDES[currentSlide];

  return (
    <div
      id="slide-controller"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(245,166,35,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="slide"
          style={{ zIndex: 1 }}
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation overlay */}
      <NavigationButtons />
      <ProgressIndicator />
    </div>
  );
}
