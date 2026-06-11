import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi'; // Imported FiShoppingBag
import AuthModal from "./AuthModal";

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Special Price', path: '/shop?filter=specialPrice' },
  { label: 'Best Seller', path: '/shop?filter=bestSeller' },
  { label: 'Little Wonders', path: '/little-wonders' },
];

// Added 'onCartOpen' and 'cartCount' as props
export default function Navbar({ onCartOpen, cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('?')[0]);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
            <img src="/logo.avif" alt="Ojas Couture Logo" className="logo-image" />
          </Link>

          {/* Desktop nav */}
          <nav className="navbar-nav-desktop">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions Container (Cart Icon + Mobile Menu Toggle) */}
          <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

            {/* Shopping Cart Button */}
            <button
              onClick={onCartOpen}
              className="cart-toggle-btn"
              aria-label="Open Cart"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '5px'
              }}
            >
              <FiShoppingBag size={24} className="text-gray-700 hover:text-black transition-colors" />

              {/* Cart Count Badge */}
              {cartCount > 0 && (
                <span
                  className="cart-badge"
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    backgroundColor: '#ef4444', // Red badge
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

            {/* Hamburger Mobile Menu Toggle */}
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            {user ? (
              <div className="user-menu">
                <span>Hi, {user.name.split(" ")[0]}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                  className="logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)} className="btn-outline-gold">
                Login
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Mobile menu — rendered outside header, as a true fullscreen overlay */}
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