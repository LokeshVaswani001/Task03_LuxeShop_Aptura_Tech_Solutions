export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--clr-border)',
      padding: '24px 5vw',
      textAlign: 'center',
      color: 'var(--clr-muted)',
      fontSize: 13,
    }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--clr-accent)' }}>LUXE</span>
      shop — Powered by Fake Store API · {new Date().getFullYear()}
    </footer>
  );
}
