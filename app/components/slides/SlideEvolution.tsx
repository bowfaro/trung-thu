'use client';

import { motion } from 'framer-motion';
import { BeforeAfterSlider } from '../comparison/BeforeAfterSlider';

export function SlideEvolution() {
  return (
    <div
      id="slide-evolution"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #2D1B4E 0%, #1A0E2E 50%, #3D2B1A 100%)',
      }}
    >
      {/* Ambient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(245,166,35,0.06) 0%, transparent 60%)',
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
          paddingBottom: '8px',
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
          Muôn ánh đèn, cùng thắp một mùa trăng
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
          Đèn lồng truyền thống không đứng yên — chất liệu thay đổi, mẫu mã cách tân, nhưng hồn cốt vẫn giữ nguyên.
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
          padding: '0 24px',
          zIndex: 2,
          gap: '24px',
        }}
      >
        {/* Evolution timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '700px',
          }}
        >
          {[
            { year: 'Xưa', desc: 'Tre + giấy kiếng + nến', emoji: '🕯️' },
            { year: '2000s', desc: 'Khung kẽm + vải + nến', emoji: '🔧' },
            { year: '2010s', desc: 'Nhựa + giấy + đèn LED', emoji: '💡' },
            { year: 'Nay', desc: 'Mica + LED + pin sạc', emoji: '🔋' },
          ].map((era, i) => (
            <motion.div
              key={era.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(255,248,231,0.05)',
                border: '1px solid rgba(245,166,35,0.15)',
                textAlign: 'center',
                minWidth: '130px',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>
                {era.emoji}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--lantern-gold)',
                  marginBottom: '4px',
                }}
              >
                {era.year}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'rgba(255,248,231,0.6)',
                  lineHeight: 1.4,
                }}
              >
                {era.desc}
              </p>

              {/* Connector arrow (except last) */}
              {i < 3 && (
                <span
                  style={{
                    position: 'absolute',
                    right: '-14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(245,166,35,0.3)',
                    fontSize: '1rem',
                    display: 'none', // show on larger screens via media query alternative
                  }}
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Before/After slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ width: '100%', maxWidth: '600px' }}
        >
          <BeforeAfterSlider />
        </motion.div>
      </div>
    </div>
  );
}
