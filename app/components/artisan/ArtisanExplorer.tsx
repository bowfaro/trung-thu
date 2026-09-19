'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Hotspot {
  id: string;
  label: string;
  description: string;
  x: string;
  y: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'bamboo',
    label: 'Khung tre & Vành tròn',
    description:
      'Tre làm lồng đèn không phải lấy bừa bụi nào cũng được. Phải chọn đúng giống tre gai già, đốn về ngâm nước kỹ để chống mọt và tăng độ dẻo. Khó nhất là lúc hơ lửa uốn khung, tay người thợ phải nương theo thế nan tre, uốn từ từ cho vòng tròn vành vạnh mà tuyệt đối không được để nứt gãy.',
    x: '24%',
    y: '26%',
  },
  {
    id: 'paper',
    label: ' Giấy bóng kính',
    description:
      'Giấy kiếng loại tốt sờ vào nghe tiếng sột soạt rất đanh. Khi dán áo cho đèn, phải canh đúng lúc hồ vừa ráo tới. Bàn tay miết miết thật nhẹ, vuốt đều từ trong ra ngoài mép. Chỉ cần lỡ tay miết mạnh một chút, giấy nhăn chùng hoặc rách thủng là coi như hỏng, phải lột ra làm lại từ đầu.',
    x: '63.5%',
    y: '35%',
  },
  {
    id: 'glue',
    label: ' Hồ dán',
    description:
      'Mình không xài keo dán công nghiệp được, keo đó ăn mòn giấy và dễ giòn. Hồ dán chuẩn phải tự quấy bằng bột nếp đun nhỏ lửa. Tay khuấy liên tục không ngừng cho đến khi bột trong vắt, đặc quánh và thơm mùi gạo. Hồ này mà đã dính vô giấy kiếng với nan tre thì bám chắc lắm.',
    x: '48.5%',
    y: '38.5%',
  },
];

function formatTime(secs: number): string {
  if (isNaN(secs) || secs < 0) return '00:00';
  const mins = Math.floor(secs / 60);
  const remainingSecs = Math.floor(secs % 60);
  return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
}

export function ArtisanExplorer() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const activeData = HOTSPOTS.find((h) => h.id === activeHotspot);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const manuallyPausedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!manuallyPausedRef.current && audioRef.current) {
              const playPromise = audioRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => setIsPlaying(true))
                  .catch((err) => {
                    console.log('Autoplay waiting for user gesture:', err);
                    // Fallback: one-time user interaction listener
                    const handleGesture = () => {
                      if (!manuallyPausedRef.current && audioRef.current) {
                        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
                      }
                      window.removeEventListener('click', handleGesture);
                      window.removeEventListener('touchstart', handleGesture);
                      window.removeEventListener('scroll', handleGesture);
                    };
                    window.addEventListener('click', handleGesture, { once: true });
                    window.addEventListener('touchstart', handleGesture, { once: true });
                    window.addEventListener('scroll', handleGesture, { once: true });
                  });
              }
            }
          } else {
            // Out of viewport -> pause audio
            if (audioRef.current && !audioRef.current.paused) {
              audioRef.current.pause();
              setIsPlaying(false);
            }
            // Reset manual pause state so next time user scrolls in, it autoplays again
            manuallyPausedRef.current = false;
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      manuallyPausedRef.current = true;
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          manuallyPausedRef.current = false;
        })
        .catch(() => { });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      id="artisan-explorer"
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        maxWidth: '800px',
        padding: '0 16px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          fontWeight: 700,
          color: 'var(--lantern-gold)',
          textAlign: 'center',
        }}
      >
        Giải phẫu ký ức
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'rgba(255,248,231,0.65)',
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '500px',
        }}
      >
        Chạm vào các điểm sáng trên chiếc đèn để khám phá quy trình làm đèn lồng truyền thống
      </p>

      {/* Layout: image + info side by side on desktop */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {/* Lantern image with hotspots */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            aspectRatio: '1/1',
            borderRadius: '24px',
            overflow: 'hidden',
            flexShrink: 0,
            background: 'radial-gradient(circle at 50% 40%, rgba(245,166,35,0.1) 0%, rgba(26,14,46,0.6) 80%)',
            border: '1px solid rgba(245,166,35,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <Image
            src="/images/denongsaotit.png"
            alt="Đèn ông sao truyền thống"
            fill
            priority
            style={{ objectFit: 'contain' }}
          />

          {HOTSPOTS.map((hotspot, index) => {
            const isActive = activeHotspot === hotspot.id;
            return (
              <motion.button
                key={hotspot.id}
                onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.92 }}
                aria-label={hotspot.label}
                style={{
                  position: 'absolute',
                  left: hotspot.x,
                  top: hotspot.y,
                  transform: 'translate(-50%, -50%)',
                  width: isActive ? '36px' : '28px',
                  height: isActive ? '36px' : '28px',
                  borderRadius: '50%',
                  background: isActive
                    ? 'linear-gradient(135deg, #fbbf24, #d97706)'
                    : 'radial-gradient(circle, rgba(245,166,35,0.95) 0%, rgba(217,119,6,0.85) 100%)',
                  border: `2px solid ${isActive ? '#ffffff' : 'rgba(255,248,231,0.9)'}`,
                  cursor: 'pointer',
                  zIndex: 15,
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive
                    ? '0 0 24px #f5a623, 0 0 45px rgba(245,166,35,0.8)'
                    : '0 0 14px rgba(245,166,35,0.6)',
                }}
              >
                {/* Flickering pulse ring */}
                <span
                  style={{
                    position: 'absolute',
                    inset: '-6px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(245,166,35,0.5)',
                    animation: 'candleFlicker 2s ease-out infinite',
                    pointerEvents: 'none',
                  }}
                />

                {/* Number inside */}
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: isActive ? '0.85rem' : '0.72rem',
                    fontWeight: 800,
                    color: '#1a0e2e',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {index + 1}
                </span>

                {/* Tooltip on active */}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(26,14,46,0.9)',
                      color: 'var(--lantern-gold)',
                      border: '1px solid rgba(245,166,35,0.4)',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    }}
                  >
                    {hotspot.label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Info panel */}
        <div style={{ flex: 1, minWidth: '250px', maxWidth: '380px' }}>
          <AnimatePresence mode="wait">
            {activeData ? (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{
                  padding: '24px',
                  background: 'rgba(255,248,231,0.06)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(245,166,35,0.2)',
                  borderRadius: '16px',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    color: 'var(--lantern-gold)',
                    marginBottom: '12px',
                    fontWeight: 600,
                  }}
                >
                  {activeData.label}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'rgba(255,248,231,0.75)',
                    lineHeight: 1.8,
                    textAlign: 'justify',
                  }}
                >
                  {activeData.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px dashed rgba(245,166,35,0.2)',
                  textAlign: 'center',
                }}
              >
                <p style={{ color: 'rgba(255,248,231,0.3)', fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>
                  ← Chọn một điểm sáng để xem chi tiết
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dedicated Audio Player */}
          <div
            style={{
              marginTop: '20px',
              padding: '16px 20px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255,248,231,0.06) 0%, rgba(245,166,35,0.08) 100%)',
              border: '1px solid rgba(245,166,35,0.25)',
              boxShadow: isPlaying ? '0 0 24px rgba(245,166,35,0.15)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Hidden native audio tag */}
            <audio
              ref={audioRef}
              src="/audio/artisan-interview.mp4"
              preload="auto"
              onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
              onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Header info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem' }}>🎙️</span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--paper-cream)',
                  }}
                >
                  Lời kể nghệ nhân
                </span>
              </div>

              {/* Sound wave / Status badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Visualizer bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }}>
                  {[0.5, 1, 0.4, 0.8, 0.6].map((scale, i) => (
                    <motion.span
                      key={i}
                      animate={
                        isPlaying
                          ? {
                            scaleY: [0.3, 1, 0.4, 0.9, 0.3],
                          }
                          : { scaleY: 0.25 }
                      }
                      transition={{
                        duration: 0.6 + i * 0.15,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      }}
                      style={{
                        display: 'inline-block',
                        width: '3px',
                        height: '14px',
                        backgroundColor: isPlaying ? 'var(--lantern-gold)' : 'rgba(255,248,231,0.25)',
                        borderRadius: '2px',
                        transformOrigin: 'bottom',
                      }}
                    />
                  ))}
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: isPlaying ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255,248,231,0.08)',
                    color: isPlaying ? '#4ade80' : 'rgba(255,248,231,0.4)',
                    border: `1px solid ${isPlaying ? 'rgba(74, 222, 128, 0.3)' : 'rgba(255,248,231,0.1)'}`,
                    fontWeight: 500,
                  }}
                >
                  {isPlaying ? 'Đang phát' : 'Tạm dừng'}
                </span>
              </div>
            </div>

            {/* Controls & Progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Progress Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.72rem',
                    color: 'rgba(255,248,231,0.6)',
                    minWidth: '36px',
                  }}
                >
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Tiến độ âm thanh"
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '2px',
                    appearance: 'none',
                    cursor: 'pointer',
                    background: `linear-gradient(to right, var(--lantern-gold) 0%, var(--lantern-gold) ${progressPercent}%, rgba(255,248,231,0.15) ${progressPercent}%, rgba(255,248,231,0.15) 100%)`,
                    outline: 'none',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.72rem',
                    color: 'rgba(255,248,231,0.4)',
                    minWidth: '36px',
                    textAlign: 'right',
                  }}
                >
                  {formatTime(duration)}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                {/* <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    color: 'rgba(255,248,231,0.45)',
                    fontStyle: 'italic',
                    margin: 0,
                  }}
                >
                  * Tự động phát khi cuộn đến mục này
                </p> */}

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Mute button */}
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isMuted ? 'rgba(255,248,231,0.4)' : 'rgba(255,248,231,0.8)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {isMuted ? '🔇' : '🔊'}
                  </button>

                  {/* Play / Pause button */}
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Tạm dừng audio' : 'Phát audio'}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--lantern-gold), #d97706)',
                      border: 'none',
                      color: '#1a0e2e',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(245,166,35,0.4)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

