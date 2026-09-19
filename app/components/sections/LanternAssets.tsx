import React from 'react';

// Color map for cellophane (giấy kiếng)
export const CELLOPHANE_COLORS: Record<string, {
  hex: string;
  glow: string;
  grad1: string;
  grad2: string;
  name: string;
}> = {
  'Đỏ': {
    hex: '#E53935',
    glow: 'rgba(229, 57, 53, 0.7)',
    grad1: '#FF5252',
    grad2: '#B71C1C',
    name: 'Đỏ thắm',
  },
  'Vàng': {
    hex: '#FBC02D',
    glow: 'rgba(251, 192, 45, 0.8)',
    grad1: '#FFEE58',
    grad2: '#F57F17',
    name: 'Vàng nắng',
  },
  'Hồng': {
    hex: '#EC407A',
    glow: 'rgba(236, 64, 122, 0.7)',
    grad1: '#FF80AB',
    grad2: '#C2185B',
    name: 'Hồng sen',
  },
  'Xanh': {
    hex: '#0288D1',
    glow: 'rgba(2, 136, 209, 0.7)',
    grad1: '#40C4FF',
    grad2: '#01579B',
    name: 'Xanh ngọc',
  },
  'Xanh lá': {
    hex: '#43A047',
    glow: 'rgba(67, 160, 71, 0.7)',
    grad1: '#69F0AE',
    grad2: '#1B5E20',
    name: 'Xanh lá',
  },
  'Cam': {
    hex: '#FB8C00',
    glow: 'rgba(251, 140, 0, 0.75)',
    grad1: '#FFB74D',
    grad2: '#E65100',
    name: 'Cam ấm',
  },
  'Tím': {
    hex: '#8E24AA',
    glow: 'rgba(142, 36, 170, 0.7)',
    grad1: '#EA80FC',
    grad2: '#4A148C',
    name: 'Tím trăng',
  },
};

export const BAMBOO_FRAMES = [
  { id: 'Ngôi sao', label: 'NGÔI SAO', desc: 'Đèn Ông Sao 5 cánh truyền thống' },
  { id: 'Cá chép', label: 'CÁ CHÉP', desc: 'Cá chép vượt vũ môn hóa rồng' },
  { id: 'Thỏ ngọc', label: 'THỎ NGỌC', desc: 'Thỏ ngọc cung trăng đêm rằm' },
  { id: 'Rồng vàng', label: 'RỒNG VÀNG', desc: 'Rồng vàng uốn lượn thăng hoa' },
  { id: 'Hoa sen', label: 'HOA SEN', desc: 'Hoa sen thanh khiết mùa trăng' },
  { id: 'Đầu lân', label: 'ĐẦU LÂN', desc: 'Đầu lân sư rực rỡ đón hội' },
];

export const PATTERN_OPTIONS = [
  { id: 'Trơn', label: 'Trơn mộc', desc: 'Giấy kiếng truyền thống thuần khiết', icon: '🏮' },
  { id: 'Kim tuyến', label: 'Kim tuyến', desc: 'Sao kim tuyến óng ánh lấp lánh', icon: '✨' },
  { id: 'Hoa mai', label: 'Hoa mai', desc: 'Hoa mai vàng dân gian tươi vui', icon: '🌸' },
  { id: 'Trăng mây', label: 'Trăng mây', desc: 'Trăng rằm & áng mây bạc ngũ sắc', icon: '🌕' },
  { id: 'Vảy rồng', label: 'Vảy vàng', desc: 'Họa tiết vảy rồng mạ vàng sang trọng', icon: '🐉' },
];

// SVG Common Defs (Realistic Bamboo Shading, Glowing Paper & Decoration Gradients)
export function SvgDefs({ colorHex, colorData }: { colorHex: string | null; colorData: typeof CELLOPHANE_COLORS['Đỏ'] | null }) {
  return (
    <defs>
      {/* Stable Glow Animations (DO NOT touch CSS transform to prevent resetting SVG translation coordinates) */}
      <style>{`
        @keyframes glitterPulseGlow {
          0%, 100% { opacity: 0.9; filter: drop-shadow(0 0 5px #FFFFFF) drop-shadow(0 0 10px #FFD54F); }
          50% { opacity: 1; filter: drop-shadow(0 0 11px #FFFFFF) drop-shadow(0 0 20px #FFA000); }
        }
        .glitter-glow-pulse {
          animation: glitterPulseGlow 2.5s ease-in-out infinite;
        }

        @keyframes maiPulseGlow {
          0%, 100% { opacity: 0.95; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.65)) drop-shadow(0 0 6px rgba(255, 235, 59, 0.7)); }
          50% { opacity: 1; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.75)) drop-shadow(0 0 12px rgba(255, 215, 0, 0.95)); }
        }
        .mai-glow-pulse {
          animation: maiPulseGlow 3s ease-in-out infinite;
        }

        @keyframes cloudFloatSubtle {
          0%, 100% { opacity: 0.92; }
          50% { opacity: 1; }
        }
        .cloud-glow-pulse {
          animation: cloudFloatSubtle 4s ease-in-out infinite;
        }
      `}</style>

      {/* Slat Drop Shadow on Workbench & Inner Cavity */}
      <filter id="bamboo-slat-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0A0400" floodOpacity="0.45" />
      </filter>

      {/* Desk Contact Shadow */}
      <radialGradient id="desk-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(10, 4, 0, 0.75)" />
        <stop offset="60%" stopColor="rgba(10, 4, 0, 0.4)" />
        <stop offset="100%" stopColor="rgba(10, 4, 0, 0)" />
      </radialGradient>

      {/* Cellophane Paper Fill Gradient */}
      <radialGradient id="paper-fill" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.92" />
        <stop offset="28%" stopColor={colorData?.grad1 || '#FFD54F'} stopOpacity="0.85" />
        <stop offset="70%" stopColor={colorHex || '#FF9800'} stopOpacity="0.78" />
        <stop offset="100%" stopColor={colorData?.grad2 || '#E65100'} stopOpacity="0.7" />
      </radialGradient>

      {/* Inner Candle Glow Flame Core */}
      <radialGradient id="candle-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
        <stop offset="25%" stopColor="#FFF176" stopOpacity="0.88" />
        <stop offset="60%" stopColor="#FFB74D" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#FF9800" stopOpacity="0" />
      </radialGradient>

      {/* Glossy Film Shimmer across Paper */}
      <linearGradient id="gloss-shimmer" x1="0%" y1="0%" x2="100%" y2="80%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>

      {/* Mai Blossom Petal Gradient */}
      <linearGradient id="mai-petal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF59D" />
        <stop offset="40%" stopColor="#FFEB3B" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>

      {/* Dragon & Carp Scale Gradient */}
      <linearGradient id="dragon-scale-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFDE7" />
        <stop offset="45%" stopColor="#FFD54F" />
        <stop offset="85%" stopColor="#FFA000" />
        <stop offset="100%" stopColor="#D84315" />
      </linearGradient>

      {/* Full Moon Gradient */}
      <radialGradient id="moon-disk-grad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#FFFDE7" />
        <stop offset="75%" stopColor="#FFF59D" />
        <stop offset="100%" stopColor="#FFE082" />
      </radialGradient>
    </defs>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN OVERLAYS (Trang trí hoa văn - Rendered IN FRONT of the frame!)
// ─────────────────────────────────────────────────────────────────────────────

// Single Sparkling Glitter Star Element (Safe SVG group nesting to preserve coordinates)
function GlitterStar({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${size})`}>
      <g className="glitter-glow-pulse">
        {/* Outer Golden Glow Starburst */}
        <polygon
          points="0,-13 3,-3 13,0 3,3 0,13 -3,3 -13,0 -3,-3"
          fill="#FFD54F"
        />
        {/* 45-degree smaller cross */}
        <polygon
          points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2"
          fill="#FFF59D"
          transform="rotate(45)"
        />
        {/* Bright diamond white core */}
        <polygon
          points="0,-9 2,-2 9,0 2,2 0,9 -2,2 -9,0 -2,-2"
          fill="#FFFFFF"
        />
        <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
      </g>
    </g>
  );
}

// Single Folk Mai Flower Element
function MaiFlower({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${size})`}>
      <g className="mai-glow-pulse">
        {/* 5 Petals */}
        {[0, 72, 144, 216, 288].map((angle, j) => (
          <circle
            key={j}
            cx={Math.cos((angle * Math.PI) / 180) * 8.5}
            cy={Math.sin((angle * Math.PI) / 180) * 8.5}
            r="5.5"
            fill="url(#mai-petal-grad)"
            stroke="#D84315"
            strokeWidth="0.9"
          />
        ))}
        {/* Flower center */}
        <circle cx="0" cy="0" r="4.5" fill="#B71C1C" />
        {/* Center stamens */}
        {[0, 60, 120, 180, 240, 300].map((angle, j) => (
          <circle
            key={`stamen-${j}`}
            cx={Math.cos((angle * Math.PI) / 180) * 2.8}
            cy={Math.sin((angle * Math.PI) / 180) * 2.8}
            r="0.9"
            fill="#FFFDE7"
          />
        ))}
        <circle cx="0" cy="0" r="1.6" fill="#FFE082" />
      </g>
    </g>
  );
}

// Per-shape tailored decoration coordinates matching each animal and symbol
const SHAPE_DECORATIONS: Record<
  string,
  {
    glitter: Array<{ x: number; y: number; size: number }>;
    mai: Array<{ x: number; y: number; size: number }>;
    moon: { cx: number; cy: number; r: number };
    clouds: Array<{ path: string }>;
    scales: Array<{ x: number; y: number }>;
  }
> = {
  'Ngôi sao': {
    glitter: [
      { x: 160, y: 140, size: 1.8 },
      { x: 160, y: 68, size: 1.4 },
      { x: 82, y: 108, size: 1.35 },
      { x: 238, y: 108, size: 1.35 },
      { x: 105, y: 208, size: 1.4 },
      { x: 215, y: 208, size: 1.4 },
      { x: 132, y: 115, size: 1.05 },
      { x: 188, y: 115, size: 1.05 },
      { x: 128, y: 168, size: 1.05 },
      { x: 192, y: 168, size: 1.05 },
    ],
    mai: [
      { x: 160, y: 140, size: 1.45 },
      { x: 160, y: 80, size: 1.15 },
      { x: 96, y: 118, size: 1.15 },
      { x: 224, y: 118, size: 1.15 },
      { x: 120, y: 198, size: 1.2 },
      { x: 200, y: 198, size: 1.2 },
    ],
    // Vầng trăng tròn giữa vòng tròn tâm đèn ông sao truyền thống
    moon: { cx: 160, cy: 140, r: 28 },
    clouds: [
      {
        path: 'M 110,172 C 125,158 145,158 158,168 C 170,158 190,158 205,172 C 215,176 218,188 208,196 C 196,204 118,204 110,172 Z',
      },
      {
        path: 'M 175,125 C 190,115 210,115 220,125 C 228,128 230,136 224,142 C 215,148 180,148 175,125 Z',
      },
    ],
    scales: [
      { x: 142, y: 122 }, { x: 160, y: 122 }, { x: 178, y: 122 },
      { x: 130, y: 142 }, { x: 150, y: 142 }, { x: 170, y: 142 }, { x: 190, y: 142 },
      { x: 140, y: 164 }, { x: 160, y: 164 }, { x: 180, y: 164 },
    ],
  },
  'Cá chép': {
    glitter: [
      { x: 100, y: 100, size: 1.5 },
      { x: 145, y: 72, size: 1.4 },
      { x: 182, y: 88, size: 1.35 },
      { x: 140, y: 125, size: 1.6 },
      { x: 168, y: 142, size: 1.35 },
      { x: 192, y: 190, size: 1.4 },
      { x: 175, y: 225, size: 1.25 },
      { x: 210, y: 228, size: 1.25 },
    ],
    mai: [
      { x: 142, y: 122, size: 1.35 },
      { x: 172, y: 146, size: 1.15 },
      { x: 158, y: 80, size: 1.05 },
      { x: 188, y: 195, size: 1.1 },
    ],
    // Cá chép trông trăng (Lý ngư vọng nguyệt)
    moon: { cx: 135, cy: 70, r: 24 },
    clouds: [
      {
        path: 'M 115,160 C 130,148 150,148 162,158 C 172,148 190,148 200,160 C 208,165 210,174 202,180 C 192,186 122,186 115,160 Z',
      },
      {
        path: 'M 155,210 C 168,200 185,200 195,210 C 202,214 204,222 198,228 C 190,234 160,234 155,210 Z',
      },
    ],
    // Vảy cá chép xếp lớp uốn cong tự nhiên theo thân cá
    scales: [
      { x: 132, y: 94 }, { x: 155, y: 98 }, { x: 178, y: 110 },
      { x: 126, y: 114 }, { x: 150, y: 120 }, { x: 174, y: 132 },
      { x: 134, y: 136 }, { x: 158, y: 142 }, { x: 180, y: 154 },
      { x: 168, y: 168 }, { x: 185, y: 178 },
    ],
  },
  'Thỏ ngọc': {
    glitter: [
      { x: 130, y: 52, size: 1.25 },
      { x: 158, y: 62, size: 1.15 },
      { x: 105, y: 115, size: 1.35 },
      { x: 150, y: 155, size: 1.7 },
      { x: 178, y: 168, size: 1.4 },
      { x: 195, y: 192, size: 1.35 },
      { x: 132, y: 222, size: 1.2 },
      { x: 172, y: 228, size: 1.15 },
    ],
    mai: [
      { x: 155, y: 162, size: 1.4 },
      { x: 188, y: 185, size: 1.15 },
      { x: 142, y: 90, size: 1.05 },
      { x: 125, y: 215, size: 0.95 },
    ],
    // Thỏ ngọc cung trăng đêm rằm
    moon: { cx: 185, cy: 115, r: 28 },
    clouds: [
      {
        path: 'M 95,205 C 110,192 135,192 148,204 C 160,192 185,192 200,205 C 210,210 212,222 202,230 C 190,238 100,238 95,205 Z',
      },
    ],
    // Họa tiết vảy mây gấm trên thân tròn thỏ ngọc
    scales: [
      { x: 145, y: 145 }, { x: 168, y: 150 },
      { x: 136, y: 168 }, { x: 160, y: 172 }, { x: 184, y: 178 },
      { x: 148, y: 192 }, { x: 172, y: 196 }, { x: 196, y: 202 },
    ],
  },
  'Rồng vàng': {
    glitter: [
      { x: 60, y: 120, size: 1.6 },
      { x: 110, y: 75, size: 1.4 },
      { x: 125, y: 105, size: 1.35 },
      { x: 142, y: 135, size: 1.6 },
      { x: 175, y: 148, size: 1.4 },
      { x: 210, y: 160, size: 1.35 },
      { x: 240, y: 120, size: 1.45 },
      { x: 245, y: 160, size: 1.25 },
    ],
    mai: [
      { x: 145, y: 135, size: 1.35 },
      { x: 182, y: 152, size: 1.2 },
      { x: 110, y: 160, size: 1.1 },
      { x: 225, y: 140, size: 1.1 },
    ],
    // Rồng ngậm ngọc minh châu & vờn mây
    moon: { cx: 62, cy: 120, r: 18 },
    clouds: [
      {
        path: 'M 125,178 C 138,165 158,165 168,176 C 178,165 198,165 208,178 C 215,182 216,192 208,198 C 198,204 130,204 125,178 Z',
      },
      {
        path: 'M 185,210 C 198,200 215,200 225,210 C 232,215 234,224 226,230 C 218,236 190,236 185,210 Z',
      },
    ],
    // Vảy rồng hoàng kim dọc theo thân uốn lượn
    scales: [
      { x: 92, y: 148 }, { x: 112, y: 152 },
      { x: 132, y: 132 }, { x: 152, y: 136 }, { x: 170, y: 142 },
      { x: 185, y: 150 }, { x: 205, y: 156 }, { x: 222, y: 165 },
      { x: 228, y: 140 }, { x: 235, y: 155 },
    ],
  },
  'Hoa sen': {
    glitter: [
      { x: 160, y: 75, size: 1.7 },
      { x: 128, y: 118, size: 1.35 },
      { x: 192, y: 118, size: 1.35 },
      { x: 85, y: 142, size: 1.25 },
      { x: 235, y: 142, size: 1.25 },
      { x: 160, y: 155, size: 1.7 },
      { x: 115, y: 185, size: 1.3 },
      { x: 205, y: 185, size: 1.3 },
      { x: 160, y: 215, size: 1.25 },
    ],
    mai: [
      { x: 160, y: 155, size: 1.45 },
      { x: 160, y: 92, size: 1.15 },
      { x: 118, y: 148, size: 1.15 },
      { x: 202, y: 148, size: 1.15 },
      { x: 160, y: 208, size: 1.1 },
    ],
    // Trăng rằm tỏa sáng sau búp sen
    moon: { cx: 160, cy: 92, r: 28 },
    clouds: [
      {
        path: 'M 95,195 C 115,178 140,178 155,192 C 168,178 195,178 215,195 C 225,202 228,214 218,222 C 205,230 105,230 95,195 Z',
      },
    ],
    // Vảy gấm hoàng hoa dát trên các cánh sen đối xứng
    scales: [
      { x: 142, y: 135 }, { x: 160, y: 135 }, { x: 178, y: 135 },
      { x: 125, y: 158 }, { x: 148, y: 158 }, { x: 172, y: 158 }, { x: 195, y: 158 },
      { x: 138, y: 182 }, { x: 160, y: 182 }, { x: 182, y: 182 },
    ],
  },
  'Đầu lân': {
    glitter: [
      { x: 160, y: 52, size: 1.6 },
      { x: 160, y: 102, size: 1.7 },
      { x: 115, y: 115, size: 1.35 },
      { x: 205, y: 115, size: 1.35 },
      { x: 92, y: 168, size: 1.35 },
      { x: 228, y: 168, size: 1.35 },
      { x: 135, y: 180, size: 1.15 },
      { x: 185, y: 180, size: 1.15 },
      { x: 160, y: 218, size: 1.45 },
    ],
    mai: [
      { x: 160, y: 102, size: 1.35 },
      { x: 102, y: 165, size: 1.2 },
      { x: 218, y: 165, size: 1.2 },
      { x: 160, y: 212, size: 1.15 },
    ],
    // Ngọc minh châu trên trán đầu lân
    moon: { cx: 160, cy: 98, r: 24 },
    clouds: [
      {
        path: 'M 80,165 C 92,152 110,152 120,162 C 128,154 140,155 146,165 C 150,170 148,178 140,184 C 130,190 85,190 80,165 Z',
      },
      {
        path: 'M 174,165 C 180,155 192,154 200,162 C 210,152 228,152 240,165 C 245,170 242,180 234,186 C 224,192 180,192 174,165 Z',
      },
    ],
    // Vảy gấm lân sư hoàng triều trên vòm trán, má và hàm
    scales: [
      { x: 138, y: 142 }, { x: 160, y: 142 }, { x: 182, y: 142 },
      { x: 122, y: 165 }, { x: 148, y: 165 }, { x: 172, y: 165 }, { x: 198, y: 165 },
      { x: 135, y: 188 }, { x: 160, y: 188 }, { x: 185, y: 188 },
    ],
  },
};

// Trăng Mây Component: Vầng trăng tròn và áng mây ngũ sắc may đo theo từng dáng khung
function MoonAndClouds({ shapeId }: { shapeId: string }) {
  const data = SHAPE_DECORATIONS[shapeId] || SHAPE_DECORATIONS['Ngôi sao'];
  return (
    <g className="lantern-clouds-layer cloud-glow-pulse" pointerEvents="none">
      {/* Vầng trăng rằm dạ quang */}
      <g filter="drop-shadow(0 0 12px rgba(255, 249, 196, 0.95)) drop-shadow(0 0 24px rgba(255, 213, 79, 0.75)) drop-shadow(0 2px 6px rgba(0,0,0,0.65))">
        {/* Vòng hào quang ngoài */}
        <circle
          cx={data.moon.cx}
          cy={data.moon.cy}
          r={data.moon.r + 3}
          fill="none"
          stroke="#FFE082"
          strokeWidth="1.5"
          opacity="0.8"
        />
        {/* Mặt trăng rằm */}
        <circle
          cx={data.moon.cx}
          cy={data.moon.cy}
          r={data.moon.r}
          fill="url(#moon-disk-grad)"
          stroke="#FFF9C4"
          strokeWidth="1.8"
        />
        {/* Vệt bóng nguyệt ánh bạc */}
        <ellipse
          cx={data.moon.cx - data.moon.r * 0.25}
          cy={data.moon.cy - data.moon.r * 0.25}
          rx={data.moon.r * 0.55}
          ry={data.moon.r * 0.45}
          fill="#FFFFFF"
          opacity="0.45"
        />
      </g>

      {/* Dải vân mây ngũ sắc viền vàng bồng bềnh */}
      <g filter="drop-shadow(0 2px 6px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 8px rgba(255, 224, 130, 0.8))">
        {data.clouds.map((c, i) => (
          <path
            key={i}
            d={c.path}
            fill="#FFFDF7"
            fillOpacity="0.92"
            stroke="#FFB300"
            strokeWidth="1.8"
          />
        ))}
      </g>
    </g>
  );
}

// Vảy Rồng Component: Vảy vàng dát ngọc xếp lớp theo hình hài từng con vật / biểu tượng
function GoldenScales({ shapeId }: { shapeId: string }) {
  const data = SHAPE_DECORATIONS[shapeId] || SHAPE_DECORATIONS['Ngôi sao'];
  return (
    <g
      className="lantern-scales-layer"
      pointerEvents="none"
      filter="drop-shadow(0 2px 5px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 8px rgba(255, 213, 79, 0.85))"
    >
      {data.scales.map((pt, i) => (
        <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
          {/* Cung vảy dát vàng */}
          <path
            d="M -14,0 C -14,14 14,14 14,0 Z"
            fill="url(#dragon-scale-grad)"
            stroke="#FFF9C4"
            strokeWidth="1.4"
          />
          {/* Đường phản quang hình lưỡi liềm */}
          <path
            d="M -10,1 C -10,9 10,9 10,1"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.3"
            opacity="0.92"
          />
        </g>
      ))}
    </g>
  );
}

export function PatternOverlay({ pattern, shapeId }: { pattern: string | null; shapeId: string }) {
  if (!pattern || pattern === 'Trơn') return null;

  const data = SHAPE_DECORATIONS[shapeId] || SHAPE_DECORATIONS['Ngôi sao'];

  if (pattern === 'Kim tuyến') {
    return (
      <g className="lantern-glitter-layer" pointerEvents="none">
        {data.glitter.map((pt, i) => (
          <GlitterStar key={i} x={pt.x} y={pt.y} size={pt.size} />
        ))}
      </g>
    );
  }

  if (pattern === 'Hoa mai') {
    return (
      <g className="lantern-mai-layer" pointerEvents="none">
        {data.mai.map((pt, i) => (
          <MaiFlower key={i} x={pt.x} y={pt.y} size={pt.size} />
        ))}
      </g>
    );
  }

  if (pattern === 'Trăng mây') {
    return <MoonAndClouds shapeId={shapeId} />;
  }

  if (pattern === 'Vảy rồng') {
    return <GoldenScales shapeId={shapeId} />;
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC 3D HANDCRAFTED BAMBOO FRAMES (Exact Cutouts From User Artwork)
// ─────────────────────────────────────────────────────────────────────────────
export const FRAME_CONFIGS: Record<
  string,
  {
    name: string;
    image: string;
    mask: string;
    bounds: { x: number; y: number; width: number; height: number };
    candleCenter: { cx: number; cy: number };
    shadowRx: number;
  }
> = {
  'Ngôi sao': {
    name: 'Ngôi sao',
    image: '/images/frames/ngoi-sao.png',
    mask: '/images/frames/ngoi-sao-mask.png',
    bounds: { x: 43.5, y: 24, width: 233, height: 228 },
    candleCenter: { cx: 160, cy: 140 },
    shadowRx: 85,
  },
  'Cá chép': {
    name: 'Cá chép',
    image: '/images/frames/ca-chep.png',
    mask: '/images/frames/ca-chep-mask.png',
    bounds: { x: 64.5, y: 20, width: 191, height: 232 },
    candleCenter: { cx: 155, cy: 115 },
    shadowRx: 80,
  },
  'Thỏ ngọc': {
    name: 'Thỏ ngọc',
    image: '/images/frames/tho-ngoc.png',
    mask: '/images/frames/tho-ngoc-mask.png',
    bounds: { x: 75, y: 20, width: 170, height: 232 },
    candleCenter: { cx: 155, cy: 168 },
    shadowRx: 75,
  },
  'Rồng vàng': {
    name: 'Rồng vàng',
    image: '/images/frames/rong-vang.png',
    mask: '/images/frames/rong-vang-mask.png',
    bounds: { x: 40.5, y: 24, width: 239, height: 228 },
    candleCenter: { cx: 155, cy: 145 },
    shadowRx: 90,
  },
  'Hoa sen': {
    name: 'Hoa sen',
    image: '/images/frames/hoa-sen.png',
    mask: '/images/frames/hoa-sen-mask.png',
    bounds: { x: 33.5, y: 36, width: 253, height: 216 },
    candleCenter: { cx: 160, cy: 160 },
    shadowRx: 92,
  },
  'Đầu lân': {
    name: 'Đầu lân',
    image: '/images/frames/dau-lan.png',
    mask: '/images/frames/dau-lan-mask.png',
    bounds: { x: 47.5, y: 22, width: 225, height: 230 },
    candleCenter: { cx: 160, cy: 145 },
    shadowRx: 88,
  },
};

export function LanternStageFrame({
  shapeId,
  color,
  pattern,
}: {
  shapeId: string;
  color: string | null;
  pattern: string | null;
}) {
  const config = FRAME_CONFIGS[shapeId] || FRAME_CONFIGS['Ngôi sao'];
  const colorData = color ? CELLOPHANE_COLORS[color] : null;
  const hasPaper = Boolean(colorData);
  const { bounds, candleCenter, shadowRx, image, mask } = config;
  const maskId = `paper-mask-${shapeId.replace(/\s+/g, '-')}`;

  return (
    <g className={`shape-${shapeId.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* ── 1. Table contact shadow & warm desk reflection ── */}
      <ellipse cx="160" cy="254" rx={shadowRx} ry="14" fill="url(#desk-shadow)" />
      <ellipse cx="160" cy="252" rx={shadowRx - 12} ry="10" fill="rgba(255, 195, 75, 0.25)" filter="blur(6px)" />

      {/* ── 2. Paper Skin & Candle Glow (Cellophane layer) ── */}
      {hasPaper && (
        <>
          {/* Mask definition using the exact contour mask of the bamboo frame */}
          <defs>
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              x={bounds.x}
              y={bounds.y}
              width={bounds.width}
              height={bounds.height}
            >
              <image
                href={mask}
                x={bounds.x}
                y={bounds.y}
                width={bounds.width}
                height={bounds.height}
                preserveAspectRatio="xMidYMid meet"
              />
            </mask>
          </defs>

          {/* Exterior warm radiant halo matching the lantern contour */}
          <image
            href={mask}
            x={bounds.x}
            y={bounds.y}
            width={bounds.width}
            height={bounds.height}
            preserveAspectRatio="xMidYMid meet"
            style={{
              filter: `drop-shadow(0 0 26px ${colorData?.glow || 'rgba(255, 170, 50, 0.7)'}) drop-shadow(0 0 10px ${colorData?.hex || '#FF9800'})`,
              opacity: 0.85,
            }}
          />

          {/* Cellophane Paper Fill with Candle Flicker, masked inside bamboo ribs */}
          <g mask={`url(#${maskId})`}>
            {/* The colored translucent cellophane paper */}
            <rect
              x={bounds.x - 10}
              y={bounds.y - 10}
              width={bounds.width + 20}
              height={bounds.height + 20}
              fill="url(#paper-fill)"
            />

            {/* Flickering warm candle flame core */}
            <circle
              cx={candleCenter.cx}
              cy={candleCenter.cy}
              r="62"
              fill="url(#candle-core)"
              className="candle-flicker-anim"
            />

            {/* Specular gloss reflection curve */}
            <ellipse
              cx={candleCenter.cx}
              cy={bounds.y + 36}
              rx={bounds.width * 0.32}
              ry="16"
              fill="url(#gloss-shimmer)"
            />
          </g>
        </>
      )}

      {/* ── 3. The 3D Handcrafted Bamboo Frame from User Artwork ── */}
      <image
        href={image}
        x={bounds.x}
        y={bounds.y}
        width={bounds.width}
        height={bounds.height}
        preserveAspectRatio="xMidYMid meet"
        filter="url(#bamboo-slat-shadow)"
      />

      {/* ── 4. TRANG TRÍ & HOA VĂN (RENDERED IN FRONT OF THE FRAME!) ── */}
      {/* Placed AFTER the frame image so decorations are 100% visible on top and NOT hidden! */}
      <PatternOverlay pattern={pattern} shapeId={shapeId} />
    </g>
  );
}

export function ShapeStar({ color, pattern }: { color: string | null; pattern: string | null }) {
  return <LanternStageFrame shapeId="Ngôi sao" color={color} pattern={pattern} />;
}

export function ShapeCarp({ color, pattern }: { color: string | null; pattern: string | null }) {
  return <LanternStageFrame shapeId="Cá chép" color={color} pattern={pattern} />;
}

export function ShapeRabbit({ color, pattern }: { color: string | null; pattern: string | null }) {
  return <LanternStageFrame shapeId="Thỏ ngọc" color={color} pattern={pattern} />;
}

export function ShapeDragon({ color, pattern }: { color: string | null; pattern: string | null }) {
  return <LanternStageFrame shapeId="Rồng vàng" color={color} pattern={pattern} />;
}

export function ShapeLotus({ color, pattern }: { color: string | null; pattern: string | null }) {
  return <LanternStageFrame shapeId="Hoa sen" color={color} pattern={pattern} />;
}

export function ShapeLion({ color, pattern }: { color: string | null; pattern: string | null }) {
  return <LanternStageFrame shapeId="Đầu lân" color={color} pattern={pattern} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// THUMBNAIL ICONS FOR "BẢNG CHỌN KHUNG" (Exact 3D Bamboo Frame Cutouts)
// ─────────────────────────────────────────────────────────────────────────────
export function FrameThumbnail({ shapeId }: { shapeId: string }) {
  const config = FRAME_CONFIGS[shapeId];
  const src = config?.image || '/images/frames/ngoi-sao.png';

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={src}
        alt={shapeId}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.45))',
          transition: 'transform 0.25s ease',
        }}
        className="hover:scale-110"
      />
    </div>
  );
}
