import React from 'react';

const AppointmentsPage = () => {
  return (
    <div style={{ width: '100%', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#000', backgroundColor: '#fff' }}>
      
      {/* 1. GOLD BRIDAL BANNER (Exactly matching your screen top half) */}
      <div style={{ 
        backgroundColor: '#e3be6d', 
        padding: '50px 40px', 
        color: '#fff', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '400', margin: '0 0 15px 0', letterSpacing: '0.5px' }}>
            Book Your Exclusive Bridal Appointment
          </h2>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', opacity: '0.9' }}>
            Discover cutting-edge trends and curate your dream trousseau thoughtfully styled to complement your unique colour palette, body shape, and lifestyle. Let our expert stylists bring your bridal vision to life.
          </p>
        </div>
        <div>
          <a 
            href="https://wa.me/919650656166" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: 'inline-block', 
              border: '2px solid #fff', 
              color: '#fff', 
              padding: '12px 50px', 
              textDecoration: 'none', 
              fontSize: '0.95rem', 
              letterSpacing: '2px', 
              fontWeight: '500',
              textTransform: 'uppercase'
            }}
          >
            BOOK
          </a>
        </div>
      </div>

      {/* 2. FOR IMMEDIATE STYLING INQUIRIES SUB-BANNER */}
      <div style={{ textAlign: 'center', padding: '50px 20px 20px 20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '500', letterSpacing: '1.5px', margin: '0 0 20px 0', textTransform: 'uppercase' }}>
          FOR IMMEDIATE STYLING INQUIRIES
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <p style={{ margin: 0, color: '#333', fontSize: '0.95rem' }}>
            Speak directly to our in-house stylist on WhatsApp at +91-9650656166
          </p>
          {/* WhatsApp Icon placeholder */}
          <span style={{ fontSize: '1.5rem', color: '#25D366' }}>💬</span>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', maxWidth: '1100px', margin: '40px auto' }} />

      {/* 3. LIVE SHOPPING TITLE SECTION */}
      <div style={{ textAlign: 'center', padding: '0 20px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '500', letterSpacing: '1.5px', margin: '0 0 20px 0', textTransform: 'uppercase' }}>
          BOOK YOUR APPOINTMENT FOR LIVE VIDEO SHOPPING
        </h2>
        <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          Discover our most-loved handcrafted ensembles with the guidance of a personal stylist, from the comfort of your home. 
          Whether you're shopping for a bridal event, festive celebration, or a wardrobe heirloom — we're here to help you find the perfect piece.
        </p>
      </div>

      {/* 4. THE 2-COLUMN FEATURES GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
        gap: '40px 60px',
        maxWidth: '900px',
        margin: '0 auto 60px auto',
        padding: '0 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
          <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>👥</span>
          <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Get one-on-one styling advice from our expert team.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
          <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>📐</span>
          <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Receive support for custom sizing, color options, or coordinating sets.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
          <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>👗</span>
          <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Browse real-time video previews of fabrics, embroidery, and fits.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
          <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>👔</span>
          <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Discuss delivery timelines, alterations, or styling recommendations.
          </p>
        </div>
      </div>

      {/* 5. AVAILABILITY BOX */}
      <div style={{ textAlign: 'center', margin: '50px auto', padding: '0 20px', maxWidth: '800px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '500', letterSpacing: '1.5px', marginBottom: '15px', textTransform: 'uppercase' }}>
          AVAILABILITY
        </h3>
        <p style={{ margin: '0 0 8px 0', color: '#222', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Appointments available via WhatsApp Video or Zoom, Mon–Sun IST: 11.30 AM to 7.30PM
        </p>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Available for bridal and non-bridal clients globally
        </p>
      </div>

      {/* 6. PERSISTENT CALL TO ACTION FOOTER ROW */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '12px', 
        margin: '60px auto 40px auto', 
        paddingTop: '20px',
        borderTop: '1px solid #eee',
        maxWidth: '900px'
      }}>
        <span style={{ fontSize: '1.2rem', transform: 'scaleX(-1)', display: 'inline-block' }}>📞</span>
        <span style={{ fontSize: '0.85rem', letterSpacing: '1.5px', fontWeight: '500', textTransform: 'uppercase' }}>
          BOOK AN APPOINTMENT:
        </span>
        <a href="tel:+919650656166" style={{ fontSize: '0.95rem', fontWeight: '600', color: '#000', textDecoration: 'none' }}>
          +91-9650656166
        </a>
      </div>

    </div>
  );
};

export default AppointmentsPage;