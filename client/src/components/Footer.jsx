import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsletterAPI, homepageAPI } from '../utils/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // State to hold dynamic data from the database
  const [homeData, setHomeData] = useState(null);

  // Fetch footer data on mount
  useEffect(() => {
    if (homepageAPI) {
      homepageAPI.get()
        .then(res => {
          if (res.data) setHomeData(res.data);
        })
        .catch(err => console.error("Failed to load footer data", err));
    }
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await newsletterAPI.subscribe(email);
      setMsg(res.data.message);
      setEmail('');
    } catch {
      setMsg('Something went wrong. Please try again.');
    }
  };

  // Clean up the instagram handle to create a valid URL
  const instaHandle = homeData?.instagramHandle?.replace('@', '') || '';

  return (
    <footer className="footer" style={{ borderTop: 'none' }}>
      <div className="footer-top container">
        
        {/* Column 1: ABOUT US & CONTACT US */}
        <div className="footer-column">
          <div className="footer-group">
            <h4>ABOUT US</h4>
            <p>
              {/* Fallback to original text if db text is missing. You can also truncate db text if it's too long */}
              {homeData?.aboutText 
                ? `${homeData.aboutText.substring(0, 160)}...` 
                : "Rooted in tradition and led by women for decades, we bring the magic and simple opulence of the past back to life, creating timeless styles for today’s little wonders."}
            </p>
          </div>
          
          <div className="footer-group contact-section" style={{ marginTop: '30px' }}>
            <h4>CONTACT US</h4>
            <p className="contact-phone">{homeData?.contactPhone || '+91-9650656166'}</p>
            <p className="contact-email">
              <a href={`mailto:${homeData?.contactEmail || 'contact@ojascouture.com'}`}>
                {homeData?.contactEmail || 'contact@ojascouture.com'}
              </a>
            </p>
          </div>
        </div>

        {/* Column 2: INFORMATION */}
        <div className="footer-column">
          <h4>INFORMATION</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/appointments">Appointments/Get In Touch</Link></li>
            <li><Link to="/shipping-and-delivery" style={{ color: 'inherit', textDecoration: 'none' }}>Shipping and Delivery</Link></li>
            <li><Link to="/faq">F&Q</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Column 3: LEGAL */}
        <div className="footer-column">
          <h4>LEGAL</h4>
          <ul>
            <li><Link to="/privacy-terms-condition">Privacy ,Terms & Conditions</Link></li>
            <li><Link to="/terms-of-service" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link></li>
            <li><Link to="/cancellation-refund">Cancellation & Refund</Link></li>
            <li><Link to="/return-exchange" style={{ color: 'inherit', textDecoration: 'none' }}>Return & Exchange</Link></li>
            <li><Link to="/exchange-return-form">Exchange & Return Form</Link></li>
          </ul>
        </div>

        {/* Column 4: NEWSLETTER & SOCIALS */}
        <div className="footer-column newsletter-column">
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <label htmlFor="newsletter-email" className="newsletter-label">
              Enter your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email here"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-submit-query">
              Submit your query
            </button>
          </form>
          {msg && <p className="newsletter-msg">{msg}</p>}

          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            {/* Dynamically link to Instagram based on the handle in the database */}
            <a 
              href={instaHandle ? `https://instagram.com/${instaHandle}` : "https://instagram.com"} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            {/* Optionally add WhatsApp if provided in admin */}
            {homeData?.whatsappNumber && (
              <a 
                href={`https://wa.me/${homeData.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom container" style={{ borderTop: 'none', paddingTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
        <div className="footer-brand-container" style={{ width: '100%' }}>
          <p className="footer-brand-text" style={{ margin: '0' }}>
            ojas couture is a luxury brand
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="btn-read-more"
              style={{ background: 'none', border: 'none', color: '#b89243', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold', padding: 0 }}
            >
              {isExpanded ? '........less' : '........more'}
            </button>
          </p>

          {/* Expanded Luxury Content Blocks */}
          {isExpanded && (
            <div className="expanded-brand-content" style={{ marginTop: '20px', fontSize: '13px', lineHeight: '1.6', color: '#aaa' }}>
              <h3 style={{ color: '#fff', marginTop: '15px', fontSize: '16px' }}>Ojas Couture: Luxury Designer Ethnic Wear for Women</h3>
              <p>Ojas Couture is a celebration of timeless elegance, refined craftsmanship, and contemporary Indian fashion. Our designer ethnic wear collection is thoughtfully created for women who appreciate tradition while embracing modern sophistication.</p>

              <h4 style={{ color: '#fff', marginTop: '15px', fontSize: '14px' }}>Celebrating Every Woman with Grace and Style</h4>
              <p>At Ojas Couture, we believe that fashion is more than clothing—it is an expression of individuality. Our collections are designed to make every woman feel confident, beautiful, and empowered.</p>

              <h4 style={{ color: '#fff', marginTop: '15px', fontSize: '14px' }}>A Blend of Heritage and Contemporary Design</h4>
              <p>Inspired by India's rich textile heritage, Ojas Couture combines traditional craftsmanship with modern silhouettes. Intricate embroidery, premium fabrics, and elegant detailing define each piece.</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '20px' }}>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>Explore Our Ethnic Wear Collection</h4>
                  <ul style={{ paddingLeft: '15px', margin: '0', listStyleType: 'disc' }}>
                    <li>Designer Kurtas</li>
                    <li>Designer Lehengas</li>
                    <li>Sharara Sets</li>
                    <li>Anarkali Suits</li>
                    <li>Suit Sets</li>
                    <li>Designer Sarees</li>
                    <li>Dupattas</li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>Wedding Collection by Ojas Couture</h4>
                  <ul style={{ paddingLeft: '15px', margin: '0', listStyleType: 'disc' }}>
                    <li>Haldi Collection</li>
                    <li>Mehendi Collection</li>
                    <li>Reception Collection</li>
                    <li>Bridal Collection</li>
                    <li>Bridesmaid Collection</li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>Why Choose Ojas Couture?</h4>
                  <ul style={{ paddingLeft: '15px', margin: '0', listStyleType: 'disc' }}>
                    <li>Premium quality fabrics and craftsmanship</li>
                    <li>Timeless designs with contemporary appeal</li>
                    <li>Customization options for a perfect fit</li>
                    <li>Exclusive collections for weddings and festive occasions</li>
                    <li>Dedicated customer support and styling assistance</li>
                  </ul>
                </div>
              </div>

              <h4 style={{ color: '#fff', marginTop: '20px', fontSize: '14px' }}>Popular Searches</h4>
              <p style={{ fontStyle: 'italic', color: '#888', marginTop: '5px' }}>
                Designer Kurta Sets | Bridal Lehengas | Sharara Sets | Designer Sarees | Wedding Wear for Women | Festive Wear Collection | Anarkali Suits | Designer Dupattas | Luxury Ethnic Wear
              </p>
            </div>
          )}
        </div>
        
        <p className="footer-copyright" style={{ marginTop: '15px', marginOuter: '0', fontSize: '12px', color: '#666' }}>
          © {new Date().getFullYear()}. Ojas Couture. Powered By Radiant Synergy
        </p>
      </div>
    </footer>
  );
}