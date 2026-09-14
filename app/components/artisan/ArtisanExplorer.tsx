'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Hotspot {
  id: string;
  label: string;
  description: string;
  x: string; // percentage
  y: string; // percentage
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'bamboo',
    label: '🎋 Chọn tre',
    description: 'Tre phải chọn loại già, thẳng, dẻo dai. Mỗi thanh tre được chẻ mỏng, chuốt nhẵn bằng tay để tạo khung đèn vừa nhẹ vừa bền.',
    x: '30%',
    y: '25%',
  },
  {
    id: 'frame',
    label: '🔗 Tạo khung',
    description: 'Khung đèn ông sao có 10 cạnh, uốn thành hình ngôi sao 5 cánh. Các mối nối được buộc bằng dây gai hoặc kẽm mảnh, đòi hỏi sự khéo léo.',
    x: '55%',
    y: '20%',
  },
  {
    id: 'paper',
    label: '📄 Dán giấy kiếng',
    description: 'Giấy kiếng (giấy bóng mỏng trong suốt) được cắt theo từng ô, dán phủ lên khung tre. Khi có ánh nến bên trong, giấy phát sáng lung linh.',
    x: '70%',
    y: '45%',
  },
  {
    id: 'candle',
    label: '🕯️ Thắp nến',
    description: 'Một cây nến nhỏ được cắm ở giữa đáy đèn. Ngọn nến tạo ra ánh sáng ấm áp, lung linh — đặc trưng không thể thay thế của đèn truyền thống.',
    x: '45%',
    y: '65%',
  },
  {
    id: 'decor',
    label: '🎨 Trang trí',
    description: 'Đèn được trang trí thêm tua rua, hoa văn, hoặc viết chữ. Mỗi chiếc đèn mang dấu ấn riêng của người làm — không chiếc nào giống chiếc nào.',
    x: '25%',
    y: '55%',
  },
];

export function ArtisanExplorer() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const activeData = HOTSPOTS.find((h) => h.id === activeHotspot);

  return (
    <div
      id="artisan-explorer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        maxWidth: '800px',
        padding: '0 16px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'rgba(255,248,231,0.7)',
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '500px',
        }}
      >
        Chạm vào các điểm sáng trên chiếc đèn để khám phá quy trình làm đèn lồng truyền thống 🏮
      </p>

      {/* Lantern image with hotspots */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          aspectRatio: '3/4',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/traditional-lantern.jpg"
          alt="Đèn lồng truyền thống"
          fill
          style={{ objectFit: 'cover', borderRadius: '16px' }}
        />

        {/* Warm overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(26,14,46,0.4) 100%)',
            borderRadius: '16px',
          }}
        />

        {/* Hotspots */}
        {HOTSPOTS.map((hotspot) => (
          <motion.button
            key={hotspot.id}
            onClick={() =>
              setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)
            }
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              left: hotspot.x,
              top: hotspot.y,
              transform: 'translate(-50%, -50%)',
              width: activeHotspot === hotspot.id ? '36px' : '28px',
              height: activeHotspot === hotspot.id ? '36px' : '28px',
              borderRadius: '50%',
              background:
                activeHotspot === hotspot.id
                  ? 'rgba(245, 166, 35, 0.7)'
                  : 'rgba(245, 166, 35, 0.3)',
              border: `2px solid ${
                activeHotspot === hotspot.id
                  ? 'var(--lantern-gold)'
                  : 'rgba(245, 166, 35, 0.6)'
              }`,
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              boxShadow:
                activeHotspot === hotspot.id
                  ? '0 0 20px rgba(245,166,35,0.6), 0 0 40px rgba(245,166,35,0.3)'
                  : '0 0 10px rgba(245,166,35,0.3)',
            }}
          >
            {/* Ripple ring */}
            <span
              style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '50%',
                border: '1px solid rgba(245, 166, 35, 0.4)',
                animation: 'hotspotRipple 2s ease-out infinite',
              }}
            />
          </motion.button>
        ))}
      </div>

      {/* Info panel */}
      <AnimatePresence mode="wait">
        {activeData && (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              maxWidth: '450px',
              padding: '20px 24px',
              background: 'rgba(255, 248, 231, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(245, 166, 35, 0.25)',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                color: 'var(--lantern-gold)',
                marginBottom: '8px',
                fontWeight: 600,
              }}
            >
              {activeData.label}
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: 'rgba(255, 248, 231, 0.75)',
                lineHeight: 1.7,
              }}
            >
              {activeData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio placeholder */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 20px',
          borderRadius: '30px',
          background: 'rgba(255,248,231,0.05)',
          border: '1px solid rgba(255,248,231,0.1)',
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>🎙️</span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'rgba(255,248,231,0.4)',
            fontStyle: 'italic',
          }}
        >
          Audio phỏng vấn nghệ nhân (sắp có)
        </span>
      </div>
    </div>
  );
}
