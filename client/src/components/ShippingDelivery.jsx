import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingDelivery = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const navigate = useNavigate();

  // Show floating button when scrolling down
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
      
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* MAIN HEADLINE */}
        <h1 style={{ fontSize: '1.6rem', fontWeight: '600', letterSpacing: '1.5px', marginBottom: '50px', textTransform: 'uppercase', textAlign: 'center' }}>
          SHIPPING AND DELIVERY
        </h1>

        {/* 1. SHIPPING METHODS AND COSTS */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            SHIPPING METHODS AND COSTS
          </h2>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#222' }}>
            • We deliver to more than 200 countries around the world and offer different shipping options as applicable.
          </p>
          <p style={{ margin: '0 0 20px 0', fontSize: '0.95rem', color: '#222' }}>
            • For more information, please contact our customer care service at +91-9650656166 , <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>
          </p>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#444', lineHeight: '1.7', maxWidth: '900px', textAlign: 'justify' }}>
            Any items notified by local courier service to be restricted and/or banned and/or prohibited from time to time (including but not limited to animals, bullion, currency, bearers from negotiable instruments, precious metals and stones, firearms or parts thereof, ammunition, human remains, pornography, and illegal narcotics/drugs) will not be shipped. You may be informed of the same in case such situations arise.
          </p>
        </div>

        {/* 2. SHIPPING CHARGES */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            SHIPPING CHARGES
          </h2>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#222' }}>
            • Free shipping is offered to customers only in India
          </p>
          <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', color: '#222' }}>
            • For customers outside India, free shipping is only applicable if the order value exceeds ₹ 35,000/-
          </p>
        </div>

        {/* 3. DELIVERY TIMELINE */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            DELIVERY TIMELINE
          </h2>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#444', lineHeight: '1.7', maxWidth: '900px' }}>
            All domestic orders will take approximately 4-5 days for delivery from the date of dispatch. International orders take a minimum of 7 days for delivery from the date of dispatch. These timelines may be subject to change due to unforeseen circumstances. Further information on the order status can be provided by emailing at <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>.
          </p>
        </div>

        {/* 4. INSURANCE SECTION */}
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            INSURANCE
          </h2>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#444', lineHeight: '1.7', maxWidth: '900px' }}>
            Ojas Couture insures each purchase during the time it is in transit until it is delivered to you. We require a signature for any goods delivered, at which point responsibility for your purchased goods passes to you. If you have specified a recipient who is not you for delivery purposes (for example, as a gift), then you accept that evidence of a signature by them (or at that delivery address) is evidence of delivery and fulfilment by Ojas Couture and transfer of responsibility in the same way.
          </p>
        </div>

        {/* 5. TAXES & DUTIES SECTION */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '25px', textTransform: 'uppercase' }}>
            TAXES & DUTIES
          </h2>
          
          <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '20px 0 10px 0' }}>For Indian Customers</h3>
          <p style={{ margin: '0 0 30px 0', fontSize: '0.95rem', color: '#222' }}>
            Product prices displayed are inclusive of all taxes and duties.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '20px 0 10px 0' }}>For International Customers</h3>
          <p style={{ margin: '0 auto 30px auto', fontSize: '0.95rem', color: '#444', lineHeight: '1.6', maxWidth: '850px' }}>
            • Most countries are shipped to on a DDU (Delivery Duty Unpaid) basis, which means product prices displayed are exclusive of all import duties. As the recipient, you are liable for all import duties, customs, and local sales taxes levied by the country you are in; payment of these at the time of delivery is necessary to release your order from customs on arrival. For more information, please contact us at +91-9650656166 , <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '20px 0 10px 0' }}>For USA Customers</h3>
          <p style={{ margin: '0 auto 12px auto', fontSize: '0.95rem', color: '#444', lineHeight: '1.6', maxWidth: '850px' }}>
            • On orders below $600, as the recipient, you are liable for all import duties, customs, and local sales taxes levied by your country; payment of these at the time of delivery is necessary to release your order from customs on arrival. For more information, please contact us at +91-9650656166 , <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>
          </p>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#222' }}>
            • On orders above $600, custom duty will be borne by Ojas Couture.
          </p>
        </div>

        {/* 6. CENTERED YELLOW "BACK TO SHOP" BUTTON */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <button 
            onClick={() => navigate('/shop')}
            style={{ 
              backgroundColor: '#dfba6b', 
              color: '#fff', 
              border: 'none', 
              padding: '12px 45px', 
              fontSize: '0.9rem', 
              fontWeight: '500', 
              letterSpacing: '1.5px', 
              textTransform: 'uppercase', 
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Back to Shop
          </button>
        </div>

      </div>

      {/* 7. FLOATING YELLOW "BACK TO TOP" BUTTON */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            backgroundColor: '#dfba6b',
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