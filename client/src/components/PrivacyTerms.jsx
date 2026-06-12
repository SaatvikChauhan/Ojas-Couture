import React, { useState } from 'react';

const PrivacyTerms = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const policyData = [
    {
      title: "Introduction & Scope",
      content: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>Ojas Couture and its subsidiaries and divisions, including Ojascouture.com, respect your privacy. This Privacy Policy outlines the manner your data is collected and used by us. You are advised to please read the Privacy Policy carefully. By accessing the services provided by Ojascouture.com you agree to the collection and use of your data by Ojascouture.com in the manner provided in this Privacy Policy.</p>
          <p style={{ margin: '0 0 10px 0' }}>If you have questions or concerns regarding this statement, you can contact us at <a href="mailto:contact@ojascouture.com" style={{ color: '#000', fontWeight: '500' }}>contact@ojascouture.com</a></p>
          <p style={{ margin: 0 }}>The Policy does not apply to the procedures and practices followed by entities that are not managed, owned or controlled by ojascouture.com or to the people that are not engaged, employed or managed by ojascouture.com.</p>
        </>
      )
    },
    {
      title: "Information That May Be Collected From You",
      content: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>ojascouture.com collects the details provided by you on registration together with information we learn about you from your use of our service and your visits to our website and other websites accessible from them.</p>
          <p style={{ margin: '0 0 10px 0', padding: '12px', background: '#fcf8f2', borderLeft: '3px solid #b58e58' }}>
            <strong>Payment Card Security Notice:</strong> ojascouture.com does not collect your Payment Card details (i.e. credit/debit card number, expiration date, CVV etc.). When you make a purchase using your card, you are automatically redirected to the acquiring bank payment gateway website, where all required transaction details are captured on the secured payment page, and encrypted using Industrial Strength Cipher, and are securely transmitted to your card issuer. At no time do we have access to or store your complete card account information.
          </p>
          <p style={{ margin: 0 }}>We may collect additional information in connection with your participation in any promotions or contests offered by us and the information you provide when giving us feedback or completing profile forms. We also monitor customer traffic patterns and website use to improve our services.</p>
        </>
      )
    },
    {
      title: "When / How Do We Collect The Information?",
      content: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>We will collect anonymous traffic information from you when you visit our website.</p>
          <p style={{ margin: '0 0 10px 0' }}>We collect personally identifiable information from you when you register with us or you transact as a guest. During registration you are required to give us your contact information (such as name, email address, date of birth, gender, billing address, delivery address, pin code, mobile number, occupation, interests etc.).</p>
          <p style={{ margin: '0 0 10px 0' }}>When you purchase a product or service from us, we request certain personally identifiable information from you on our order form for billing and order fulfillment purposes. If we have trouble processing an order, we will use this information to contact you.</p>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Please note: Any information disclosed in public areas like chat rooms, forums, or message boards becomes public information. We have no control over its use and advise exercising caution.</p>
        </>
      )
    },
    {
      title: "How Is The Information Used?",
      content: (
        <>
          <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>We use your contact information to send you:</p>
          <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px' }}>
            <li>Password reminders and registration confirmations.</li>
            <li>Special promotional offers and new arrival notifications.</li>
            <li>Changes in service policies or terms of use.</li>
            <li>Event-based communications (order status updates, delivery alerts, etc.).</li>
          </ul>
          <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>We use your personal information to:</p>
          <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px' }}>
            <li>Improve personalized website features to enhance your shopping experience.</li>
            <li>Contact you for account/profile related matters.</li>
            <li>Deliver merchandise ordered by you.</li>
          </ul>
          <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>We use anonymous traffic information to:</p>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Remember your browsing preferences and track entries in promotional schemes.</li>
            <li>Administer and manage smooth functioning of our website by diagnosing server problems.</li>
          </ul>
        </>
      )
    },
    {
      title: "Who Do We Share Your Information With?",
      content: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>We do not rent, sell, or share your personal information with third parties except our enabling agents (such as outside shipping companies, resellers, and credit card processing partners like YES BANK) to fulfill your orders.</p>
          <p style={{ margin: '0 0 10px 0' }}>We may also share aggregate, non-personally-identifiable data with advertisers.</p>
          <p style={{ margin: 0 }}>We reserve the right to disclose personally identifiable information as required by law, court orders, subpoenas, or legal authorities when necessary to protect our legal rights or investigate potential fraud and illegal activities.</p>
        </>
      )
    },
    {
      title: "Cookies & Tracking Choices",
      content: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>We use both session ID cookies (which expire when you close your browser) and persistent cookies to store browsing preferences, maintain your secure session, and protect your shopping bag against spamming utilities.</p>
          <p style={{ margin: '0 0 10px 0' }}>You can accept or decline cookies using your browser configuration settings. If you reject cookies, your ability to utilize certain secure zones or features of the shopping cart layout may be limited.</p>
          <p style={{ margin: 0 }}>Reference guidelines for general cookie protocols can be examined at <a href="http://www.cookiecentral.com/" target="_blank" rel="noreferrer" style={{ color: '#000' }}>Cookie Central</a>.</p>
        </>
      )
    },
    {
      title: "Security & Retention Standards",
      content: (
        <>
          <p style={{ margin: '0 0 10px 0' }}>To safeguard data against loss or alteration, we implement physical, electronic, and managerial procedures. Sensitive communication routes employ Secure Socket Layer (SSL) encryption frameworks.</p>
          <p style={{ margin: '0 0 10px 0' }}>While we follow industry standards to protect your data, no method of transmission over the Internet is 100% secure; thus, absolute security cannot be guaranteed.</p>
          <p style={{ margin: 0 }}>You can opt-in or opt-out of marketing communications at any time. To correct, update, or cancel your registration database footprint, contact our support team at <a href="mailto:contactus@ojascouture.com" style={{ color: '#000' }}>contactus@ojascouture.com</a>.</p>
        </>
      )
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'serif' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '40px', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Privacy, Terms & Conditions
      </h2>

      <div style={{ borderTop: '1px solid #eee' }}>
        {policyData.map((item, index) => {
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
                maxHeight: isOpen ? '1000px' : '0',
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

      {/* Corporate Contact Block */}
      <div style={{ marginTop: '50px', padding: '25px', borderTop: '1px dashed #ccc', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 10px 0', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1px' }}>Corporate Address</h4>
        <p style={{ margin: '0 0 5px 0', color: '#444' }}><strong>Ojas Couture</strong></p>
        <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '0.9rem' }}>Sarita Vihar, New Delhi 110076, India</p>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          Phone: <a href="tel:+919650656166" style={{ color: '#000', textDecoration: 'none', fontWeight: '500' }}>+91-9650656166</a> | Email: <a href="mailto:contactus@ojascouture.com" style={{ color: '#000' }}>contactus@ojascouture.com</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyTerms;