'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComparisonSlider } from '../comparison/ComparisonSlider';
import { VideoModal } from '../comparison/VideoModal';

export function SlideComparison() {
  const [showVideo, setShowVideo] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  return (
    <div
      id="slide-comparison"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1A0E2E 0%, #1E2A3A 50%, #2D1B4E 100%)',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(245,166,35,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(79,195,247,0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          paddingTop: '32px',
          textAlign: 'center',
          zIndex: 2,
          width: '100%',
          paddingBottom: '16px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--paper-cream)',
            marginBottom: '8px',
          }}
        >
          Cuộc đua của ánh sáng
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'rgba(255,248,231,0.6)',
            maxWidth: '550px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Đèn lồng hiện đại — LED, pin sạc, đổi màu, phát nhạc — đã thay đổi diện mạo Trung thu.
          Nhưng liệu ánh sáng mới có thay thế được ký ức cũ?
        </p>
      </motion.div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          padding: '0 24px',
          zIndex: 2,
        }}
      >
        {!showSlider ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {/* Video prompt card */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowVideo(true)}
              style={{
                position: 'relative',
                width: '280px',
                height: '180px',
                borderRadius: '16px',
                border: '2px solid rgba(245,166,35,0.3)',
                background: 'linear-gradient(135deg, rgba(245,166,35,0.15), rgba(139,26,26,0.1))',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ fontSize: '3rem' }}>🏮</span>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--lantern-gold-light)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  padding: '0 16px',
                }}
              >
                &quot;Bạn có muốn biết thêm về mình?&quot;
              </p>
              {/* Play icon */}
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(245,166,35,0.3)',
                  border: '2px solid var(--lantern-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--lantern-gold)">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSlider(true)}
              className="btn-lantern"
              style={{ fontSize: '1rem', padding: '12px 28px' }}
            >
              So sánh hai ánh sáng →
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ComparisonSlider />
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
      </AnimatePresence>
    </div>
  );
}
