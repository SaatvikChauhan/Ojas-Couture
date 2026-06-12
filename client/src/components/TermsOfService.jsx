import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const navigate = useNavigate();

  // Handle scroll listener to show/hide the back to top button
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
    <div style={{ width: '100%', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#000', backgroundColor: '#fff', padding: '60px 20px', boxSizing: 'border-box', lineHeight: '1.7' }}>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* MAIN TITLE HEADLINE */}
        <h1 style={{ fontSize: '1.6rem', fontWeight: '600', letterSpacing: '1.5px', marginBottom: '40px', textTransform: 'uppercase', textAlign: 'center' }}>
          TERMS OF SERVICE
        </h1>

        {/* INTRODUCTION */}
        <div style={{ marginBottom: '40px', textAlign: 'justify', fontSize: '0.95rem', color: '#222' }}>
          <p style={{ marginBottom: '20px' }}>
            The domain name ojascouture.com(“Site”) is owned and operated by Ojas Couture. Throughout the site, the terms “we”, “us” and “our” refer to Ojas Couture. We offer this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
          </p>
          <p style={{ marginBottom: '20px' }}>
            By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
          </p>
          <p style={{ marginBottom: '20px', fontWeight: '500' }}>
            Our date of dispatch for Little Wonders By Pratibha Rajput collection is 30 days. These timelines are also mentioned on the product page.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '35px 0' }} />

        {/* SHIPPING METHODS AND COSTS */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            SHIPPING METHODS AND COSTS
          </h2>
          <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', color: '#222' }}>
            We deliver around the world, and offer different shipping options as applicable.
          </p>
          <p style={{ margin: '0 0 20px 0', fontSize: '0.95rem', color: '#222' }}>
            For more information, please contact our customer care service at +91-9650656166, <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>
          </p>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#555', maxWidth: '900px', textAlign: 'justify', fontStyle: 'italic' }}>
            Any items notified by local courier service to be restricted and/or banned and/or prohibited from time to time (including but not limited to animals, bullion, currency, bearer from negotiable instruments, precious metals and stones, firearms or parts thereof and ammunition, human remains, pornography and illegal narcotics/drugs).
          </p>
        </div>

        {/* SHIPPING CHARGES */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            SHIPPING CHARGES
          </h2>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#222' }}>
            • Free shipping is offered to customers only in India.
          </p>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#222' }}>
            • For customers outside India, free shipping is only applicable if the order value exceeds ₹ 35,000/-
          </p>
        </div>

        {/* DELIVERY TIMELINE */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            DELIVERY TIMELINE
          </h2>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#333', maxWidth: '900px', textAlign: 'justify' }}>
            All domestic orders will take approximately 3-4 days for delivery from the date of dispatch. International orders take a minimum of 7 days for delivery from the date of dispatch. These timelines may be subject to change due to unforeseen circumstances. Further information on the order status can be provided by emailing on <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>.
          </p>
        </div>

        {/* INSURANCE */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            INSURANCE
          </h2>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#333', maxWidth: '900px', textAlign: 'justify' }}>
            Ojas Couture insures each purchase during the time it is in transit until it is delivered to you. We require a signature for any goods delivered, at which point responsibility for your purchased goods passes to you. If you have specified a recipient who is not you for delivery purposes (for example as a gift) then you accept that evidence of a signature by them (or at that delivery address) is evidence of delivery and fulfilment by Ojas Couture and transfer of responsibility in the same way.
          </p>
        </div>

        {/* TAXES & DUTIES */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '25px', textTransform: 'uppercase' }}>
            TAXES & DUTIES
          </h2>
          
          <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '20px 0 10px 0' }}>For Indian Customers</h3>
          <p style={{ margin: '0 0 25px 0', fontSize: '0.95rem', color: '#222' }}>
            Product Prices displayed are inclusive of all taxes and duties.
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '20px 0 10px 0' }}>For International Customers</h3>
          <p style={{ margin: '0 auto 25px auto', fontSize: '0.95rem', color: '#333', maxWidth: '850px', textAlign: 'justify' }}>
            Most countries are shipped to on a DDU (Delivery Duty Unpaid) basis, which means product prices displayed are exclusive of all import duties. As the recipient, you are liable for all import duties, customs and local sales taxes levied by the country you are in, payment of these at the time of delivery is necessary to release your order from customs on arrival. For more information, please write to us on <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>
          </p>

          <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: '20px 0 10px 0' }}>For USA Customers</h3>
          <p style={{ margin: '0 auto 12px auto', fontSize: '0.95rem', color: '#333', maxWidth: '850px', textAlign: 'justify' }}>
            • On all orders under $500, customs duties will be borne by the customer. For more information, please contact us at +91-9650656166, <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a>
          </p>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#222', fontWeight: '500' }}>
            • On all orders above $500, customs duties will be borne by Ojas Couture.
          </p>
        </div>

        {/* RETURNS WINDOW */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            RETURNS WINDOW
          </h2>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#333', maxWidth: '900px', textAlign: 'justify' }}>
            Eligible items must be returned within 10 days from the date the items were delivered, or as otherwise stated on the items return policy. Returned items must be unused, unworn, unwashed, undamaged and conform to our terms and conditions. Please return items in their original condition, with packaging material in which the items were originally delivered including but not limited to hangers, plastic wrap, hang tags, boxes, dust bags and gift boxes.
          </p>
        </div>

        {/* EXCHANGE & ALTERATIONS */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            EXCHANGES & ALTERATIONS
          </h2>
          <p style={{ margin: '0 auto 20px auto', fontSize: '0.95rem', color: '#333', maxWidth: '900px', textAlign: 'justify' }}>
            <strong>Can I exchange/alter my item which was either customised or made to order?</strong><br />
            We currently do not allow exchange for an item which was either customised or made to order. In case you have ordered the wrong size, we can offer (as per the prescribed terms and conditions) to alter it without any charges. However, shipping charges shall be levied on the same. Please contact us at <a href="mailto:contactus@ojascouture.com" style={{ color: '#000', textDecoration: 'underline' }}>contactus@ojascouture.com</a> for further assistance.
          </p>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#333', maxWidth: '900px', textAlign: 'justify' }}>
            <strong>Alterations:</strong><br />
            All alterations have a minimum lead-time of 15 days which may extend depending on the extent of alteration required. We take 4 days to confirm the possibility of alteration after receiving a request. However, to-and-fro shipping and custom duty charges will have to be borne by the customer in case of alterations or exchange.
          </p>
        </div>

        {/* CANCELLATION & REFUNDS */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            CANCELLATION & REFUNDS
          </h2>
          <p style={{ margin: '0 auto 15px auto', fontSize: '0.95rem', color: '#333', maxWidth: '900px', textAlign: 'justify' }}>
            You may cancel an order within 24 hours after placing it. No cancellations beyond 24 hours will be entertained barring extenuating circumstances. Any accepted cancellation beyond 24 hours will be exclusively at the discretion of ojascouture.com. A cancelled order will result in a credit to the users credit card/account.
          </p>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#333', maxWidth: '900px', textAlign: 'justify' }}>
            Refunds will be processed in a form of credit to their Credit Card / Net Banking / Debit Card Account within 7 business days.
          </p>
        </div>

        {/* GOVERNING LAW */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
            GOVERNING LAW
          </h2>
          <p style={{ margin: '0 auto', fontSize: '0.95rem', color: '#333', maxWidth: '900px' }}>
            These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.
          </p>
        </div>

        {/* CENTERED BRAND ACCENT BUTTON */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
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

      {/* FLOATING YELLOW BACK TO TOP TRIGGER BUTTON */}
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

export default TermsOfService;