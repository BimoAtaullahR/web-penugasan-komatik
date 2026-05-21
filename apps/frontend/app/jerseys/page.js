import JerseyGrid from "../../components/JerseyGrid";
import { Suspense } from "react";

export const metadata = {
  title: "Koleksi Jersey | EuroKits",
  description: "Eksplorasi koleksi lengkap jersey klub bola Eropa premium. Temukan jersey favoritmu dengan fitur pencarian dan filter pintar.",
};

export default function JerseysPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem 8rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="heading-1">Koleksi <span className="text-primary-gradient">Lengkap</span></h1>
        <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '1.125rem', maxWidth: '600px' }}>
          Jelajahi ratusan jersey otentik dari seluruh daratan Eropa. Gunakan fitur filter untuk menemukan spesifikasi yang paling tepat untukmu.
        </p>
      </div>

      {/* 
        Data jersey di-fetch / di-import dari server (Server Component),
        kemudian di-pass ke Client Component (JerseyGrid) melalui props.
        Ini adalah demonstrasi Hybrid SSR + CSR di Next.js App Router.
      */}
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Memuat katalog...</div>}>
        <JerseyGrid />
      </Suspense>
    </div>
  );
}
