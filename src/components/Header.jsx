import { useTheme } from '../context/ThemeContext';
import { useCart }  from '../context/CartContext';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>  <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/> <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>   <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/> <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

export default function Header({ search, onSearch, onCartOpen }) {
  const { dark, toggle } = useTheme();
  const { cartCount }    = useCart();

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--clr-surface)',
      borderBottom: '1px solid var(--clr-border)',
      padding: '0 5vw',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', height: 68,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 24,
      }}>
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: 'var(--clr-accent)' }}>LUXE</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, color: 'var(--clr-text)' }}>shop</span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 480, position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-muted)' }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search products…"
            style={{
              width: '100%', padding: '10px 16px 10px 40px',
              background: 'var(--clr-surface2)', border: '1px solid var(--clr-border)',
              borderRadius: 10, fontSize: 14, color: 'var(--clr-text)',
              fontFamily: 'var(--font-body)',
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={toggle} title="Toggle theme" style={{
            width: 40, height: 40, borderRadius: 10,
            border: '1px solid var(--clr-border)', background: 'var(--clr-surface2)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--clr-text)',
          }}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button onClick={onCartOpen} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 18px', background: 'var(--clr-accent)',
            border: 'none', borderRadius: 10, color: '#fff',
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            fontSize: 14, fontWeight: 600,
          }}>
            <CartIcon />
            {cartCount > 0 && (
              <span style={{
                background: '#fff', color: 'var(--clr-accent)',
                borderRadius: 20, padding: '1px 7px', fontSize: 12, fontWeight: 700,
              }}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
