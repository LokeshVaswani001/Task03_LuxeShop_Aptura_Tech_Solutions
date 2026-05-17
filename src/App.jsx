import { useState } from 'react';
import { ThemeProvider }              from './context/ThemeContext';
import { CartProvider }               from './context/CartContext';
import { useProducts, useFilteredProducts } from './hooks/useProducts';

import Header       from './components/Header';
import Hero         from './components/Hero';
import FilterBar    from './components/FilterBar';
import ProductGrid  from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer   from './components/CartDrawer';
import Footer       from './components/Footer';

function Shop() {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('all');
  const [sort,     setSort]     = useState('default');
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const { products, loading, error, categories } = useProducts();

  const filtered = useFilteredProducts(products, { search, category, sort });

  const toggleWishlist = id =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <>
      <Header
        search={search}
        onSearch={setSearch}
        onCartOpen={() => setCartOpen(true)}
      />

      <Hero />

      <FilterBar
        categories={categories}
        category={category}
        sort={sort}
        onCategory={setCategory}
        onSort={setSort}
      />

      <main style={{ padding: '32px 5vw 64px', maxWidth: 1280, margin: '0 auto' }}>
        <ProductGrid
          products={filtered}
          loading={loading}
          error={error}
          search={search}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onSelect={setSelected}
        />
      </main>

      <Footer />

      {selected  && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      {cartOpen  && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Shop />
      </CartProvider>
    </ThemeProvider>
  );
}
