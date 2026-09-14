'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ComparisonRow {
  label: string;
  traditional: string;
  modern: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  { label: 'Nguồn gốc', traditional: 'Làng nghề truyền thống', modern: 'Nhà máy công nghiệp' },
  { label: 'Người làm', traditional: 'Nghệ nhân thủ công', modern: 'Sản xuất hàng loạt' },
  { label: 'Chất liệu', traditional: 'Tre, giấy kiếng, keo', modern: 'Nhựa, LED, pin sạc' },
  { label: 'Nguồn sáng', traditional: 'Nến — ánh lửa ấm', modern: 'LED — đổi 7 màu' },
  { label: 'Mẫu mã', traditional: 'Ông sao, cá chép, thỏ', modern: 'Siêu nhân, Elsa, robot' },
  { label: 'Giá thành', traditional: '15K – 200K', modern: '20K – 500K' },
  { label: 'Trải nghiệm', traditional: 'Thắp nến, sợ tắt, kỷ niệm', modern: 'Bật/tắt, phát nhạc, tiện' },
];

export function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      id="comparison-slider"
      style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'rgba(255,248,231,0.4)',
          textAlign: 'center',
        }}
      >
        ← Kéo thanh trượt để so sánh →
      </p>

      {/* Slider container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none',
        }}
      >
        {/* Labels row */}
        <div style={{ display: 'flex', width: '100%' }}>
          {/* Traditional header */}
          <div
            style={{
              width: `${position}%`,
              padding: '16px 20px',
              background: 'linear-gradient(135deg, rgba(139,26,26,0.6), rgba(245,166,35,0.3))',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: isDragging ? 'none' : 'width 0.1s ease',
              overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>🏮</span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                fontWeight: 700,
                color: 'var(--lantern-gold-light)',
                whiteSpace: 'nowrap',
              }}
            >
              Truyền thống
            </span>
          </div>

          {/* Modern header */}
          <div
            style={{
              flex: 1,
              padding: '16px 20px',
              background: 'linear-gradient(135deg, rgba(79,195,247,0.2), rgba(206,147,216,0.2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                fontWeight: 700,
                color: 'var(--led-blue)',
                whiteSpace: 'nowrap',
              }}
            >
              Hiện đại
            </span>
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>💡</span>
          </div>
        </div>

        {/* Comparison rows */}
        {COMPARISON_DATA.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              width: '100%',
              borderTop: '1px solid rgba(255,248,231,0.06)',
            }}
          >
            {/* Traditional side */}
            <div
              style={{
                width: `${position}%`,
                padding: '12px 16px',
                background: `rgba(245,166,35,${0.04 + (i % 2) * 0.03})`,
                transition: isDragging ? 'none' : 'width 0.1s ease',
                overflow: 'hidden',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'rgba(245,166,35,0.7)',
                  marginBottom: '2px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {row.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--paper-cream)',
                  whiteSpace: 'nowrap',
                }}
              >
                {row.traditional}
              </p>
            </div>

            {/* Modern side */}
            <div
              style={{
                flex: 1,
                padding: '12px 16px',
                background: `rgba(79,195,247,${0.03 + (i % 2) * 0.02})`,
                textAlign: 'right',
                overflow: 'hidden',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'rgba(79,195,247,0.7)',
                  marginBottom: '2px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {row.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--paper-cream)',
                  whiteSpace: 'nowrap',
                }}
              >
                {row.modern}
              </p>
            </div>
          </div>
        ))}

        {/* Drag handle line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            transform: 'translateX(-50%)',
            width: '3px',
            background: 'white',
            zIndex: 20,
            boxShadow: '0 0 12px rgba(255,255,255,0.5)',
            pointerEvents: 'none',
            transition: isDragging ? 'none' : 'left 0.1s ease',
          }}
        />

        {/* Handle circle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.2)',
            zIndex: 21,
            pointerEvents: 'none',
            transition: isDragging ? 'none' : 'left 0.1s ease',
            fontSize: '0.8rem',
            color: '#333',
            letterSpacing: '3px',
          }}
        >
          ⟨⟩
        </div>
      </div>
    </div>
  );
}
