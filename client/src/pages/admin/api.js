// src/pages/admin/api.js
// All admin API calls — token is read from localStorage

const BASE = import.meta.env.VITE_API_URL || '';

const token = () => localStorage.getItem('ojasAdminToken');

const headers = (isFormData = false) => {
  const h = { Authorization: `Bearer ${token()}` };
  if (!isFormData) h['Content-Type'] = 'application/json';
  return h;
};

const req = async (method, path, body = null, isFormData = false) => {
  const opts = { method, headers: headers(isFormData) };
  if (body) opts.body = isFormData ? body : JSON.stringify(body);
  const res = await fetch(`${BASE}/api${path}`, opts);
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('ojasAdminToken');
    window.location.href = '/admin/login';
    return;
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ msg: 'Request failed' }));
    throw new Error(err.msg || 'Request failed');
  }
  return res.json();
};

export const api = {
  // ── Auth ──────────────────────────────────────────────
  login: (email, password) =>
    req('POST', '/admin/auth/login', { email, password }),

  // ── Products ──────────────────────────────────────────
  getProducts: (params = {}) =>
    req('GET', `/admin/products?${new URLSearchParams(params)}`),
  getProduct: (id) => req('GET', `/admin/products/${id}`),
  createProduct: (data) => req('POST', '/admin/products', data),
  updateProduct: (id, data) => req('PUT', `/admin/products/${id}`, data),
  deleteProduct: (id) => req('DELETE', `/admin/products/${id}`),
  uploadImages: (files) => {
    const fd = new FormData();
    files.forEach(f => fd.append('images', f));
    return req('POST', '/admin/products/upload', fd, true);
  },

  // ── Categories ────────────────────────────────────────
  getCategories: () => req('GET', '/admin/categories'),
  createCategory: (data) => req('POST', '/admin/categories', data),
  updateCategory: (id, data) => req('PUT', `/admin/categories/${id}`, data),
  deleteCategory: (id) => req('DELETE', `/admin/categories/${id}`),

  // ── Collections ───────────────────────────────────────
  getCollections: () => req('GET', '/admin/collections'),
  getCollection: (id) => req('GET', `/admin/collections/${id}`),
  createCollection: (data) => req('POST', '/admin/collections', data),
  updateCollection: (id, data) => req('PUT', `/admin/collections/${id}`, data),
  deleteCollection: (id) => req('DELETE', `/admin/collections/${id}`),
  uploadCollectionBanner: (file) => {
    const fd = new FormData();
    fd.append('banner', file);
    return req('POST', '/admin/collections/upload-banner', fd, true);
  },

  // ── Homepage ──────────────────────────────────────────
  getHomepage: () => req('GET', '/admin/homepage'),
  updateHomepage: (data) => req('PUT', '/admin/homepage', data),
  uploadHomepageImage: (file) => {
    const fd = new FormData();
    fd.append('image', file);
    return req('POST', '/admin/homepage/upload', fd, true);
  },
};