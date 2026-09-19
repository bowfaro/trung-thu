'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/app/store/use-slide-store';
import {
  CELLOPHANE_COLORS,
  BAMBOO_FRAMES,
  PATTERN_OPTIONS,
  SvgDefs,
  ShapeStar,
  ShapeCarp,
  ShapeRabbit,
  ShapeDragon,
  ShapeLotus,
  ShapeLion,
  FrameThumbnail,
} from './LanternAssets';

export function SectionGame() {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    lanternGame,
    setLanternShape,
    setLanternColor,
    setLanternPattern,
    completeLanternGame,
    resetLanternGame,
  } = useAppStore();

  // Default to 'Thỏ ngọc' if nothing is chosen yet so the workbench is never empty!
  const currentShape = lanternGame.shape || 'Thỏ ngọc';
  const currentColor = lanternGame.color;
  const currentPattern = lanternGame.pattern || 'Trơn';

  // Can complete if shape is selected (color is optional for pure bamboo frame, or required for finished lantern)
  const canComplete = Boolean(currentShape && currentColor);

  useEffect(() => {
    // If shape is not set yet in store, initialize it to 'Thỏ ngọc'
    if (!lanternGame.shape) {
      setLanternShape('Thỏ ngọc');
    }
  }, [lanternGame.shape, setLanternShape]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const selectedColorData = currentColor ? CELLOPHANE_COLORS[currentColor] : null;

  return (
    <section
      id="section-game"
      ref={sectionRef}
      className="section"
      style={{
        background: 'linear-gradient(180deg, #12091E 0%, #20112F 30%, #301726 70%, #1A0D15 100%)',
        padding: '70px 20px 90px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <style>{`
        @keyframes candleBreath {
          0%, 100% { transform: scale(1); opacity: 0.92; }
          30% { transform: scale(1.06); opacity: 1; }
          60% { transform: scale(0.95); opacity: 0.85; }
          80% { transform: scale(1.03); opacity: 0.96; }
        }
        .candle-flicker-anim {
          transform-origin: center;
          animation: candleBreath 3.5s ease-in-out infinite;
        }

        @keyframes lanternGentleHover {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.8deg); }
        }
        .lantern-hover-anim {
          animation: lanternGentleHover 5s ease-in-out infinite;
        }

        @keyframes goldGlowPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(255, 213, 79, 0.45); }
          50% { box-shadow: 0 0 28px rgba(255, 213, 79, 0.85); }
        }
        .gold-pulse {
          animation: goldGlowPulse 2.5s infinite;
        }
      `}</style>

      {/* Ambient background particles & moon */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(255, 213, 79, 0.09) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '8%',
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFFDE7 20%, #FFF59D 50%, rgba(255,235,59,0) 70%)',
          filter: 'blur(2px)',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div className="fade-in-section" style={{ textAlign: 'center', maxWidth: '720px', zIndex: 2, marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '20px', background: 'rgba(255, 213, 79, 0.1)', border: '1px solid rgba(255, 213, 79, 0.3)', marginBottom: '12px' }}>
          <span style={{ fontSize: '1rem' }}>🏮</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: '#FFE082', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Xưởng Thủ Công Đêm Trăng
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 3.8vw, 2.3rem)',
            fontWeight: 800,
            color: '#FFF8E7',
            marginBottom: '10px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Tự tạo chiếc lồng đèn của riêng bạn!
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
            color: '#FFF8E7',
            lineHeight: 1.7,
          }}
        >
          Chọn khung nan tre uốn tay truyền thống, bọc lớp giấy kiếng rực rỡ và thắp lên ánh nến ấm áp cho mùa Trung thu.
        </p>
      </div>

      {/* Main Studio Interactive Container: 2-column on desktop, stacked on mobile */}
      <div
        className="fade-in-section"
        style={{
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          width: '100%',
          maxWidth: '1080px',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT COLUMN: THE ARTISAN WORKBENCH (BÀN LÀM ĐÈN) ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'sticky',
            top: '80px',
          }}
        >
          {/* Workbench Stage Card */}
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              height: '440px',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              background: 'radial-gradient(circle at 50% 35%, #2D1A40 0%, #180D24 70%, #0D0614 100%)',
              border: '2px solid rgba(255, 213, 79, 0.25)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(255, 213, 79, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Workshop Night Window & Lanterns Backdrop */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: '100px',
                background: 'radial-gradient(circle at 50% 40%, rgba(255, 213, 79, 0.12) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />

            {/* Subtle distant festival string lights */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                opacity: 0.5,
                pointerEvents: 'none',
              }}
            >
              <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 0 6px #FFD54F)' }}>⭐</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>🏮</span>
              <span style={{ fontSize: '0.9rem', filter: 'drop-shadow(0 0 6px #FFD54F)' }}>⭐</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>🏮</span>
              <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 0 6px #FFD54F)' }}>⭐</span>
            </div>

            {/* Wooden Workbench Desk (Bàn gỗ nghệ nhân) */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '105px',
                background: 'linear-gradient(180deg, #633615 0%, #44220B 50%, #281204 100%)',
                borderTop: '3px solid #8A4D20',
                boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.18), 0 -8px 25px rgba(0,0,0,0.5)',
              }}
            >
              {/* Wood Grain Lines */}
              <div style={{ position: 'absolute', top: '15px', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ position: 'absolute', top: '45px', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.25)' }} />

              {/* Craft Bamboo Splints on table */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  left: '24px',
                  width: '105px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #E5BA6C 0%, #9C6826 100%)',
                  borderRadius: '2px',
                  transform: 'rotate(-7deg)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '26px',
                  left: '32px',
                  width: '85px',
                  height: '3.5px',
                  background: 'linear-gradient(90deg, #F5D089 0%, #87541B 100%)',
                  borderRadius: '2px',
                  transform: 'rotate(-3deg)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                }}
              />

              {/* Coil of Bamboo Twine (Cuộn dây lạt) */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '28px',
                  width: '32px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #E5BA6C 35%, #8C5B20 85%)',
                  border: '1.5px solid #6E4011',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{ width: '8px', height: '6px', borderRadius: '50%', background: '#44220B', margin: '8px auto 0' }} />
              </div>

              {/* Small workbench oil lamp/candle */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#FFD54F',
                    boxShadow: '0 0 12px #FF9800',
                  }}
                />
              </div>
            </div>

            {/* The Live 3D Handcrafted Bamboo Lantern resting on workbench desk */}
            <div
              className="lantern-hover-anim"
              style={{
                width: '310px',
                height: '290px',
                position: 'absolute',
                bottom: '70px',
                zIndex: 5,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <svg
                viewBox="0 0 320 280"
                width="100%"
                height="100%"
                style={{
                  overflow: 'visible',
                  filter: selectedColorData
                    ? `drop-shadow(0 6px 30px ${selectedColorData.glow})`
                    : 'none',
                  transition: 'filter 0.4s ease',
                }}
              >
                <SvgDefs colorHex={selectedColorData?.hex || null} colorData={selectedColorData} />
                {currentShape === 'Ngôi sao' && <ShapeStar color={currentColor} pattern={currentPattern} />}
                {currentShape === 'Cá chép' && <ShapeCarp color={currentColor} pattern={currentPattern} />}
                {currentShape === 'Thỏ ngọc' && <ShapeRabbit color={currentColor} pattern={currentPattern} />}
                {currentShape === 'Rồng vàng' && <ShapeDragon color={currentColor} pattern={currentPattern} />}
                {currentShape === 'Hoa sen' && <ShapeLotus color={currentColor} pattern={currentPattern} />}
                {currentShape === 'Đầu lân' && <ShapeLion color={currentColor} pattern={currentPattern} />}
              </svg>
            </div>

            {/* Floating Info Pill on Bottom of Stage */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                background: 'rgba(18, 9, 28, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 213, 79, 0.3)',
                borderRadius: '30px',
                padding: '5px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: '#FFE082', fontWeight: 700 }}>
                {currentShape}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
              <span style={{ fontSize: '0.75rem', color: selectedColorData ? selectedColorData.hex : '#DDAA55' }}>
                {selectedColorData ? selectedColorData.name : 'Khung nan tre mộc'}
              </span>
              {currentPattern !== 'Trơn' && (
                <>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
                  <span style={{ fontSize: '0.75rem', color: '#FFF' }}>{currentPattern}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: THE CRAFTING STUDIO PANELS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* STEP 1: BẢNG CHỌN KHUNG (Exact match to reference photo!) */}
          <div
            style={{
              background: 'linear-gradient(150deg, #241C48 0%, #171333 100%)',
              border: '1.5px solid rgba(255, 213, 79, 0.35)',
              borderRadius: '22px',
              padding: '20px',
              boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#FFE082',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  margin: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>✨</span> BẢNG CHỌN KHUNG <span>✨</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#FFF8E7', marginTop: '4px', fontWeight: 500 }}>
                Chọn 1 trong 6 dáng khung nan tre đan tay truyền thống
              </p>
            </div>

            {/* 6 Grid Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
              }}
            >
              {BAMBOO_FRAMES.map((frame) => {
                const isSelected = currentShape === frame.id;
                return (
                  <motion.button
                    key={frame.id}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setLanternShape(frame.id)}
                    style={{
                      position: 'relative',
                      background: isSelected
                        ? 'linear-gradient(180deg, #3C95EB 0%, #206CB8 100%)'
                        : 'linear-gradient(180deg, #3281CF 0%, #1A569A 100%)',
                      border: isSelected
                        ? '3px solid #FFF9C4'
                        : '2px solid rgba(255, 255, 255, 0.22)',
                      borderRadius: '20px',
                      padding: '12px 6px 10px',
                      minHeight: '126px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isSelected
                        ? '0 0 22px rgba(255, 235, 100, 0.85), 0 5px 0 #103B6B, 0 10px 18px rgba(0,0,0,0.4)'
                        : '0 5px 0 #103B6B, 0 8px 14px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.25s ease',
                      outline: 'none',
                    }}
                    title={frame.desc}
                  >
                    {/* Green checkmark badge when selected */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#4CAF50',
                          border: '2px solid #FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontSize: '13px',
                          fontWeight: 900,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.45)',
                        }}
                      >
                        ✓
                      </motion.div>
                    )}

                    {/* Bamboo Wireframe Vector Illustration (Enlarged to fill button) */}
                    <div style={{ width: '74px', height: '74px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FrameThumbnail shapeId={frame.id} />
                    </div>

                    {/* Title */}
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.84rem',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        letterSpacing: '0.04em',
                        marginTop: '4px',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        textShadow: '0 2px 4px rgba(0, 15, 45, 0.9)',
                      }}
                    >
                      {frame.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: CHỌN MÀU GIẤY KIẾNG */}
          <div
            style={{
              background: 'linear-gradient(150deg, #241C48 0%, #171333 100%)',
              border: '1.5px solid rgba(255, 213, 79, 0.25)',
              borderRadius: '22px',
              padding: '18px 20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#FFE082',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  2. CHỌN MÀU GIẤY KIẾNG
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#FFF8E7', marginTop: '2px', fontWeight: 500 }}>
                  Lớp giấy kính trong suốt truyền thống cho ánh sáng tỏa rực rỡ
                </p>
              </div>

              {/* Button to toggle back to raw bamboo */}
              {currentColor && (
                <button
                  onClick={() => setLanternColor('')}
                  style={{
                    background: 'rgba(255, 213, 79, 0.18)',
                    border: '1.5px solid #FFE082',
                    color: '#FFE082',
                    borderRadius: '12px',
                    padding: '5px 12px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Xem khung tre mộc
                </button>
              )}
            </div>

            {/* Cellophane Color Swatches */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {Object.entries(CELLOPHANE_COLORS).map(([colorKey, colorData]) => {
                const isSelected = currentColor === colorKey;
                return (
                  <motion.button
                    key={colorKey}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLanternColor(colorKey)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 35%, ${colorData.grad1} 0%, ${colorData.hex} 55%, ${colorData.grad2} 100%)`,
                      border: isSelected ? '3px solid #FFFFFF' : '2px solid rgba(255,255,255,0.25)',
                      boxShadow: isSelected
                        ? `0 0 16px ${colorData.hex}, 0 0 6px #FFFFFF`
                        : '0 4px 8px rgba(0,0,0,0.35)',
                      cursor: 'pointer',
                      position: 'relative',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    title={colorData.name}
                  >
                    {/* Gloss specular shine highlight */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '4px',
                        left: '8px',
                        width: '12px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.75)',
                        transform: 'rotate(-30deg)',
                      }}
                    />
                    {isSelected && (
                      <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 800, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                        ✓
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: selectedColorData ? selectedColorData.hex : '#FFE082', marginTop: '10px', fontWeight: 700 }}>
              {selectedColorData ? `Màu đã chọn: ${selectedColorData.name}` : 'Đang xem: Khung nan tre mộc chưa bọc giấy'}
            </p>
          </div>

          {/* STEP 3: TRANG TRÍ & HỌA TIẾT */}
          <div
            style={{
              background: 'linear-gradient(150deg, #241C48 0%, #171333 100%)',
              border: '1.5px solid rgba(255, 213, 79, 0.25)',
              borderRadius: '22px',
              padding: '18px 20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#FFE082',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              3. TRANG TRÍ & HOA VĂN
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px' }}>
              {PATTERN_OPTIONS.map((pat) => {
                const isSelected = currentPattern === pat.id;
                return (
                  <motion.button
                    key={pat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLanternPattern(pat.id)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(255, 213, 79, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1.5px solid ${isSelected ? '#FFD54F' : 'rgba(255, 255, 255, 0.1)'}`,
                      color: isSelected ? '#FFE082' : '#FFF8E7',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: isSelected ? '0 0 12px rgba(255, 213, 79, 0.35)' : 'none',
                    }}
                    title={pat.desc}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{pat.icon}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>{pat.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ACTIONS: LÀM LẠI & HOÀN THÀNH */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '6px' }}>
            <button
              onClick={resetLanternGame}
              style={{
                padding: '12px 24px',
                borderRadius: '30px',
                border: '1.5px solid rgba(255, 248, 231, 0.4)',
                background: 'rgba(255, 248, 231, 0.12)',
                color: '#FFF8E7',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              ↺ Làm lại
            </button>

            <motion.button
              whileHover={canComplete ? { scale: 1.05 } : {}}
              whileTap={canComplete ? { scale: 0.95 } : {}}
              onClick={() => canComplete && completeLanternGame()}
              disabled={!canComplete}
              className={canComplete ? 'gold-pulse' : ''}
              style={{
                padding: '12px 32px',
                borderRadius: '30px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                cursor: canComplete ? 'pointer' : 'not-allowed',
                background: canComplete
                  ? 'linear-gradient(135deg, #FFD54F 0%, #FFA000 50%, #FF6F00 100%)'
                  : 'rgba(255, 248, 231, 0.08)',
                color: canComplete ? '#261200' : 'rgba(255, 248, 231, 0.65)',
                border: canComplete ? 'none' : '1px solid rgba(255, 248, 231, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              <span>✨</span>
              <span>{canComplete ? 'Thắp sáng lồng đèn' : 'Hãy chọn màu giấy'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* COMPLETION SHOWCASE MODAL / CELEBRATION */}
      <AnimatePresence>
        {lanternGame.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            style={{
              maxWidth: '680px',
              width: '100%',
              textAlign: 'center',
              padding: '36px 28px',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, rgba(38, 22, 60, 0.96) 0%, rgba(20, 10, 32, 0.96) 100%)',
              border: '2px solid #FFD54F',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 213, 79, 0.35)',
              marginTop: '40px',
              zIndex: 10,
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ fontSize: '2.4rem', marginBottom: '10px' }}>🏮✨🌕</div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.3rem, 3.2vw, 1.8rem)',
                fontWeight: 800,
                color: '#FFE082',
                marginBottom: '12px',
                textShadow: '0 2px 10px rgba(255, 213, 79, 0.4)',
              }}
            >
              Chiếc đèn {currentShape} của bạn đã tỏa sáng!
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.92rem, 2vw, 1.08rem)',
                color: '#FFF8E7',
                lineHeight: 1.8,
                fontStyle: 'italic',
                maxWidth: '560px',
                margin: '0 auto 20px',
              }}
            >
              &ldquo;Mỗi chiếc đèn mang một hình hài và sắc màu riêng, nhưng đều được thắp lên từ cùng một tình yêu với mùa trăng Trung thu. Cảm ơn bạn đã tự tay giữ lấy nét đẹp thủ công này!&rdquo;
            </p>

            <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(255, 213, 79, 0.15)', color: '#FFE082', fontSize: '0.82rem', fontWeight: 700 }}>
                Khung: {currentShape}
              </span>
              <span style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(255, 213, 79, 0.15)', color: selectedColorData?.hex || '#FFF', fontSize: '0.82rem', fontWeight: 700 }}>
                Giấy kiếng: {selectedColorData?.name || 'Mộc'}
              </span>
              <span style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(255, 213, 79, 0.15)', color: '#FFF8E7', fontSize: '0.82rem', fontWeight: 700 }}>
                Hoa văn: {currentPattern}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
