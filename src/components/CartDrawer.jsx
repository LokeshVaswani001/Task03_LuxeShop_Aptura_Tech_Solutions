import { useCart } from '../context/CartContext';

export default function CartDrawer({ onClose }) {
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Overlay */}
      <div onClick={onClose} style={{ flex: 1, background: 'rgba(0,0,0,0.45)' }} />

      {/* Drawer */}
      <div style={{
        width: 380, background: 'var(--clr-surface)',
        height: '100%', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid var(--clr-border)',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 24px 16px',
          borderBottom: '1px solid var(--clr-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--clr-text)' }}>
            Your Cart
          </span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--clr-muted)', fontSize: 24, lineHeight: 1,
          }}>×</button>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--clr-muted)', gap: 12,
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p style={{ fontSize: 14 }}>Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: 12, padding: '12px 0',
                  borderBottom: '1px solid var(--clr-border)',
                }}>
                  <img src={item.image} alt={item.title} style={{
                    width: 56, height: 56, objectFit: 'contain',
                    borderRadius: 8, background: '#fff',
                  }} />
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: 13, color: 'var(--clr-text)', margin: '0 0 4px',
                      lineHeight: 1.3, display: '-webkit-box',
                      WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{item.title}</p>
                    <p style={{ fontSize: 13, color: 'var(--clr-accent)', fontWeight: 700, margin: '0 0 8px' }}>
                      ${item.price.toFixed(2)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{
                        width: 24, height: 24, border: '1px solid var(--clr-border)',
                        borderRadius: 6, background: 'none', cursor: 'pointer',
                        color: 'var(--clr-text)', fontSize: 14,
                      }}>−</button>
                      <span style={{ fontSize: 13, minWidth: 20, textAlign: 'center', color: 'var(--clr-text)' }}>
                        {item.qty}
                      </span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{
                        width: 24, height: 24, border: '1px solid var(--clr-border)',
                        borderRadius: 6, background: 'none', cursor: 'pointer',
                        color: 'var(--clr-text)', fontSize: 14,
                      }}>+</button>
                      <button onClick={() => removeFromCart(item.id)} style={{
                        marginLeft: 'auto', background: 'none', border: 'none',
                        cursor: 'pointer', color: '#ef4444', fontSize: 12, fontFamily: 'var(--font-body)',
                      }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding: 24, borderTop: '1px solid var(--clr-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ color: 'var(--clr-muted)', fontSize: 14 }}>Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--clr-text)' }}>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button style={{
                width: '100%', padding: '14px 0',
                background: 'var(--clr-accent)', border: 'none',
                borderRadius: 10, color: '#fff',
                fontFamily: 'var(--font-display)', fontSize: 15,
                fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em',
              }}>Checkout →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
