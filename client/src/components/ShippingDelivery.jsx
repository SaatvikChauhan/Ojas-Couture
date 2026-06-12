import React, { useState, useEffect } from 'react';

const ShippingDelivery = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Listen to scroll to show/hide the back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div style={{ width: '100%', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#000', backgroundColor: '#fff', padding: '60px 20px', boxSizing: 'border-box' }}>
      
      {/* PAGE CONTAINER */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* MAIN HEADLINE */}
        <h1 style={{ fontSize: '1.6rem', fontWeight: '600', letterSpacing: '1.5px', marginBottom: '40px', textTransform: 'uppercase' }}>
          SHIPPING AND DELIVERY
        </h1>

        {/* SECTION 1: METHODS AND COSTS */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '25px', textTransform: 'uppercase' }}>
            SHIPPING METHODS AND COSTS
          </h2>
          <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', color: '#333' }}>
            • We deliver to more than 200 countries around the world and offer different shipping options as applicable.
          </p>
          <p style={{ margin: '0 0 25px 0', fontSize: '0.95rem', color: '#333' }}>
            • For more information, please contact our customer care service at +91-9650656166 , <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>
          </p>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#222', lineHeight: '1.7', maxWidth: '900px' }}>
            Any items notified by local courier service to be restricted and/or banned and/or prohibited from time to time (including but not limited to animals, bullion, currency, bearers from negotiable instruments, precious metals and stones, firearms or parts thereof, ammunition, human remains, pornography, and illegal narcotics/drugs) will not be shipped. You may be informed of the same in case such situations arise.
          </p>
        </div>

        {/* SECTION 2: SHIPPING CHARGES */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '25px', textTransform: 'uppercase' }}>
            SHIPPING CHARGES
          </h2>
          <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', color: '#333' }}>
            • Free shipping is offered to customers only in India
          </p>
          <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', color: '#333' }}>
            • For customers outside India, free shipping is only applicable if the order value exceeds ₹ 35,000/-
          </p>
        </div>

        {/* SECTION 3: DELIVERY TIMELINE */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '25px', textTransform: 'uppercase' }}>
            DELIVERY TIMELINE
          </h2>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#222', lineHeight: '1.7', maxWidth: '920px' }}>
            All domestic orders will take approximately 4-5 days for delivery from the date of dispatch. International orders take a minimum of 7 days for delivery from the date of dispatch. These timelines may be subject to change due to unforeseen circumstances. Further information on the order status can be provided by emailing at <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>.
          </p>
        </div>

      </div>

      {/* FLOATING YELLOW BACK TO TOP BUTTON */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            backgroundColor: '#dfba6b', // Matches your exact brand yellow/gold accent color
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            transition: 'all 0.3s ease'
          }}
          title="Back to Top"
        >
          ↑
        </button>
      )}

    </div>
  );
};

export default ShippingDelivery;