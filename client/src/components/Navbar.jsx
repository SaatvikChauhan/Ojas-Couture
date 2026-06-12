import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag, FiSearch, FiHeart, FiUser } from 'react-icons/fi';
import AuthModal from "./AuthModal";

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Special Price', path: '/shop?filter=specialPrice' },
  { label: 'Best Seller', path: '/shop?filter=bestSeller' },
  { label: 'Little Wonders', path: '/little-wonders' },
];

export default function Navbar({ onCartOpen, cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('?')[0]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        
        {/* TOP ROW: BRANDING, SEARCH & USER UTILITIES */}
        <div className="navbar-top container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 40px', boxSizing: 'border-box' }}>
          
          {/* LEFT: LOGO */}
          <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
            <img src="/logo.avif" alt="Ojas Couture Logo" className="logo-image" style={{ height: '45px', display: 'block' }} />
          </Link>

          {/* MIDDLE: SEARCH BAR */}
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '35%', maxWidth: '500px' }}>
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 40px 8px 15px',
                fontSize: '0.9rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                outline: 'none',
                color: '#333',
                backgroundColor: '#fff'
              }}
            />
            <button type="submit" style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#718096' }}>
              <FiSearch size={18} />
            </button>
          </form>

          {/* RIGHT: ICON ACTIONS CONTAINER */}
          <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            {/* WISHLIST BUTTON */}
            <Link to="/wishlist" title="Wishlist" style={{ color: '#4a5568', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} className="hover:text-black">
              <FiHeart size={22} />
            </Link>

            {/* SHOPPING CART BUTTON */}
            <button
              onClick={onCartOpen}
              className="cart-toggle-btn"
              aria-label="Open Cart"
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', padding: '5px', color: '#4a5568' }}
            >
              <FiShoppingBag size={22} className="hover:text-black transition-colors" />
              {cartCount > 0 && (
                <span
                  className="cart-badge"
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    backgroundColor: '#dfba6b', 
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* AUTH / PROFILE ACCOUNT HOOK */}
            {user ? (
              <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                <Link to="/account" style={{ display: 'flex', alignItems: 'center', color: '#4a5568', gap: '4px', textDecoration: 'none' }}>
                  <FiUser size={22} />
                  <span style={{ fontWeight: '500' }}>{user.name.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                  className="logout-btn"
                  style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuth(true)} 
                style={{ background: 'none', border: 'none', color: '#4a5568', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Login / Register"
              >
                <FiUser size={22} className="hover:text-black transition-colors" />
              </button>
            )}

            {/* HAMBURGER MOBILE MENU TOGGLE */}
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

        </div>

        {/* BOTTOM ROW: NAVIGATION TABS WITH SOLID BACKGROUND (NO IMAGE SHOWTHROUGH) */}
        <div className="navbar-bottom" style={{ width: '100%', backgroundColor: '#fafaf8', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
          <nav style={{ display: 'flex', gap: '40px' }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                style={{
                  textDecoration: 'none',
                  color: isActive(link.path) ? '#dfba6b' : '#111',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  letterSpacing: '1.5px',
                  transition: 'color 0.2s ease'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* MOBILE SCREEN FULLSCREEN OVERLAY */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <nav className="mobile-menu-nav" onClick={e => e.stopPropagation()}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}