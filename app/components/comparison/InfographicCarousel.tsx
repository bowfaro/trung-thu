'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    id: 'traditional',
    title: 'Đèn Truyền Thống',
    icon: '🏮',
    src: '/images/slildetruyenthong.png',
    alt: 'Infographic Đèn lồng truyền thống',
  },
  {
    id: 'modern',
    title: 'Đèn Hiện Đại',
    icon: '💡',
    src: '/images/slidehiendai.png',
    alt: 'Infographic Đèn lồng hiện đại',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export function InfographicCarousel() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = (prev + newDirection + SLIDES.length) % SLIDES.length;
        return [next, newDirection];
      });
    },
    []
  );

  const goToSlide = useCallback((index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  const currentSlide = SLIDES[currentIndex];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '960px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
      }}
    >
      {/* Tab Switcher & Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Previous Button */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Slide trước"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(26, 14, 46, 0.85)',
            border: '1px solid rgba(245, 166, 35, 0.4)',
            color: 'var(--lantern-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
            fontSize: '1.2rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(245, 166, 35, 0.9)';
            e.currentTarget.style.color = '#1A0E2E';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(26, 14, 46, 0.85)';
            e.currentTarget.style.color = 'var(--lantern-gold)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ‹
        </button>

        {/* Tabs */}
        <div
          style={{
            display: 'inline-flex',
            padding: '4px',
            borderRadius: '30px',
            background: 'rgba(26, 14, 46, 0.75)',
            border: '1px solid rgba(245, 166, 35, 0.3)',
            backdropFilter: 'blur(8px)',
            gap: '6px',
          }}
        >
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '24px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#1A0E2E' : 'rgba(255, 248, 231, 0.75)',
                  background: isActive
                    ? 'linear-gradient(135deg, #F5A623, #FFD54F)'
                    : 'transparent',
                  boxShadow: isActive ? '0 4px 14px rgba(245, 166, 35, 0.4)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <span>{slide.icon}</span>
                <span>{slide.title}</span>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => paginate(1)}
          aria-label="Slide tiếp theo"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(26, 14, 46, 0.85)',
            border: '1px solid rgba(245, 166, 35, 0.4)',
            color: 'var(--lantern-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
            fontSize: '1.2rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(245, 166, 35, 0.9)';
            e.currentTarget.style.color = '#1A0E2E';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(26, 14, 46, 0.85)';
            e.currentTarget.style.color = 'var(--lantern-gold)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ›
        </button>
      </div>

      {/* Carousel Viewport (Unobstructed) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(245, 166, 35, 0.25)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 0 24px rgba(245, 166, 35, 0.1)',
          background: '#0D0814',
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 32 },
              opacity: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -100 || offset.x < -100) {
                paginate(1);
              } else if (swipe > 100 || offset.x > 100) {
                paginate(-1);
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              cursor: 'grab',
            }}
          >
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 960px"
              style={{
                objectFit: 'contain',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots below image */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            aria-label={`Đi tới slide ${idx + 1}`}
            style={{
              width: idx === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background:
                idx === currentIndex
                  ? 'var(--lantern-gold)'
                  : 'rgba(255, 248, 231, 0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
