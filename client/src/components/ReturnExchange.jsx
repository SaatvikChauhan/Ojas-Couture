import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnExchange = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const navigate = useNavigate();

  // Show/Hide floating back to top button on scroll
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

  const handleFindOrder = (e) => {
    e.preventDefault();
    console.log('Searching for order:', { orderNumber, contactInfo });
  };

  return (
    <div style={{ width: '100%', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#000', backgroundColor: '#fff', padding: '60px 20px', boxSizing: 'border-box', lineHeight: '1.7' }}>
      
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* MAIN HEADLINE */}
        <h1 style={{ fontSize: '1.6rem', fontWeight: '600', letterSpacing: '1.5px', marginBottom: '40px', textTransform: 'uppercase', textAlign: 'center' }}>
          RETURNS, REFUNDS AND EXCHANGES
        </h1>

        {/* INTRO PARAGRAPH */}
        <p style={{ fontSize: '0.95rem', color: '#222', textAlign: 'center', marginBottom: '40px' }}>
          At Ojas Couture, we take pride in crafting each piece with care and precision. As we work with a made-to-order and artisanal production timelines, we request you to kindly review the following policy before making a purchase:
        </p>

        {/* POLICY SECTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', fontSize: '0.95rem', color: '#333' }}>
          
          {/* WINDOW */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#111', letterSpacing: '0.5px' }}>
              Return & Exchange Window
            </h2>
            <p style={{ margin: '0 0 6px 0' }}>• You must raise a return or exchange request within 72 hours of receiving your order.</p>
            <p style={{ margin: 0 }}>• We do not accept requests beyond this window.</p>
          </div>

          {/* SHIPPING CHARGES */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#111', letterSpacing: '0.5px' }}>
              Exchange Shipping Charges
            </h2>
            <p style={{ margin: 0 }}>
              • For exchanges, the shipping charges applicable for both pickup of the original piece and delivery of the replacement will be borne by the client. For domestic orders, this total cost is typically under ₹500.
            </p>
          </div>

          {/* ELIGIBILITY */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#111', letterSpacing: '0.5px' }}>
              Eligibility
            </h2>
            <p style={{ margin: '0 0 8px 0' }}>• Products must be unused, unworn, and in perfect condition, with all original tags and packaging intact.</p>
            
            <p style={{ margin: '15px 0', padding: '15px', borderLeft: '3px solid #dfba6b', backgroundColor: '#fafaf8', lineHeight: '1.6' }}>
              <strong>Security Tag Notice:</strong> All garments are delivered with a non-removable security tag. Please note that any request for return or exchange will only be accepted if this tag remains intact, untampered, and attached to the garment. Once the tag has been cut, removed, or damaged, the item will no longer be eligible for return or exchange under any circumstances.
            </p>

            <p style={{ margin: '0 0 8px 0' }}>• Exchange is valid for the following cases: Incorrect Size Ordered, Improper Fit. Any other reasons are subject to approval.</p>
            <p style={{ margin: 0 }}>• Items once exchanged will be considered final and not eligible for further exchange or return.</p>
          </div>

          {/* NON-RETURNABLE */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#111', letterSpacing: '0.5px' }}>
              Non-Returnable / Non-Exchangeable Items
            </h2>
            <p style={{ margin: '0 0 6px 0' }}>• Custom-size orders or pieces.</p>
            <p style={{ margin: '0 0 6px 0' }}>• Customization requests can be accepted (such as bottom style change, color change, sleeve length change) but products are then on final sale and cannot be returned. Such requests must be pre-paid and COD cannot be accepted as a form of payment in that case.</p>
            <p style={{ margin: '0 0 6px 0' }}>• Accessories (including belts and potlis).</p>
            <p style={{ margin: '0 0 6px 0' }}>• Discounted or promotional purchases.</p>
            <p style={{ margin: 0 }}>• International Orders are not returnable.</p>
          </div>

          {/* REFUNDS & CREDIT */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#111', letterSpacing: '0.5px' }}>
              Refunds & Store Credit
            </h2>
            <p style={{ margin: 0 }}>• We do not offer cash refunds. Eligible returns will be processed as store credit, valid for 12 months.</p>
          </div>

          {/* ALTERATIONS */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#111', letterSpacing: '0.5px' }}>
              Alterations
            </h2>
            <p style={{ margin: '0 0 8px 0', fontStyle: 'italic' }}>We understand that the nature of our product requires it to be a perfect fit, each time! When delivered the right size, but the fit just doesn’t work – we’re here.</p>
            <p style={{ margin: 0 }}>• We will request you to bear the cost of shipping the product to us, and we will take care of any alterations at no cost. This service is only valid if the request is received within 48 hours of product delivery.</p>
          </div>

          {/* WHEN IT'S ON US */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#111', letterSpacing: '0.5px' }}>
              When it’s on Us!
            </h2>
            <p style={{ margin: '0 0 8px 0', fontStyle: 'italic' }}>If we’ve made a mistake, we’ll make it right — no questions asked.</p>
            <p style={{ margin: '0 0 6px 0' }}>• If you receive the wrong product, you may choose a full refund, store credit or a replacement product.</p>
            <p style={{ margin: '0 0 6px 0' }}>• If the product has a manufacturing defect, we’ll issue a complete refund, credit or a replacement product, as per your preference.</p>
            <p style={{ margin: 0 }}>• If your order is delivered over 48 hours past the promised date, we’ll offer a full refund or store credit, upon request. The promised date is only valid when orders are placed with a deadline date, via our customer service.</p>
          </div>

          {/* OJAS RUSH */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#111', letterSpacing: '0.5px' }}>
              Ojas Rush
            </h2>
            <p style={{ margin: 0 }}>• Any orders placed within our “OJAS RUSH” category are not eligible for return or exchange unless defective.</p>
          </div>

          {/* IMPORTANT NOTES */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', color: '#111', letterSpacing: '0.5px' }}>
              Important Notes
            </h2>
            <p style={{ margin: '0 0 6px 0' }}>• Items tried on must be handled with care.</p>
            <p style={{ margin: '0 0 6px 0' }}>• Any returned item that is damaged, soiled, worn, or returned without tags may not be accepted.</p>
            <p style={{ margin: '0 0 6px 0' }}>• Orders placed with loyalty points, discount codes, or during sales will not be eligible for return or exchange.</p>
            <p style={{ margin: 0 }}>• In case any products are returned in a used condition, we would be sending the same product back to you without rectification, exchange or refund.</p>
          </div>

        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '50px 0' }} />

        {/* INTERACTIVE FORM SECTION */}
        <div style={{ maxWidth: '480px', margin: '0 auto 50px auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '12px', textTransform: 'uppercase' }}>
            Return & Exchange
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '25px' }}>
            Enter your order number and email or phone to find your order
          </p>

          <form onSubmit={handleFindOrder} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="Order Number" 
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none' }}
            />
            <input 
              type="text" 
              placeholder="Email or Phone Number" 
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none' }}
            />
            <button 
              type="submit"
              style={{ 
                backgroundColor: '#dfba6b', 
                color: '#fff', 
                border: 'none', 
                padding: '14px', 
                fontSize: '0.95rem', 
                fontWeight: '600', 
                letterSpacing: '1px', 
                textTransform: 'uppercase', 
                cursor: 'pointer',
                marginTop: '5px'
              }}
            >
              Find Your Order
            </button>
          </form>
        </div>

        {/* BACK TO SHOP ACCENT BUTTON */}
        <div style={{ textAlign: 'center' }}>
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
              cursor: 'pointer'
            }}
          >
            Back to Shop
          </button>
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
            zIndex: '1000'
          }}
          title="Back to Top"
        >
          ↑
        </button>
      )}

    </div>
  );
};

export default ReturnExchange;