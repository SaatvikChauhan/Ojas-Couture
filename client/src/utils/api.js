import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ojas-couture-api.vercel.app/api/',
  timeout: 10000,
});

// ── ORDER ENDPOINTS ──────────────────────────────────────────────────────────
export const orderAPI = {
  create: (orderData) => api.post('/orders', orderData),
};

// ── PRODUCT & REVIEW ENDPOINTS (CONSOLIDATED) ────────────────────────────────
export const productAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
<<<<<<< HEAD
  
  markHelpful: (productId, reviewId) => 
    api.post(`/products/${productId}/review/${reviewId}/helpful`).then(res => res.data),

  approveReview: (productId, reviewId) => 
    api.put(`/products/${productId}/review/${reviewId}/approve`, {}, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('ojasAdminToken')}` }
    }).then(res => res.data)
=======
  markHelpful: (productId, reviewId) => fetch(`/api/products/${productId}/review/${reviewId}/helpful`, {
        method: 'POST'
    }).then(res => res.json()),

    approveReview: (productId, reviewId) => fetch(`/api/products/${productId}/review/${reviewId}/approve`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('ojasAdminToken')}` }
    }).then(res => res.json())
>>>>>>> 795e044a8801857bcf55f80db12994efe93e2c1a
};

// ── WISHLIST ENDPOINTS ───────────────────────────────────────────────────────
export const wishlistAPI = {
  get: () => 
    api.get('/wishlist', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).then(res => res.data),

  toggle: (productId) => 
    api.post('/wishlist/toggle', { productId }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).then(res => res.data)
};

// ── TESTIMONIAL ENDPOINTS ────────────────────────────────────────────────────
export const testimonialAPI = {
  getAll: (params = {}) => api.get('/testimonials', { params }),
  create: (data) => api.post('/testimonials', data),
};

// ── BLOG ENDPOINTS ───────────────────────────────────────────────────────────
export const blogAPI = {
  getAll: (params = {}) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
};

// ── HOMEPAGE ENDPOINTS ───────────────────────────────────────────────────────
export const homepageAPI = {
  get: () => api.get('/homepage'),
};

// ── CONTACT ENDPOINTS ────────────────────────────────────────────────────────
export const contactAPI = {
  send: (data) => api.post('/contact', data),
};

// ── FAQ ENDPOINTS ────────────────────────────────────────────────────────────
export const faqAPI = {
  getAll: (params = {}) => api.get('/faq', { params }),
};

// ── NEWSLETTER ENDPOINTS ─────────────────────────────────────────────────────
export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter', { email }),
};

// ── AUTH ENDPOINTS ───────────────────────────────────────────────────────────
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

// ── MEMBERSHIP ENDPOINTS ─────────────────────────────────────────────────────
export const membershipAPI = {
  apply: (data) => api.post('/memberships/apply', data),
  getStatus: (email) => api.get(`/memberships/status/${email}`)
};
<<<<<<< HEAD

export default api;
=======
export default api;
>>>>>>> 795e044a8801857bcf55f80db12994efe93e2c1a
