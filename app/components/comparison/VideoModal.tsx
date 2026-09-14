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
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
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
          background: 'linear-gradient(135deg, #1A0E2E, #2D1B4E)',
          border: '1px solid rgba(245,166,35,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          overflow: 'hidden',
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
            background: 'rgba(0,0,0,0.4)',
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

        {/* Video placeholder */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(245,166,35,0.15)',
            border: '2px solid rgba(245,166,35,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--lantern-gold)">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'var(--paper-cream)',
              marginBottom: '8px',
            }}
          >
            Video trải nghiệm
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'rgba(255,248,231,0.5)',
            }}
          >
            Hành trình làm đèn truyền thống & khám phá đèn hiện đại
            <br />
            <span style={{ fontSize: '0.75rem' }}>(1 phút 30 giây — sắp có video thật)</span>
          </p>
        </div>

        {/* Fake timeline bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(255,248,231,0.1)',
          }}
        >
          <div
            style={{
              width: '0%',
              height: '100%',
              borderRadius: '2px',
              background: 'var(--lantern-gold)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
