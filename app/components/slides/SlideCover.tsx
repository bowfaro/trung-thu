'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSlideStore } from '@/app/store/use-slide-store';
import Image from 'next/image';

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 6,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

function MoonSVG() {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
      style={{
        position: 'absolute',
        top: '8%',
        right: '15%',
        width: '180px',
        height: '180px',
        zIndex: 1,
      }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <defs>
          <radialGradient id="moonGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDE7" />
            <stop offset="60%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0.3" />
          </radialGradient>
          <filter id="moonBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {/* Outer glow */}
        <circle cx="100" cy="100" r="95" fill="url(#moonGrad)" filter="url(#moonBlur)" opacity="0.4" />
        {/* Main moon */}
        <circle cx="100" cy="100" r="70" fill="url(#moonGrad)" />
        {/* Moon craters hint */}
        <circle cx="80" cy="85" r="12" fill="rgba(245,166,35,0.15)" />
        <circle cx="115" cy="70" r="8" fill="rgba(245,166,35,0.1)" />
        <circle cx="95" cy="115" r="10" fill="rgba(245,166,35,0.12)" />
      </svg>
    </motion.div>
  );
}

export function SlideCover() {
  const { nextSlide } = useSlideStore();

  return (
    <div
      id="slide-cover"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/cover-bg.jpg"
          alt="Đêm Trung Thu"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        {/* Dark overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(26,14,46,0.4) 0%, rgba(26,14,46,0.7) 60%, rgba(26,14,46,0.85) 100%)',
          }}
        />
      </div>

      <MoonSVG />
      <Particles />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '800px',
        }}
      >
        {/* Decorative lantern icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
          className="lantern-glow"
          style={{
            display: 'inline-block',
            marginBottom: '24px',
            fontSize: '4rem',
          }}
        >
          🏮
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--lantern-gold-light)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontWeight: 500,
          }}
        >
          Tết Trung Thu
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="glow-text"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--paper-cream)',
            lineHeight: 1.15,
            marginBottom: '12px',
          }}
        >
          Hai Ánh Đèn,
          <br />
          Một Mùa Trăng
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            color: 'rgba(255, 248, 231, 0.7)',
            maxWidth: '500px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
            fontStyle: 'italic',
          }}
        >
          Câu chuyện về ánh sáng của ký ức và ánh sáng của đổi mới — hai ánh sáng giao thoa cùng thắp sáng một mùa trăng.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="btn-lantern glow-box"
          id="btn-start"
        >
          ✦ BẮT ĐẦU ✦
        </motion.button>
      </motion.div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ delay: 3, duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '80px',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,248,231,0.5)', fontFamily: 'var(--font-body)' }}>
          hoặc nhấn →
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,248,231,0.4)" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.div>
    </div>
  );
}
