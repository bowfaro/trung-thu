'use client';

import { motion } from 'framer-motion';

interface VideoModalProps {
  onClose: () => void;
}

export function VideoModal({ onClose }: VideoModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        cursor: 'pointer',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '720px',
          aspectRatio: '16/9',
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#000',
          border: '1px solid rgba(245,166,35,0.3)',
          cursor: 'default',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(255,248,231,0.2)',
            background: 'rgba(0,0,0,0.6)',
            color: 'var(--paper-cream)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* Google Drive video embed */}
        <iframe
          src="https://drive.google.com/file/d/1mqf5oW32em_5vXPOrGyRGPRrTDwW33EX/preview"
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 'none' }}
          title="Video trải nghiệm đèn lồng"
        />
      </motion.div>
    </motion.div>
  );
}
