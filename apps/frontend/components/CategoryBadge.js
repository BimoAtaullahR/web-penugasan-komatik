export default function CategoryBadge({ text, type = 'default' }) {
  const getColors = () => {
    switch (type) {
      case 'league':
        return { bg: 'rgba(255, 215, 0, 0.15)', color: 'var(--primary)', border: '1px solid rgba(255, 215, 0, 0.3)' };
      case 'issue':
        return { bg: 'rgba(46, 213, 115, 0.15)', color: 'var(--success)', border: '1px solid rgba(46, 213, 115, 0.3)' };
      case 'kit':
        return { bg: 'rgba(255, 71, 87, 0.15)', color: 'var(--danger)', border: '1px solid rgba(255, 71, 87, 0.3)' };
      default:
        return { bg: 'var(--surface-hover)', color: 'var(--text-main)', border: '1px solid var(--border)' };
    }
  };

  const colors = getColors();

  return (
    <span
      style={{
        backgroundColor: colors.bg,
        color: colors.color,
        border: colors.border,
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'inline-block',
      }}
    >
      {text}
    </span>
  );
}
