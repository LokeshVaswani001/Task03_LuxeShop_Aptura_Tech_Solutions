import StarRating from './StarRating';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, wishlist, onToggleWishlist, onSelect }) {
  const { addToCart } = useCart();
  const wished = wishlist.includes(product.id);

  return (
    <div
      className="product-card"
      onClick={() => onSelect(product)}
      style={{
        background: 'var(--clr-surface)',
        borderRadius: 16,
        border: '1px solid var(--clr-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative', height: 220, background: '#fff',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 16,
      }}>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          style={{ maxHeight: 180, maxWidth: '100%', objectFit: 'contain' }}
        />

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); onToggleWishlist(product.id); }}
          title={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--clr-surface)',
            border: '1px solid var(--clr-border)',
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: wished ? '#ef4444' : 'var(--clr-muted)',
            transition: 'color 0.15s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill={wished ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Category badge */}
        <span style={{
          position: 'absolute', top: 12, left: 12,
          fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em',
          background: 'var(--clr-accent)', color: '#fff',
          padding: '3px 10px', borderRadius: 100, fontWeight: 600,
        }}>
          {product.category.replace("'s clothing", '')}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3 style={{
          fontSize: 14, fontWeight: 500, color: 'var(--clr-text)',
          lineHeight: 1.4, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{product.title}</h3>

        <StarRating rating={product.rating.rate} count={product.rating.count} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 20,
            fontWeight: 700, color: 'var(--clr-accent)',
          }}>${product.price.toFixed(2)}</span>

          <button
            onClick={e => { e.stopPropagation(); addToCart(product); }}
            style={{
              padding: '8px 14px',
              background: 'var(--clr-accent2)',
              border: '1px solid var(--clr-accent)',
              borderRadius: 8, color: 'var(--clr-accent)',
              fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
            }}
          >+ Add</button>
        </div>
      </div>
    </div>
  );
}
