import React, { useState } from 'react';

const AppointmentsPage = () => {
  // Manage state for the two collapsible dropdown sections at the bottom
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#000' }}>
      
      {/* 1. PERMANENTLY VISIBLE TOP HEADER SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '500', letterSpacing: '2px', margin: '0 0 25px 0', textTransform: 'uppercase' }}>
          BOOK YOUR APPOINTMENT FOR LIVE VIDEO SHOPPING
        </h2>
        <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', maxWidth: '850px', margin: '0 auto' }}>
          Discover our most-loved handcrafted ensembles with the guidance of a personal stylist, from the comfort of your home. 
          Whether you're shopping for a bridal event, festive celebration, or a wardrobe heirloom — we're here to help you find the perfect piece.
        </p>
      </div>

      {/* 2. PERMANENTLY VISIBLE 2x2 ICON GRID (Exactly like your screen layout) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
        gap: '40px 60px',
        maxWidth: '900px',
        margin: '0 auto 60px auto',
        padding: '0 10px'
      }}>
        {/* Item 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '2.5rem' }}>👥</span>
          <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Get one-on-one styling advice from our expert team.
          </p>
        </div>

        {/* Item 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '2.5rem' }}>🎨</span>
          <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Receive support for custom sizing, color options, or coordinating sets.
          </p>
        </div>

        {/* Item 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '2.5rem' }}>👗</span>
          <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Browse real-time video previews of fabrics, embroidery, and fits.
          </p>
        </div>

        {/* Item 4 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '2.5rem' }}>📐</span>
          <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Discuss delivery timelines, alterations, or styling recommendations.
          </p>
        </div>
      </div>

      {/* 3. COLLAPSIBLE ACCORDION DROPDOWNS (For Availability & Bridal Booking) */}
      <div style={{ borderTop: '1px solid #eaeaea', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* ACCORDION 1: AVAILABILITY */}
        <div style={{ borderBottom: '1px solid #eaeaea' }}>
          <button
            onClick={() => toggleAccordion(0)}
            style={{
              width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '25px 0', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              fontSize: '1.1rem', fontWeight: '500', color: '#000', letterSpacing: '1.5px', outline: 'none'
            }}
          >
            <span style={{ textTransform: 'uppercase' }}>AVAILABILITY TIMINGS</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '300', transform: openIndex === 0 ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>＋</span>
          </button>
          
          <div style={{
            maxHeight: openIndex === 0 ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-in-out',
            color: '#555', fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 10px 0', color: '#000', fontWeight: '500' }}>
              Appointments available via WhatsApp Video or Zoom
            </p>
            <p style={{ margin: '0 0 20px 0' }}>
              Monday – Sunday (IST): 11:30 AM to 7:30 PM | Available for bridal and non-bridal clients globally.
            </p>
          </div>
        </div>

        {/* ACCORDION 2: EXCLUSIVE BRIDAL APPOINTMENT */}
        <div style={{ borderBottom: '1px solid #eaeaea' }}>
          <button
            onClick={() => toggleAccordion(1)}
            style={{
              width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '25px 0', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              fontSize: '1.1rem', fontWeight: '500', color: '#000', letterSpacing: '1.5px', outline: 'none'
            }}
          >
            <span style={{ textTransform: 'uppercase' }}>BOOK YOUR EXCLUSIVE BRIDAL APPOINTMENT</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '300', transform: openIndex === 1 ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>＋</span>
          </button>
          
          <div style={{
            maxHeight: openIndex === 1 ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-in-out',
            color: '#555', fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'center'
          }}>
            <p style={{ margin: '0 auto 20px auto', maxWidth: '750px' }}>
              Discover cutting-edge trends and curate your dream trousseau thoughtfully styled to complement your unique colour palette, body shape, and lifestyle. Let our expert stylists bring your bridal vision to life.
            </p>
            <a 
              href="https://wa.me/919650656166" 
              target="_blank" 
              rel="noreferrer"
              style={{ 
                display: 'inline-block', border: '1px solid #000', color: '#000', padding: '10px 40px', 
                textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: '500',
                textTransform: 'uppercase', marginBottom: '25px'
              }}
            >
              Book via WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* 4. PERMANENTLY VISIBLE CONTACT FOOTER BAR */}
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', 
        marginTop: '60px', padding: '20px 0', borderTop: '1px dashed #eaeaea' 
      }}>
        <span style={{ fontSize: '1.3rem' }}>📞</span>
        <span style={{ fontSize: '0.9rem', letterSpacing: '1.5px', fontWeight: '500', textTransform: 'uppercase' }}>
          BOOK AN APPOINTMENT / GET IN TOUCH:
        </span>
        <a href="tel:+919650656166" style={{ fontSize: '1rem', fontWeight: '600', color: '#000', textDecoration: 'none' }}>
          +91-9650656166
        </a>
      </div>

    </div>
  );
};

export default AppointmentsPage;