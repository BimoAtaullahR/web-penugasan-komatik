"use client";
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import JerseyCard from './JerseyCard';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import FilterSidebar from './FilterSidebar';

export default function JerseyGrid({ initialJerseys }) {
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  // Initialize filters from query parameters if present
  const [filters, setFilters] = useState(() => {
    const leagueParam = searchParams.get('league');
    const kitTypeParam = searchParams.get('kitType');
    const issueTypeParam = searchParams.get('issueType');
    const brandParam = searchParams.get('brand');
    
    return {
      league: leagueParam ? [leagueParam] : [],
      kitType: kitTypeParam ? [kitTypeParam] : [],
      issueType: issueTypeParam ? [issueTypeParam] : [],
      brand: brandParam ? [brandParam] : []
    };
  });

  // Derived state (Virtual DOM re-rendering optimization demonstration)
  // useMemo memastikan array hanya dihitung ulang jika dependency berubah.
  const filteredJerseys = useMemo(() => {
    let result = [...initialJerseys];

    // 1. Search Filter (Text Input)
    if (searchQuery.trim() !== '') {
      result = result.filter(j => 
        j.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Sidebar Filters (Checkboxes)
    if (filters.league.length > 0) result = result.filter(j => filters.league.includes(j.league));
    if (filters.kitType.length > 0) result = result.filter(j => filters.kitType.includes(j.kitType));
    if (filters.issueType.length > 0) result = result.filter(j => filters.issueType.includes(j.issueType));
    if (filters.brand.length > 0) result = result.filter(j => filters.brand.includes(j.brand));

    // 3. Sorting
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [initialJerseys, searchQuery, filters, sortBy]);

  return (
    <div className="flex gap-8" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <FilterSidebar filters={filters} setFilters={setFilters} />
      
      <div className="flex-1 flex flex-col gap-6" style={{ minWidth: '300px' }}>
        <div className="flex items-center justify-between gap-4" style={{ flexWrap: 'wrap' }}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="flex items-center gap-4">
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Menampilkan <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{filteredJerseys.length}</span> produk
            </span>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {filteredJerseys.length === 0 ? (
          <div className="glass-panel flex flex-col items-center justify-center text-center" style={{ padding: '4rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕵️</div>
            <h3 className="heading-3" style={{ marginBottom: '0.5rem' }}>Jersey tidak ditemukan</h3>
            <p className="text-muted">Coba ubah kata kunci pencarian atau sesuaikan filter Anda.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilters({ league: [], kitType: [], issueType: [], brand: [] });
              }}
              style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: 600 }}
            >
              Hapus semua filter
            </button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {filteredJerseys.map(jersey => (
              <JerseyCard key={jersey.id} jersey={jersey} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
