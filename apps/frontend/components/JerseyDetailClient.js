"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getJersey, getJerseys } from "@komatik/api-client";
import CategoryBadge from "./CategoryBadge";
import JerseyCard from "./JerseyCard";

export default function JerseyDetailClient({ id }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jersey", id],
    queryFn: () => getJersey(id)
  });

  const relatedQuery = useQuery({
    queryKey: ["jerseys", { limit: 24, offset: 0 }],
    queryFn: () => getJerseys({ limit: 24, offset: 0 })
  });

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem 8rem 1.5rem' }}>
        <div className="glass-panel flex flex-col items-center justify-center text-center" style={{ padding: '4rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p className="text-muted">Memuat detail jersey...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem 8rem 1.5rem' }}>
        <div className="glass-panel flex flex-col items-center justify-center text-center" style={{ padding: '4rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
          <p className="text-muted">Gagal memuat detail: {error?.message || 'Terjadi kesalahan'}</p>
        </div>
      </div>
    );
  }

  const jersey = data?.data;
  const relatedJerseys = (relatedQuery.data?.data || [])
    .filter(j => j.league === jersey.league && j.id !== jersey.id)
    .slice(0, 4);

  return (
    <div className="container" style={{ padding: '4rem 1.5rem 8rem 1.5rem' }}>
      <Link href="/jerseys" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', fontWeight: 600, transition: 'var(--transition)' }} className="hover:text-main">
        <span>&larr;</span> Kembali ke Katalog
      </Link>

      <div className="flex gap-8" style={{ flexWrap: 'wrap', marginBottom: '6rem' }}>
        <div className="glass-panel" style={{ flex: '1 1 400px', borderRadius: 'var(--radius-lg)', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-hover)' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
            <Image
              src={jersey.image}
              alt={`${jersey.clubName} ${jersey.kitType}`}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'col', gap: '1.5rem' }}>
          <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
            <CategoryBadge text={jersey.league} type="league" />
            <CategoryBadge text={jersey.kitType} type="kit" />
            <CategoryBadge text={jersey.issueType} type="issue" />
            {jersey.isNew && <span style={{ backgroundColor: 'var(--primary)', color: '#000', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 800 }}>NEW</span>}
          </div>

          <h1 className="heading-1">{jersey.clubName}</h1>
          <h2 className="heading-3 text-muted" style={{ fontWeight: 500, marginTop: '-1rem' }}>
            {jersey.season} • {jersey.brand}
          </h2>

          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', margin: '1rem 0' }}>
            Rp {jersey.price.toLocaleString('id-ID')}
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Deskripsi Produk</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{jersey.description}</p>
          </div>

          <div className="flex gap-4" style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <button style={{ flex: 1, backgroundColor: 'var(--primary)', color: '#000', padding: '1rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '1.125rem' }}>
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>

      {relatedJerseys.length > 0 && (
        <section>
          <h2 className="heading-2" style={{ marginBottom: '2rem' }}>Jersey <span style={{ color: 'var(--primary)' }}>Terkait</span></h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {relatedJerseys.map(j => (
              <JerseyCard key={j.id} jersey={j} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
