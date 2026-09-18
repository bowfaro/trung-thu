interface QuoteCardProps {
  quote: string;
  author: string;
  role?: string;
}

export function QuoteCard({ quote, author, role }: QuoteCardProps) {
  return (
    <div
      style={{
        maxWidth: '650px',
        padding: '28px 32px',
        borderLeft: '3px solid var(--lantern-gold)',
        background: 'rgba(255,248,231,0.05)',
        borderRadius: '0 16px 16px 0',
        position: 'relative',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '12px',
          left: '16px',
          fontSize: '2rem',
          opacity: 0.15,
          fontFamily: 'var(--font-heading)',
          color: 'var(--lantern-gold)',
        }}
      >
        &ldquo;
      </span>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
          color: 'rgba(255,248,231,0.8)',
          lineHeight: 1.8,
          fontStyle: 'italic',
          marginBottom: '12px',
        }}
      >
        {quote}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--lantern-gold)',
          fontWeight: 600,
        }}
      >
        — {author}
        {role && (
          <span style={{ fontWeight: 400, color: 'rgba(255,248,231,0.5)', marginLeft: '6px' }}>
            {role}
          </span>
        )}
      </p>
    </div>
  );
}
