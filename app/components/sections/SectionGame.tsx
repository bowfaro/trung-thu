'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/app/store/use-slide-store';

interface PickerOption {
  value: string;
  label: string;
  emoji: string;
}

const SHAPES: PickerOption[] = [
  { value: 'Ngôi sao', label: 'Ngôi sao', emoji: '⭐' },
  { value: 'Cá chép', label: 'Cá chép', emoji: '🐟' },
  { value: 'Thỏ ngọc', label: 'Thỏ ngọc', emoji: '🐰' },
  { value: 'Rồng vàng', label: 'Rồng vàng', emoji: '🐉' },
  { value: 'Hoa sen', label: 'Hoa sen', emoji: '🪷' },
  { value: 'Đầu lân', label: 'Đầu lân', emoji: '🦁' },
];

const COLORS: PickerOption[] = [
  { value: 'Đỏ', label: 'Đỏ', emoji: '🔴' },
  { value: 'Vàng', label: 'Vàng', emoji: '🟡' },
  { value: 'Hồng', label: 'Hồng', emoji: '🩷' },
  { value: 'Xanh', label: 'Xanh', emoji: '🔵' },
  { value: 'Xanh lá', label: 'Xanh lá', emoji: '🟢' },
  { value: 'Cam', label: 'Cam', emoji: '🟠' },
  { value: 'Tím', label: 'Tím', emoji: '🟣' },
];

const PATTERNS: PickerOption[] = [
  { value: 'Trăng', label: 'Trăng', emoji: '🌕' },
  { value: 'Sao', label: 'Sao', emoji: '✨' },
  { value: 'Hoa', label: 'Hoa', emoji: '🌸' },
  { value: 'Rồng', label: 'Rồng', emoji: '🐲' },
  { value: 'Trơn', label: 'Trơn', emoji: '⬜' },
];

const COLOR_MAP: Record<string, string> = {
  'Đỏ': '#D94032',
  'Vàng': '#F5A623',
  'Hồng': '#F06292',
  'Xanh': '#4FC3F7',
  'Xanh lá': '#81C784',
  'Cam': '#FF8C42',
  'Tím': '#CE93D8',
};

function LanternPreview({ shape, color, pattern }: { shape: string | null; color: string | null; pattern: string | null }) {
  const fillColor = color ? COLOR_MAP[color] || '#F5A623' : '#555';
  const patternEmoji = PATTERNS.find((p) => p.value === pattern)?.emoji || '';
  const shapeEmoji = SHAPES.find((s) => s.value === shape)?.emoji || '🏮';

  return (
    <div style={{ width: '180px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <svg viewBox="0 0 200 250" width="180" height="220">
        <line x1="100" y1="0" x2="100" y2="40" stroke="#8B7355" strokeWidth="3" />
        <line x1="100" y1="40" x2="100" y2="60" stroke="#D4A574" strokeWidth="1.5" />
        <ellipse cx="100" cy="140" rx="70" ry="80" fill={fillColor} opacity="0.85" stroke={fillColor} strokeWidth="2" filter="url(#lanternGlowFilter)" />
        <ellipse cx="100" cy="135" rx="50" ry="60" fill="white" opacity="0.15" />
        <ellipse cx="100" cy="65" rx="25" ry="8" fill="none" stroke="#D4A574" strokeWidth="2" />
        <ellipse cx="100" cy="215" rx="20" ry="6" fill="none" stroke="#D4A574" strokeWidth="2" />
        <line x1="100" y1="221" x2="100" y2="248" stroke="#D4A574" strokeWidth="1.5" />
        <line x1="92" y1="240" x2="100" y2="248" stroke="#D4A574" strokeWidth="1" />
        <line x1="108" y1="240" x2="100" y2="248" stroke="#D4A574" strokeWidth="1" />
        <defs>
          <filter id="lanternGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -10%)', fontSize: '2.5rem', textAlign: 'center', lineHeight: 1.2, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
        {shape && <div>{shapeEmoji}</div>}
        {pattern && pattern !== 'Trơn' && <div style={{ fontSize: '1.2rem', marginTop: '4px' }}>{patternEmoji}</div>}
      </div>
    </div>
  );
}

function PickerSection({ title, options, selected, onSelect }: { title: string; options: PickerOption[]; selected: string | null; onSelect: (v: string) => void }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,248,231,0.6)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {title}
      </p>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {options.map((opt) => (
          <motion.button
            key={opt.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(opt.value)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              border: `2px solid ${selected === opt.value ? 'var(--lantern-gold)' : 'rgba(255,248,231,0.1)'}`,
              background: selected === opt.value ? 'rgba(245,166,35,0.2)' : 'rgba(255,248,231,0.03)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: selected === opt.value ? '0 0 15px rgba(245,166,35,0.3)' : 'none',
            }}
            title={opt.label}
          >
            <span style={{ fontSize: '1.2rem' }}>{opt.emoji}</span>
          </motion.button>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--lantern-gold)', marginTop: '4px', minHeight: '16px' }}>
        {selected || '—'}
      </p>
    </div>
  );
}

export function SectionGame() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lanternGame, setLanternShape, setLanternColor, setLanternPattern, completeLanternGame, resetLanternGame } = useAppStore();

  const canComplete = lanternGame.shape && lanternGame.color && lanternGame.pattern;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="section-game"
      ref={sectionRef}
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--night-deep) 0%, #3D2B1A 50%, #5D3A1A 100%)',
      }}
    >
      {/* Ambient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(245,166,35,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div className="fade-in-section" style={{ textAlign: 'center', maxWidth: '600px', zIndex: 2 }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
            fontWeight: 700,
            color: 'var(--paper-cream)',
            marginBottom: '12px',
          }}
        >
          Tự tạo lồng đèn của riêng bạn!
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.6)',
            lineHeight: 1.6,
          }}
        >
          Hãy trang trí chiếc lồng đèn theo sở thích của bạn cho mùa Trung thu này nhé!
        </p>
      </div>

      {/* Game area */}
      <div className="fade-in-section" style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%', maxWidth: '500px' }}>
        {/* Preview */}
        <motion.div
          animate={{
            filter: canComplete
              ? ['drop-shadow(0 0 20px rgba(245,166,35,0.4))', 'drop-shadow(0 0 30px rgba(245,166,35,0.6))', 'drop-shadow(0 0 20px rgba(245,166,35,0.4))']
              : 'none',
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <LanternPreview shape={lanternGame.shape} color={lanternGame.color} pattern={lanternGame.pattern} />
        </motion.div>

        {/* Pickers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <PickerSection title="1. Chọn khung" options={SHAPES} selected={lanternGame.shape} onSelect={setLanternShape} />
          <PickerSection title="2. Chọn màu giấy" options={COLORS} selected={lanternGame.color} onSelect={setLanternColor} />
          <PickerSection title="3. Trang trí" options={PATTERNS} selected={lanternGame.pattern} onSelect={setLanternPattern} />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={resetLanternGame}
            style={{
              padding: '10px 20px',
              borderRadius: '30px',
              border: '1px solid rgba(255,248,231,0.15)',
              background: 'rgba(255,248,231,0.05)',
              color: 'rgba(255,248,231,0.5)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Làm lại
          </button>
          <motion.button
            whileHover={canComplete ? { scale: 1.05 } : {}}
            whileTap={canComplete ? { scale: 0.95 } : {}}
            onClick={() => canComplete && completeLanternGame()}
            disabled={!canComplete}
            className={canComplete ? 'btn-lantern' : ''}
            style={{
              padding: '10px 28px',
              borderRadius: '30px',
              fontSize: '0.95rem',
              cursor: canComplete ? 'pointer' : 'not-allowed',
              opacity: canComplete ? 1 : 0.4,
              ...(canComplete ? {} : {
                border: '1px solid rgba(255,248,231,0.15)',
                background: 'rgba(255,248,231,0.05)',
                color: 'rgba(255,248,231,0.4)',
                fontFamily: 'var(--font-body)',
              }),
            }}
          >
            ✨ Hoàn thành
          </motion.button>
        </div>
      </div>

      {/* Completion message */}
      {lanternGame.completed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="fade-in-section is-visible"
          style={{
            maxWidth: '600px',
            textAlign: 'center',
            padding: '32px',
            borderRadius: '16px',
            background: 'rgba(245,166,35,0.08)',
            border: '1px solid rgba(245,166,35,0.2)',
            marginTop: '32px',
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontWeight: 700,
              color: 'var(--lantern-gold)',
              marginBottom: '16px',
            }}
          >
            🏮 Chiếc đèn của bạn: {lanternGame.shape} — {lanternGame.color}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              color: 'rgba(255,248,231,0.75)',
              lineHeight: 1.8,
              fontStyle: 'italic',
            }}
          >
            &quot;Mỗi chiếc đèn mang một ánh sáng riêng, nhưng cùng nhau thắp nên một mùa trăng — kể cả ánh sáng từ chiếc đèn do chính bạn tạo nên.&quot;
          </p>
        </motion.div>
      )}

      {/* Reference link */}
      <div style={{ marginTop: '24px', zIndex: 2 }}>
        <a
          href="https://avocadol2711.github.io/den-long/lantern.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'rgba(255,248,231,0.3)',
            textDecoration: 'none',
          }}
        >
          Tham khảo: avocadol2711 — Đèn lồng
        </a>
      </div>
    </section>
  );
}
