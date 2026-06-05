import React, { useState } from 'react';
import { contactAPI } from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await contactAPI.send(form);
      setStatus(res.data.message);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('Something went wrong. Please WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 72 }}>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p className="breadcrumb">Home · <span>Contact</span></p>
      </div>

      <div className="contact-layout container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p className="contact-intro">We love hearing from you. Reach out for order enquiries, custom stitching consultations, or just to say hello!</p>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">💬</div>
              <div>
                <h4>WhatsApp (Fastest)</h4>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="method-link">
                  +91 98765 43210
                </a>
                <p>Typically respond within 30 minutes</p>
              </div>
            </div>
            <div className="contact-method">
              <div className="method-icon">✉</div>
              <div>
                <h4>Email</h4>
                <a href="mailto:hello@ojascouture.com" className="method-link">hello@ojascouture.com</a>
                <p>We reply within 24 hours</p>
              </div>
            </div>
            <div className="contact-method">
              <div className="method-icon">⏰</div>
              <div>
                <h4>Working Hours</h4>
                <p>Monday – Saturday<br />10:00 AM – 7:00 PM IST</p>
              </div>
            </div>
          </div>

          <div className="contact-wa-cta">
            <a
              href="https://wa.me/919876543210?text=Hi! I would like to enquire about Ojas Couture."
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ display: 'inline-block' }}
            >
              📱 Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="contact-form-wrap">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="your@email.com" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone (Optional)</label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} placeholder="Order enquiry, custom stitching..." />
              </div>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Tell us how we can help you..." required rows={5} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status && <p className="contact-status">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
