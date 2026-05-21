"use client";
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import JerseyCard from './JerseyCard';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import FilterSidebar from './FilterSidebar';
import { useQuery } from '@tanstack/react-query';
import { getJerseys } from '@komatik/api-client';
import useDebounce from '../hooks/useDebounce';

export default function JerseyGrid() {
  const searchParams = useSearchParams();
  const limit = 24;
  const offset = 0;

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

  // Debounce search query to reduce API calls while typing
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Build query params for the API — server-side filtering
  const queryParams = useMemo(() => {
    const params = { limit, offset };
    if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
    if (filters.league.length === 1) params.league = filters.league[0];
    if (filters.kitType.length === 1) params.kitType = filters.kitType[0];
    if (filters.issueType.length === 1) params.issueType = filters.issueType[0];
    if (filters.brand.length === 1) params.brand = filters.brand[0];
    return params;
  }, [debouncedSearch, filters, limit, offset]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['jerseys', queryParams],
    queryFn: () => getJerseys(queryParams)
  });
  const jerseyData = useMemo(() => data?.data ?? [], [data]);

  // Client-side multi-filter + sorting for cases where the API only supports single-value filters
  const filteredJerseys = useMemo(() => {
    let result = [...jerseyData];

    // Multi-value filters: apply client-side if more than one value selected
    // (API supports only single value per filter param)
    if (filters.league.length > 1) result = result.filter(j => filters.league.includes(j.league));
    if (filters.kitType.length > 1) result = result.filter(j => filters.kitType.includes(j.kitType));
    if (filters.issueType.length > 1) result = result.filter(j => filters.issueType.includes(j.issueType));
    if (filters.brand.length > 1) result = result.filter(j => filters.brand.includes(j.brand));

    // Sorting
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [jerseyData, filters, sortBy]);

  // Memoize unique filter options from server data
  const filterOptions = useMemo(() => ({
    leagues: [...new Set(jerseyData.map(j => j.league))],
    kitTypes: [...new Set(jerseyData.map(j => j.kitType))],
    issueTypes: [...new Set(jerseyData.map(j => j.issueType))],
    brands: [...new Set(jerseyData.map(j => j.brand))]
  }), [jerseyData]);

  // For filter options, we need a separate unfiltered query to populate sidebar
  const { data: allData } = useQuery({
    queryKey: ['jerseys', { limit: 100, offset: 0 }],
    queryFn: () => getJerseys({ limit: 100, offset: 0 }),
    staleTime: 60000 // cache for 60s
  });

  const allFilterOptions = useMemo(() => {
    const all = allData?.data ?? [];
    return {
      leagues: [...new Set(all.map(j => j.league))],
      kitTypes: [...new Set(all.map(j => j.kitType))],
      issueTypes: [...new Set(all.map(j => j.issueType))],
      brands: [...new Set(all.map(j => j.brand))]
    };
  }, [allData]);

  const activeOptions = allData ? allFilterOptions : filterOptions;

  return (
    <div className="flex gap-8" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <FilterSidebar filters={filters} setFilters={setFilters} options={activeOptions} />
      
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

        {isLoading ? (
          <div className="glass-panel flex flex-col items-center justify-center text-center" style={{ padding: '4rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p className="text-muted">Memuat katalog jersey...</p>
          </div>
        ) : isError ? (
          <div className="glass-panel flex flex-col items-center justify-center text-center" style={{ padding: '4rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
            <p className="text-muted">Gagal memuat katalog: {error?.message || 'Terjadi kesalahan'}</p>
          </div>
        ) : filteredJerseys.length === 0 ? (
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
