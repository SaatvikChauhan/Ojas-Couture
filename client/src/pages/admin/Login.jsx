// src/pages/admin/Login.jsx
import { useState } from 'react';
import { api } from './api';
import { s } from './ui';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(email, password);
      localStorage.setItem('ojasAdminToken', data.token);
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f9fafb', padding: 16,
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: 28, letterSpacing: 2, color: '#1a1a1a' }}>
            OJAS COUTURE
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#9ca3af', letterSpacing: 1 }}>ADMIN DASHBOARD</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: '0 0 24px', fontSize: 18, fontWeight: 600 }}>Sign in</h2>

          {error && (
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: 8, fontSize: 14, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 5 }}>Email</label>
              <input
                style={s.input}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@ojascouture.com"
                required
                autoFocus
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 5 }}>Password</label>
              <input
                style={s.input}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button style={{ ...s.btnPrimary, width: '100%', padding: '11px 0' }} type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
      <div>
        <Link to="/" style={{
          display: 'inline-block',
          padding: '10px 18px',
          background: '#1a1a1a',
          borderRadius: 8,
          textDecoration: 'none',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
        }}>
          Go to Website
        </Link>
      </div>
    </div>
  );
}