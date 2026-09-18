'use client';

import { useState, useCallback, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/app/store/use-slide-store';
import Image from 'next/image';

export interface ClueData {
  index: number;
  question: string;
  answer: string;
  display: string;
  letters: string[];
  keyLetterIndex: number;
  keyLetter: string;
  startCol: number; // calculated so that keyLetterIndex is always at col 6
  hintImage: string;
  hintCaption: string;
}

// Key column is 6 (0-indexed). Total columns = 12 (0 to 11).
export const KEY_COL = 6;

export const CLUES: ClueData[] = [
  {
    index: 0,
    question: 'Chiếc lồng đèn 5 cánh kinh điển nhất gắn liền với tuổi thơ của mọi trẻ em Việt Nam là gì?',
    answer: 'ĐÈNÔNGSAO',
    display: 'ĐÈN ÔNG SAO',
    letters: ['Đ', 'È', 'N', 'Ô', 'N', 'G', 'S', 'A', 'O'],
    keyLetterIndex: 6, // 'S'
    keyLetter: 'S',
    startCol: 0, // 6 - 6 = 0
    hintImage: '/images/crossword/clue-0.jpg',
    hintCaption: ''
  },
  {
    index: 1,
    question: 'Tết Đoàn viên diễn ra vào mùa nào trong năm?',
    answer: 'MÙATHU',
    display: 'MÙA THU',
    letters: ['M', 'Ù', 'A', 'T', 'H', 'U'],
    keyLetterIndex: 5, // 'U'
    keyLetter: 'U',
    startCol: 1, // 6 - 5 = 1
    hintImage: '/images/crossword/clue-1.jpg',
    hintCaption: ''
  },
  {
    index: 2,
    question: 'Ngày trăng sáng và tròn trịa nhất trong một tháng Âm lịch gọi là gì?',
    answer: 'NGÀYRẰM',
    display: 'NGÀY RẰM',
    letters: ['N', 'G', 'À', 'Y', 'R', 'Ằ', 'M'],
    keyLetterIndex: 6, // 'M'
    keyLetter: 'M',
    startCol: 0, // 6 - 6 = 0
    hintImage: '/images/crossword/clue-2.jpg',
    hintCaption: ''
  },
  {
    index: 3,
    question: 'Hành động dùng dao gọt, chuốt cho thanh tre trở nên nhẵn bóng và dễ uốn?',
    answer: 'VÓTTRE',
    display: 'VÓT TRE',
    letters: ['V', 'Ó', 'T', 'T', 'R', 'E'],
    keyLetterIndex: 0, // 'V'
    keyLetter: 'V',
    startCol: 6, // 6 - 0 = 6
    hintImage: '/images/crossword/clue-3.jpg',
    hintCaption: ''
  },
  {
    index: 4,
    question: 'Đạo cụ quan trọng nhất mà người biểu diễn phải đội lên vai khi múa lân?',
    answer: 'ĐẦULÂN',
    display: 'ĐẦU LÂN',
    letters: ['Đ', 'Ầ', 'U', 'L', 'Â', 'N'],
    keyLetterIndex: 1, // 'Ầ'
    keyLetter: 'Ầ',
    startCol: 5, // 6 - 1 = 5
    hintImage: '/images/crossword/clue-4.jpg',
    hintCaption: ''
  },
  {
    index: 5,
    question: 'Loại chất liệu mỏng, trong suốt, có màu sắc rực rỡ dùng để dán lên khung tre?',
    answer: 'GIẤYKIẾNG',
    display: 'GIẤY KIẾNG',
    letters: ['G', 'I', 'Ấ', 'Y', 'K', 'I', 'Ế', 'N', 'G'],
    keyLetterIndex: 3, // 'Y'
    keyLetter: 'Y',
    startCol: 3, // 6 - 3 = 3
    hintImage: '/images/crossword/clue-5.jpg',
    hintCaption: ''
  },
];

export const KEYPHRASE = 'SUM VẦY';

function stripVN(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'D')
    .replace(/Đ/g, 'D');
}

function normalizeVN(text: string): string {
  return stripVN(text.replace(/\s+/g, '').toUpperCase());
}

export function CrosswordGame() {
  const { crossword, setActiveClue, submitAnswer, revealAnswer, resetCrossword } = useAppStore();

  // Cell letter state for each row: row index -> array of letters entered by user
  const [cellValues, setCellValues] = useState<Record<number, string[]>>(() => {
    const init: Record<number, string[]> = {};
    CLUES.forEach((c) => {
      init[c.index] = new Array(c.letters.length).fill('');
    });
    return init;
  });

  const [wrongRow, setWrongRow] = useState<number | null>(null);
  const [keywordGuess, setKeywordGuess] = useState('');
  const [keywordError, setKeywordError] = useState(false);
  const [showKeywordInput, setShowKeywordInput] = useState(false);

  // Focus matrix: row -> cell -> input ref
  const cellRefs = useRef<Array<Array<HTMLInputElement | null>>>(
    CLUES.map((c) => new Array(c.letters.length).fill(null))
  );

  // Sync with completed / revealed answers from store
  useEffect(() => {
    CLUES.forEach((clue) => {
      if (crossword.answers[clue.index]) {
        setCellValues((prev) => ({
          ...prev,
          [clue.index]: [...clue.letters],
        }));
      }
    });
  }, [crossword.answers]);

  const activeClueIndex = crossword.activeClue ?? 0;
  const activeClue = CLUES[activeClueIndex] || CLUES[0];

  // Try submitting a row given its letters array
  const checkRow = useCallback(
    (rowIndex: number, lettersToTest?: string[]) => {
      const letters = lettersToTest || cellValues[rowIndex] || [];
      const joined = letters.join('');
      if (!joined.trim()) return false;

      const isCorrect = submitAnswer(rowIndex, joined);
      if (isCorrect) {
        // Auto advance to next uncompleted row
        const nextUnsolved = CLUES.find(
          (c) => c.index !== rowIndex && !crossword.answers[c.index]
        );
        if (nextUnsolved) {
          setActiveClue(nextUnsolved.index);
          setTimeout(() => {
            cellRefs.current[nextUnsolved.index]?.[0]?.focus();
          }, 100);
        }
        return true;
      } else {
        setWrongRow(rowIndex);
        setTimeout(() => setWrongRow(null), 700);
        return false;
      }
    },
    [cellValues, submitAnswer, crossword.answers, setActiveClue]
  );

  // Handle typing a character in a specific cell
  const handleCellChange = (rowIndex: number, cellIndex: number, val: string) => {
    if (crossword.answers[rowIndex]) return;

    const char = val.slice(-1).toUpperCase();
    const newRow = [...(cellValues[rowIndex] || new Array(CLUES[rowIndex].letters.length).fill(''))];
    newRow[cellIndex] = char;

    setCellValues((prev) => ({
      ...prev,
      [rowIndex]: newRow,
    }));

    // Auto-advance to next cell in row
    if (char && cellIndex < CLUES[rowIndex].letters.length - 1) {
      cellRefs.current[rowIndex]?.[cellIndex + 1]?.focus();
    }

    // Check if entire row is now filled
    const allFilled = newRow.every((c) => c && c.trim().length > 0);
    if (allFilled) {
      checkRow(rowIndex, newRow);
    }
  };

  // Keyboard navigation within cells
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    cellIndex: number
  ) => {
    if (crossword.answers[rowIndex]) return;

    if (e.key === 'Backspace') {
      if (!cellValues[rowIndex]?.[cellIndex] && cellIndex > 0) {
        e.preventDefault();
        const newRow = [...(cellValues[rowIndex] || [])];
        newRow[cellIndex - 1] = '';
        setCellValues((prev) => ({ ...prev, [rowIndex]: newRow }));
        cellRefs.current[rowIndex]?.[cellIndex - 1]?.focus();
      } else {
        const newRow = [...(cellValues[rowIndex] || [])];
        newRow[cellIndex] = '';
        setCellValues((prev) => ({ ...prev, [rowIndex]: newRow }));
      }
    } else if (e.key === 'ArrowLeft') {
      if (cellIndex > 0) {
        e.preventDefault();
        cellRefs.current[rowIndex]?.[cellIndex - 1]?.focus();
      }
    } else if (e.key === 'ArrowRight') {
      if (cellIndex < CLUES[rowIndex].letters.length - 1) {
        e.preventDefault();
        cellRefs.current[rowIndex]?.[cellIndex + 1]?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (rowIndex > 0) {
        setActiveClue(rowIndex - 1);
        cellRefs.current[rowIndex - 1]?.[0]?.focus();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (rowIndex < CLUES.length - 1) {
        setActiveClue(rowIndex + 1);
        cellRefs.current[rowIndex + 1]?.[0]?.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      checkRow(rowIndex);
    }
  };

  // Paste support for the entire row
  const handlePaste = (e: React.ClipboardEvent, rowIndex: number) => {
    e.preventDefault();
    if (crossword.answers[rowIndex]) return;

    const pasted = e.clipboardData.getData('text').replace(/\s+/g, '').toUpperCase();
    if (!pasted) return;

    const maxLen = CLUES[rowIndex].letters.length;
    const newRow = [...(cellValues[rowIndex] || new Array(maxLen).fill(''))];

    for (let i = 0; i < maxLen && i < pasted.length; i++) {
      newRow[i] = pasted[i];
    }

    setCellValues((prev) => ({ ...prev, [rowIndex]: newRow }));

    const nextEmpty = newRow.findIndex((c) => !c);
    if (nextEmpty !== -1) {
      cellRefs.current[rowIndex]?.[nextEmpty]?.focus();
    } else {
      cellRefs.current[rowIndex]?.[maxLen - 1]?.focus();
      checkRow(rowIndex, newRow);
    }
  };

  // Direct guess for vertical keyword
  const handleGuessKeyword = () => {
    const norm = normalizeVN(keywordGuess);
    if (norm === 'SUMVAY') {
      CLUES.forEach((c) => {
        if (!crossword.answers[c.index]) {
          revealAnswer(c.index);
        }
      });
      setShowKeywordInput(false);
    } else {
      setKeywordError(true);
      setTimeout(() => setKeywordError(false), 800);
    }
  };

  const solvedCount = Object.keys(crossword.answers).length;
  const isCurrentSolved = !!crossword.answers[activeClue.index];

  return (
    <div
      id="crossword-game"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}
    >
      {/* ── Title & Intro ────────────────────────────────────────── */}
      <div style={{ textAlign: 'center' }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
            fontWeight: 700,
            color: 'var(--lantern-gold)',
            marginBottom: '6px',
          }}
        >
          Trò Chơi Ô Chữ Ký Ức
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'rgba(255,248,231,0.7)',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Nhập từng chữ cái vào các ô hàng ngang. Quan sát hình ảnh gợi ý bên trái và mở ra{' '}
          <strong style={{ color: 'var(--lantern-gold)', textDecoration: 'underline' }}>
            từ khóa chính theo cột dọc
          </strong>
          !
        </p>
      </div>

      {/* ── Top Bar: Quick status & Keyword guess ────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '10px 18px',
          borderRadius: '12px',
          background: 'rgba(255, 248, 231, 0.04)',
          border: '1px solid rgba(255, 248, 231, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'rgba(255,248,231,0.6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '3px',
                background: 'rgba(245, 166, 35, 0.35)',
                border: '2px solid var(--lantern-gold)',
                display: 'inline-block',
              }}
            />
            <span style={{ color: 'var(--lantern-gold-light)', fontWeight: 600 }}>Cột từ khóa dọc</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '3px',
                background: 'rgba(91, 122, 58, 0.35)',
                border: '1px solid var(--bamboo-green)',
                display: 'inline-block',
              }}
            />
            <span>Đã giải ({solvedCount}/6)</span>
          </div>
        </div>

        {/* Quick solve / guess button */}
        {!crossword.completed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!showKeywordInput ? (
              <button
                onClick={() => setShowKeywordInput(true)}
                style={{
                  background: 'rgba(245, 166, 35, 0.12)',
                  border: '1px solid rgba(245, 166, 35, 0.4)',
                  color: 'var(--lantern-gold)',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                ★ Đoán từ khóa chính ngay
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="Từ khóa dọc (6 chữ)..."
                  value={keywordGuess}
                  onChange={(e) => setKeywordGuess(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGuessKeyword()}
                  autoFocus
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: keywordError ? '1px solid var(--lantern-red)' : '1px solid var(--lantern-gold)',
                    background: 'rgba(26, 14, 46, 0.9)',
                    color: 'var(--paper-cream)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    outline: 'none',
                    width: '160px',
                    textTransform: 'uppercase',
                  }}
                />
                <button
                  onClick={handleGuessKeyword}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    background: 'var(--lantern-gold)',
                    color: '#2C1810',
                    fontWeight: 700,
                    border: 'none',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                  }}
                >
                  Mở
                </button>
                <button
                  onClick={() => setShowKeywordInput(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,248,231,0.4)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 2-COLUMN MAIN LAYOUT ─────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        {/* ── LEFT COLUMN: Question & Hint Image ─────────────────── */}
        <div
          style={{
            background: 'rgba(26, 14, 46, 0.85)',
            border: '1px solid rgba(245, 166, 35, 0.28)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div>
            {/* Row Jump Badges (1 to 6) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {CLUES.map((clue) => {
                  const isDone = !!crossword.answers[clue.index];
                  const isCurrent = activeClueIndex === clue.index;
                  return (
                    <button
                      key={clue.index}
                      type="button"
                      onClick={() => {
                        setActiveClue(clue.index);
                        if (!isDone) {
                          const firstEmpty = (cellValues[clue.index] || []).findIndex((c) => !c);
                          cellRefs.current[clue.index]?.[firstEmpty !== -1 ? firstEmpty : 0]?.focus();
                        }
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: isDone
                          ? '1px solid var(--bamboo-green)'
                          : isCurrent
                          ? '1px solid var(--lantern-gold)'
                          : '1px solid rgba(255, 248, 231, 0.15)',
                        background: isDone
                          ? 'var(--bamboo-green)'
                          : isCurrent
                          ? 'var(--lantern-gold)'
                          : 'rgba(255, 248, 231, 0.05)',
                        color: isDone ? '#fff' : isCurrent ? '#2C1810' : 'rgba(255, 248, 231, 0.6)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isDone ? '✓' : clue.index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next buttons */}
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => {
                    const prev = (activeClueIndex - 1 + CLUES.length) % CLUES.length;
                    setActiveClue(prev);
                    cellRefs.current[prev]?.[0]?.focus();
                  }}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255, 248, 231, 0.06)',
                    border: '1px solid rgba(255, 248, 231, 0.15)',
                    color: 'rgba(255, 248, 231, 0.7)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = (activeClueIndex + 1) % CLUES.length;
                    setActiveClue(next);
                    cellRefs.current[next]?.[0]?.focus();
                  }}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255, 248, 231, 0.06)',
                    border: '1px solid rgba(255, 248, 231, 0.15)',
                    color: 'rgba(255, 248, 231, 0.7)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  →
                </button>
              </div>
            </div>

            {/* Question Header & Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: 'var(--lantern-gold)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'rgba(245, 166, 35, 0.15)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(245, 166, 35, 0.3)',
                }}
              >
                Hàng số {activeClue.index + 1}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 248, 231, 0.55)' }}>
                {activeClue.letters.length} chữ cái • Chữ khóa cột: {' '}
                <strong style={{ color: 'var(--lantern-gold)' }}>
                  {isCurrentSolved ? activeClue.keyLetter : '?'}
                </strong>
              </span>
            </div>

            {/* Question Text */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.98rem',
                lineHeight: 1.6,
                color: 'var(--paper-cream)',
                marginBottom: '14px',
                minHeight: '48px',
              }}
            >
              {activeClue.question}
            </p>

            {/* Hint Image Card (Ảnh gợi ý) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeClue.index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(245, 166, 35, 0.3)',
                  marginBottom: '10px',
                }}
              >
                <Image
                  src={activeClue.hintImage}
                  alt={activeClue.hintCaption}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ objectFit: 'cover' }}
                />

                {/* Gradient shade */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(26, 14, 46, 0.85) 0%, rgba(26, 14, 46, 0.1) 60%, transparent 100%)',
                  }}
                />

                {/* Top Badge: 📷 Ảnh gợi ý */}
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(26, 14, 46, 0.8)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(245, 166, 35, 0.4)',
                    color: 'var(--lantern-gold-light)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  📷 Ảnh gợi ý hàng #{activeClue.index + 1}
                </span>

                {/* Solved Overlay Badge */}
                {isCurrentSolved && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(91, 122, 58, 0.9)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    ✓ ĐÃ MỞ
                  </div>
                )}

                {/* Bottom Caption */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '12px',
                    right: '12px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'var(--paper-cream)',
                      lineHeight: 1.4,
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {activeClue.hintCaption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons at bottom of left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255, 248, 231, 0.08)', paddingTop: '12px' }}>
            {isCurrentSolved ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ color: 'var(--bamboo-green)', fontWeight: 700, fontSize: '0.9rem' }}>
                  ✓ Đáp án: {activeClue.display}
                </span>
                {crossword.revealed[activeClue.index] && (
                  <span style={{ color: 'rgba(255, 248, 231, 0.4)', fontSize: '0.75rem' }}>(đã xem)</span>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => checkRow(activeClue.index)}
                  style={{
                    flex: 1,
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'var(--lantern-gold)',
                    border: 'none',
                    color: '#2C1810',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(245, 166, 35, 0.3)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Kiểm tra hàng này
                </button>
                <button
                  type="button"
                  onClick={() => {
                    revealAnswer(activeClue.index);
                    setCellValues((prev) => ({
                      ...prev,
                      [activeClue.index]: [...activeClue.letters],
                    }));
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 248, 231, 0.06)',
                    border: '1px solid rgba(255, 248, 231, 0.18)',
                    color: 'rgba(255, 248, 231, 0.7)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Xem đáp án
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cleared = new Array(activeClue.letters.length).fill('');
                    setCellValues((prev) => ({ ...prev, [activeClue.index]: cleared }));
                    cellRefs.current[activeClue.index]?.[0]?.focus();
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 248, 231, 0.1)',
                    color: 'rgba(255, 248, 231, 0.4)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                  title="Xóa chữ đã nhập ở hàng này"
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Crossword Board Grid ─────────────────── */}
        <div
          style={{
            background: 'rgba(26, 14, 46, 0.85)',
            border: '1px solid rgba(245, 166, 35, 0.28)',
            borderRadius: '16px',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            overflowX: 'auto',
          }}
        >
          {/* Column 6 Header Indicator: ★ TỪ KHÓA CHÍNH ▼ */}
          <div
            style={{
              minWidth: '450px',
              display: 'grid',
              gridTemplateColumns: '38px repeat(12, minmax(28px, 40px))',
              gap: '5px',
              justifyContent: 'center',
              height: '38px',
              marginBottom: '4px',
              padding: '0 4px',
            }}
          >
            <div style={{ gridColumn: KEY_COL + 2, position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  whiteSpace: 'nowrap',
                  zIndex: 5,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.66rem',
                    fontWeight: 800,
                    color: 'var(--lantern-gold)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'rgba(245, 166, 35, 0.25)',
                    padding: '2px 8px',
                    borderRadius: '5px',
                    border: '1.5px solid rgba(245, 166, 35, 0.6)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4), 0 0 12px rgba(245, 166, 35, 0.3)',
                  }}
                >
                  ★ TỪ KHÓA
                </span>
                <span style={{ color: 'var(--lantern-gold)', fontSize: '0.75rem', lineHeight: 1 }}>▼</span>
              </div>
            </div>
          </div>

          {/* Crossword Rows */}
          <div style={{ minWidth: '450px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {CLUES.map((clue) => {
              const isCompleted = !!crossword.answers[clue.index];
              const isActive = activeClueIndex === clue.index;
              const isWrong = wrongRow === clue.index;
              const rowValues = cellValues[clue.index] || [];

              return (
                <motion.div
                  key={clue.index}
                  animate={isWrong ? { x: [0, -6, 6, -5, 5, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '38px repeat(12, minmax(28px, 40px))',
                    gap: '5px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: isActive
                      ? 'rgba(245, 166, 35, 0.08)'
                      : 'transparent',
                    padding: '3px 4px',
                    borderRadius: '10px',
                    border: isActive
                      ? '1px solid rgba(245, 166, 35, 0.35)'
                      : '1px solid transparent',
                    transition: 'background 0.2s ease, border 0.2s ease',
                  }}
                >
                  {/* Row Number Badge Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveClue(clue.index);
                      if (!isCompleted) {
                        const firstEmpty = rowValues.findIndex((c) => !c);
                        cellRefs.current[clue.index]?.[firstEmpty !== -1 ? firstEmpty : 0]?.focus();
                      }
                    }}
                    title={`Hàng ${clue.index + 1}: ${clue.question}`}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-body)',
                      border: isCompleted
                        ? '1px solid var(--bamboo-green)'
                        : isActive
                        ? '1px solid var(--lantern-gold)'
                        : '1px solid rgba(255, 248, 231, 0.15)',
                      background: isCompleted
                        ? 'var(--bamboo-green)'
                        : isActive
                        ? 'var(--lantern-gold)'
                        : 'rgba(255, 248, 231, 0.05)',
                      color: isCompleted
                        ? '#FFFFFF'
                        : isActive
                        ? '#2C1810'
                        : 'rgba(255, 248, 231, 0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isCompleted ? '✓' : clue.index + 1}
                  </button>

                  {/* 12 Grid columns for this row */}
                  {Array.from({ length: 12 }).map((_, colIdx) => {
                    const letterIdx = colIdx - clue.startCol;
                    const hasCell = letterIdx >= 0 && letterIdx < clue.letters.length;
                    const isKeyCell = colIdx === KEY_COL && hasCell;

                    if (!hasCell) {
                      return (
                        <div
                          key={colIdx}
                          style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {colIdx === KEY_COL && (
                            <div
                              style={{
                                width: '2px',
                                height: '100%',
                                background: 'rgba(245, 166, 35, 0.15)',
                                borderRadius: '1px',
                              }}
                            />
                          )}
                        </div>
                      );
                    }

                    const cellChar = isCompleted
                      ? clue.letters[letterIdx]
                      : rowValues[letterIdx] || '';

                    return (
                      <div
                        key={colIdx}
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '1 / 1',
                        }}
                      >
                        <input
                          ref={(el) => {
                            if (!cellRefs.current[clue.index]) {
                              cellRefs.current[clue.index] = [];
                            }
                            cellRefs.current[clue.index][letterIdx] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={cellChar}
                          disabled={isCompleted}
                          onFocus={() => setActiveClue(clue.index)}
                          onChange={(e) =>
                            handleCellChange(clue.index, letterIdx, e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, clue.index, letterIdx)
                          }
                          onPaste={(e) => handlePaste(e, clue.index)}
                          style={{
                            width: '100%',
                            height: '100%',
                            padding: 0,
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
                            fontWeight: 700,
                            borderRadius: '7px',
                            outline: 'none',
                            cursor: isCompleted ? 'default' : 'text',
                            transition: 'all 0.2s ease',
                            /* Background & borders */
                            background: isCompleted
                              ? isKeyCell
                                ? 'linear-gradient(135deg, rgba(245, 166, 35, 0.42), rgba(245, 166, 35, 0.22))'
                                : 'rgba(91, 122, 58, 0.28)'
                              : isKeyCell
                              ? 'rgba(245, 166, 35, 0.18)'
                              : 'rgba(255, 248, 231, 0.08)',
                            border: isCompleted
                              ? isKeyCell
                                ? '2px solid var(--lantern-gold)'
                                : '1.5px solid var(--bamboo-green)'
                              : isKeyCell
                              ? '2px solid rgba(245, 166, 35, 0.7)'
                              : isActive
                              ? '1.5px solid rgba(255, 248, 231, 0.4)'
                              : '1.5px solid rgba(255, 248, 231, 0.18)',
                            color: isCompleted
                              ? isKeyCell
                                ? 'var(--lantern-gold)'
                                : '#81C784'
                              : isKeyCell
                              ? 'var(--lantern-gold-light)'
                              : 'var(--paper-cream)',
                            boxShadow: isKeyCell
                              ? '0 0 10px rgba(245, 166, 35, 0.25)'
                              : 'none',
                          }}
                        />

                        {isKeyCell && !isCompleted && !cellChar && (
                          <span
                            style={{
                              position: 'absolute',
                              bottom: '2px',
                              right: '2px',
                              fontSize: '0.55rem',
                              color: 'rgba(245, 166, 35, 0.6)',
                              pointerEvents: 'none',
                            }}
                          >
                            ★
                          </span>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>

          <div style={{ marginTop: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 248, 231, 0.4)', fontStyle: 'italic' }}>
              💡 Nhấp vào ô bất kỳ để gõ chữ cái. Dùng phím ← → để di chuyển, Enter để kiểm tra.
            </span>
          </div>
        </div>
      </div>

      {/* ── Vertical Keyword Reveal Banner ──────────────────────── */}
      <AnimatePresence>
        {crossword.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            style={{
              textAlign: 'center',
              padding: '32px 24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(245, 166, 35, 0.16) 0%, rgba(139, 26, 26, 0.14) 100%)',
              border: '2px solid var(--lantern-gold)',
              boxShadow: '0 0 40px rgba(245, 166, 35, 0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(245,166,35,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--lantern-gold-light)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '10px',
              }}
            >
              🎉 Bạn đã mở khóa thành công từ khóa cột dọc!
            </p>

            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="glow-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                fontWeight: 900,
                color: 'var(--lantern-gold)',
                letterSpacing: '0.25em',
                margin: '12px 0',
                textShadow: '0 0 20px rgba(245, 166, 35, 0.6), 0 0 40px rgba(245, 166, 35, 0.3)',
              }}
            >
              ✨ SUM VẦY ✨
            </motion.p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'rgba(255, 248, 231, 0.85)',
                maxWidth: '560px',
                margin: '0 auto 20px auto',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              Dù là ánh nến ấm áp từ chiếc đèn ông sao của ký ức hay ánh đèn LED rực rỡ hiện đại, ý nghĩa thiêng liêng nhất của đêm trăng rằm chính là khoảnh khắc cả gia đình cùng nhau{' '}
              <strong style={{ color: 'var(--lantern-gold)' }}>SUM VẦY</strong>.
            </p>

            <button
              onClick={() => {
                resetCrossword();
                setCellValues(() => {
                  const init: Record<number, string[]> = {};
                  CLUES.forEach((c) => {
                    init[c.index] = new Array(c.letters.length).fill('');
                  });
                  return init;
                });
              }}
              style={{
                padding: '10px 24px',
                borderRadius: '10px',
                background: 'rgba(245, 166, 35, 0.15)',
                border: '1px solid var(--lantern-gold)',
                color: 'var(--lantern-gold)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              🔄 Chơi lại ô chữ
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
