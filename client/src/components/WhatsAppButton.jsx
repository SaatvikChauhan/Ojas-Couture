import React, { useState, useEffect, useRef } from 'react';

const WHATSAPP_NUMBER = '919650656166';

const currencyList = [
  { code: 'INR', name: 'Indian Rupee', flag: 'in' },
  { code: 'USD', name: 'United States Dollar', flag: 'us' },
  { code: 'EUR', name: 'Euro', flag: 'eu' },
  { code: 'GBP', name: 'British Pound', flag: 'gb' },
  { code: 'AED', name: 'UAE Dirham', flag: 'ae' },
  { code: 'CAD', name: 'Canadian Dollar', flag: 'ca' },
  { code: 'AUD', name: 'Australian Dollar', flag: 'au' },
  { code: 'SGD', name: 'Singapore Dollar', flag: 'sg' },
];

export default function WhatsAppButton({
  message = 'Hello! I am interested in your collection.',
}) {
  const [showCoupon, setShowCoupon] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currencyList[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Ojas Couture',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  const filteredCurrencies = currencyList.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* FIXED LEFT SIDE FLOATING WIDGET CONTAINER 
          This keeps currency and share buttons pinned to the screen side while scrolling.
      */}
      <div style={{
        position: 'fixed',
        bottom: '100px', // Raised up so it doesn't collide with lower system overlays
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 9999, // Floating on top of all banners and footer structures
        alignItems: 'flex-start'
      }}>
        
        {/* Searchable Flag & Currency Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          
          {/* Trigger Capsule */}
          <div
            onClick={() => { setIsOpen(!isOpen); setSearchTerm(''); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#fff',
              border: '1px solid #dfba6b',
              borderRadius: '25px',
              padding: '8px 14px',
              cursor: 'pointer',
              userSelect: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              height: '38px',
              boxSizing: 'border-box'
            }}
          >
            <img
              src={`https://flagcdn.com/w20/${selected.flag}.png`}
              alt={selected.name}
              style={{ width: '18px', height: 'auto', borderRadius: '2px', display: 'block' }}
            />
            <span style={{ color: '#111', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>
              {selected.code}
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M7 10l5 5 5-5z" fill="#333" />
            </svg>
          </div>

          {/* Selection Dropdown List Menu */}
          {isOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '46px', // Opens cleanly upwards so it stays visible above viewport bottom
                left: '0',
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                width: '240px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <input
                  type="text"
                  placeholder="Search country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    fontSize: '12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    color: '#333'
                  }}
                />
              </div>

              <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '4px 0' }}>
                {filteredCurrencies.map((item) => (
                  <div
                    key={item.code}
                    onClick={() => {
                      setSelected(item);
                      setIsOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      backgroundColor: selected.code === item.code ? '#f8fafc' : 'transparent'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = selected.code === item.code ? '#f8fafc' : 'transparent')}
                  >
                    <img
                      src={`https://flagcdn.com/w20/${item.flag}.png`}
                      alt={item.name}
                      style={{ width: '18px', height: 'auto', borderRadius: '2px' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.code}</span>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fixed Share Circular Action Trigger */}
        <button 
          onClick={handleShare}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#dfba6b', // Gold theme color
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="white"
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.5 2.5 0 000-1.39l7-4.11A2.5 2.5 0 0018 7.91a2.5 2.5 0 10-2.5-2.5c0 .23.03.45.08.66l-7 4.11a2.5 2.5 0 100 3.64l7.12 4.18c-.05.2-.08.41-.08.62a2.5 2.5 0 102.5-2.5z"
            />
          </svg>
        </button>
      </div>

      {/* RIGHT FIXED COMPONENT ACTIONS (Gift Box Coupon & WhatsApp Chat) */}
      <div style={{ position: 'fixed', bottom: '30px', right: '20px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 9999, alignItems: 'flex-end' }}>
        {/* Gift Trigger Button */}
        <button 
          onClick={() => setShowCoupon(true)}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#dfba6b',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="white"
              d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8h16zm0-2H4a2 2 0 01-2-2V7a2 2 0 012-2h3.17A3 3 0 0112 3a3 3 0 014.83 2H20a2 2 0 012 2v1a2 2 0 01-2 2zM12 5a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1z"
            />
          </svg>
        </button>

        {/* WhatsApp Float Button */}
        <a href={whatsappUrl} className="whatsapp-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Chat with us
        </a>
      </div>

      {/* Coupon Modal Display */}
      {showCoupon && (
        <div className="coupon-modal" onClick={() => setShowCoupon(false)}>
          <div className="coupon-box" onClick={(e) => e.stopPropagation()}>
            <h3>🎉 Discount Coupon</h3>
            <p>Use code <b>OJAS10</b> to get 10% OFF</p>
            <button onClick={() => setShowCoupon(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}