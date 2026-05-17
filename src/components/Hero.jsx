export default function Hero() {
  return (
    <div style={{
      background: 'var(--clr-accent2)',
      padding: '48px 5vw 40px',
      borderBottom: '1px solid var(--clr-border)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{
          fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em',
          color: 'var(--clr-accent)', marginBottom: 10, fontWeight: 600,
        }}>New Collection 2026</p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 900, color: 'var(--clr-text)',
          lineHeight: 1.1, marginBottom: 12,
        }}>
          Discover Curated<br />Luxury Products
        </h1>

        <p style={{ color: 'var(--clr-muted)', fontSize: 15, maxWidth: 480 }}>
          Hand-picked electronics, fashion &amp; jewellery — delivered to your door with care.
        </p>
      </div>
    </div>
  );
}
