'use client';

import { useEffect, useRef } from 'react';
import { BeforeAfterSlider } from '../comparison/BeforeAfterSlider';
import { QuoteCard } from '../QuoteCard';
import { SectionDivider } from '../SectionDivider';

export function SectionEvolution() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="section-evolution"
      ref={sectionRef}
      className="section"
      style={{
        background: 'linear-gradient(180deg, var(--night-deep) 0%, #2D1B4E 40%, #3D2B1A 80%, var(--night-deep) 100%)',
      }}
    >
      {/* Ambient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(245,166,35,0.05) 0%, transparent 60%)',
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
          Những ánh đèn kể chuyện mùa trăng
        </h2>
      </div>

      {/* Dẫn nhập */}
      <div className="fade-in-section" style={{ maxWidth: '700px', zIndex: 2, marginBottom: '32px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.7)',
            lineHeight: 1.9,
            textAlign: 'justify',
          }}
        >
          Đèn lồng Trung thu ngày nay không còn bó hẹp trong những khuôn dáng quen thuộc của ký ức. Bên cạnh những chiếc đèn ông sao, đèn kéo quân hay đèn giấy truyền thống, nhiều mẫu đèn mới được sáng tạo với kiểu dáng đa dạng, màu sắc bắt mắt và hình thức phù hợp hơn với thị hiếu của người trẻ.
        </p>
      </div>

      {/* Before/After Slider */}
      <div className="fade-in-section" style={{ width: '100%', maxWidth: '600px', zIndex: 2, marginBottom: '24px' }}>
        <BeforeAfterSlider />
      </div>

      {/* Text sau slider */}
      <div className="fade-in-section" style={{ maxWidth: '700px', zIndex: 2, marginBottom: '32px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.7)',
            lineHeight: 1.9,
            textAlign: 'justify',
          }}
        >
          Những hình ảnh quen thuộc như con vật, nhân vật hoạt hình hay họa tiết hiện đại cũng được đưa vào thiết kế, khiến chiếc đèn trở nên gần gũi hơn với trẻ em hôm nay.
        </p>
      </div>

      <SectionDivider />

      {/* Interview Quote 1 — Artisan */}
      <div className="fade-in-section" style={{ width: '100%', maxWidth: '700px', zIndex: 2, marginBottom: '32px' }}>
        <QuoteCard
          quote="Đèn lồng thay đổi theo sở thích của trẻ bây giờ cũng là chuyện bình thường. Mình làm thêm nhiều màu sắc, hình dáng mới để các cháu thích hơn, nhưng quan trọng là vẫn phải giữ được cái hồn của chiếc đèn, từ cách làm thủ công đến những hình ảnh quen thuộc của Trung thu. Kiểu dáng có thể đổi mới, nhưng nét truyền thống thì vẫn phải giữ lại."
          author="Chị Thanh Trúc"
          role="nghệ nhân làm lồng đèn ở Hội An"
        />
      </div>

      {/* Connecting text */}
      <div className="fade-in-section" style={{ maxWidth: '700px', zIndex: 2, marginBottom: '24px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.65)',
            lineHeight: 1.9,
            textAlign: 'justify',
          }}
        >
          Dù khoác lên mình những hình dáng và chất liệu mới, những chiếc đèn ấy vẫn giữ lại tinh thần của mùa trăng, là ánh sáng, là niềm vui và là ký ức Trung thu được truyền từ thế hệ này sang thế hệ khác. Đèn lồng có thể đổi dáng, đổi màu, đổi chất liệu, nhưng ánh sáng của mùa trăng thì vẫn được thắp lên từ những ký ức quen thuộc.
        </p>
      </div>

      {/* Gallery placeholder referencing Drive folder */}
      <div className="fade-in-section" style={{ width: '100%', maxWidth: '700px', zIndex: 2, marginBottom: '24px' }}>
        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(255,248,231,0.04)',
            border: '1px solid rgba(245,166,35,0.12)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'rgba(255,248,231,0.5)',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            Dù là chiếc đèn truyền thống hay những mẫu đèn hiện đại, các em vẫn háo hức với niềm vui rước đèn mỗi dịp Trung thu. (Ảnh: Sưu tầm)
          </p>
          <a
            href="https://drive.google.com/drive/folders/1eZT06siUmfpqblvd4LWeBfuMtzIPBfpV"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '12px',
              padding: '8px 20px',
              borderRadius: '30px',
              border: '1px solid rgba(245,166,35,0.3)',
              background: 'rgba(245,166,35,0.1)',
              color: 'var(--lantern-gold)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            📷 Xem thư viện ảnh
          </a>
        </div>
      </div>

      <SectionDivider />

      {/* Interview Quote 2 — Parent */}
      <div className="fade-in-section" style={{ width: '100%', maxWidth: '700px', zIndex: 2, marginBottom: '32px' }}>
        <QuoteCard
          quote="Hồi tôi còn nhỏ, Trung thu chỉ cần có một chiếc đèn rước đi chơi với bạn bè là đã vui rồi. Bây giờ các con có nhiều loại đèn hơn, mẫu mã cũng phong phú hơn, nhưng tôi thấy niềm vui của các con khi được cầm đèn đi chơi, được cùng bạn bè, gia đình đón Trung thu thì vẫn vậy, không khác ngày trước là bao. Có thể chiếc đèn thay đổi, nhưng cái cảm giác háo hức, mong chờ Trung thu của các con thì vẫn còn nguyên."
          author="Chị Nguyễn Thị Trang"
          role="32 tuổi, Đà Nẵng"
        />
      </div>

      {/* Kết bài */}
      <div className="fade-in-section" style={{ maxWidth: '700px', zIndex: 2, marginTop: '8px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.65)',
            lineHeight: 1.9,
            textAlign: 'justify',
            marginBottom: '16px',
          }}
        >
          Đó là quá trình những giá trị cũ gặp gỡ những điều mới để tiếp tục tồn tại trong đời sống hôm nay. Chiếc đèn truyền thống mang theo câu chuyện của người làm, của những mùa trăng đã qua; chiếc đèn hiện đại lại đem đến những cách thể hiện độc đáo, đa dạng, phù hợp với sở thích và nhịp sống của thế hệ hôm nay. Khi đặt cạnh nhau, mỗi chiếc đèn góp một ánh sáng riêng cho bức tranh Trung thu toả sáng đầy màu sắc.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,248,231,0.55)',
            lineHeight: 1.9,
            textAlign: 'justify',
            fontStyle: 'italic',
          }}
        >
          Có lẽ, điều khiến những ánh đèn gặp nhau không nằm ở hình dáng hay cách thắp sáng, mà ở niềm vui và sự đoàn viên phía sau mỗi chiếc đèn. Truyền thống không chỉ thuộc về những mùa trăng đã qua, mà tiếp tục được thắp sáng trong những dáng hình mới của hôm nay.
        </p>
      </div>
    </section>
  );
}
