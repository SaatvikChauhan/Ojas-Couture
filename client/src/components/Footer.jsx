import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { newsletterAPI } from '../utils/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

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

  return (
    <footer className="footer">
      <div className="footer-top container">
        
        {/* Column 1: ABOUT US & CONTACT US */}
        <div className="footer-column">
          <div className="footer-group">
            <h4>ABOUT US</h4>
            <p>
              Rooted in tradition and led by women for decades, we bring the magic and simple opulence of the past back to life, creating timeless styles for today’s little wonders.
            </p>
          </div>
          
          <div className="footer-group contact-section">
            <h4>CONTACT US</h4>
            <p className="contact-phone">+91-9650656166</p>
            <p className="contact-email">
              <a href="mailto:contact@ojascouture.com">contact@ojascouture.com</a>
            </p>
          </div>
        </div>

        {/* Column 2: INFORMATION */}
        <div className="footer-column">
          <h4>INFORMATION</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/appointments">Appointments/Get In Touch</Link></li>
            <li><Link to="/shipping-and-delivery" style={{ color: 'inherit', textDecoration: 'none' }}>
  Shipping and Delivery
</Link></li>
            <li><Link to="/faq">F&Q</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            
          </ul>
        </div>

        {/* Column 3: LEGAL */}
        <div className="footer-column">
          <h4>LEGAL</h4>
          <ul>
           <li><Link to="/privacy-terms-condition">Privacy ,Terms & Conditions</Link></li>
            <Link to="/terms-of-service" style={{ color: 'inherit', textDecoration: 'none' }}>
  Terms of Service
</Link>
            <li><Link to="/cancellation-refund">Cancellation & Refund</Link></li>
            <li><Link to="/return-exchange">Return & Exchange</Link></li>
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
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom container">
        <p className="footer-brand-text">ojas couture is a luxury brand........more</p>
        <p className="footer-copyright">© 2026. Ojas Couture. Powered By Radiant Synergy</p>
      </div>
    </footer>
  );
}