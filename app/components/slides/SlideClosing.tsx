'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSlideStore } from '@/app/store/use-slide-store';
import { LanternDecorator } from '../game/LanternDecorator';

const PARENT_QUOTES = [
  {
    quote: '"Hồi đó ba cầm đèn ông sao, sợ tắt nến lắm, phải che gió bằng tay. Giờ con cầm đèn LED, cười nói vô tư. Vui khác, nhưng vẫn là vui."',
    author: 'Anh Minh, phụ huynh, Q. Bình Thạnh',
  },
  {
    quote: '"Con gái tôi thích đèn Elsa hơn đèn cá chép. Tôi không buồn — miễn con vui đêm Trung thu là đủ."',
    author: 'Chị Hương, phụ huynh, Q.7',
  },
];

export function SlideClosing() {
  const { closingView, setClosingView, lanternGame } = useSlideStore();

  return (
    <div
      id="slide-closing"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1A0E2E 0%, #3D2B1A 40%, #5D3A1A 100%)',
      }}
    >
      {/* Warm ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 70%, rgba(245,166,35,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <AnimatePresence mode="wait">
        {closingView === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 24px',
              zIndex: 2,
              gap: '28px',
            }}
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glow-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                fontWeight: 700,
                color: 'var(--paper-cream)',
                textAlign: 'center',
              }}
            >
              Thông điệp từ hai ánh sáng
            </motion.h2>

            {/* Main message */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                maxWidth: '600px',
                padding: '24px 32px',
                borderLeft: '3px solid var(--lantern-gold)',
                background: 'rgba(255,248,231,0.05)',
                borderRadius: '0 12px 12px 0',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                color: 'rgba(255,248,231,0.85)',
                lineHeight: 1.8,
                fontStyle: 'italic',
              }}
            >
              &quot;Dù chọn ánh sáng của ký ức hay sự tiện lợi của hiện đại, mong bạn luôn có một mùa Trung thu hạnh phúc và ấm áp bên gia đình.&quot;
            </motion.blockquote>

            {/* Parent quotes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '700px',
              }}
            >
              {PARENT_QUOTES.map((pq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.2 }}
                  style={{
                    flex: '1 1 280px',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: 'rgba(255,248,231,0.04)',
                    border: '1px solid rgba(245,166,35,0.12)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'rgba(255,248,231,0.65)',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      marginBottom: '8px',
                    }}
                  >
                    {pq.quote}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'rgba(245,166,35,0.6)',
                      fontWeight: 500,
                    }}
                  >
                    — {pq.author}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA to game */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setClosingView('game')}
              className="btn-lantern"
              style={{ fontSize: '1rem', padding: '14px 32px' }}
            >
              🏮 Tự tay làm đèn lồng
            </motion.button>
          </motion.div>
        )}

        {closingView === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              padding: '24px',
            }}
          >
            <LanternDecorator />
          </motion.div>
        )}

        {closingView === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              padding: '32px 24px',
              zIndex: 2,
            }}
          >
            {/* Result lantern */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
              className="lantern-glow"
              style={{ fontSize: '5rem' }}
            >
              🏮
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                fontWeight: 700,
                color: 'var(--lantern-gold)',
                textAlign: 'center',
              }}
            >
              Chiếc đèn của bạn: {lanternGame.shape} — {lanternGame.color}
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                maxWidth: '550px',
                textAlign: 'center',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                color: 'rgba(255,248,231,0.8)',
                lineHeight: 1.8,
                fontStyle: 'italic',
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(245,166,35,0.08)',
                border: '1px solid rgba(245,166,35,0.2)',
              }}
            >
              &quot;Mỗi chiếc đèn mang một ánh sáng riêng, nhưng cùng nhau thắp nên một mùa trăng — kể cả ánh sáng từ chiếc đèn do chính bạn tạo nên.&quot;
            </motion.blockquote>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              onClick={() => {
                setClosingView('game');
              }}
              style={{
                padding: '10px 24px',
                borderRadius: '30px',
                border: '1px solid rgba(245,166,35,0.3)',
                background: 'rgba(245,166,35,0.1)',
                color: 'var(--lantern-gold-light)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Làm lại ✨
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
