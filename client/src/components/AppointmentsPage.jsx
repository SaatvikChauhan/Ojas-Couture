import React from 'react';

const AppointmentsPage = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#000', backgroundColor: '#fff' }}>
      
      {/* 1. MAIN TITLE HEADLINE */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: '500', letterSpacing: '2px', margin: '0 0 25px 0', textTransform: 'uppercase' }}>
          BOOK YOUR APPOINTMENT FOR LIVE VIDEO SHOPPING
        </h1>
        <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '850px', margin: '0 auto' }}>
          Discover our most-loved handcrafted ensembles with the guidance of a personal stylist, from the comfort of your home. <br />
          Whether you're shopping for a bridal event, festive celebration, or a wardrobe heirloom — we're here to help you find the perfect piece.
        </p>
      </div>

      {/* 2. TWO-COLUMN FEATURE GRID WITH SPECIFIC ICONS AND ALIGNMENT */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
        gap: '40px 80px',
        maxWidth: '950px',
        margin: '60px auto',
        padding: '0 20px',
        alignItems: 'center'
      }}>
        
        {/* Row 1, Left Column: Video Chat Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ fontSize: '3.5rem', minWidth: '70px', textAlign: 'center', lineHeight: '1' }}>🗣️</div>
          <p style={{ margin: 0, color: '#333', fontSize: '1rem', lineHeight: '1.5' }}>
            Get one-on-one styling advice from our expert team.
          </p>
        </div>

        {/* Row 1, Right Column: Measuring/Tape Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ fontSize: '3.5rem', minWidth: '70px', textAlign: 'center', lineHeight: '1' }}>📐</div>
          <p style={{ margin: 0, color: '#333', fontSize: '1rem', lineHeight: '1.5' }}>
            Receive support for custom sizing, color options, or coordinating sets.
          </p>
        </div>

        {/* Row 2, Left Column: Dress/Hanger Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ fontSize: '3.5rem', minWidth: '70px', textAlign: 'center', lineHeight: '1' }}>👗</div>
          <p style={{ margin: 0, color: '#333', fontSize: '1rem', lineHeight: '1.5' }}>
            Browse real-time video previews of fabrics, embroidery, and fits.
          </p>
        </div>

        {/* Row 2, Right Column: Suit/Tailor Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ fontSize: '3.5rem', minWidth: '70px', textAlign: 'center', lineHeight: '1' }}>👔</div>
          <p style={{ margin: 0, color: '#333', fontSize: '1rem', lineHeight: '1.5' }}>
            Discuss delivery timelines, alterations, or styling recommendations.
          </p>
        </div>

      </div>

      {/* 3. AVAILABILITY BANNER PANEL */}
      <div style={{ textAlign: 'center', margin: '70px 0 50px 0' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '500', letterSpacing: '2px', marginBottom: '25px', textTransform: 'uppercase' }}>
          AVAILABILITY
        </h2>
        <p style={{ margin: '0 0 8px 0', color: '#222', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Appointments available via WhatsApp Video or Zoom, Mon–Sun IST: 11.30 AM to 7.30PM
        </p>
        <p style={{ margin: 0, color: '#666', fontSize: '1rem' }}>
          Available for bridal and non-bridal clients globally
        </p>
      </div>

      {/* 4. CALL TO ACTION CONTACT FOOTER BAR */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '15px', 
        marginTop: '60px', 
        padding: '30px 0'
      }}>
        <span style={{ fontSize: '1.5rem', transform: 'scaleX(-1)', display: 'inline-block' }}>📞</span>
        <span style={{ fontSize: '0.95rem', letterSpacing: '1.5px', fontWeight: '500', textTransform: 'uppercase' }}>
          BOOK AN APPOINTMENT
        </span>
        <a href="tel:+919650656166" style={{ fontSize: '1.05rem', fontWeight: '600', color: '#000', textDecoration: 'none', letterSpacing: '0.5px' }}>
          +91-9650656166
        </a>
      </div>

    </div>
  );
};

export default AppointmentsPage;