import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { value: '', label: 'All Products' },
  { value: 'kurti-set', label: 'Kurti Sets' },
  { value: 'kurta-set', label: 'Kurta Sets' },
  { value: 'dress-material', label: 'Dress Material' },
  { value: 'saree', label: 'Sarees' },
];

const FALLBACK = [
  { _id: '1', name: 'Black Embroidered Kurti Set', price: 1699, badge: 'NEW', images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'] },
  { _id: '2', name: 'Beige Chikankari Kurta Set', price: 4500, badge: 'HANDMADE', images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'] },
  { _id: '3', name: 'Royal Blue Banarasi Saree', price: 8500, badge: 'BEST SELLER', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'] },
  { _id: '4', name: 'Purple Applique Dress Material', price: 1950, badge: 'HANDMADE', images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'] },
  { _id: '5', name: 'Pink Bandhani Kurti Set', price: 2200, badge: 'HANDMADE', images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'] },
  { _id: '6', name: 'Teal Block Print Anarkali', price: 5500, originalPrice: 6500, badge: 'SALE', images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'] },
];

export default function Shop() {
  const location = useLocation();
  const { category: catParam } = useParams();
  const params = new URLSearchParams(location.search);
  const filterParam = params.get('filter');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(catParam || '');
  const [sortBy, setSortBy] = useState('default');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const query = { limit: 20 };
    if (activeCategory) query.category = activeCategory;
    if (filterParam === 'bestSeller') query.bestSeller = 'true';
    if (filterParam === 'specialPrice') query.specialPrice = 'true';

    setLoading(true);
    productAPI.getAll({littleWonders: 'false', limit: 20})
      .then(res => {
        let prods = res.data.products || [];
        if (!prods.length) prods = FALLBACK;
        setProducts(prods);
        setTotal(res.data.total || prods.length);
      })
      .catch(() => { setProducts(FALLBACK); setTotal(FALLBACK.length); })
      .finally(() => setLoading(false));
  }, [activeCategory, filterParam]);

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const pageTitle = filterParam === 'bestSeller' ? 'Best Sellers'
    : filterParam === 'specialPrice' ? 'Special Price'
    : activeCategory ? CATEGORIES.find(c => c.value === activeCategory)?.label || 'Shop'
    : 'Shop All';

  return (
    <div className="shop-page" style={{ paddingTop: 72 }}>
      <div className="page-header">
        <h1>{pageTitle}</h1>
        <p className="breadcrumb">Home · <span>{pageTitle}</span></p>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        <div className="shop-toolbar">
          <div className="category-filters">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                className={`filter-btn ${activeCategory === c.value ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="shop-sort">
            <label>Sort by:</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        <p className="shop-count">{total} products found</p>

        {loading ? (
          <div className="spinner"><div className="spinner-ring" /></div>
        ) : (
          <div className="products-grid">
            {sorted.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
