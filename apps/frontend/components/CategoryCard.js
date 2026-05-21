"use client";
import Link from 'next/link';

export default function CategoryCard({ item, count, categoryKey }) {
  const queryParam = categoryKey ? `?${categoryKey}=${encodeURIComponent(item)}` : '';
  
  return (
    <Link 
      href={`/jerseys${queryParam}`}
      className="glass-panel flex items-center justify-between"
      style={{ 
        padding: '1.5rem', 
        borderRadius: 'var(--radius-md)',
        transition: 'var(--transition)',
        borderBottom: '3px solid transparent'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
        e.currentTarget.style.borderColor = 'var(--primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.backgroundColor = 'rgba(26, 29, 36, 0.7)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
      }}
    >
      <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{item}</span>
      <span style={{ backgroundColor: 'var(--surface)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', color: 'var(--primary)' }}>
        {count} item
      </span>
    </Link>
  );
}
