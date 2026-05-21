export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 0', marginTop: 'auto', backgroundColor: 'var(--surface)' }}>
      <div className="container flex flex-col items-center justify-center gap-4 text-muted">
        <h2 className="heading-3 text-primary-gradient">EuroKits</h2>
        <p style={{ textAlign: 'center', maxWidth: '400px' }}>
          Dashboard produk premium untuk jersey klub sepakbola Eropa. Mengoleksi kit terbaik dari berbagai liga dan musim.
        </p>
        <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} Komatik Frontend Assignment. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
