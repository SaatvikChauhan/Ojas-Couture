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
        
        {/* Left Column: ABOUT US & CONTACT US */}
        <div className="footer-column brand-contact-col">
          <div className="footer-section">
            <h4>ABOUT US</h4>
            <p className="footer-tagline">
              Rooted in tradition and led by women for decades, we bring the magic and simple opulence of the past back to life, creating timeless styles for today’s little wonders.
            </p>
          </div>
          
          <div className="footer-section contact-info-section">
            <h4>CONTACT US</h4>
            <p className="contact-phone">+91-9650656166</p>
            <p className="contact-email">
              <a href="mailto:contact@ojascouture.com">contact@ojascouture.com</a>
            </p>
          </div>
        </div>

        {/* Second Column: INFORMATION */}
        <div className="footer-column links-col">
          <h4>INFORMATION</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/appointments">Appointments/Get In Touch</Link></li>
            <li><Link to="/shipping-delivery">Shipping and Delivery</Link></li>
            <li><Link to="/faq">F&Q</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Third Column: LEGAL */}
        <div className="footer-column links-col">
          <h4>LEGAL</h4>
          <ul>
            <li><Link to="/privacy-terms">Privacy ,Terms & Conditions</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/cancellation-refund">Cancellation & Refund</Link></li>
            <li><Link to="/return-exchange">Return & Exchange</Link></li>
            <li><Link to="/exchange-return-form">Exchange & Return Form</Link></li>
          </ul>
        </div>

        {/* Right Column: Newsletter Form & Social Icons */}
        <div className="footer-column newsletter-col">
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

          {/* Social Media Links matching the display icons */}
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

      {/* Footer Bottom Metadata and Copyright */}
      <div className="footer-bottom container">
        <p className="footer-more-text">ojas couture is a luxury brand........more</p>
        <p className="footer-copyright">
          © {new Date().getFullYear()}. Ojas Couture. Powered By Radiant Synergy
        </p>
      </div>
    </footer>
  );
}