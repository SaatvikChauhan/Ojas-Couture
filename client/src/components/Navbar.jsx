import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag, FiSearch, FiHeart, FiUser, FiChevronDown, FiLogOut, FiPackage, FiSettings } from 'react-icons/fi';
import AuthModal from "./AuthModal";
// 1. IMPORT YOUR NEW ACCOUNT SIDEBAR COMPONENT HERE
import AccountDashboard from './account'; 

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Special Price', path: '/shop?filter=specialPrice' },
  { label: 'Best Seller', path: '/shop?filter=bestSeller' },
  { label: 'Little Wonders', path: '/little-wonders' },
];

export default function Navbar({ onCartOpen, cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // 2. STATE HOOK TO CONTROL SIDEBAR DRAWER OPEN/CLOSE
  const [accountSidebarOpen, setAccountSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || accountSidebarOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, accountSidebarOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('?')[0]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <header style={{
        width: '100%',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>

        {/* ROW 1: BRANDING, SEARCH & USER UTILITIES */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 40px', boxSizing: 'border-box', width: '100%' }}>

          {/* LEFT: LOGO */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src="/logo.avif" alt="Ojas Couture Logo" style={{ height: '45px', display: 'block' }} />
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

          {/* RIGHT: ICON ACTIONS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

            {/* WISHLIST ICON LINK (OPENS SIDEBAR DIRECTLY TO WISHLIST) */}
            <button 
              onClick={() => user ? setAccountSidebarOpen(true) : setShowAuth(true)}
              title="Wishlist" 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a5568', display: 'flex', alignItems: 'center', padding: '5px' }}
            >
              <FiHeart size={22} />
            </button>

            {/* CART */}
            <button
              onClick={onCartOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', padding: '5px', color: '#4a5568' }}
            >
              <FiShoppingBag size={22} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-2px', right: '-2px',
                  backgroundColor: '#dfba6b', color: 'white',
                  fontSize: '10px', fontWeight: 'bold', borderRadius: '50%',
                  width: '16px', height: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* ACCOUNT */}
            {user ? (
              <div ref={profileMenuRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{
                    background: 'none', border: 'none', color: '#4a5568', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '0.9rem', fontWeight: '500', padding: '5px'
                  }}
                >
                  <FiUser size={22} />
                  <span style={{ color: '#111' }}>Hi, {user.name.split(" ")[0]}</span>
                  <FiChevronDown size={14} style={{ transform: profileDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {profileDropdownOpen && (
                  <div style={{
                    position: 'absolute', top: '40px', right: '0',
                    backgroundColor: '#fff', border: '1px solid #e2e8f0',
                    borderRadius: '8px', width: '230px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 1100, overflow: 'hidden', padding: '12px 0'
                  }}>
                    {/* User summary */}
                    <div style={{ padding: '4px 18px 12px 18px', borderBottom: '1px solid #f1f5f9', textAlign: 'left' }}>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#111', fontSize: '0.95rem' }}>{user.name}</p>
                      <p style={{ margin: '2px 0 0', color: '#718096', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                    </div>

                    {/* 3. CONVERTED LINKS INTO BUTTON TRIGGERS TO OPEN THE SIDEBAR PANELS */}
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '6px 0' }}>
                      <button 
                        onClick={() => { setAccountSidebarOpen(true); setProfileDropdownOpen(false); }} 
                        style={dropdownLinkStyle}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <FiUser size={16} style={{ color: '#dfba6b' }} /> My Profile
                      </button>
                      <button 
                        onClick={() => { setAccountSidebarOpen(true); setProfileDropdownOpen(false); }} 
                        style={dropdownLinkStyle}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <FiPackage size={16} style={{ color: '#dfba6b' }} /> Orders History
                      </button>
                      <button 
                        onClick={() => { setAccountSidebarOpen(true); setProfileDropdownOpen(false); }} 
                        style={dropdownLinkStyle}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <FiHeart size={16} style={{ color: '#dfba6b' }} /> My Wishlist
                      </button>
                    </div>

                    {/* Logout */}
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                      <button
                        onClick={handleLogout}
                        style={{
                          width: '100%', background: 'none', border: 'none',
                          padding: '10px 18px', display: 'flex', alignItems: 'center',
                          gap: '10px', color: '#e53e3e', cursor: 'pointer',
                          fontSize: '0.85rem', fontWeight: '500', textAlign: 'left'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff5f5'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <FiLogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                style={{ background: 'none', border: 'none', color: '#4a5568', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <FiUser size={22} />
              </button>
            )}

            {/* HAMBURGER (MOBILE) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-toggle"
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* ROW 2: NAV LINKS */}
        <div style={{ width: '100%', backgroundColor: '#fafaf8', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
          <nav style={{ display: 'flex', gap: '40px' }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  color: isActive(link.path) ? '#dfba6b' : '#111',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  letterSpacing: '1.5px'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* MOBILE DRAWER */}
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

      {/* 4. RENDER THE SEPARATE ACCOUNT PROFILE SLIDER DRAWER CONTAINER */}
      {accountSidebarOpen && (
        <>
          <div 
            onClick={() => setAccountSidebarOpen(false)}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 14999
            }}
          />
          <AccountDashboard onClose={() => setAccountSidebarOpen(false)} />
        </>
      )}
    </>
  );
}

const dropdownLinkStyle = {
  display: 'flex', alignItems: 'center', gap: '12px',
  padding: '10px 18px', color: '#334155',
  textDecoration: 'none', fontSize: '0.85rem',
  fontWeight: '500', textAlign: 'left',
  transition: 'background-color 0.15s',
  background: 'none', border: 'none', width: '100%', cursor: 'pointer'
};