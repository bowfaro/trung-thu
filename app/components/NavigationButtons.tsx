'use client';

import { useSlideStore } from '@/app/store/use-slide-store';

export function NavigationButtons() {
  const { currentSlide, totalSlides, nextSlide, prevSlide } = useSlideStore();

  return (
    <>
      {/* Previous Button */}
      {currentSlide > 0 && (
        <button
          id="nav-prev"
          onClick={prevSlide}
          aria-label="Trang trước"
          style={{
            position: 'fixed',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 50,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid rgba(245, 166, 35, 0.3)',
            background: 'rgba(26, 14, 46, 0.5)',
            backdropFilter: 'blur(8px)',
            color: 'var(--lantern-gold-light)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease',
            opacity: 0.6,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(245, 166, 35, 0.4)';
            e.currentTarget.style.background = 'rgba(245, 166, 35, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.6';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.background = 'rgba(26, 14, 46, 0.5)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next Button */}
      {currentSlide < totalSlides - 1 && (
        <button
          id="nav-next"
          onClick={nextSlide}
          aria-label="Trang tiếp"
          style={{
            position: 'fixed',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 50,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid rgba(245, 166, 35, 0.3)',
            background: 'rgba(26, 14, 46, 0.5)',
            backdropFilter: 'blur(8px)',
            color: 'var(--lantern-gold-light)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease',
            opacity: 0.6,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(245, 166, 35, 0.4)';
            e.currentTarget.style.background = 'rgba(245, 166, 35, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.6';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.background = 'rgba(26, 14, 46, 0.5)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </>
  );
}
