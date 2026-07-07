import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = isLogin
        ? await authAPI.login(form)
        : await authAPI.signup(form);

      const { token, user } = res.data;

      // Check if user is Admin
      if (user.isAdmin) {
        // Save to Admin-specific keys
        localStorage.setItem("ojasAdminToken", token);
        localStorage.setItem("ojasAdminUser", JSON.stringify(user));
        
        onClose();
        navigate('/admin'); // Redirect to Admin Dashboard
      } else {
        // Save to Customer-specific keys
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        
        onClose();
        window.location.reload(); // Refresh to update navbar state
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ position: 'relative' }}>
        
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none', 
            border: 'none', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
            color: 'white'
          }}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {!isLogin && (
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSubmit} className="btn-primary">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p 
          onClick={() => setIsLogin(!isLogin)} 
          style={{ cursor: 'pointer', marginTop: '15px', fontSize: '0.9rem' }}
        >
          {isLogin ? "Create account" : "Already have an account?"}
        </p>

      </div>
    </div>
  );
}  