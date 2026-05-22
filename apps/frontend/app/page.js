import HeroSection from "../components/HeroSection";
import LeagueShowcase from "../components/LeagueShowcase";
import JerseyCard from "../components/JerseyCard";
import Link from 'next/link';

const resolveApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return "http://localhost:4000";
};

const fetchCatalog = async () => {
  const response = await fetch(
    `${resolveApiUrl()}/api/v1/jerseys?limit=200&offset=0`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return { data: [], meta: { total: 0 } };
  }

  return response.json();
};

// Component ini berjalan di SERVER (SSR). Tidak ada "use client".
// Data diambil dari API dan di-render langsung menjadi HTML sebelum dikirim ke browser.
export default async function Home() {
  const { data: jerseys, meta } = await fetchCatalog();
  const leagues = [...new Set(jerseys.map(j => j.league))];
  
  // Ambil beberapa jersey unggulan (yang isNew === true)
  const featuredJerseys = jerseys.filter(j => j.isNew).slice(0, 4);
  
  // Statistik ringkas
  const totalClubs = new Set(jerseys.map(j => j.clubName)).size;
  const totalJerseys = meta?.total ?? jerseys.length;
  
  return (
    <>
      <HeroSection />
      
      {/* Quick Stats Section */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '2rem 0' }}>
        <div className="container flex justify-center gap-8" style={{ flexWrap: 'wrap' }}>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{totalJerseys}+</div>
            <div className="text-muted" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Koleksi Jersey</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{totalClubs}</div>
            <div className="text-muted" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Klub Elit</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{leagues.length}</div>
            <div className="text-muted" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Liga Top Eropa</div>
          </div>
        </div>
      </section>

      <LeagueShowcase leagues={leagues} />
      
      {/* Featured Jerseys */}
      <section className="container" style={{ padding: '2rem 1.5rem 6rem 1.5rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '3rem' }}>
          <div>
            <h2 className="heading-2">Rilis <span style={{ color: 'var(--primary)' }}>Terbaru</span></h2>
            <p className="text-muted">Koleksi jersey musim terbaru yang baru mendarat.</p>
          </div>
          <Link href="/jerseys" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Lihat Semua &rarr;
          </Link>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {featuredJerseys.map(jersey => (
            <JerseyCard key={jersey.id} jersey={jersey} />
          ))}
        </div>
      </section>
    </>
  );
}
