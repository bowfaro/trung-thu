export function SectionDivider() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '40px 0',
      }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: '120px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.3))',
        }}
      />
      <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>🏮</span>
      <div
        style={{
          flex: 1,
          maxWidth: '120px',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(245,166,35,0.3), transparent)',
        }}
      />
    </div>
  );
}
