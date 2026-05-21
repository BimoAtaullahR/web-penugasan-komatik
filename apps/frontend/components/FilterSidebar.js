"use client";

const FilterSection = ({ title, options, category, filters, onToggle }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <h4 className="heading-3" style={{ fontSize: '1rem', marginBottom: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>{title}</h4>
    <div className="flex flex-col gap-3">
      {options.map(opt => (
        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-muted)' }} className="hover:text-main">
          <input 
            type="checkbox" 
            checked={(filters[category] || []).includes(opt)}
            onChange={() => onToggle(category, opt)}
            style={{ 
              accentColor: 'var(--primary)', 
              width: '1.125rem', 
              height: '1.125rem',
              cursor: 'pointer'
            }}
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

export default function FilterSidebar({ filters, setFilters, options }) {
  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const { leagues, kitTypes, issueTypes, brands } = options;

  return (
    <aside style={{ width: '250px', flexShrink: 0, borderRadius: 'var(--radius-md)' }} className="glass-panel">
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 className="heading-3" style={{ fontSize: '1.25rem' }}>Filter</h3>
          <button 
            onClick={() => setFilters({ league: [], kitType: [], issueType: [], brand: [] })}
            style={{ color: 'var(--danger)', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.5rem', backgroundColor: 'rgba(255, 71, 87, 0.1)', borderRadius: 'var(--radius-sm)' }}
          >
            Reset
          </button>
        </div>
        
        <FilterSection title="Liga" options={leagues} category="league" filters={filters} onToggle={toggleFilter} />
        <FilterSection title="Tipe Kit" options={kitTypes} category="kitType" filters={filters} onToggle={toggleFilter} />
        <FilterSection title="Tipe Isu" options={issueTypes} category="issueType" filters={filters} onToggle={toggleFilter} />
        <FilterSection title="Apparel" options={brands} category="brand" filters={filters} onToggle={toggleFilter} />
      </div>
    </aside>
  );
}
