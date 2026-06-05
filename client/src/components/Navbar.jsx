import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Special Price', path: '/shop?filter=specialPrice' },
  { label: 'Best Seller', path: '/shop?filter=bestSeller' },
  { label: 'Little Wonders', path: '/little-wonders' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
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
        <div className="navbar-inner container">
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

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
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
    </>
  );
}