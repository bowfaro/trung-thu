'use client';

import { useEffect, useRef } from 'react';
import { CrosswordGame } from '../crossword/CrosswordGame';
import { ArtisanExplorer } from '../artisan/ArtisanExplorer';
import { SectionDivider } from '../SectionDivider';

export function SectionRiddle() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const fadeEls = sectionRef.current?.querySelectorAll('.fade-in-section');
    fadeEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="section-riddle"
      ref={sectionRef}
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--night-deep) 0%, #2D1B4E 50%, var(--night-deep) 100%)',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(245,166,35,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div className="fade-in-section" style={{ textAlign: 'center', maxWidth: '700px', zIndex: 2 }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
            fontWeight: 700,
            color: 'var(--paper-cream)',
            marginBottom: '24px',
          }}
        >
          Chiếc đèn đi qua những mùa trăng
        </h2>
      </div>

      {/* Sapo text */}
      <div className="fade-in-section" style={{ maxWidth: '700px', zIndex: 2, marginBottom: '20px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.7)',
            lineHeight: 1.9,
            textAlign: 'justify',
            marginBottom: '16px',
          }}
        >
          Có những mùa trăng đã lùi xa nhưng ánh sáng của nó vẫn len lỏi sưởi ấm ký ức của biết bao thế hệ. Đó là ánh vàng chập chờn hắt ra từ ngọn nến nhỏ, xuyên qua lớp giấy kiếng đỏ tươi mỏng manh. Trung thu ngày ấy mộc mạc đọng lại trong mùi ngai ngái của hồ dán, tiếng lạch cạch vót nan tre ngoài hiên vắng, và tiếng cười giòn tan của đám trẻ xúm xít che gió giữ lửa rước đèn khắp ngõ xóm. Thời gian trôi đi, những chiếc đèn lồng xưa cũ có thể hao mòn, nhưng cảm giác háo hức chờ đợi đêm trăng rằm thì chưa bao giờ phai nhạt.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.6)',
            lineHeight: 1.9,
            textAlign: 'justify',
            fontStyle: 'italic',
          }}
        >
          Hãy cùng dừng lại một nhịp để tìm về ngày hôm qua. Dưới đây là những mảnh ghép ký ức. Hãy lật mở chúng để tìm ra báu vật lớn nhất của mọi mùa trăng.
        </p>
      </div>

      {/* Crossword */}
      <div className="fade-in-section" style={{ width: '100%', maxWidth: '1150px', zIndex: 2 }}>
        <CrosswordGame />
      </div>

      <SectionDivider />

      {/* Artisan Explorer */}
      <div className="fade-in-section" style={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 2 }}>
        <ArtisanExplorer />
      </div>
    </section>
  );
}
