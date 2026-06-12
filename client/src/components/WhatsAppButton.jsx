import React, { useState, useEffect, useRef } from 'react';

const WHATSAPP_NUMBER = '919650656166';

// A representative list of major world currencies with country codes for flags
const currencyList = [
  { code: 'INR', name: 'Indian Rupee', flag: 'in' },
  { code: 'USD', name: 'United States Dollar', flag: 'us' },
  { code: 'EUR', name: 'Euro', flag: 'eu' },
  { code: 'GBP', name: 'British Pound', flag: 'gb' },
  { code: 'AED', name: 'UAE Dirham', flag: 'ae' },
  { code: 'CAD', name: 'Canadian Dollar', flag: 'ca' },
  { code: 'AUD', name: 'Australian Dollar', flag: 'au' },
  { code: 'SGD', name: 'Singapore Dollar', flag: 'sg' },
  { code: 'JPY', name: 'Japanese Yen', flag: 'jp' },
  { code: 'CNY', name: 'Chinese Yuan', flag: 'cn' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: 'nz' },
  { code: 'ZAR', name: 'South African Rand', flag: 'za' },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: 'my' },
  { code: 'THB', name: 'Thai Baht', flag: 'th' },
  { code: 'PHP', name: 'Philippine Peso', flag: 'ph' },
  { code: 'IDR', name: 'Indonesian Rupiah', flag: 'id' },
  { code: 'SAR', name: 'Saudi Riyal', flag: 'sa' },
  { code: 'QAR', name: 'Qatari Rial', flag: 'qa' },
  { code: 'KWD', name: 'Kuwaiti Dinar', flag: 'kw' },
  { code: 'BHD', name: 'Bahraini Dinar', flag: 'bh' },
  { code: 'OMR', name: 'Omani Rial', flag: 'om' },
  { code: 'CHF', name: 'Swiss Franc', flag: 'ch' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: 'hk' },
  { code: 'LKR', name: 'Sri Lankan Rupee', flag: 'lk' },
  { code: 'NPR', name: 'Nepalese Rupee', flag: 'np' },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: 'bd' },
];

export default function WhatsAppButton({
  message = 'Hello! I am interested in your collection.',
}) {
  const [showCoupon, setShowCoupon] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currencyList[0]); // Default to INR
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  // Close dropdown if clicked outside
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
        title: 'Check this out!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  // Filter list based on search input
  const filteredCurrencies = currencyList.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* LEFT COMPONENT ACTIONS */}
      <div className="float-left" style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
        
        {/* Custom Searchable Flag & Currency Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          
          {/* Trigger Box */}
          <div
            onClick={() => { setIsOpen(!isOpen); setSearchTerm(''); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '25px',
              padding: '6px 14px',
              cursor: 'pointer',
              userSelect: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              height: '34px',
              boxSizing: 'border-box'
            }}
          >
            <img
              src={`https://flagcdn.com/w20/${selected.flag}.png`}
              alt={selected.name}
              style={{ width: '18px', height: 'auto', borderRadius: '2px', display: 'block' }}
            />
            <span style={{ color: '#333', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>
              {selected.code}
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M7 10l5 5 5-5z" fill="#666" />
            </svg>
          </div>

          {/* Expanded Searchable Panel */}
          {isOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '42px', // Opens upwards cleanly above the float bar
                left: '0',
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                width: '240px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                zIndex: 9999,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Search Field */}
              <div style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <input
                  type="text"
                  placeholder="Search country or currency..."
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

              {/* Options List */}
              <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '4px 0' }}>
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((item) => (
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
                        transition: 'background-color 0.2s',
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
                  ))
                ) : (
                  <div style={{ padding: '12px', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Share Button */}
        <button className="icon-btn gold" onClick={handleShare}>
          <svg viewBox="0 0 24 24">
            <path
              fill="white"
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.5 2.5 0 000-1.39l7-4.11A2.5 2.5 0 0018 7.91a2.5 2.5 0 10-2.5-2.5c0 .23.03.45.08.66l-7 4.11a2.5 2.5 0 100 3.64l7.12 4.18c-.05.2-.08.41-.08.62a2.5 2.5 0 102.5-2.5z"
            />
          </svg>
        </button>
      </div>

      {/* RIGHT COMPONENT ACTIONS */}
      <div className="float-right">
        {/* Gift Button */}
        <button className="icon-btn gold" onClick={() => setShowCoupon(true)}>
          <svg viewBox="0 0 24 24">
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

      {/* Coupon Modal */}
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