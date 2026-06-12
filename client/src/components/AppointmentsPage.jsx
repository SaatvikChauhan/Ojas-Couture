import React, { useState } from 'react';

const AppointmentsPage = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const sections = [
    {
      title: "BOOK YOUR APPOINTMENT FOR LIVE VIDEO SHOPPING",
      content: (
        <div style={{ padding: '10px 0 20px 0' }}>
          <p style={{ textAlign: 'center', color: '#555', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '750px', margin: '0 auto 40px auto' }}>
            Discover our most-loved handcrafted ensembles with the guidance of a personal stylist, from the comfort of your home. 
            Whether you're shopping for a bridal event, festive celebration, or a wardrobe heirloom — we're here to help you find the perfect piece.
          </p>
          
          {/* 2x2 Clean Grid matching your desktop screenshot format */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'window' in global && window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
            gap: '30px 40px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Feature 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ fontSize: '2rem', lineHeight: '1' }}>👥</div>
              <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Get one-on-one styling advice from our expert team.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ fontSize: '2rem', lineHeight: '1' }}>🎨</div>
              <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Receive support for custom sizing, color options, or coordinating sets.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ fontSize: '2rem', lineHeight: '1' }}>👗</div>
              <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Browse real-time video previews of fabrics, embroidery, and fits.
              </p>
            </div>

            {/* Feature 4 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ fontSize: '2rem', lineHeight: '1' }}>📐</div>
              <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Discuss delivery timelines, alterations, or styling recommendations.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AVAILABILITY",
      content: (
        <div style={{ textAlign: 'center', padding: '10px 0 20px 0' }}>
          <p style={{ margin: '0 0 15px 0', color: '#333', fontSize: '1rem', lineHeight: '1.6' }}>
            Appointments available via WhatsApp Video or Zoom, Mon–Sun IST: 11.30 AM to 7.30PM
          </p>
          <p style={{ margin: 0, color: '#777', fontSize: '0.95rem', fontStyle: 'italic' }}>
            Available for bridal and non-bridal clients globally.
          </p>
        </div>
      )
    },
    {
      title: "BOOK YOUR EXCLUSIVE BRIDAL APPOINTMENT",
      content: (
        <div style={{ textAlign: 'center', padding: '10px 0 20px 0', maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 25px 0', color: '#555', fontSize: '1rem', lineHeight: '1.6' }}>
            Discover cutting-edge trends and curate your dream trousseau thoughtfully styled to complement your unique colour palette, body shape, and lifestyle. Let our expert stylists bring your bridal vision to life.
          </p>
          <a 
            href="https://wa.me/919650656166" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: 'inline-block', 
              border: '1px solid #000', 
              color: '#000', 
              padding: '10px 40px', 
              textDecoration: 'none', 
              fontSize: '0.85rem', 
              letterSpacing: '2px', 
              fontWeight: '500',
              textTransform: 'uppercase',
              transition: 'all 0.3s'
            }}
          >
            Book Now
          </a>
        </div>
      )
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <div style={{ borderTop: '1px solid #eaeaea' }}>
        {sections.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} style={{ borderBottom: '1px solid #eaeaea' }}>
              {/* Collapsible Header bar matching the uppercase aesthetic */}
              <button
                onClick={() => toggleAccordion(index)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '25px 0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: '1.15rem',
                  fontWeight: '500',
                  color: '#000',
                  letterSpacing: '1.5px',
                  outline: 'none'
                }}
              >
                <span style={{ textTransform: 'uppercase' }}>{item.title}</span>
                <span style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: '300', 
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                  paddingLeft: '15px'
                }}>
                  ＋
                </span>
              </button>

              {/* Collapsible Body Wrapper */}
              <div style={{
                maxHeight: isOpen ? '800px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0, 1, 0, 1), padding 0.3s ease',
                paddingBottom: isOpen ? '30px' : '0'
              }}>
                {item.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Persistent Direct Stylist Support Bar at bottom */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '50px', padding: '20px 0' }}>
        <span style={{ fontSize: '1.2rem' }}>📞</span>
        <span style={{ fontSize: '0.9rem', letterSpacing: '1px', fontWeight: '500', textTransform: 'uppercase' }}>
          FOR IMMEDIATE STYLING INQUIRIES: 
        </span>
        <a href="tel:+919650656166" style={{ fontSize: '0.95rem', fontWeight: '600', color: '#000', textDecoration: 'none', letterSpacing: '0.5px' }}>
          +91-9650656166
        </a>
      </div>
    </div>
  );
};

export default AppointmentsPage;