'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { ClueData } from './CrosswordGame';
import styles from '@/app/styles/lantern-effects.module.css';

interface CrosswordGridProps {
  clues: ClueData[];
  inputValues: Record<number, string>;
  onInputChange: (clueIndex: number, value: string) => void;
  onSubmit: (clueIndex: number, value: string) => void;
  completedAnswers: Record<number, string>;
  activeClue: number | null;
  wrongClue: number | null;
}

export function CrosswordGrid({
  clues,
  inputValues,
  onInputChange,
  onSubmit,
  completedAnswers,
  activeClue,
  wrongClue,
}: CrosswordGridProps) {
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // Find max answer length for grid sizing
  const maxLen = Math.max(...clues.map((c) => c.answer.length));

  const handleKeyDown = useCallback(
    (clueIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const value = inputValues[clueIndex] || '';
        if (value.length > 0) {
          onSubmit(clueIndex, value);
        }
      }
    },
    [inputValues, onSubmit]
  );

  return (
    <div
      id="crossword-grid"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'rgba(255,248,231,0.4)',
          marginBottom: '8px',
          textAlign: 'center',
        }}
      >
        Chọn câu hỏi → nhập đáp án → nhấn Enter
      </p>

      {clues.map((clue) => {
        const isActive = activeClue === clue.index;
        const isCompleted = !!completedAnswers[clue.index];
        const isWrong = wrongClue === clue.index;
        const answerLetters = clue.answer.split('');

        return (
          <motion.div
            key={clue.index}
            animate={isWrong ? { x: [0, -5, 5, -4, 4, 0] } : {}}
            transition={isWrong ? { duration: 0.4 } : {}}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {/* Row number */}
            <span
              style={{
                width: '24px',
                textAlign: 'right',
                fontSize: '0.75rem',
                color: 'rgba(255,248,231,0.4)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                marginRight: '4px',
              }}
            >
              {clue.index + 1}.
            </span>

            {/* Cells */}
            {isCompleted ? (
              /* Show completed answer as cells */
              answerLetters.map((letter, idx) => (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: idx === clue.keyLetterIndex ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className={`${styles.crosswordCell} ${
                    idx === clue.keyLetterIndex
                      ? styles.crosswordCellKey
                      : styles.crosswordCellCorrect
                  }`}
                  style={{
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                  }}
                >
                  {letter}
                </motion.div>
              ))
            ) : isActive ? (
              /* Show input field */
              <>
                {/* Padding cells before to align key letter column */}
                <div style={{ position: 'relative', flex: 1, maxWidth: `${maxLen * 48}px` }}>
                  <input
                    ref={(el) => {
                      inputRefs.current[clue.index] = el;
                      if (el && isActive) el.focus();
                    }}
                    type="text"
                    value={inputValues[clue.index] || ''}
                    onChange={(e) => onInputChange(clue.index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(clue.index, e)}
                    placeholder={`Nhập đáp án (${clue.answer.length} chữ cái)...`}
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: isWrong
                        ? '2px solid var(--lantern-red)'
                        : '2px solid var(--lantern-gold)',
                      background: 'rgba(255,248,231,0.1)',
                      color: 'var(--paper-cream)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      outline: 'none',
                      boxShadow: '0 0 15px rgba(245,166,35,0.3)',
                    }}
                  />
                </div>
                <button
                  onClick={() => onSubmit(clue.index, inputValues[clue.index] || '')}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--lantern-gold)',
                    background: 'rgba(245,166,35,0.2)',
                    color: 'var(--lantern-gold)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Kiểm tra
                </button>
              </>
            ) : (
              /* Show empty placeholder cells */
              answerLetters.map((_, idx) => (
                <div
                  key={idx}
                  className={styles.crosswordCell}
                  style={{
                    borderRadius: '6px',
                    opacity: 0.4,
                    background:
                      idx === clue.keyLetterIndex
                        ? 'rgba(245,166,35,0.15)'
                        : 'rgba(255,248,231,0.05)',
                    borderColor:
                      idx === clue.keyLetterIndex
                        ? 'rgba(245,166,35,0.4)'
                        : 'rgba(255,248,231,0.1)',
                  }}
                />
              ))
            )}
          </motion.div>
        );
      })}

      {/* Keyphrase column highlight label */}
      <p
        style={{
          marginTop: '12px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'rgba(245,166,35,0.6)',
          textAlign: 'center',
        }}
      >
        Cột nổi bật = Từ khóa ẩn 🔑
      </p>
    </div>
  );
}
