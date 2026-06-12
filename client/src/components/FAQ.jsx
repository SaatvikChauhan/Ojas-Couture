import React, { useState } from 'react';

const FAQ = () => {
  // Track which FAQ index is open (-1 means all are closed)
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqData = [
    {
      question: "Do you ship overseas?",
      answer: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Yes, we ship worldwide.</p>
          <p style={{ margin: '0 0 10px 0' }}>Complimentary global shipping is offered on all orders above USD 600. For orders below this value, applicable shipping charges will be calculated and added at checkout.</p>
          <p style={{ margin: 0 }}>We also run special offers throughout the year - do stay connected with us for exclusive updates.</p>
        </>
      )
    },
    {
      question: "How long will it take to get my orders?",
      answer: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>All orders are processed from our New Delhi studio. Each piece has its own creation timeline, which is clearly mentioned on the product page.</p>
          <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>Once dispatched:</p>
          <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>International deliveries typically arrive within 4–7 business days</li>
            <li>Domestic deliveries take approximately 2–5 business days</li>
          </ul>
          <p style={{ margin: 0 }}>For time-sensitive requirements, express shipping options are available both within India and internationally.</p>
        </>
      )
    },
    {
      question: "Where are your brand stores located?",
      answer: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>You’re warmly invited to visit our studios and experience the collection in person.</p>
          <div style={{ padding: '15px', background: '#f9f9f9', borderLeft: '3px solid #111', fontStyle: 'normal' }}>
            <strong style={{ display: 'block', marginBottom: '5px' }}>New Delhi Studio:</strong>
            Pocket K, Sarita Vihar<br />
            New Delhi - 110076
          </div>
        </>
      )
    },
    {
      question: "Do you offer customizations?",
      answer: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Yes. At Ojas Couture, we offer bespoke customization to ensure every piece feels uniquely yours.</p>
          <p style={{ margin: '0 0 10px 0' }}>Most styles can be customized in terms of color, silhouette, blouse design, neckline, length, and select design refinements, subject to feasibility. All garments are tailored to your measurements at no additional charge.</p>
          <p style={{ margin: '0 0 10px 0' }}>Certain design modifications may incur an additional cost, which will be clearly communicated at the time of confirmation.</p>
          <p style={{ margin: 0 }}>For personalized guidance, please connect with our stylists at <a href="tel:+919650656166" style={{ color: '#000', fontWeight: '600' }}>+91-9650656166</a>.</p>
        </>
      )
    },
    {
      question: "What if my measurements don’t align with the size chart?",
      answer: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Our garments are designed to be tailored to your exact measurements. Simply share your details at the time of ordering, and our team will customise the piece to ensure an impeccable fit—at no additional charge.</p>
          <p style={{ margin: 0 }}>For assistance, please reach out to our stylists at <a href="tel:+919650656166" style={{ color: '#000', fontWeight: '600' }}>+91-9650656166</a>.</p>
        </>
      )
    },
    {
      question: "Do you offer alterations?",
      answer: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Yes. If your garment is delivered in the correct size but requires minor fit adjustments, our team will be happy to assist.</p>
          <p style={{ margin: 0 }}>You will only be required to bear the shipping cost for sending the garment back to us. The alterations themselves will be carried out at no additional charge, provided the request is raised within 48 hours of delivery.</p>
        </>
      )
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'serif' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Frequently Asked Questions
      </h2>

      <div style={{ borderTop: '1px solid #eee' }}>
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} style={{ borderBottom: '1px solid #eee' }}>
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
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
                <span>{item.question}</span>
                <span style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '300', 
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}>
                  ＋
                </span>
              </button>

              {/* Collapsible Answer Body */}
              <div style={{
                maxHeight: isOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out, padding 0.3s ease',
                paddingBottom: isOpen ? '20px' : '0',
                color: '#555',
                fontSize: '0.95rem',
                lineHeight: '1.6'
              }}>
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>

      {/* Escalation Footer */}
      <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#faf6f0', textAlign: 'center', borderRadius: '2px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.3rem', fontWeight: '500' }}>Have another question?</h3>
        <p style={{ margin: '0 0 10px 0' }}>Our team is always happy to help. Please contact us at <a href="tel:+919650656166" style={{ fontWeight: '600', color: '#000', textDecoration: 'none' }}>+91-9650656166</a> for any assistance.</p>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#777' }}>For escalations, you may write to us at <a href="mailto:sales@ojascouture.com" style={{ color: '#000' }}>sales@ojascouture.com</a></p>
      </div>
    </div>
  );
};

export default FAQ;