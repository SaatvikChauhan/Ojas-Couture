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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onClose();
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  const goAdmin = () => {
    onClose();
    navigate('/admin');
  };

  return (
    <div className="modal-overlay">
      {/* Added position: 'relative' so the absolute button anchors to this container */}
      <div className="modal" style={{ position: 'relative' }}>
        
        {/* Absolutely positioned close button */}
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
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSubmit} className="btn-primary">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
          {isLogin ? "Create account" : "Already have an account?"}
        </p>

        {/* Subtle admin entry — unobtrusive, below the fold */}
        <p style={{ marginTop: 20, textAlign: 'center' }}>
          <button
            onClick={goAdmin}
            className='btn-secondary'
          >
            Admin access
          </button>
        </p>
      </div>
    </div>
  );
}