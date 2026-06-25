// src/pages/admin/Layout.jsx
import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: '⊞', end: true },
  // NEW: Added Orders link
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/products', label: 'Products', icon: '👗' },
  { to: '/admin/categories', label: 'Categories', icon: '🏷️' },
  { to: '/admin/collections', label: 'Collections', icon: '✨' },
  // NEW: Added Customers link
  { to: '/admin/customers', label: 'Customers', icon: '👥' },
  { to: '/admin/homepage', label: 'Homepage', icon: '🏠' },
];

export default function Layout({ user, onLogout, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: '#1a1a1a', color: '#fff',
        display: 'flex', flexDirection: 'column', flexShrink: 0,
        position: 'sticky', top: 0, height: '100vh',
      }}>
        {/* Brand */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: 15, letterSpacing: 2, color: '#fff' }}>OJAS COUTURE</p>
          <p style={{ margin: '3px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>ADMIN</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 20px', textDecoration: 'none', fontSize: 14,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid #fff' : '3px solid transparent',
                transition: 'all 0.15s',
              })}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            Signed in as<br />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{user?.name}</span>
          </p>
          <button
            onClick={onLogout}
            style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.6)', padding: '7px 14px', borderRadius: 6,
              cursor: 'pointer', fontSize: 13, width: '100%',
            }}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px 28px', minWidth: 0, overflowX: 'auto' }}>
        {children}
      </main>
    </div>
  );
}