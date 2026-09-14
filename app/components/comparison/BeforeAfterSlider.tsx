'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';

export function BeforeAfterSlider() {
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

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      updatePosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      id="before-after-slider"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'rgba(255,248,231,0.4)',
        }}
      >
        ← Truyền thống | Cách tân →
      </p>

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none',
          border: '1px solid rgba(245,166,35,0.2)',
        }}
      >
        {/* Traditional (full background) */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/images/traditional-lantern.jpg"
            alt="Đèn truyền thống"
            fill
            style={{ objectFit: 'cover' }}
          />
          {/* Warm overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(245,166,35,0.15), rgba(139,26,26,0.1))',
            }}
          />
        </div>

        {/* Modern (clipped) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 0 0 ${position}%)`,
            transition: isDragging ? 'none' : 'clip-path 0.1s ease',
          }}
        >
          <Image
            src="/images/modern-lantern.jpg"
            alt="Đèn hiện đại"
            fill
            style={{ objectFit: 'cover' }}
          />
          {/* Cool overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(79,195,247,0.1), rgba(206,147,216,0.1))',
            }}
          />
        </div>

        {/* Labels */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'rgba(245,166,35,0.3)',
            backdropFilter: 'blur(4px)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--lantern-gold-light)',
            zIndex: 5,
          }}
        >
          Trước
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'rgba(79,195,247,0.3)',
            backdropFilter: 'blur(4px)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--led-blue)',
            zIndex: 5,
          }}
        >
          Sau
        </div>

        {/* Handle */}
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
            boxShadow: '0 0 12px rgba(255,255,255,0.6)',
            pointerEvents: 'none',
            transition: isDragging ? 'none' : 'left 0.1s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            zIndex: 21,
            pointerEvents: 'none',
            transition: isDragging ? 'none' : 'left 0.1s ease',
            fontSize: '0.75rem',
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
