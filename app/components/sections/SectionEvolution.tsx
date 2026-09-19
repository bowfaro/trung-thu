'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { BeforeAfterSlider } from '../comparison/BeforeAfterSlider';

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
            fontSize: 'clamp(1.5rem, 3.8vw, 2.4rem)',
            fontWeight: 800,
            color: '#FFF8E7',
            marginBottom: '20px',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}
        >
          Những ánh đèn kể chuyện mùa trăng
        </h2>
      </div>

      {/* Dẫn nhập */}
      <div className="fade-in-section" style={{ maxWidth: '740px', zIndex: 2, marginBottom: '32px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.96rem, 1.8vw, 1.08rem)',
            color: '#FFF8E7',
            lineHeight: 1.85,
            textAlign: 'left',
          }}
        >
          Đèn lồng Trung thu ngày nay không còn bó hẹp trong những khuôn dáng quen thuộc của ký ức. Bên cạnh những chiếc <span className="keyword-gold">đèn ông sao, đèn kéo quân hay đèn giấy truyền thống</span>, nhiều mẫu đèn mới được sáng tạo với kiểu dáng đa dạng, màu sắc bắt mắt và hình thức phù hợp hơn với thị hiếu của người trẻ.
        </p>
      </div>

      {/* Before/After Slider */}
      <div className="fade-in-section" style={{ width: '100%', maxWidth: '640px', zIndex: 2, marginBottom: '52px' }}>
        <BeforeAfterSlider />
      </div>

      {/* Dẫn dắt vào box phỏng vấn */}
      <div className="fade-in-section" style={{ maxWidth: '740px', zIndex: 2, marginBottom: '18px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.96rem, 1.8vw, 1.08rem)',
            color: '#FFF8E7',
            lineHeight: 1.85,
            textAlign: 'left',
          }}
        >
          Những hình ảnh quen thuộc như con vật, nhân vật hoạt hình hay họa tiết hiện đại cũng được đưa vào thiết kế, khiến chiếc đèn trở nên gần gũi hơn với trẻ em hôm nay:
        </p>
      </div>

      {/* Interview Image 1 — Artisan Trúc */}
      <div
        className="fade-in-section"
        style={{
          width: '100%',
          maxWidth: '720px',
          zIndex: 2,
          marginBottom: '52px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          src="/images/truc.png"
          alt="Chia sẻ từ Chị Thanh Trúc — nghệ nhân làm lồng đèn ở Hội An"
          width={922}
          height={985}
          sizes="(max-width: 768px) 100vw, 720px"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '12px',
          }}
        />
      </div>

      {/* Connecting text */}
      <div className="fade-in-section" style={{ maxWidth: '740px', zIndex: 2, marginBottom: '28px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.96rem, 1.8vw, 1.08rem)',
            color: '#FFF8E7',
            lineHeight: 1.85,
            textAlign: 'left',
          }}
        >
          Dù khoác lên mình những hình dáng và chất liệu mới, những chiếc đèn ấy vẫn giữ lại tinh thần của mùa trăng — là ánh sáng, là niềm vui và là <span className="keyword-gold">ký ức Trung thu được truyền từ thế hệ này sang thế hệ khác</span>. Đèn lồng có thể đổi dáng, đổi màu, đổi chất liệu, nhưng ánh sáng của mùa trăng thì vẫn được thắp lên từ những ký ức quen thuộc.
        </p>
      </div>

      {/* 2-column Image Editorial Feature */}
      <figure
        className="fade-in-section"
        style={{
          width: '100%',
          maxWidth: '750px',
          zIndex: 2,
          margin: '0 auto 52px auto',
          padding: 0,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '14px',
            width: '100%',
          }}
        >
          {/* Ảnh truyền thống */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
            }}
          >
            <Image
              src="/images/tre-em-va-trung-thu-truyen-thong.jpg"
              alt="Trẻ em rước đèn Trung thu truyền thống"
              fill
              sizes="(max-width: 768px) 100vw, 375px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Ảnh hiện đại */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
            }}
          >
            <Image
              src="/images/tre-em-va-trung-thu-hien-dai.jpg"
              alt="Trẻ em rước đèn Trung thu hiện đại"
              fill
              sizes="(max-width: 768px) 100vw, 375px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Chú thích ảnh giống phong cách bài báo */}
        <figcaption
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: "0.88rem",
            color: '#FFF8E7',
            fontWeight: 500,
            lineHeight: 1.6,
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: '12px',
            padding: '0 8px',
          }}
        >
          Dù là chiếc đèn truyền thống hay những mẫu đèn hiện đại, các em vẫn háo hức với niềm vui rước đèn mỗi dịp Trung thu. (Ảnh: Sưu tầm)
        </figcaption>
      </figure>

      {/* Dẫn dắt vào phỏng vấn Chị Trang */}
      <div className="fade-in-section" style={{ maxWidth: '740px', zIndex: 2, marginBottom: '18px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.96rem, 1.8vw, 1.08rem)',
            color: '#FFF8E7',
            lineHeight: 1.85,
            textAlign: 'left',
          }}
        >
          Mỗi mùa Trung thu đi qua, những chiếc đèn lồng lại mang một dáng hình mới. Sự thay đổi ấy không nhất thiết là câu chuyện của cũ và mới, càng không phải cuộc thay thế giữa truyền thống và hiện đại.
        </p>
      </div>

      {/* Interview Image 2 — Parent Trang */}
      <div
        className="fade-in-section"
        style={{
          width: '100%',
          maxWidth: '720px',
          zIndex: 2,
          marginBottom: '52px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          src="/images/trang.png"
          alt="Chia sẻ từ Chị Nguyễn Thị Trang — Đà Nẵng"
          width={841}
          height={980}
          sizes="(max-width: 768px) 100vw, 720px"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '12px',
          }}
        />
      </div>

      {/* Kết bài */}
      <div className="fade-in-section" style={{ maxWidth: '740px', zIndex: 2, marginTop: '8px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.96rem, 1.8vw, 1.08rem)',
            color: '#FFF8E7',
            lineHeight: 1.85,
            textAlign: 'left',
            marginBottom: '20px',
          }}
        >
          Đó là quá trình những giá trị cũ gặp gỡ những điều mới để tiếp tục tồn tại trong đời sống hôm nay. Chiếc đèn truyền thống mang theo câu chuyện của người làm, của những mùa trăng đã qua; chiếc đèn hiện đại lại đem đến những cách thể hiện độc đáo, đa dạng, phù hợp với sở thích và nhịp sống của thế hệ hôm nay. Khi đặt cạnh nhau, mỗi chiếc đèn góp một ánh sáng riêng cho bức tranh Trung thu toả sáng đầy màu sắc.
        </p>
      </div>

      {/* 2-column Image Editorial Feature: 2 loại đèn */}
      <figure
        className="fade-in-section"
        style={{
          width: '100%',
          maxWidth: '750px',
          zIndex: 2,
          margin: '12px auto 28px auto',
          padding: 0,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '14px',
            width: '100%',
          }}
        >
          {/* Đèn 1 */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
            }}
          >
            <Image
              src="/images/2-loai-den-1.jpg"
              alt="Đèn lồng Trung thu truyền thống"
              fill
              sizes="(max-width: 768px) 100vw, 375px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Đèn 2 */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
            }}
          >
            <Image
              src="/images/2-loai-den-2.jpg"
              alt="Đèn lồng Trung thu hiện đại"
              fill
              sizes="(max-width: 768px) 100vw, 375px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Chú thích ảnh giống phong cách bài báo */}
        <figcaption
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            color: '#FFF8E7',
            fontWeight: 500,
            lineHeight: 1.6,
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: '12px',
            padding: '0 8px',
          }}
        >
          Từ những chiếc đèn truyền thống đến kiểu dáng hiện đại, tất cả cùng tạo nên sắc màu riêng cho mùa Trung thu. (Ảnh: Sưu tầm)
        </figcaption>
      </figure>

      <div className="fade-in-section" style={{ maxWidth: '740px', zIndex: 2, marginTop: '12px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.96rem, 1.8vw, 1.08rem)',
            color: '#FFF8E7',
            lineHeight: 1.85,
            textAlign: 'left',

          }}
        >
          Có lẽ, điều khiến những ánh đèn gặp nhau không nằm ở hình dáng hay cách thắp sáng, mà ở <span className="keyword-gold">niềm vui và sự đoàn viên</span> phía sau mỗi chiếc đèn. Truyền thống không chỉ thuộc về những mùa trăng đã qua, mà tiếp tục được thắp sáng trong những dáng hình mới của hôm nay.
        </p>
      </div>
    </section>
  );
}
