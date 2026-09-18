'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LanternVideoButtonProps {
  onOpenVideo: () => void;
}

export function LanternVideoButton({ onOpenVideo }: LanternVideoButtonProps) {
  const [isActivating, setIsActivating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isActivating) return;
    setIsActivating(true);

    // Hiệu ứng bừng sáng trước khi mở popup video
    setTimeout(() => {
      onOpenVideo();
      setIsActivating(false);
    }, 850);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        position: 'relative',
      }}
    >
      {/* Nút bấm đèn lồng hoàn toàn bằng code (SVG & CSS Vector) */}
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={isActivating}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={!isActivating ? { scale: 1.05, y: -4 } : {}}
        whileTap={!isActivating ? { scale: 0.95 } : {}}
        style={{
          background: 'none',
          border: 'none',
          cursor: isActivating ? 'wait' : 'pointer',
          padding: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          outline: 'none',
          zIndex: 2,
        }}
      >
        {/* Khung đèn lồng đung đưa tự nhiên */}
        <motion.div
          animate={
            isActivating
              ? {
                scale: [1, 1.18, 1.12],
                filter: [
                  'drop-shadow(0 0 25px rgba(245, 166, 35, 0.8)) brightness(1.2)',
                  'drop-shadow(0 0 70px rgba(255, 215, 0, 1)) drop-shadow(0 0 100px rgba(255, 87, 34, 0.9)) brightness(1.7)',
                  'drop-shadow(0 0 50px rgba(255, 215, 0, 0.95)) brightness(1.4)',
                ],
              }
              : {
                y: [-3, 3, -3],
                rotate: [-2.5, 2.5, -2.5],
                filter: isHovered
                  ? 'drop-shadow(0 8px 30px rgba(255, 179, 0, 0.75)) brightness(1.1)'
                  : 'drop-shadow(0 6px 22px rgba(245, 166, 35, 0.5))',
              }
          }
          transition={
            isActivating
              ? { duration: 0.85, ease: 'easeInOut' }
              : { repeat: Infinity, duration: 4.2, ease: 'easeInOut' }
          }
          style={{
            transformOrigin: '50% 0px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Vòng hào quang bừng sáng khi click - Khóa chuẩn 100% tâm đèn lồng */}
          <AnimatePresence>
            {isActivating && (
              <div
                style={{
                  position: 'absolute',
                  top: '104px',
                  left: '50%',
                  width: 0,
                  height: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [0.5, 3], opacity: [1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                  style={{
                    width: '240px',
                    height: '240px',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(255, 235, 100, 1) 0%, rgba(245, 166, 35, 0.85) 40%, rgba(229, 57, 53, 0.4) 65%, transparent 75%)',
                    flexShrink: 0,
                  }}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Cấu trúc Đèn Lồng Cổ Truyền hoàn toàn bằng SVG Vector */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="170"
            height="240"
            viewBox="0 0 170 240"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Vàng kim loại chóp và đáy */}
              <linearGradient id="lvbGoldCap" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C67D0A" />
                <stop offset="20%" stopColor="#FFD54F" />
                <stop offset="45%" stopColor="#FFF8E1" />
                <stop offset="65%" stopColor="#FFC107" />
                <stop offset="90%" stopColor="#FF8F00" />
                <stop offset="100%" stopColor="#9E5900" />
              </linearGradient>

              {/* Lớp lụa đỏ thắm của thân đèn */}
              <radialGradient id="lvbSilkBody" cx="50%" cy="46%" r="52%">
                <stop offset="0%" stopColor="#FFF176" stopOpacity="1" />
                <stop offset="20%" stopColor="#FF9100" stopOpacity="1" />
                <stop offset="48%" stopColor="#E53935" stopOpacity="1" />
                <stop offset="78%" stopColor="#B71C1C" stopOpacity="1" />
                <stop offset="100%" stopColor="#4A0512" stopOpacity="1" />
              </radialGradient>

              {/* Hiệu ứng tạo khối tròn căng 3D cho các múi đèn */}
              <linearGradient id="lvbPanelCenter" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
              </linearGradient>

              {/* Quầng sáng ngọn nến trung tâm */}
              <radialGradient id="lvbCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFDE7" stopOpacity="1" />
                <stop offset="30%" stopColor="#FFE082" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#FF9800" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#E53935" stopOpacity="0" />
              </radialGradient>

              {/* Dải tua rua đỏ - vàng */}
              <linearGradient id="lvbTasselGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="25%" stopColor="#FF5252" />
                <stop offset="70%" stopColor="#C62828" />
                <stop offset="100%" stopColor="#B71C1C" stopOpacity="0.25" />
              </linearGradient>

              {/* Filter phát quang nhẹ */}
              <filter id="lvbSoftGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Quầng sáng tỏa ra sau lưng đèn */}
            <ellipse
              cx="85"
              cy="104"
              rx="72"
              ry="76"
              fill="#FF8F00"
              opacity={isHovered || isActivating ? 0.45 : 0.28}
              filter="url(#lvbSoftGlow)"
            />

            {/* Dây treo và khuyên móc vàng */}
            <line x1="85" y1="0" x2="85" y2="12" stroke="#FFD54F" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="85" cy="17" r="5" fill="none" stroke="#FFE082" strokeWidth="2.2" />

            {/* Chóp đèn bằng đồng vàng chạm trổ */}
            <rect x="71" y="22" width="28" height="4.5" rx="1.5" fill="url(#lvbGoldCap)" stroke="#B78103" strokeWidth="0.5" />
            <path d="M 56,33 Q 85,27 114,33 L 110,26 L 60,26 Z" fill="url(#lvbGoldCap)" stroke="#B78103" strokeWidth="0.5" />
            <rect x="54" y="32" width="62" height="3" rx="1" fill="#FFD54F" opacity="0.85" />

            {/* Thân đèn lồng: Lớp lụa đỏ thắm dáng oval truyền thống */}
            <path
              d="M 60,34 C 14,66 14,142 64,174 L 106,174 C 156,142 156,66 110,34 Z"
              fill="url(#lvbSilkBody)"
              stroke="#FFB300"
              strokeWidth="1.8"
            />

            {/* Lớp phủ tạo khối 3D cho múi giữa */}
            <path
              d="M 74,34 C 54,66 54,142 76,174 L 94,174 C 116,142 116,66 96,34 Z"
              fill="url(#lvbPanelCenter)"
            />

            {/* Ngọn nến ấm phát sáng từ bên trong */}
            <ellipse
              cx="85"
              cy="104"
              rx={isHovered ? 50 : 46}
              ry={isHovered ? 54 : 50}
              fill="url(#lvbCoreGlow)"
              style={{ transition: 'all 0.3s ease' }}
            />

            {/* Họa tiết hoa văn mây lượn chìm dát vàng */}
            <g opacity="0.45" stroke="#FFE082" fill="none" strokeWidth="1">
              <path d="M 45,72 Q 52,65 60,70 Q 68,64 74,70" />
              <path d="M 96,70 Q 102,64 110,70 Q 118,65 125,72" />
              <path d="M 45,136 Q 52,143 60,138 Q 68,144 74,138" />
              <path d="M 96,138 Q 102,144 110,138 Q 118,143 125,136" />
            </g>

            {/* Nan tre hoành (vòng nan ngang) */}
            <path d="M 33,72 Q 85,84 137,72" fill="none" stroke="rgba(255, 235, 150, 0.4)" strokeWidth="1.2" />
            <path d="M 23,104 Q 85,116 147,104" fill="none" stroke="rgba(255, 235, 150, 0.55)" strokeWidth="1.4" />
            <path d="M 33,136 Q 85,147 137,136" fill="none" stroke="rgba(255, 235, 150, 0.4)" strokeWidth="1.2" />

            {/* Nan tre tung (khung sườn nan dọc) */}
            <path d="M 85,34 L 85,174" stroke="rgba(255, 224, 130, 0.85)" strokeWidth="1.5" />
            <path d="M 73,34 C 52,66 52,142 75,174" fill="none" stroke="rgba(255, 224, 130, 0.75)" strokeWidth="1.3" />
            <path d="M 97,34 C 118,66 118,142 95,174" fill="none" stroke="rgba(255, 224, 130, 0.75)" strokeWidth="1.3" />
            <path d="M 63,34 C 30,66 30,142 66,174" fill="none" stroke="rgba(255, 224, 130, 0.65)" strokeWidth="1.2" />
            <path d="M 107,34 C 140,66 140,142 104,174" fill="none" stroke="rgba(255, 224, 130, 0.65)" strokeWidth="1.2" />

            {/* Đáy đèn bằng đồng vàng */}
            <path d="M 64,174 Q 85,180 106,174 L 102,181 Q 85,186 68,181 Z" fill="url(#lvbGoldCap)" stroke="#B78103" strokeWidth="0.5" />
            <rect x="74" y="182" width="22" height="4" rx="1.5" fill="url(#lvbGoldCap)" stroke="#B78103" strokeWidth="0.5" />

            {/* Nút thắt cát tường và ngọc đỏ */}
            <circle cx="85" cy="190" r="4.5" fill="#FFE082" stroke="#FF8F00" strokeWidth="1" />
            <circle cx="85" cy="190" r="2" fill="#D32F2F" />
            <rect x="80" y="195" width="10" height="5" rx="1.5" fill="url(#lvbGoldCap)" />

            {/* Chùm tua rua tơ đỏ - chỉ vàng buông rủ */}
            <g stroke="url(#lvbTasselGrad)" strokeLinecap="round">
              <line x1="85" y1="200" x2="85" y2="238" strokeWidth="2.2" />
              <line x1="83" y1="200" x2="81" y2="235" strokeWidth="1.6" />
              <line x1="87" y1="200" x2="89" y2="235" strokeWidth="1.6" />
              <line x1="81" y1="200" x2="77" y2="231" strokeWidth="1.4" />
              <line x1="89" y1="200" x2="93" y2="231" strokeWidth="1.4" />
              <line x1="79" y1="200" x2="73" y2="226" strokeWidth="1.2" />
              <line x1="91" y1="200" x2="97" y2="226" strokeWidth="1.2" />
            </g>

            {/* Nút Play trung tâm có viền vàng lấp lánh */}
            <g filter="url(#lvbSoftGlow)">
              {/* Quầng sáng quanh nút play */}
              <circle
                cx="85"
                cy="104"
                r={isHovered ? 29 : 26}
                fill="rgba(255, 215, 0, 0.3)"
                style={{ transition: 'all 0.25s ease' }}
              />
              {/* Mặt gương kính đen bóng */}
              <circle
                cx="85"
                cy="104"
                r="20"
                fill="rgba(26, 14, 46, 0.85)"
                stroke="#FFE082"
                strokeWidth="2.2"
              />
              {/* Vòng chấm vàng trang trí */}
              <circle
                cx="85"
                cy="104"
                r="16.5"
                fill="none"
                stroke="rgba(255, 215, 0, 0.5)"
                strokeWidth="1"
                strokeDasharray="2.5 1.8"
              />
              {/* Tam giác Play phát sáng */}
              <polygon points="80,94 95,104 80,114" fill="#FFE082" />
            </g>
          </svg>
        </motion.div>

        {/* Lời dẫn tương tác */}
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--lantern-gold-light)',
              letterSpacing: '0.02em',
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            &quot;Bạn có muốn biết thêm về mình?&quot;
          </p>
          {/* <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: 'rgba(255, 248, 231, 0.75)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '4px',
              background: 'rgba(245, 166, 35, 0.14)',
              border: '1px solid rgba(245, 166, 35, 0.35)',
              padding: '4px 14px',
              borderRadius: '20px',
              backdropFilter: 'blur(6px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            {isActivating ? '✨ Đang thắp sáng...' : '▶ Chạm đèn lồng để xem video'}
          </span> */}
        </div>
      </motion.button>
    </div>
  );
}

