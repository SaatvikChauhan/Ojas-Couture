// All admin API calls — token is read from localStorage

const BASE = 'https://ojas-couture-api.vercel.app';

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
    throw new Error(err.error || err.msg || 'Request failed');
  }
  return res.json();
};

export const api = {
  // ── Auth ──────────────────────────────────────────────
  login: (email, password) =>
    req('POST', '/admin/auth/login', { email, password }),

  // ── Products ──────────────────────────────────────────
  getProducts: (params = {}) =>
    req('GET', `/products?${new URLSearchParams(params)}`),
  getProduct: (id) => req('GET', `/products/${id}`),
  createProduct: (data) => req('POST', '/products/create', data),
  updateProduct: (id, data) => req('PUT', `/products/${id}`, data),
  deleteProduct: (id) => req('DELETE', `/products/${id}`),
  uploadImages: (files) => {
    const fd = new FormData();
    files.forEach(f => fd.append('images', f));
    return req('POST', '/products/upload', fd, true);
  },

  // ── Categories ────────────────────────────────────────
  getCategories: () => req('GET', '/categories'),
  createCategory: (data) => req('POST', '/categories', data),
  updateCategory: (id, data) => req('PUT', `/categories/${id}`, data),
  deleteCategory: (id) => req('DELETE', `/categories/${id}`),

  // ── Collections ───────────────────────────────────────
  getCollections: () => req('GET', '/collections'),
  getCollection: (id) => req('GET', `/collections/${id}`),
  createCollection: (data) => req('POST', '/collections', data),
  updateCollection: (id, data) => req('PUT', `/collections/${id}`, data),
  deleteCollection: (id) => req('DELETE', `/collections/${id}`),
  uploadCollectionBanner: (file) => {
    const fd = new FormData();
    fd.append('banner', file);
    return req('POST', '/collections/upload-banner', fd, true);
  },

  // ── Homepage ──────────────────────────────────────────
  getHomepage: () => req('GET', '/homepage'),
  updateHomepage: (data) => req('PUT', '/homepage', data),
  uploadHomepageImage: (file) => {
    const fd = new FormData();
    fd.append('image', file);
    return req('POST', '/homepage/upload', fd, true);
  },
};