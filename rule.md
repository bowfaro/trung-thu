# Smart Task FE — Project Rules

## 1. Tech Stack

| Layer           | Technology                                                   | Version  |
| --------------- | ------------------------------------------------------------ | -------- |
| Framework       | **Next.js** (App Router)                                     | 16.2.12  |
| Language        | **TypeScript** (strict mode)                                 | ^5       |
| UI Library      | **React**                                                    | 19.2.4   |
| Styling         | **Tailwind CSS v4** + `tailwindcss-animate`                  | ^4       |
| UI Components   | **Radix UI** primitives + custom shadcn-style                | ^1.6.7   |
| CSS Utility     | `class-variance-authority` (cva) + `tailwind-merge` + `clsx` | —        |
| Form            | **React Hook Form** + `@hookform/resolvers/zod`              | ^7.83.0  |
| Validation      | **Zod v4**                                                   | ^4.4.3   |
| HTTP Client     | **Axios** (server-side only)                                 | ^1.18.1  |
| Server State    | **TanStack React Query**                                     | ^5.101.4 |
| Toast / Notify  | **Sonner**                                                   | ^2.0.7   |
| Icons           | **Lucide React**                                             | ^1.27.0  |
| Theme           | **next-themes**                                              | ^0.4.6   |
| Package Manager | **Yarn**                                                     | —        |

---

## 2. Cấu Trúc Thư Mục

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, providers, Toaster)
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Tailwind v4
│   └── favicon.ico
├── components/
│   └── ui/                      # Reusable UI primitives (shadcn-style)
│       ├── button.tsx
│       ├── card.tsx
│       ├── field.tsx             # FieldSet, FieldGroup, FieldLabel, FieldError…
│       ├── form.tsx              # React Hook Form + Radix integration
│       ├── input.tsx
│       ├── label.tsx
│       ├── sonner.tsx            # Toaster wrapper
│       └── sperator.tsx          # Separator (typo giữ nguyên)
│
├── hooks/                        # Custom hooks
│

```


### SYSTEM & PROJECT OVERVIEW
Act as a Senior Frontend Developer and UI/UX Designer. Build an interactive web application using **Next.js 14+ (App Router)**, **Tailwind CSS**, **Framer Motion** (for smooth page transitions and micro-interactions), and **Lucide Icons**.

---

### CORE ARCHITECTURAL CONSTRAINTS
- **Navigation Model:** Slide-based / Fullscreen Page-Turn System (No vertical window scrolling allowed. Users navigate page-by-page via explicit actions like "Next/Prev", buttons, or interactive triggers).
- **Theme/Aesthetics:** Vietnamese Mid-Autumn Festival (Tết Trung Thu) blending warm nostalgic tones (golden lantern glow, red paper, bamboo textures) with sleek modern LED highlights.

---

### PAGE STRUCTURE & INTERACTIVE MODULES

#### 1. Cover Slide (Màn Bìa & Dẫn Nhập)
- **Visuals:** Warm ambient background with a main title placeholder and a prominent "BẮT ĐẦU" button.
- **Interactive Decision:** Display prompt: *"Trung thu này, ánh sáng nào sẽ dẫn đường cho bạn?"* with choices leading into the main journey.

#### 2. Slide 1: "Chiếc đèn đi qua những mùa trăng" (Giai thoại & Trò chơi Ô chữ)
- **Interactive Crossword Puzzle (Keyphrase: SUM VẦY):**
  - Grid of 6 clues (non-linear selection, users can click any clue to answer):
    1. Lồng đèn 5 cánh kinh điển? → `ĐÈN ÔNG SAO`
    2. Tết Đoàn viên diễn ra vào mùa nào? → `MÙA THU`
    3. Ngày trăng sáng tròn nhất tháng Âm lịch? → `NGÀY RẰM`
    4. Hành động gọt chuốt thanh tre? → `VÓT TRE`
    5. Đạo cụ đội lên vai khi múa lân? → `ĐẦU LÂN`
    6. Chất liệu mỏng trong suốt dán khung tre? → `GIẤY KIẾNG`
  - On completing all clues, reveal and highlight the vertical keyphrase **"SUM VẦY"** with a glowing animation sliding down into a large traditional lantern graphic.
- **Interactive Lantern Hotspots & Audio Background:**
  - Auto-play background interview audio (Artisan storytelling) with play/pause controls.
  - Clickable hotspot pins on the lantern image that open popovers/tooltips explaining crafting steps (selecting bamboo, gluing paper, tying frame).

#### 3. Slide 2: "Cuộc đua của ánh sáng" (So sánh Truyền thống vs Hiện đại)
- **Intro Section:** Text introducing industrial/modern LED lanterns.
- **Video Experience Modal:** Clickable traditional lantern graphic with prompt *"Bạn có muốn biết thêm về mình?"* triggering a video modal player (1m30s - 1m50s).
- **Interactive Comparison Slider (Split View):**
  - Split screen with a draggable central handle:
    - **Left Side (Traditional):** Warm/dark yellow ambient lighting, warm nostalgic tone.
    - **Right Side (Modern):** Bright LED light, modern vibrant aesthetic.
  - Comparison criteria table overlay: Origin, Maker, Material, Light source, Designs, Price (15k-200k vs 20k-500k), and User Experience.

#### 4. Slide 3: "Muôn ánh đèn, cùng thắp một mùa trăng" (Sự chuyển mình)
- **Content:** Text narrative on how traditional lanterns adapt modern materials (fabric, plastic, mica, LED) while preserving core spirit.
- **Before/After Image Comparison Component:** Interactive image drag-slider comparing traditional lantern designs vs modernized versions.

#### 5. Slide 4: Thông điệp & Góc Nhìn Phụ Huynh
- **Content:** Quotes from parent interviews highlighting that while choices change, childhood joy remains unchanged.
- **Visual:** Parallax background image with smooth overlay typography.

#### 6. Slide 5: Mini-Game - Decorate Your Own Lantern (Tự tay làm đèn lồng)
- **Canvas / SVG Interactive Studio:**
  - Shape selection (Fish lantern, Star lantern, etc.).
  - Color palette & pattern picker (Yellow, Red, Moon motifs, accessories).
- **Completion Screen:**
  - Generates the customized lantern image.
  - Displays final badge / title: *"Chiếc đèn của bạn: Trăng - Vàng"*.
  - Displays final closing message: *"Mỗi chiếc đèn mang một ánh sáng riêng, nhưng cùng nhau thắp nên một mùa trăng kể cả ánh sáng từ chiếc đèn do chính bạn tạo nên."*

---

### TECHNICAL REQUIREMENTS
1. Use Next.js Client Components (`'use client'`) for interactive states (`useState`, `useRef`, Framer Motion `AnimatePresence`).
2. Support custom styling using standard Tailwind configuration or inline CSS variables for exact color gradients.
---