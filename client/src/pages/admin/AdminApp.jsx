// src/pages/admin/AdminApp.jsx
// Mounted at /admin/* in App.jsx — handles its own auth + routing

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Products from './Products';
import Categories from './Categories';
import Collections from './Collections';
import Homepage from './Homepage';

export default function AdminApp() {
  const [user, setUser] = useState(() => {
    // Restore session if token exists
    const token = localStorage.getItem('ojasAdminToken');
    const saved = localStorage.getItem('ojasAdminUser');
    if (token && saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return null;
  });

  const handleLogin = (u) => {
    setUser(u);
    localStorage.setItem('ojasAdminUser', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ojasAdminToken');
    localStorage.removeItem('ojasAdminUser');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="collections" element={<Collections />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Layout>
  );
}