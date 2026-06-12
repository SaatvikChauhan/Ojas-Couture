import React, { useState } from 'react';

const AppointmentsPage = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const appointmentSections = [
    {
      title: "Live Video Shopping Experience",
      content: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>
            Discover our most-loved handcrafted ensembles with the guidance of a personal stylist, from the comfort of your home. Whether you're shopping for a bridal event, festive celebration, or a wardrobe heirloom — we're here to help you find the perfect piece.
          </p>
          <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>What you will experience:</p>
          <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>Get one-on-one styling advice from our expert team.</li>
            <li style={{ marginBottom: '5px' }}>Discuss delivery timelines, alterations, or styling recommendations.</li>
            <li style={{ marginBottom: '5px' }}>Receive support for custom sizing, color options, or coordinating sets.</li>
            <li>Browse real-time video previews of fabrics, embroidery, and fits.</li>
          </ul>
        </>
      )
    },
    {
      title: "Availability & Timings",
      content: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>
            Appointments are completely personalized and available globally for both bridal and non-bridal clients.
          </p>
          <p style={{ margin: 0, padding: '12px', background: '#faf6f0', borderLeft: '3px solid #b58e58' }}>
            <strong>Available Slots:</strong> Monday to Sunday, 11:30 AM to 7:30 PM (IST).<br />
            Conducted seamlessly via <strong>WhatsApp Video</strong> or <strong>Zoom</strong>.
          </p>
        </>
      )
    },
    {
      title: "Exclusive Bridal Trousseau Styling",
      content: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>
            Discover cutting-edge trends and curate your dream trousseau thoughtfully styled to complement your unique colour palette, body shape, and lifestyle. Let our expert stylists bring your bridal vision to life.
          </p>
        </>
      )
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'serif' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Book An Appointment
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontStyle: 'italic' }}>
        Get In Touch With Our Studio
      </p>

      <div style={{ borderTop: '1px solid #eee' }}>
        {appointmentSections.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} style={{ borderBottom: '1px solid #eee' }}>
              <button
                onClick={() => toggleAccordion(index)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: '#222',
                  outline: 'none'
                }}
              >
                <span>{item.title}</span>
                <span style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: '300', 
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}>
                  ＋
                </span>
              </button>

              <div style={{
                maxHeight: isOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease-in-out, padding 0.3s ease',
                paddingBottom: isOpen ? '20px' : '0',
                color: '#555',
                fontSize: '0.95rem',
                lineHeight: '1.6'
              }}>
                {item.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Immediate Styling Direct Call-to-Action */}
      <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#faf6f0', textAlign: 'center', borderRadius: '2px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.3rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          For Immediate Styling Inquiries
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#444' }}>
          Speak directly to our in-house stylist on WhatsApp or call us to reserve a live viewing.
        </p>
        <a 
          href="https://wa.me/919650656166" 
          target="_blank" 
          rel="noreferrer" 
          style={{ 
            display: 'inline-block', 
            background: '#000', 
            color: '#fff', 
            padding: '12px 30px', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '0.9rem',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          Book via WhatsApp: +91-9650656166
        </a>
      </div>
    </div>
  );
};

export default AppointmentsPage;