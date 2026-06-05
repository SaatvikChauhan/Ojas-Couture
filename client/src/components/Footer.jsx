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
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-brand">OJAS</span>
            <span className="footer-logo-sub">COUTURE</span>
          </div>
          <p className="footer-tagline">
            Elegant Indian Women's Clothing,<br />
            crafted with love by Pratibha Rajput.
          </p>
          <div className="footer-contact-info">
            <a href="https://wa.me/919876543210" className="footer-wa-link" target="_blank" rel="noreferrer">
              📱 WhatsApp Us
            </a>
            <a href="mailto:hello@ojascouture.com">✉ hello@ojascouture.com</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/little-wonders">Little Wonders</Link></li>
            <li><Link to="/shop?filter=bestSeller">Best Sellers</Link></li>
            <li><Link to="/shop?filter=specialPrice">Special Price</Link></li>
            <li><Link to="/blog">Our Blog</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Information</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/join-family">Join Our Family</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Join the Family</h4>
          <p>Get updates on new arrivals, styling tips & exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
          {msg && <p className="newsletter-msg">{msg}</p>}
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()} Ojas Couture. Powered by Radiant Synergy.</p>
        <p>Designed with ♥ for Indian women everywhere</p>
      </div>
    </footer>
  );
}
