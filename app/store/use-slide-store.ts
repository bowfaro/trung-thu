'use client';

import { create } from 'zustand';

interface CrosswordState {
  answers: Record<number, string>;
  activeClue: number | null;
  completed: boolean;
  /** Track which clues have had their answer revealed */
  revealed: Record<number, boolean>;
}

interface LanternGameState {
  shape: string | null;
  color: string | null;
  pattern: string | null;
  completed: boolean;
}

interface AppStore {
  /* ── Crossword puzzle ── */
  crossword: CrosswordState;
  setActiveClue: (index: number | null) => void;
  submitAnswer: (clueIndex: number, answer: string) => boolean;
  revealAnswer: (clueIndex: number) => void;
  resetCrossword: () => void;

  /* ── Lantern decoration game ── */
  lanternGame: LanternGameState;
  setLanternShape: (shape: string) => void;
  setLanternColor: (color: string) => void;
  setLanternPattern: (pattern: string) => void;
  completeLanternGame: () => void;
  resetLanternGame: () => void;

  /* ── Artisan explorer ── */
  activeHotspot: string | null;
  setActiveHotspot: (id: string | null) => void;

  /* ── Cover decision ── */
  coverChoice: 'traditional' | 'modern' | null;
  setCoverChoice: (choice: 'traditional' | 'modern') => void;
  showDecisionMessage: boolean;
  setShowDecisionMessage: (show: boolean) => void;
}

// Correct answers for the crossword (Vietnamese, normalized: no spaces, uppercase)
const CORRECT_ANSWERS: Record<number, string> = {
  0: 'ĐÈNÔNGSAO',
  1: 'MÙATHU',
  2: 'NGÀYRẰM',
  3: 'VÓTTRE',
  4: 'ĐẦULÂN',
  5: 'GIẤYKIẾNG',
};

const DISPLAY_ANSWERS: Record<number, string> = {
  0: 'ĐÈN ÔNG SAO',
  1: 'MÙA THU',
  2: 'NGÀY RẰM',
  3: 'VÓT TRE',
  4: 'ĐẦU LÂN',
  5: 'GIẤY KIẾNG',
};

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

export const useAppStore = create<AppStore>((set, get) => ({
  /* ── Crossword puzzle ── */
  crossword: {
    answers: {},
    activeClue: null,
    completed: false,
    revealed: {},
  },

  setActiveClue: (index) =>
    set((state) => ({
      crossword: { ...state.crossword, activeClue: index },
    })),

  submitAnswer: (clueIndex, answer) => {
    const normalized = normalizeVN(answer);
    const correct = CORRECT_ANSWERS[clueIndex];
    if (!correct) return false;
    const correctNormalized = normalizeVN(correct);

    const isCorrect = normalized === correctNormalized || (clueIndex === 2 && normalized === 'NGAYRAM');
    if (isCorrect) {
      set((state) => {
        const newAnswers = { ...state.crossword.answers, [clueIndex]: DISPLAY_ANSWERS[clueIndex] || answer };
        const allCorrect = Object.keys(CORRECT_ANSWERS).every(
          (key) => newAnswers[Number(key)]
        );
        return {
          crossword: {
            ...state.crossword,
            answers: newAnswers,
            completed: allCorrect,
            activeClue: null,
          },
        };
      });
    }
    return isCorrect;
  },

  revealAnswer: (clueIndex) => {
    set((state) => {
      // Mark as revealed and auto-fill the answer
      const displayAnswers: Record<number, string> = {
        0: 'ĐÈN ÔNG SAO',
        1: 'MÙA THU',
        2: 'NGÀY RẰM',
        3: 'VÓT TRE',
        4: 'ĐẦU LÂN',
        5: 'GIẤY KIẾNG',
      };
      const newAnswers = { ...state.crossword.answers, [clueIndex]: displayAnswers[clueIndex] || '' };
      const newRevealed = { ...state.crossword.revealed, [clueIndex]: true };
      const allCorrect = Object.keys(CORRECT_ANSWERS).every(
        (key) => newAnswers[Number(key)]
      );
      return {
        crossword: {
          ...state.crossword,
          answers: newAnswers,
          revealed: newRevealed,
          completed: allCorrect,
          activeClue: null,
        },
      };
    });
  },

  resetCrossword: () =>
    set({
      crossword: { answers: {}, activeClue: null, completed: false, revealed: {} },
    }),

  /* ── Lantern decoration game ── */
  lanternGame: {
    shape: null,
    color: null,
    pattern: null,
    completed: false,
  },

  setLanternShape: (shape) =>
    set((state) => ({
      lanternGame: { ...state.lanternGame, shape },
    })),

  setLanternColor: (color) =>
    set((state) => ({
      lanternGame: { ...state.lanternGame, color },
    })),

  setLanternPattern: (pattern) =>
    set((state) => ({
      lanternGame: { ...state.lanternGame, pattern },
    })),

  completeLanternGame: () =>
    set((state) => ({
      lanternGame: { ...state.lanternGame, completed: true },
    })),

  resetLanternGame: () =>
    set({
      lanternGame: { shape: null, color: null, pattern: null, completed: false },
    }),

  /* ── Artisan explorer ── */
  activeHotspot: null,
  setActiveHotspot: (id) => set({ activeHotspot: id }),

  /* ── Cover decision ── */
  coverChoice: null,
  setCoverChoice: (choice) => set({ coverChoice: choice, showDecisionMessage: true }),
  showDecisionMessage: false,
  setShowDecisionMessage: (show) => set({ showDecisionMessage: show }),
}));
