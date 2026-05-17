export default function StarRating({ rating, count }) {
  const filled = Math.round(rating);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', gap: 1 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <svg key={i} width="12" height="12" viewBox="0 0 24 24"
            fill={i <= filled ? '#f59e0b' : 'none'}
            stroke="#f59e0b" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span style={{ fontSize: 11, color: 'var(--clr-muted)' }}>({count})</span>
    </div>
  );
}
