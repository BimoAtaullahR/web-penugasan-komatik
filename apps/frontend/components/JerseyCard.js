"use client";

import Image from 'next/image';
import Link from 'next/link';
import CategoryBadge from './CategoryBadge';
import { useFavoritesStore } from '@komatik/favorites-store';
import { useCallback } from 'react';

export default function JerseyCard({ jersey }) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(jersey.id));
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const toggleFavorite = useCallback((e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(jersey.id);
    } else {
      addFavorite(jersey.id);
    }
  }, [isFavorite, addFavorite, removeFavorite, jersey.id]);

  return (
    <div 
      className="glass-panel"
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-md)', 
        overflow: 'hidden',
        transition: 'var(--transition)',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
        e.currentTarget.style.borderColor = 'var(--primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', backgroundColor: 'var(--surface-hover)', padding: '2rem' }}>
        <Image
          src={jersey.image}
          alt={`${jersey.clubName} ${jersey.kitType} Kit`}
          fill
          style={{ objectFit: 'contain', padding: '10%' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {jersey.isNew && (
          <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
            <span style={{ backgroundColor: 'var(--primary)', color: '#000', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 800 }}>
              NEW
            </span>
          </div>
        )}
        <button
          onClick={toggleFavorite}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.25rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="flex flex-col flex-1" style={{ padding: '1.5rem' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <CategoryBadge text={jersey.league} type="league" />
          <CategoryBadge text={jersey.issueType} type="issue" />
        </div>
        
        <h3 className="heading-3" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{jersey.clubName}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          {jersey.season} • {jersey.kitType} Kit
        </p>
        
        <div className="flex items-center justify-between" style={{ marginTop: 'auto' }}>
          <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-main)' }}>
            Rp {jersey.price.toLocaleString('id-ID')}
          </div>
          <Link 
            href={`/jerseys/${jersey.id}`}
            style={{ 
              backgroundColor: 'var(--surface-hover)', 
              padding: '0.5rem 1rem', 
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.875rem',
              fontWeight: 600
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
              e.currentTarget.style.color = 'var(--text-main)';
            }}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
