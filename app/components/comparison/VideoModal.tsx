'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VideoModalProps {
  onClose: () => void;
}

export function VideoModal({ onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Lock body scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-focus and attempt autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay with sound might require user interaction on mobile
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 5, 20, 0.92)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
        cursor: 'pointer',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 15 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '780px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          cursor: 'default',
        }}
      >
        {/* Top Header Bar: Title + Touch-friendly Close Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 8px',
            width: '100%',
          }}
        >


          {/* Close button outside video area so it never covers controls */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng video"
            title="Đóng video (Esc)"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1.5px solid rgba(245, 166, 35, 0.45)',
              background: 'rgba(26, 14, 46, 0.85)',
              color: '#FFF8E7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              fontWeight: 700,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(217, 64, 50, 0.9)';
              e.currentTarget.style.borderColor = '#FFD54F';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(26, 14, 46, 0.85)';
              e.currentTarget.style.borderColor = 'rgba(245, 166, 35, 0.45)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Video Player Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#000',
            border: '2px solid rgba(245, 166, 35, 0.4)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(245, 166, 35, 0.2)',
          }}
        >
          <video
            ref={videoRef}
            src="/video/artisan-video.mp4"
            poster="/images/video-poster.jpg"
            controls
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'contain',
              background: '#000',
            }}
          >
            Trình duyệt của bạn không hỗ trợ phát video HTML5.
          </video>
        </div>
      </motion.div>
    </motion.div>
  );
}
