import Link from 'next/link';

export default function HeroSection() {
  return (
    <section style={{ 
      position: 'relative', 
      padding: '6rem 0', 
      overflow: 'hidden',
      borderBottom: '1px solid var(--border)'
    }}>
      {/* Background glow effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(195,255,0,0.15) 0%, rgba(15,17,21,0) 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container flex flex-col items-center justify-center text-center gap-6">
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(195,255,0,0.1)', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
          ✨ Musim 2025/2026 Telah Tiba
        </div>
        
        <h1 className="heading-1" style={{ maxWidth: '800px' }}>
          Tingkatkan Permainanmu dengan <span className="text-primary-gradient">Jersey Kelas Dunia</span>
        </h1>
        
        <p className="text-muted" style={{ maxWidth: '600px', fontSize: '1.125rem', lineHeight: 1.6 }}>
          Koleksi terlengkap kit otentik dari klub elit Eropa. Mulai dari Player Issue berteknologi tinggi hingga Retro kit yang melegenda.
        </p>
        
        <div className="flex gap-4" style={{ marginTop: '2rem' }}>
          <Link href="/jerseys" style={{
            backgroundColor: 'var(--primary)',
            color: '#000',
            padding: '0.875rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: '1.125rem',
            boxShadow: 'var(--shadow-glow)'
          }}>
            Eksplor Koleksi
          </Link>
          <Link href="/categories" style={{
            backgroundColor: 'transparent',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            padding: '0.875rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            fontSize: '1.125rem'
          }} className="glass-panel">
            Lihat Kategori
          </Link>
        </div>
      </div>
    </section>
  );
}
