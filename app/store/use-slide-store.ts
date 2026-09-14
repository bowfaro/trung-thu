'use client';

import { create } from 'zustand';

interface CrosswordState {
  /** Each answer keyed by clue index (0-5) */
  answers: Record<number, string>;
  /** Which clue is currently active */
  activeClue: number | null;
  /** Whether the full crossword is solved */
  completed: boolean;
}

interface LanternGameState {
  shape: string | null;
  color: string | null;
  pattern: string | null;
  completed: boolean;
}

interface SlideStore {
  /* ── Slide navigation ── */
  currentSlide: number;
  totalSlides: number;
  direction: number; // 1 = forward, -1 = backward
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;

  /* ── Crossword puzzle ── */
  crossword: CrosswordState;
  setActiveClue: (index: number | null) => void;
  submitAnswer: (clueIndex: number, answer: string) => boolean;
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

  /* ── Comparison slider ── */
  comparisonPosition: number; // 0-100 percentage
  setComparisonPosition: (pos: number) => void;

  /* ── Sub-view within slide ── */
  riddleView: 'crossword' | 'artisan';
  setRiddleView: (view: 'crossword' | 'artisan') => void;

  /* ── Closing slide sub-view ── */
  closingView: 'message' | 'game' | 'result';
  setClosingView: (view: 'message' | 'game' | 'result') => void;
}

// Correct answers for the crossword (Vietnamese with diacritics)
const CORRECT_ANSWERS: Record<number, string> = {
  0: 'ĐÈNÔNGSAO',    // Đèn ông sao
  1: 'MUATHU',        // Mùa thu → normalized
  2: 'NGÀYRÀM',       // Ngày rằm → normalized
  3: 'VÓTTRE',         // Vót tre
  4: 'ĐÀULÂN',         // Đầu lân
  5: 'GIÀYKIÉNG',      // Giấy kiếng → normalized
};

// Normalize Vietnamese text for comparison (remove spaces, uppercase)
function normalizeVN(text: string): string {
  return text.replace(/\s+/g, '').toUpperCase();
}

export const useSlideStore = create<SlideStore>((set, get) => ({
  /* ── Slide navigation ── */
  currentSlide: 0,
  totalSlides: 5,
  direction: 1,

  nextSlide: () => {
    const { currentSlide, totalSlides } = get();
    if (currentSlide < totalSlides - 1) {
      set({ currentSlide: currentSlide + 1, direction: 1 });
    }
  },

  prevSlide: () => {
    const { currentSlide } = get();
    if (currentSlide > 0) {
      set({ currentSlide: currentSlide - 1, direction: -1 });
    }
  },

  goToSlide: (index: number) => {
    const { currentSlide, totalSlides } = get();
    if (index >= 0 && index < totalSlides && index !== currentSlide) {
      set({
        currentSlide: index,
        direction: index > currentSlide ? 1 : -1,
      });
    }
  },

  /* ── Crossword puzzle ── */
  crossword: {
    answers: {},
    activeClue: null,
    completed: false,
  },

  setActiveClue: (index) =>
    set((state) => ({
      crossword: { ...state.crossword, activeClue: index },
    })),

  submitAnswer: (clueIndex, answer) => {
    const normalized = normalizeVN(answer);
    const correct = CORRECT_ANSWERS[clueIndex];
    if (!correct) return false;

    const isCorrect = normalized === correct;
    if (isCorrect) {
      set((state) => {
        const newAnswers = { ...state.crossword.answers, [clueIndex]: answer };
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

  resetCrossword: () =>
    set({
      crossword: { answers: {}, activeClue: null, completed: false },
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

  /* ── Comparison slider ── */
  comparisonPosition: 50,
  setComparisonPosition: (pos) => set({ comparisonPosition: pos }),

  /* ── Riddle view ── */
  riddleView: 'crossword',
  setRiddleView: (view) => set({ riddleView: view }),

  /* ── Closing view ── */
  closingView: 'message',
  setClosingView: (view) => set({ closingView: view }),
}));
