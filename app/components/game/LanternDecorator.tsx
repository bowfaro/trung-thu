'use client';

import { motion } from 'framer-motion';
import { useSlideStore } from '@/app/store/use-slide-store';

interface PickerOption {
  value: string;
  label: string;
  emoji: string;
}

const SHAPES: PickerOption[] = [
  { value: 'Ngôi sao', label: 'Ngôi sao', emoji: '⭐' },
  { value: 'Cá chép', label: 'Cá chép', emoji: '🐟' },
  { value: 'Thỏ ngọc', label: 'Thỏ ngọc', emoji: '🐰' },
  { value: 'Mặt trăng', label: 'Mặt trăng', emoji: '🌙' },
];

const COLORS: PickerOption[] = [
  { value: 'Đỏ', label: 'Đỏ', emoji: '🔴' },
  { value: 'Vàng', label: 'Vàng', emoji: '🟡' },
  { value: 'Hồng', label: 'Hồng', emoji: '🩷' },
  { value: 'Xanh', label: 'Xanh', emoji: '🔵' },
  { value: 'Xanh lá', label: 'Xanh lá', emoji: '🟢' },
  { value: 'Trắng', label: 'Trắng', emoji: '⚪' },
];

const PATTERNS: PickerOption[] = [
  { value: 'Trăng', label: 'Trăng', emoji: '🌕' },
  { value: 'Sao', label: 'Sao', emoji: '✨' },
  { value: 'Hoa', label: 'Hoa', emoji: '🌸' },
  { value: 'Trơn', label: 'Trơn', emoji: '⬜' },
];

const COLOR_MAP: Record<string, string> = {
  'Đỏ': '#D94032',
  'Vàng': '#F5A623',
  'Hồng': '#F06292',
  'Xanh': '#4FC3F7',
  'Xanh lá': '#81C784',
  'Trắng': '#F0F4FF',
};

function LanternPreview({
  shape,
  color,
  pattern,
}: {
  shape: string | null;
  color: string | null;
  pattern: string | null;
}) {
  const fillColor = color ? COLOR_MAP[color] || '#F5A623' : '#555';
  const patternEmoji = PATTERNS.find((p) => p.value === pattern)?.emoji || '';
  const shapeEmoji = SHAPES.find((s) => s.value === shape)?.emoji || '🏮';

  return (
    <div
      style={{
        width: '180px',
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg viewBox="0 0 200 250" width="180" height="220">
        {/* Handle/stick */}
        <line x1="100" y1="0" x2="100" y2="40" stroke="#8B7355" strokeWidth="3" />

        {/* String */}
        <line x1="100" y1="40" x2="100" y2="60" stroke="#D4A574" strokeWidth="1.5" />

        {/* Main lantern body */}
        <ellipse
          cx="100"
          cy="140"
          rx="70"
          ry="80"
          fill={fillColor}
          opacity="0.85"
          stroke={fillColor}
          strokeWidth="2"
          filter="url(#lanternGlow)"
        />

        {/* Inner glow */}
        <ellipse cx="100" cy="135" rx="50" ry="60" fill="white" opacity="0.15" />

        {/* Lantern top ring */}
        <ellipse
          cx="100"
          cy="65"
          rx="25"
          ry="8"
          fill="none"
          stroke="#D4A574"
          strokeWidth="2"
        />

        {/* Lantern bottom ring */}
        <ellipse
          cx="100"
          cy="215"
          rx="20"
          ry="6"
          fill="none"
          stroke="#D4A574"
          strokeWidth="2"
        />

        {/* Tassel */}
        <line x1="100" y1="221" x2="100" y2="248" stroke="#D4A574" strokeWidth="1.5" />
        <line x1="92" y1="240" x2="100" y2="248" stroke="#D4A574" strokeWidth="1" />
        <line x1="108" y1="240" x2="100" y2="248" stroke="#D4A574" strokeWidth="1" />

        {/* SVG filter for glow */}
        <defs>
          <filter id="lanternGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Pattern + shape overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -10%)',
          fontSize: '2.5rem',
          textAlign: 'center',
          lineHeight: 1.2,
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        {shape && <div>{shapeEmoji}</div>}
        {pattern && pattern !== 'Trơn' && (
          <div style={{ fontSize: '1.2rem', marginTop: '4px' }}>{patternEmoji}</div>
        )}
      </div>
    </div>
  );
}

function PickerSection({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: PickerOption[];
  selected: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'rgba(255,248,231,0.6)',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
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
              border: `2px solid ${
                selected === opt.value
                  ? 'var(--lantern-gold)'
                  : 'rgba(255,248,231,0.1)'
              }`,
              background:
                selected === opt.value
                  ? 'rgba(245,166,35,0.2)'
                  : 'rgba(255,248,231,0.03)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              transition: 'all 0.2s ease',
              boxShadow:
                selected === opt.value
                  ? '0 0 15px rgba(245,166,35,0.3)'
                  : 'none',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{opt.emoji}</span>
          </motion.button>
        ))}
      </div>
      {/* Selected label */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          color: 'var(--lantern-gold)',
          marginTop: '4px',
          minHeight: '16px',
        }}
      >
        {selected || '—'}
      </p>
    </div>
  );
}

export function LanternDecorator() {
  const {
    lanternGame,
    setLanternShape,
    setLanternColor,
    setLanternPattern,
    completeLanternGame,
    resetLanternGame,
    setClosingView,
  } = useSlideStore();

  const canComplete = lanternGame.shape && lanternGame.color && lanternGame.pattern;

  const handleComplete = () => {
    completeLanternGame();
    setClosingView('result');
  };

  return (
    <div
      id="lantern-decorator"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: 700,
          color: 'var(--paper-cream)',
          textAlign: 'center',
        }}
      >
        Tự tay làm đèn lồng 🏮
      </h3>

      {/* Preview */}
      <motion.div
        animate={{
          filter: canComplete
            ? [
                'drop-shadow(0 0 20px rgba(245,166,35,0.4))',
                'drop-shadow(0 0 30px rgba(245,166,35,0.6))',
                'drop-shadow(0 0 20px rgba(245,166,35,0.4))',
              ]
            : 'none',
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <LanternPreview
          shape={lanternGame.shape}
          color={lanternGame.color}
          pattern={lanternGame.pattern}
        />
      </motion.div>

      {/* Pickers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        <PickerSection
          title="Chọn hình dáng"
          options={SHAPES}
          selected={lanternGame.shape}
          onSelect={setLanternShape}
        />
        <PickerSection
          title="Chọn màu sắc"
          options={COLORS}
          selected={lanternGame.color}
          onSelect={setLanternColor}
        />
        <PickerSection
          title="Chọn họa tiết"
          options={PATTERNS}
          selected={lanternGame.pattern}
          onSelect={setLanternPattern}
        />
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
            transition: 'all 0.2s ease',
          }}
        >
          Làm lại
        </button>

        <motion.button
          whileHover={canComplete ? { scale: 1.05 } : {}}
          whileTap={canComplete ? { scale: 0.95 } : {}}
          onClick={handleComplete}
          disabled={!canComplete}
          className={canComplete ? 'btn-lantern' : ''}
          style={{
            padding: '10px 28px',
            borderRadius: '30px',
            fontSize: '0.95rem',
            cursor: canComplete ? 'pointer' : 'not-allowed',
            opacity: canComplete ? 1 : 0.4,
            ...(canComplete
              ? {}
              : {
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
  );
}
