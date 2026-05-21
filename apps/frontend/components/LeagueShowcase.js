"use client";

import Link from 'next/link';

export default function LeagueShowcase({ leagues }) {
  return (
    <section className="container" style={{ padding: '4rem 1.5rem' }}>
      <div className="flex flex-col items-center text-center gap-2" style={{ marginBottom: '3rem' }}>
        <h2 className="heading-2">Jelajahi Berdasarkan <span style={{ color: 'var(--primary)' }}>Liga</span></h2>
        <p className="text-muted">Temukan jersey dari liga-liga top Eropa</p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {leagues.map((league) => (
          <Link 
            key={league} 
            href={`/jerseys?league=${encodeURIComponent(league)}`}
            className="glass-panel"
            style={{
              padding: '2rem 1rem',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '1.125rem',
              color: 'var(--text-main)',
              transition: 'var(--transition)',
              borderBottom: '3px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderBottomColor = 'var(--primary)';
              e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderBottomColor = 'transparent';
              e.currentTarget.style.backgroundColor = 'rgba(26, 29, 36, 0.7)';
            }}
          >
            {league}
          </Link>
        ))}
      </div>
    </section>
  );
}
