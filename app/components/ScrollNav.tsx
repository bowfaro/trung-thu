'use client';

import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'cover', label: 'Bìa' },
  { id: 'riddle', label: 'Ô chữ' },
  { id: 'comparison', label: 'So sánh' },
  { id: 'evolution', label: 'Kể chuyện' },
  { id: 'game', label: 'Trò chơi' },
];

export function ScrollNav() {
  const [activeSection, setActiveSection] = useState('cover');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="scroll-nav"
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 100,
        padding: '16px 12px',
        borderRadius: '30px',
        background: 'rgba(26, 14, 46, 0.5)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(245, 166, 35, 0.15)',
      }}
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={label}
          aria-label={`Đến phần ${label}`}
          style={{
            position: 'relative',
            width: activeSection === id ? '28px' : '10px',
            height: '10px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background:
              activeSection === id
                ? 'linear-gradient(135deg, #F5A623, #FF8C42)'
                : id === activeSection
                ? 'rgba(245, 166, 35, 0.5)'
                : 'rgba(255, 248, 231, 0.25)',
            boxShadow:
              activeSection === id
                ? '0 0 10px rgba(245, 166, 35, 0.5)'
                : 'none',
          }}
        />
      ))}
    </nav>
  );
}
