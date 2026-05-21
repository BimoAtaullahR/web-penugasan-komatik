import Link from "next/link";

export const metadata = {
  title: "Tentang Website | EuroKits",
};

export default function AboutPage() {
  return (
    <div className="container flex flex-col items-center justify-center" style={{ padding: '6rem 1.5rem 8rem 1.5rem', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ maxWidth: '800px', width: '100%', padding: '4rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
        <h1 className="heading-1" style={{ marginBottom: '1.5rem' }}>Tentang <span className="text-primary-gradient">EuroKits</span></h1>
        
        <div style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            EuroKits adalah *project* purwarupa (prototype) berupa dashboard e-commerce produk jersey klub bola Eropa.
            Project ini dibangun untuk memenuhi penugasan materi **Modern Frontend Framework (React & Next.js)** dari Komatik.
          </p>
          <p>
            Dibangun dengan fokus pada kecepatan dan *user experience* menggunakan fitur canggih dari **Next.js App Router**, memadukan kekuatan render di sisi server (SSR) untuk SEO & performa, dan kerangka interaktif *client-side* (CSR) melalui React *hooks*.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 700 }}>Tech Stack</h3>
            <ul style={{ color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✅ Next.js 15 (App Router)</li>
              <li>✅ React 19</li>
              <li>✅ Vanilla CSS (Design System)</li>
              <li>✅ SSR & CSR Hybrid</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 700 }}>Konsep Teraplikasi</h3>
            <ul style={{ color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>✅ Component-Based Architecture</li>
              <li>✅ State Management (useState)</li>
              <li>✅ Virtual DOM Re-rendering</li>
              <li>✅ Dynamic Routing & Layouts</li>
            </ul>
          </div>
        </div>

        <Link href="/jerseys" style={{
          display: 'inline-block',
          backgroundColor: 'var(--primary)',
          color: '#000',
          padding: '1rem 2.5rem',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 700,
          fontSize: '1.125rem'
        }}>
          Mulai Belanja
        </Link>
      </div>
    </div>
  );
}
