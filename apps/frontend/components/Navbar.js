import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border)' }}>
      <div className="container flex items-center justify-between" style={{ height: '70px' }}>
        <Link href="/" className="flex items-center gap-2">
          <span className="heading-3 text-primary-gradient">EuroKits</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" style={{ color: 'var(--text-muted)' }} className="hover:text-main">
                Home
              </Link>
            </li>
            <li>
              <Link href="/jerseys" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                Jerseys
              </Link>
            </li>
            <li>
              <Link href="/categories" style={{ color: 'var(--text-muted)' }} className="hover:text-main">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" style={{ color: 'var(--text-muted)' }} className="hover:text-main">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
