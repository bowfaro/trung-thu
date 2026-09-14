'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSlideStore } from '@/app/store/use-slide-store';
import { CrosswordGrid } from './CrosswordGrid';
import { CrosswordClue } from './CrosswordClue';

export interface ClueData {
  index: number;
  question: string;
  answer: string;
  displayAnswer: string; // with spaces for display
  keyLetterIndex: number; // index in the answer string (no spaces) that contributes to keyphrase
}

// The keyphrase column: SUM VẦY → S, U, M, V, Ầ, Y
// Each clue's answer contributes one letter to the vertical keyphrase
const CLUES: ClueData[] = [
  {
    index: 0,
    question: 'Lồng đèn 5 cánh kinh điển?',
    answer: 'ĐÈNÔNGSAO',
    displayAnswer: 'Đ È N Ô N G S A O',
    keyLetterIndex: 6, // S
  },
  {
    index: 1,
    question: 'Tết Đoàn viên diễn ra vào mùa nào?',
    answer: 'MÙATHU',
    displayAnswer: 'M Ù A T H U',
    keyLetterIndex: 5, // U
  },
  {
    index: 2,
    question: 'Ngày trăng sáng tròn nhất tháng Âm lịch?',
    answer: 'NGÀYRÀM',
    displayAnswer: 'N G À Y R À M',
    keyLetterIndex: 6, // M
  },
  {
    index: 3,
    question: 'Hành động gọt chuốt thanh tre?',
    answer: 'VÓTTRE',
    displayAnswer: 'V Ó T T R E',
    keyLetterIndex: 0, // V
  },
  {
    index: 4,
    question: 'Đạo cụ đội lên vai khi múa lân?',
    answer: 'ĐẦULÂN',
    displayAnswer: 'Đ Ầ U L Â N',
    keyLetterIndex: 1, // Ầ
  },
  {
    index: 5,
    question: 'Chất liệu mỏng trong suốt dán khung tre?',
    answer: 'GIẤYKIẾNG',
    displayAnswer: 'G I Ấ Y K I Ế N G',
    keyLetterIndex: 5, // Y → wait, keyphrase is SUM VẦY
    // Let me recalculate: S(0), U(1), M(2), V(3), Ầ(4), Y(5)
    // Clue 5 contributes Y → index 3 of GIẤYKIẾNG = Y
  },
];

// Fix clue 5 keyLetterIndex: GIẤYKIẾNG → G(0) I(1) Ấ(2) Y(3) K(4) I(5) Ế(6) N(7) G(8) → Y is at index 3
CLUES[5].keyLetterIndex = 3;

export function CrosswordGame() {
  const { crossword, submitAnswer, setActiveClue } = useSlideStore();
  const [inputValues, setInputValues] = useState<Record<number, string>>({});
  const [wrongClue, setWrongClue] = useState<number | null>(null);

  const handleSubmit = useCallback(
    (clueIndex: number, value: string) => {
      const isCorrect = submitAnswer(clueIndex, value);
      if (!isCorrect) {
        setWrongClue(clueIndex);
        setTimeout(() => setWrongClue(null), 600);
      }
    },
    [submitAnswer]
  );

  const handleInputChange = useCallback((clueIndex: number, value: string) => {
    setInputValues((prev) => ({ ...prev, [clueIndex]: value }));
  }, []);

  return (
    <div
      id="crossword-game"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        maxWidth: '900px',
        padding: '0 16px',
      }}
    >
      <AnimatePresence>
        {crossword.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, rgba(245,166,35,0.3), rgba(255,140,66,0.2))',
              borderRadius: '16px',
              border: '1px solid rgba(245,166,35,0.5)',
              textAlign: 'center',
            }}
          >
            <p
              className="glow-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--lantern-gold)',
                marginBottom: '4px',
              }}
            >
              ✨ SUM VẦY ✨
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,248,231,0.7)', fontFamily: 'var(--font-body)' }}>
              Từ khóa đã được giải — Sum vầy là hạnh phúc đoàn viên!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clues + Grid area */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          width: '100%',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {/* Clues list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '280px',
            flex: '0 1 340px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              color: 'var(--lantern-gold-light)',
              marginBottom: '8px',
              fontWeight: 600,
            }}
          >
            Gợi ý:
          </h3>
          {CLUES.map((clue) => (
            <CrosswordClue
              key={clue.index}
              clue={clue}
              isActive={crossword.activeClue === clue.index}
              isCompleted={!!crossword.answers[clue.index]}
              isWrong={wrongClue === clue.index}
              onSelect={() => setActiveClue(clue.index)}
            />
          ))}
        </div>

        {/* Grid */}
        <div style={{ flex: '0 1 500px', minWidth: '300px' }}>
          <CrosswordGrid
            clues={CLUES}
            inputValues={inputValues}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            completedAnswers={crossword.answers}
            activeClue={crossword.activeClue}
            wrongClue={wrongClue}
          />
        </div>
      </div>
    </div>
  );
}
