'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
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

export function SectionCover() {
  const [selectedLantern, setSelectedLantern] = useState<'traditional' | 'modern' | null>(null);

  const scrollToNext = () => {
    const el = document.getElementById('section-riddle');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectLantern = (type: 'traditional' | 'modern') => {
    setSelectedLantern(type);
  };

  return (
    <section
      id="section-cover"
      className="section section-cover"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px 20px 40px',
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/bg.jpg"
          alt="Đêm Trung Thu"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(26,14,46,0.45) 0%, rgba(26,14,46,0.72) 50%, rgba(26,14,46,0.94) 100%)',
          }}
        />
      </div>

      <Particles />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          maxWidth: '860px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.75rem, 1.6vw, 0.92rem)',
            color: 'var(--lantern-gold-light)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 600,
            margin: 0,
          }}
        >
          ✦ Tết Trung Thu ✦
        </motion.p>

        {/* Main Title (TÍT CHÍNH) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glow-text"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.7rem, 4.5vw, 2.9rem)',
            fontWeight: 700,
            color: 'var(--paper-cream)',
            lineHeight: 1.2,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Muôn Ánh Đèn,
          <br />
          Cùng Thắp Một Mùa Trăng
        </motion.h1>

        {/* Chuyển đổi giữa (2 đèn) và (Thông điệp) */}
        <AnimatePresence mode="wait">
          {!selectedLantern ? (
            /* Khi chưa chọn: hiển thị câu hỏi và 2 ảnh đèn (không có khung viền) */
            <motion.div
              key="lanterns-choice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
              }}
            >
              {/* Câu hỏi tương tác */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                  color: 'rgba(255,248,231,0.92)',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  margin: '4px 0 10px',
                }}
              >
                Trung thu này, ánh sáng nào sẽ dẫn đường cho bạn?
              </p>

              {/* 2 Chiếc đèn tượng trưng: Không khung viền, hover zoom nhẹ ảnh */}
              <div
                style={{
                  display: 'flex',
                  gap: 'clamp(28px, 6vw, 56px)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  width: '100%',
                }}
              >
                {/* 1. Đèn ông sao truyền thống */}
                <motion.button
                  type="button"
                  onClick={() => handleSelectLantern('traditional')}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  title="Đèn ông sao truyền thống"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    cursor: 'pointer',
                    outline: 'none',
                    position: 'relative',
                    width: 'clamp(150px, 24vw, 200px)',
                    aspectRatio: '1 / 1',
                    filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5))',
                    transition: 'filter 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter =
                      'drop-shadow(0 0 28px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 50px rgba(245, 166, 35, 0.5))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5))';
                  }}
                >
                  <Image
                    src="/images/denongsaotit.png"
                    alt="Đèn ông sao truyền thống"
                    fill
                    sizes="(max-width: 768px) 160px, 200px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </motion.button>

                {/* 2. Đèn hiện đại */}
                <motion.button
                  type="button"
                  onClick={() => handleSelectLantern('modern')}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  title="Đèn hiện đại"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    cursor: 'pointer',
                    outline: 'none',
                    position: 'relative',
                    width: 'clamp(150px, 24vw, 200px)',
                    aspectRatio: '1 / 1',
                    filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5))',
                    transition: 'filter 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter =
                      'drop-shadow(0 0 28px rgba(79, 195, 247, 0.8)) drop-shadow(0 0 50px rgba(206, 147, 216, 0.5))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5))';
                  }}
                >
                  <Image
                    src="/images/denhiendaitit.png"
                    alt="Đèn hiện đại"
                    fill
                    sizes="(max-width: 768px) 160px, 200px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Sau khi chọn: Ẩn 2 ảnh và hiển thị thông điệp lên */
            <motion.div
              key="message-card"
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                marginTop: '12px',
                width: '100%',
                maxWidth: '640px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '18px',
              }}
            >
              {/* Khối Card thông điệp */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  padding: '22px 26px',
                  borderRadius: '18px',
                  background: 'rgba(26, 14, 46, 0.88)',
                  border: '1.5px solid rgba(255, 215, 0, 0.65)',
                  boxShadow:
                    '0 0 35px rgba(245, 166, 35, 0.35), inset 0 0 25px rgba(255, 215, 0, 0.15)',
                  backdropFilter: 'blur(12px)',
                  textAlign: 'center',
                }}
              >
                {/* Tiêu đề thông điệp */}
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--lantern-gold)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                    textShadow: '0 0 12px rgba(255, 215, 0, 0.8)',
                  }}
                >
                  THÔNG ĐIỆP
                </span>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.92rem, 1.9vw, 1.08rem)',
                    color: 'rgba(255, 248, 231, 0.95)',
                    lineHeight: 1.75,
                    fontStyle: 'italic',
                    margin: 0,
                  }}
                >
                  &quot;Dù chọn ánh sáng của ký ức hay sự tiện lợi của hiện đại, mong bạn luôn có một mùa Trung thu hạnh phúc và ấm áp bên gia đình.&quot;
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dòng chữ BẮT ĐẦU ở dưới cùng, không nền, font size nhỏ */}
      <motion.button
        type="button"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6], y: [0, 3, 0] }}
        transition={{ delay: 1, duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05, color: '#FFE082' }}
        whileTap={{ scale: 0.96 }}
        style={{
          position: 'absolute',
          bottom: '20px',
          zIndex: 4,
          background: 'none',
          border: 'none',
          padding: '4px 8px',
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: 'var(--lantern-gold-light)',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.76rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          transition: 'color 0.2s ease',
        }}
      >
        <span>Bắt đầu</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.button>
    </section>
  );
}
