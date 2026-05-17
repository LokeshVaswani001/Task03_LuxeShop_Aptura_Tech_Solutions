import ProductCard from './ProductCard';

const SkeletonCard = () => (
  <div style={{
    background: 'var(--clr-surface)', borderRadius: 16,
    border: '1px solid var(--clr-border)', overflow: 'hidden',
    animation: 'pulse 1.4s ease-in-out infinite',
  }}>
    <div style={{ height: 220, background: 'var(--clr-surface2)' }} />
    <div style={{ padding: 16 }}>
      <div style={{ height: 14, background: 'var(--clr-surface2)', borderRadius: 6, marginBottom: 8 }} />
      <div style={{ height: 14, background: 'var(--clr-surface2)', borderRadius: 6, width: '60%', marginBottom: 16 }} />
      <div style={{ height: 20, background: 'var(--clr-surface2)', borderRadius: 6, width: '40%' }} />
    </div>
  </div>
);

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: 20,
};

export default function ProductGrid({ products, loading, error, search, wishlist, onToggleWishlist, onSelect }) {
  if (error) return (
    <div style={{ textAlign: 'center', padding: 80, color: 'var(--clr-muted)' }}>
      <p style={{ fontSize: 18, marginBottom: 8 }}>⚠️ {error}</p>
      <p style={{ fontSize: 14 }}>Please check your internet and refresh the page.</p>
    </div>
  );

  if (loading) return (
    <div style={gridStyle}>
      {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );

  if (products.length === 0) return (
    <div style={{ textAlign: 'center', padding: 80, color: 'var(--clr-muted)' }}>
      <p style={{ fontSize: 18, marginBottom: 8 }}>No results for "{search}"</p>
      <p style={{ fontSize: 14 }}>Try a different keyword or category.</p>
    </div>
  );

  return (
    <>
      <p style={{ fontSize: 13, color: 'var(--clr-muted)', marginBottom: 20 }}>
        {products.length} product{products.length !== 1 ? 's' : ''}
      </p>
      <div style={gridStyle}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            wishlist={wishlist}
            onToggleWishlist={onToggleWishlist}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  );
}
