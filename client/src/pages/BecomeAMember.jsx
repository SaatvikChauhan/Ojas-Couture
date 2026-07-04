import React, { useState } from 'react';
import { membershipAPI } from '../utils/api';

export default function BecomeMember() {
  const [form, setForm] = useState({
    fullName: '', email: '', mobileNumber: '',
    city: '', state: '', country: '',
    profile: '', dob: '', anniversary: '',
    membershipType: 'Silver',
    termsAccepted: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.termsAccepted) return alert('Please accept the Terms & Conditions.');
    
    setLoading(true);
    try {
      await membershipAPI.apply(form);
      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ paddingTop: 120, paddingBottom: 80, textAlign: 'center' }}>
        <h2>Application Received!</h2>
        <p style={{ color: '#666', marginTop: 16 }}>Thank you for applying to the Ojas Couture community. Our team will review your application and notify you of your approval shortly.</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 100, paddingBottom: 80, background: '#faf9f8' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        
        {/* Header & Benefits */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>Become a Member</h1>
          <p style={{ color: '#555', marginTop: 16, lineHeight: 1.6 }}>
            Join the Ojas Couture community and become part of a network dedicated to preserving, promoting, and innovating textile and fashion traditions. Whether you are a designer, artisan, researcher, student, entrepreneur, or textile enthusiast, membership offers opportunities to connect, learn, collaborate, and grow.
          </p>
        </div>

        <div style={{ background: '#fff', padding: 32, borderRadius: 8, marginBottom: 40, border: '1px solid #eaeaea' }}>
          <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: 16, marginBottom: 20 }}>Membership Benefits</h3>
          <ul style={{ lineHeight: 1.8, color: '#444', paddingLeft: 20 }}>
            <li>Access to exclusive textile and fashion content</li>
            <li>Invitations to exhibitions, workshops, seminars, and events</li>
            <li>Early access to new collections, publications, and research</li>
            <li>Member-only newsletters and updates</li>
            <li>Special discounts on selected programs, events, and publications</li>
            <li>Recognition within the Ojas Couture community</li>
          </ul>
        </div>

        {/* Application Form */}
        <div style={{ background: '#fff', padding: 40, borderRadius: 8, border: '1px solid #eaeaea' }}>
          <h3 style={{ marginBottom: 24 }}>Membership Application Form</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <input style={inputStyle} type="text" placeholder="Full Name" required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} />
              <input style={inputStyle} type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <input style={inputStyle} type="tel" placeholder="Mobile Number" required value={form.mobileNumber} onChange={e => setForm({...form, mobileNumber: e.target.value})} />
              <input style={inputStyle} type="text" placeholder="City" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
              <input style={inputStyle} type="text" placeholder="State" required value={form.state} onChange={e => setForm({...form, state: e.target.value})} />
              <input style={inputStyle} type="text" placeholder="Country" required value={form.country} onChange={e => setForm({...form, country: e.target.value})} />
            </div>

            <textarea style={{...inputStyle, minHeight: 100}} placeholder="Brief Profile - Introduction" required value={form.profile} onChange={e => setForm({...form, profile: e.target.value})} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
              <div>
                <label style={labelStyle}>Date of Birth</label>
                <input style={inputStyle} type="date" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Anniversary Date</label>
                <input style={inputStyle} type="date" value={form.anniversary} onChange={e => setForm({...form, anniversary: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Membership Type</label>
                <select style={inputStyle} value={form.membershipType} onChange={e => setForm({...form, membershipType: e.target.value})}>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.termsAccepted} onChange={e => setForm({...form, termsAccepted: e.target.checked})} />
              <span style={{ fontSize: 14, color: '#555' }}>I accept the Terms & Conditions and Membership Process.</span>
            </label>

            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '16px', fontSize: '16px', marginTop: 10 }}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

const inputStyle = { padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: 4, width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' };
const labelStyle = { display: 'block', fontSize: 12, color: '#666', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 };