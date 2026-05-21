import { getAllLeagues, getAllKitTypes, getAllIssueTypes, jerseys } from "../../data/jerseys";
import CategoryCard from "../../components/CategoryCard";

export const metadata = {
  title: "Kategori Jersey | EuroKits",
  description: "Eksplorasi kategori jersey berdasarkan liga, tipe kit, dan isu rilis.",
};

export default function CategoriesPage() {
  const leagues = getAllLeagues();
  const kitTypes = getAllKitTypes();
  const issueTypes = getAllIssueTypes();

  // Helper untuk menghitung jumlah item per kategori
  const countByCategory = (key, value) => {
    return jerseys.filter(j => j[key] === value).length;
  };

  const CategorySection = ({ title, items, categoryKey }) => (
    <section style={{ marginBottom: '4rem' }}>
      <h2 className="heading-2" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {items.map(item => (
          <CategoryCard key={item} item={item} count={countByCategory(categoryKey, item)} categoryKey={categoryKey} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="container" style={{ padding: '4rem 1.5rem 8rem 1.5rem' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 className="heading-1">Jelajahi <span className="text-primary-gradient">Kategori</span></h1>
        <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.125rem' }}>
          Temukan koleksi berdasarkan klasifikasi yang spesifik.
        </p>
      </div>

      <CategorySection title="Berdasarkan Liga" items={leagues} categoryKey="league" />
      <CategorySection title="Berdasarkan Tipe Seragam" items={kitTypes} categoryKey="kitType" />
      <CategorySection title="Berdasarkan Kualitas (Issue)" items={issueTypes} categoryKey="issueType" />
    </div>
  );
}
