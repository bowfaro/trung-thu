'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { InfographicCarousel } from '../comparison/InfographicCarousel';
import { VideoModal } from '../comparison/VideoModal';
import { LanternVideoButton } from '../comparison/LanternVideoButton';
import { SectionDivider } from '../SectionDivider';

export function SectionComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="section-comparison"
      ref={sectionRef}
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--night-deep) 0%, #1E2A3A 50%, var(--night-deep) 100%)',
      }}
    >
      {/* Ambient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(245,166,35,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(79,195,247,0.05) 0%, transparent 50%)',
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
          Giữa miền hoài niệm và tân thời
        </h2>
      </div>

      {/* Dẫn nhập */}
      <div className="fade-in-section" style={{ maxWidth: '700px', zIndex: 2, marginBottom: '24px' }}>
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
          Từ những chiếc lồng đèn truyền thống được tạo nên bởi tre, giấy kiếng và ánh sáng dịu nhẹ của ngọn nến, lồng đèn ngày nay đã có một bước chuyển mình mạnh mẽ cùng sự phát triển của công nghệ. Sự xuất hiện của đèn LED, pin sạc và các thiết kế công nghiệp đã mang đến những mẫu lồng đèn đa dạng hơn về màu sắc, kiểu dáng và tính năng.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.65)',
            lineHeight: 1.9,
            textAlign: 'justify',
          }}
        >
          Không chỉ phát sáng đơn thuần, nhiều chiếc đèn hiện đại còn có khả năng đổi màu, phát nhạc, chuyển động hoặc mô phỏng các nhân vật quen thuộc, nhanh chóng thu hút sự chú ý của trẻ em và người tiêu dùng. Nhờ sự tiện lợi, bền bỉ và phù hợp với thị hiếu mới, lồng đèn hiện đại đang dần trở thành một phần quen thuộc trong không khí Trung thu, tạo nên một &quot;cuộc đua ánh sáng&quot; giữa nét đẹp truyền thống và sự đổi mới của thời đại.
        </p>
      </div>

      {/* Video Lantern Button */}
      <div className="fade-in-section" style={{ zIndex: 2, marginBottom: '24px' }}>
        <LanternVideoButton onOpenVideo={() => setShowVideo(true)} />
      </div>

      <SectionDivider />

      {/* Infographic comparison carousel/slide */}
      <div
        className="fade-in-section"
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
          gap: '12px',
        }}
      >
        <InfographicCarousel />

        {/* Chú thích dưới infographic */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
            color: 'rgba(255, 248, 231, 0.65)',
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: '4px',
          }}
        >
          So sánh thông tin giữa đèn truyền thống và hiện đại
        </p>
      </div>

      {/* Kết thúc tít 2 */}
      <div className="fade-in-section" style={{ maxWidth: '700px', zIndex: 2, marginTop: '28px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.7)',
            lineHeight: 1.9,
            textAlign: 'justify',
          }}
        >
          Từ những chiếc lồng đèn thủ công mang dấu ấn ký ức đến những thiết kế hiện đại, tiện dụng và bắt mắt, lồng đèn Trung thu đang cho thấy khả năng thích nghi của một nét văn hóa lâu đời. Sự thay đổi ấy không làm mất đi giá trị truyền thống mà mở ra một cách tiếp cận mới, nơi cũ và mới cùng hiện diện trong đời sống. Qua infographic, sự khác biệt giữa hai thế hệ lồng đèn được nhìn nhận rõ hơn, từ đó cho thấy cách một món đồ quen thuộc đang chuyển mình theo thời gian.
        </p>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
      </AnimatePresence>
    </section>
  );
}
