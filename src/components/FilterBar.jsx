const SORT_OPTIONS = [
  { value: 'default',     label: 'Featured' },
  { value: 'price-asc',   label: 'Price: Low → High' },
  { value: 'price-desc',  label: 'Price: High → Low' },
  { value: 'rating-desc', label: 'Top Rated' },
  { value: 'name-asc',    label: 'Name A–Z' },
];

const LABEL = {
  all:               'All Products',
  electronics:       'Electronics',
  jewelery:          'Jewellery',
  "men's clothing":  "Men's Clothing",
  "women's clothing":"Women's Clothing",
};

export default function FilterBar({ categories, category, sort, onCategory, onSort }) {
  return (
    <div style={{
      background: 'var(--clr-surface)',
      borderBottom: '1px solid var(--clr-border)',
      padding: '16px 5vw 0',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: 12,
      }}>
        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 16 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategory(cat)}
              style={{
                padding: '8px 18px', borderRadius: 100, fontSize: 13,
                fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)',
                border: category === cat
                  ? '2px solid var(--clr-accent)'
                  : '1px solid var(--clr-border)',
                background: category === cat ? 'var(--clr-accent2)' : 'transparent',
                color: category === cat ? 'var(--clr-accent)' : 'var(--clr-muted)',
                transition: 'all 0.15s',
              }}
            >{LABEL[cat] || cat}</button>
          ))}
        </div>

        {/* Sort select */}
        <div style={{ paddingBottom: 16 }}>
          <select
            value={sort}
            onChange={e => onSort(e.target.value)}
            style={{
              padding: '9px 36px 9px 14px', borderRadius: 10,
              border: '1px solid var(--clr-border)',
              background: 'var(--clr-surface2)', color: 'var(--clr-text)',
              fontSize: 13, fontFamily: 'var(--font-body)', cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
