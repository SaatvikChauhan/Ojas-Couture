// src/pages/admin/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from './api';

function StatCard({ label, value, to, color = '#1a1a1a' }) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff', borderRadius: 10, padding: '20px 24px',
        border: '1px solid #e5e7eb', cursor: 'pointer',
        transition: 'box-shadow 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        <p style={{ margin: '0 0 6px', fontSize: 13, color: '#6b7280' }}>{label}</p>
        <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color }}>{value ?? '—'}</p>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const [products, cats, cols] = await Promise.all([
          api.getProducts({ limit: 1 }),
          api.getCategories(),
          api.getCollections(),
        ]);
        setStats({
          products: products.total,
          categories: cats.length,
          collections: cols.length,
        });
      } catch { }
    };
    load();
  }, []);

  return (
    <div>
      <h1 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700 }}>Dashboard</h1>
      <p style={{ margin: '0 0 28px', color: '#6b7280', fontSize: 14 }}>Welcome back. Here's a quick overview.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 36 }}>
        <StatCard label="Total Products" value={stats.products} to="/admin/products" />
        <StatCard label="Categories" value={stats.categories} to="/admin/categories" />
        <StatCard label="Collections" value={stats.collections} to="/admin/collections" />
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Quick Actions</h2>

      {/* Creation Section */}
      <p style={{ fontSize: 13, color: '#6b7280', margin: '10px 0 6px' }}>Creation</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        {[
          { label: '+ Add Product', to: '/admin/products' },
          { label: '+ Add Category', to: '/admin/categories' },
          { label: '+ Add Collection', to: '/admin/collections' },
        ].map(({ label, to }) => (
          <Link key={to} to={to} style={{
            padding: '10px 18px',
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            textDecoration: 'none',
            color: '#1a1a1a',
            fontSize: 14,
            fontWeight: 500,
          }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Administration Section */}
      <p style={{ fontSize: 13, color: '#6b7280', margin: '10px 0 6px' }}>Administration</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Edit Homepage', to: '/admin/homepage' },
          { label: 'Manage Orders', to: '/admin/orders' },
          { label: 'Manage Customers', to: '/admin/customers' },
        ].map(({ label, to }) => (
          <Link key={to} to={to} style={{
            padding: '10px 18px',
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            textDecoration: 'none',
            color: '#1a1a1a',
            fontSize: 14,
            fontWeight: 500,
          }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Separate Website Button */}
      <div>
        <Link to="/" style={{
          display: 'inline-block',
          padding: '10px 18px',
          background: '#1a1a1a',
          borderRadius: 8,
          textDecoration: 'none',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
        }}>
          Go to Website
        </Link>
      </div>
    </div>
  );
}