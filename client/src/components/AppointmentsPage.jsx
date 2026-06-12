import React from 'react';

const AppointmentsPage = () => {
  return (
    <div style={{ width: '100%', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#000', backgroundColor: '#fff' }}>
      
      {/* 1. LIVE SHOPPING TITLE SECTION */}
      <div style={{ textAlign: 'center', padding: '60px 20px 0 20px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '500', letterSpacing: '2px', margin: '0 0 25px 0', textTransform: 'uppercase' }}>
          BOOK YOUR APPOINTMENT FOR LIVE VIDEO SHOPPING
        </h2>
        <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '850px', margin: '0 auto' }}>
          Discover our most-loved handcrafted ensembles with the guidance of a personal stylist, from the comfort of your home. <br />
          Whether you're shopping for a bridal event, festive celebration, or a wardrobe heirloom — we're here to help you find the perfect piece.
        </p>
      </div>

      {/* 2. THE 2-COLUMN FEATURES GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
        gap: '40px 80px',
        maxWidth: '950px',
        margin: '50px auto 60px auto',
        padding: '0 20px'
      }}>
        {/* Feature 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ fontSize: '3.5rem', minWidth: '70px', textAlign: 'center', lineHeight: '1' }}>👥</div>
          <p style={{ margin: 0, color: '#333', fontSize: '1rem', lineHeight: '1.5' }}>
            Get one-on-one styling advice from our expert team.
          </p>
        </div>

        {/* Feature 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ fontSize: '3.5rem', minWidth: '70px', textAlign: 'center', lineHeight: '1' }}>📐</div>
          <p style={{ margin: 0, color: '#333', fontSize: '1rem', lineHeight: '1.5' }}>
            Receive support for custom sizing, color options, or coordinating sets.
          </p>
        </div>

        {/* Feature 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ fontSize: '3.5rem', minWidth: '70px', textAlign: 'center', lineHeight: '1' }}>👗</div>
          <p style={{ margin: 0, color: '#333', fontSize: '1rem', lineHeight: '1.5' }}>
            Browse real-time video previews of fabrics, embroidery, and fits.
          </p>
        </div>

        {/* Feature 4 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ fontSize: '3.5rem', minWidth: '70px', textAlign: 'center', lineHeight: '1' }}>👔</div>
          <p style={{ margin: 0, color: '#333', fontSize: '1rem', lineHeight: '1.5' }}>
            Discuss delivery timelines, alterations, or styling recommendations.
          </p>
        </div>
      </div>

      {/* 3. AVAILABILITY SECTION */}
      <div style={{ textAlign: 'center', margin: '60px 0 60px 0', padding: '0 20px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '500', letterSpacing: '2px', marginBottom: '20px', textTransform: 'uppercase' }}>
          AVAILABILITY
        </h3>
        <p style={{ margin: '0 0 8px 0', color: '#111', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Appointments available via WhatsApp Video or Zoom, Mon–Sun IST: 11.30 AM to 7.30PM
        </p>
        <p style={{ margin: 0, color: '#666', fontSize: '1rem' }}>
          Available for bridal and non-bridal clients globally
        </p>
      </div>

      {/* 4. THE GOLD BRIDAL BANNER */}
      <div style={{ 
        backgroundColor: '#e3be6d', 
        padding: '50px 40px', 
        color: '#fff', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '40px'
      }}>
        <div style={{ maxWidth: '750px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '400', margin: '0 0 12px 0', letterSpacing: '0.5px' }}>
            Book Your Exclusive Bridal Appointment
          </h2>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', opacity: '0.95' }}>
            Discover cutting-edge trends and curate your dream trousseau thoughtfully styled to complement your unique colour palette, body shape, and lifestyle. Let our expert stylists bring your bridal vision to life.
          </p>
        </div>
        <div>
          <a 
            href="https://wa.me/919650656166" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: 'inline-block', border: '2px solid #fff', color: '#fff', padding: '12px 50px', 
              textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '2px', fontWeight: '500',
              textTransform: 'uppercase', backgroundColor: 'transparent', transition: 'all 0.3s ease'
            }}
          >
            BOOK
          </a>
        </div>
      </div>

      {/* 5. FOR IMMEDIATE STYLING INQUIRIES SECTION */}
      <div style={{ textAlign: 'center', padding: '60px 20px 50px 20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '500', letterSpacing: '1.5px', margin: '0 0 15px 0', textTransform: 'uppercase' }}>
          FOR IMMEDIATE STYLING INQUIRIES
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          <p style={{ margin: 0, color: '#333', fontSize: '1rem' }}>
            Speak directly to our in-house stylist on WhatsApp at +91-9650656166
          </p>
          <span style={{ fontSize: '1.6rem', color: '#25D366', display: 'inline-block', lineHeight: '1' }}>💬</span>
        </div>
      </div>

      {/* 6. NEW FEATURE: THE EXTREMELY EXACT IMAGE BANNER BLOCK */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '420px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=1600&auto=format&fit=crop")', // Luxury textiles replacement path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 10% 0 10%',
        boxSizing: 'border-box'
      }}>
        {/* Dark overlay mixin so text pops out perfectly just like the image screen */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.25)', zIndex: 1 }}></div>

        {/* Text and Button content grouped inside overlay tracks */}
        <div style={{ position: 'relative', zIndex: 2, color: '#fff' }}>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '1.6rem', fontWeight: '400', fontStyle: 'italic', letterSpacing: '0.5px' }}>
            Invite to Join
          </h4>
          <h2 style={{ margin: '0 0 25px 0', fontSize: '2.2rem', fontWeight: '500', letterSpacing: '1px' }}>
            Little Wonders by Pratibha Rajput
          </h2>
          <a 
            href="/little-wonders" 
            style={{
              display: 'inline-block',
              backgroundColor: '#e3be6d',
              color: '#fff',
              padding: '12px 35px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              textDecoration: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
            }}
          >
            Join Now
          </a>
        </div>
      </div>

      {/* 7. CLEAN FOOTER SEPARATOR */}
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', 
        margin: '50px auto 20px auto', paddingTop: '30px', borderTop: '1px solid #eaeaea', maxWidth: '950px'
      }}>
        <span style={{ fontSize: '1.3rem', transform: 'scaleX(-1)', display: 'inline-block' }}>📞</span>
        <span style={{ fontSize: '0.9rem', letterSpacing: '1.5px', fontWeight: '500', textTransform: 'uppercase' }}>
          BOOK AN APPOINTMENT:
        </span>
        <a href="tel:+919650656166" style={{ fontSize: '1rem', fontWeight: '600', color: '#000', textDecoration: 'none' }}>
          +91-9650656166
        </a>
      </div>

    </div>
  );
};

export default AppointmentsPage;