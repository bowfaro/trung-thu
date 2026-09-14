'use client';

import { motion } from 'framer-motion';
import { useSlideStore } from '@/app/store/use-slide-store';

const SLIDE_LABELS = ['Bìa', 'Câu đố', 'So sánh', 'Biến đổi', 'Kết'];

export function ProgressIndicator() {
  const { currentSlide, totalSlides, goToSlide } = useSlideStore();

  return (
    <div
      id="progress-indicator"
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 50,
        padding: '10px 20px',
        borderRadius: '50px',
        background: 'rgba(26, 14, 46, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(245, 166, 35, 0.2)',
      }}
    >
      {Array.from({ length: totalSlides }).map((_, i) => (
        <button
          key={i}
          id={`progress-dot-${i}`}
          onClick={() => goToSlide(i)}
          title={SLIDE_LABELS[i]}
          style={{
            position: 'relative',
            width: currentSlide === i ? '32px' : '10px',
            height: '10px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background:
              currentSlide === i
                ? 'linear-gradient(135deg, #F5A623, #FF8C42)'
                : i < currentSlide
                ? 'rgba(245, 166, 35, 0.5)'
                : 'rgba(255, 248, 231, 0.3)',
            boxShadow:
              currentSlide === i
                ? '0 0 12px rgba(245, 166, 35, 0.6), 0 0 24px rgba(245, 166, 35, 0.3)'
                : 'none',
          }}
        >
          {currentSlide === i && (
            <motion.div
              layoutId="active-dot"
              style={{
                position: 'absolute',
                inset: '-3px',
                borderRadius: '8px',
                border: '1px solid rgba(245, 166, 35, 0.5)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          )}
        </button>
      ))}

      {/* Slide counter */}
      <span
        style={{
          marginLeft: '8px',
          fontSize: '0.75rem',
          color: 'rgba(255, 248, 231, 0.6)',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          letterSpacing: '0.05em',
        }}
      >
        {currentSlide + 1}/{totalSlides}
      </span>
    </div>
  );
}
