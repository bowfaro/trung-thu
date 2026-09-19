'use client';

import Image from 'next/image';

const ROWS = [
  { label: 'Nguồn gốc', traditional: 'Xuất hiện lâu đời, nghề thủ công', modern: 'Phát triển theo công nghệ công nghiệp' },
  { label: 'Chất liệu', traditional: 'Tre, giấy kiếng, hồ dán, dây thép', modern: 'Nhựa, mica, linh kiện điện tử, vải tổng hợp' },
  { label: 'Nguồn sáng', traditional: 'Nến, đèn dầu nhỏ, đom đóm', modern: 'Pin, pin sạc, LED' },
  { label: 'Mẫu mã', traditional: 'Ông sao, cá chép, con vật truyền thống...', modern: 'Đa dạng: Hoạt hình, động vật, robot...' },
  { label: 'Màu sắc', traditional: 'Màu tự nhiên, dịu nhẹ, hài hòa', modern: 'Nhiều màu sắc rực rỡ, đổi màu liên tục' },
  { label: 'Giá thành', traditional: '15.000 – 200.000 VNĐ', modern: '20.000 – 500.000 VNĐ' },
  { label: 'Trải nghiệm', traditional: 'Có cảm giác gần gũi, hoài niệm, gắn với tuổi thơ', modern: 'Nhanh chóng, tiện lợi, thu hút trẻ nhỏ' },
];

export function InfographicTable() {
  return (
    <div
      id="infographic-table"
      style={{
        width: '100%',
        maxWidth: '820px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(245,166,35,0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        background: 'rgba(26, 14, 46, 0.65)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header row with visual images */}
      <div style={{ display: 'flex', width: '100%', alignItems: 'stretch' }}>
        {/* Tiêu chí */}
        <div
          style={{
            width: '24%',
            padding: '16px 12px',
            background: 'rgba(255,248,231,0.06)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#FFF8E7',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRight: '1px solid rgba(255,248,231,0.08)',
          }}
        >
          Tiêu chí
        </div>

        {/* Cột Đèn Truyền Thống */}
        <div
          style={{
            flex: 1,
            padding: '14px 12px',
            background: 'linear-gradient(180deg, rgba(139,26,26,0.35) 0%, rgba(245,166,35,0.15) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            borderRight: '1px solid rgba(255,248,231,0.08)',
          }}
        >
          {/* Thumbnail ảnh truyền thống từ public/images */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '180px',
              aspectRatio: '16 / 11',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              border: '1.5px solid rgba(245, 166, 35, 0.45)',
            }}
          >
            <Image
              src="/images/denongsao.jpg"
              alt="Đèn lồng truyền thống"
              fill
              sizes="(max-width: 768px) 140px, 180px"
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(26,14,46,0.5) 0%, transparent 60%)',
              }}
            />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: 700,
              color: 'var(--lantern-gold-light)',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            🏮 Đèn Truyền Thống
          </span>
        </div>

        {/* Cột Đèn Hiện Đại */}
        <div
          style={{
            flex: 1,
            padding: '14px 12px',
            background: 'linear-gradient(180deg, rgba(79,195,247,0.2) 0%, rgba(206,147,216,0.12) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Thumbnail ảnh hiện đại từ public/images */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '180px',
              aspectRatio: '16 / 11',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              border: '1.5px solid rgba(79, 195, 247, 0.45)',
            }}
          >
            <Image
              src="/images/modern-lantern.webp"
              alt="Đèn lồng hiện đại"
              fill
              sizes="(max-width: 768px) 140px, 180px"
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(26,14,46,0.5) 0%, transparent 60%)',
              }}
            />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: 700,
              color: 'var(--led-blue)',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            💡 Đèn Hiện Đại
          </span>
        </div>
      </div>

      {/* Data rows */}
      {ROWS.map((row, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            width: '100%',
            borderTop: '1px solid rgba(255,248,231,0.06)',
          }}
        >
          {/* Label */}
          <div
            style={{
              width: '26%',
              padding: '10px clamp(6px, 1.5vw, 14px)',
              background: `rgba(255,248,231,${0.03 + (i % 2) * 0.02})`,
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.74rem, 1.8vw, 0.84rem)',
              fontWeight: 700,
              color: '#FFE082',
              display: 'flex',
              alignItems: 'center',
              borderRight: '1px solid rgba(255,248,231,0.06)',
            }}
          >
            {row.label}
          </div>
          {/* Traditional */}
          <div
            style={{
              flex: 1,
              padding: '10px clamp(6px, 1.5vw, 14px)',
              background: `rgba(245,166,35,${0.03 + (i % 2) * 0.02})`,
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.76rem, 1.8vw, 0.85rem)',
              color: 'var(--paper-cream)',
              lineHeight: 1.5,
              borderRight: '1px solid rgba(255,248,231,0.06)',
            }}
          >
            {row.traditional}
          </div>
          {/* Modern */}
          <div
            style={{
              flex: 1,
              padding: '10px clamp(6px, 1.5vw, 14px)',
              background: `rgba(79,195,247,${0.02 + (i % 2) * 0.015})`,
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.76rem, 1.8vw, 0.85rem)',
              color: 'var(--paper-cream)',
              lineHeight: 1.5,
            }}
          >
            {row.modern}
          </div>
        </div>
      ))}
    </div>
  );
}
