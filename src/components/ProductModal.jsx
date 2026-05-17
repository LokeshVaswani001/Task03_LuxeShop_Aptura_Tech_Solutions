import { useState } from 'react';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Overlay */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />

      {/* Modal */}
      <div style={{
        position: 'relative', background: 'var(--clr-surface)',
        borderRadius: 20, padding: '36px', maxWidth: 720, width: '90%',
        maxHeight: '90vh', overflowY: 'auto',
        display: 'flex', gap: 32, flexWrap: 'wrap',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, background: 'none',
          border: 'none', cursor: 'pointer', color: 'var(--clr-muted)', fontSize: 24, lineHeight: 1,
        }}>×</button>

        {/* Image */}
        <div style={{
          width: 220, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#fff', borderRadius: 14, padding: 20, minHeight: 220,
        }}>
          <img src={product.image} alt={product.title}
            style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }} />
        </div>

        {/* Details */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <span style={{
            fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--clr-accent)', fontWeight: 600,
          }}>{product.category}</span>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700,
            margin: '8px 0 12px', color: 'var(--clr-text)', lineHeight: 1.3,
          }}>{product.title}</h2>

          <StarRating rating={product.rating.rate} count={product.rating.count} />

          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 28,
            fontWeight: 800, color: 'var(--clr-accent)', margin: '16px 0 12px',
          }}>${product.price.toFixed(2)}</p>

          <p style={{
            fontSize: 13, color: 'var(--clr-muted)',
            lineHeight: 1.7, marginBottom: 24,
          }}>{product.description}</p>

          {/* Qty + Add */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              border: '1px solid var(--clr-border)', borderRadius: 10, overflow: 'hidden',
            }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                width: 36, height: 40, background: 'none', border: 'none',
                cursor: 'pointer', color: 'var(--clr-text)', fontSize: 18,
              }}>−</button>
              <span style={{ width: 32, textAlign: 'center', fontSize: 15, color: 'var(--clr-text)' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{
                width: 36, height: 40, background: 'none', border: 'none',
                cursor: 'pointer', color: 'var(--clr-text)', fontSize: 18,
              }}>+</button>
            </div>

            <button onClick={handleAdd} style={{
              flex: 1, padding: '10px 20px', background: 'var(--clr-accent)',
              border: 'none', borderRadius: 10, color: '#fff',
              fontFamily: 'var(--font-display)', fontSize: 14,
              fontWeight: 700, cursor: 'pointer',
            }}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
