"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
      <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
        🔍
      </span>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari klub atau negara..."
        className="glass-panel"
        style={{
          width: '100%',
          padding: '0.75rem 1rem 0.75rem 2.5rem',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-main)',
          outline: 'none',
          transition: 'var(--transition)'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
      />
    </div>
  );
}
