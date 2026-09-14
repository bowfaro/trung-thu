'use client';

import { motion } from 'framer-motion';
import type { ClueData } from './CrosswordGame';

interface CrosswordClueProps {
  clue: ClueData;
  isActive: boolean;
  isCompleted: boolean;
  isWrong: boolean;
  onSelect: () => void;
}

export function CrosswordClue({ clue, isActive, isCompleted, isWrong, onSelect }: CrosswordClueProps) {
  return (
    <motion.button
      onClick={onSelect}
      animate={isWrong ? { x: [0, -4, 4, -3, 3, 0] } : {}}
      transition={isWrong ? { duration: 0.4 } : {}}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        borderRadius: '12px',
        border: `1px solid ${
          isCompleted
            ? 'rgba(91, 122, 58, 0.5)'
            : isActive
            ? 'rgba(245, 166, 35, 0.6)'
            : 'rgba(255, 248, 231, 0.1)'
        }`,
        background: isCompleted
          ? 'rgba(91, 122, 58, 0.15)'
          : isActive
          ? 'rgba(245, 166, 35, 0.1)'
          : 'rgba(255, 248, 231, 0.03)',
        cursor: isCompleted ? 'default' : 'pointer',
        textAlign: 'left',
        transition: 'all 0.3s ease',
        width: '100%',
      }}
    >
      {/* Number badge */}
      <span
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: 700,
          fontFamily: 'var(--font-body)',
          flexShrink: 0,
          background: isCompleted
            ? 'var(--bamboo-green)'
            : isActive
            ? 'var(--lantern-gold)'
            : 'rgba(255, 248, 231, 0.1)',
          color: isCompleted || isActive ? '#fff' : 'rgba(255, 248, 231, 0.5)',
        }}
      >
        {isCompleted ? '✓' : clue.index + 1}
      </span>

      {/* Question text */}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: isCompleted
            ? 'rgba(255, 248, 231, 0.5)'
            : isActive
            ? 'var(--lantern-gold-light)'
            : 'rgba(255, 248, 231, 0.7)',
          lineHeight: 1.4,
          textDecoration: isCompleted ? 'line-through' : 'none',
        }}
      >
        {clue.question}
      </span>
    </motion.button>
  );
}
