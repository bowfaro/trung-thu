'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSlideStore } from '@/app/store/use-slide-store';
import { CrosswordGame } from '../crossword/CrosswordGame';
import { ArtisanExplorer } from '../artisan/ArtisanExplorer';

export function SlideRiddle() {
  const { riddleView, setRiddleView, crossword } = useSlideStore();

  return (
    <div
      id="slide-riddle"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1A0E2E 0%, #2D1B4E 30%, #3D2B1A 100%)',
      }}
    >
      {/* Paper texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 20%, rgba(245,166,35,0.1) 0%, transparent 60%)',
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
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--paper-cream)',
            marginBottom: '4px',
          }}
        >
          Chiếc đèn đi qua những mùa trăng
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'rgba(255,248,231,0.6)',
            fontStyle: 'italic',
          }}
        >
          Giải đố để khám phá từ khóa ẩn giấu
        </p>

        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginTop: '16px',
          }}
        >
          {(['crossword', 'artisan'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setRiddleView(view)}
              style={{
                padding: '8px 24px',
                borderRadius: '20px',
                border: '1px solid rgba(245,166,35,0.3)',
                background:
                  riddleView === view
                    ? 'linear-gradient(135deg, rgba(245,166,35,0.3), rgba(255,140,66,0.2))'
                    : 'rgba(26,14,46,0.4)',
                color: riddleView === view ? 'var(--lantern-gold-light)' : 'rgba(255,248,231,0.5)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(4px)',
              }}
            >
              {view === 'crossword'
                ? `🧩 Ô chữ${crossword.completed ? ' ✓' : ''}`
                : '🏮 Nghệ nhân'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          {riddleView === 'crossword' ? (
            <motion.div
              key="crossword"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <CrosswordGame />
            </motion.div>
          ) : (
            <motion.div
              key="artisan"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ArtisanExplorer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
