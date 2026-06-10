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
        
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-brand">OJAS</span>
            <span className="footer-logo-sub">COUTURE</span>
          </div>
          <p className="footer-tagline">
            Rooted in tradition and led by women for decades, we bring the magic and simple opulence of the past back to life, creating timeless styles for today’s little wonders.
          </p>
          <p className="footer-brand-extra-text">
            ojas couture is a luxury brand........more
          </p>
        </div>

        {/* Information Section */}
        <div className="footer-links">
          <h4>INFORMATION</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/shipping-delivery">Shipping and Delivery</Link></li>
            <li><Link to="/appointments">Appointments/Get In Touch</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/privacy-terms">Privacy ,Terms & Conditions</Link></li>
            <li><Link to="/faq">F&Q</Link></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footer-links">
          <h4>CONTACT US</h4>
          <div className="footer-contact-info">
            <a href="mailto:contact@ojascouture.com">contact@ojascouture.com</a>
            <a href="tel:+919650656166">+91-9650656166</a>
          </div>
          <div className="footer-social-icons">
            {/* Social media placeholder links as per the site icons */}
            <a href="#" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Return & Exchange Section */}
        <div className="footer-links">
          <h4>ABOUT US</h4>
          <ul>
            <li><Link to="/return-exchange">Return & Exchange</Link></li>
            <li><Link to="/exchange-return-form">Exchange & Return Form</Link></li>
          </ul>
        </div>

        {/* Legal / Policies Section */}
        <div className="footer-links">
          <h4>LEGAL</h4>
          <ul>
            <li><Link to="/cancellation-refund">Cancellation & Refund</Link></li>
            <li><Link to="/faq">F&Q</Link></li>
            <li><Link to="/shipping-delivery">Shipping and Delivery</Link></li>
            <li><Link to="/appointments">Appointments/Get In Touch</Link></li>
            <li><Link to="/privacy-terms">Privacy ,Terms & Conditions</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Join Our Fashion Family (Newsletter Form) */}
        <div className="footer-newsletter">
          <h4>Join Our Fashion Family</h4>
          <p>Stay updated on the latest Indian clothing trends.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <label htmlFor="newsletter-email">Subscribe form 2 Enter your email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email here"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Join us now!</button>
          </form>
          {msg && <p className="newsletter-msg">{msg}</p>}
        </div>

      </div>

      {/* Footer Bottom Copyright Section */}
      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()}. Ojas Couture. Powered By Radiant Synergy</p>
      </div>
    </footer>
  );
}