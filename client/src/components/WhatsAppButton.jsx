import React, { useState } from 'react';

const WHATSAPP_NUMBER = '919650656166';

export default function WhatsAppButton({
  message = 'Hello! I am interested in your collection.',
}) {
  const [showCoupon, setShowCoupon] = useState(false);
  // 1. Manage active currency state
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

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

  return (
    <>
      {/* LEFT COMPONENT ACTIONS */}
      <div className="float-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        
        {/* Functional Currency Dropdown Menu */}
        <div className="currency-box" style={{ padding: '2px 6px', display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#333',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none', // Strips browser default styles so it blends with your custom SVG arrow
              paddingRight: '18px',
              position: 'relative',
              zIndex: 2
            }}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="AED">AED</option>
          </select>
          {/* Your original layout chevron arrow icon overlaid neatly */}
          <svg width="12" height="12" viewBox="0 0 24 24" style={{ marginLeft: '-14px', pointerEvents: 'none', position: 'relative', zIndex: 1 }}>
            <path d="M7 10l5 5 5-5z" fill="#333" />
          </svg>
        </div>

        {/* Share */}
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
        {/* Gift */}
        <button className="icon-btn gold" onClick={() => setShowCoupon(true)}>
          <svg viewBox="0 0 24 24">
            <path
              fill="white"
              d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8h16zm0-2H4a2 2 0 01-2-2V7a2 2 0 012-2h3.17A3 3 0 0112 3a3 3 0 014.83 2H20a2 2 0 012 2v1a2 2 0 01-2 2zM12 5a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1z"
            />
          </svg>
        </button>

        {/* WhatsApp */}
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