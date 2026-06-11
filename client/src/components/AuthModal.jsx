import React, { useState } from 'react';
import { authAPI } from '../utils/api';

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async () => {
  try {
    const res = isLogin
      ? await authAPI.login(form)
      : await authAPI.signup(form);

    localStorage.setItem("token", res.data.token);

    // ✅ store user also
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Success!");
    onClose();

    // OPTIONAL: refresh navbar
    window.location.reload();

  } catch (err) {
    alert(err.response?.data?.msg || "Error");
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal">
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

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create account" : "Already have an account?"}
        </p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}