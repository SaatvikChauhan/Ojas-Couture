import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ojas-couture-api.vercel.app/api/',
  timeout: 10000,
});

// Add this exported object to your api.js file
export const orderAPI = {
  create: (orderData) => api.post('/orders', orderData),
};
export const productAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
};

export const testimonialAPI = {
  getAll: (params = {}) => api.get('/testimonials', { params }),
  create: (data) => api.post('/testimonials', data),
};

export const blogAPI = {
  getAll: (params = {}) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
};

export const homepageAPI = {
  get: () => api.get('/homepage'),
};

export const contactAPI = {
  send: (data) => api.post('/contact', data),
};

export const faqAPI = {
  getAll: (params = {}) => api.get('/faq', { params }),
};

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter', { email }),
};
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};
export const wishlistAPI = {
    get: () => fetch('/api/wishlist', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).then(res => res.json()),

    toggle: (productId) => fetch('/api/wishlist/toggle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId })
    }).then(res => res.json())
};
export const membershipAPI = {
  apply: (data) => api.post('/memberships/apply', data),
  getStatus: (email) => api.get(`/memberships/status/${email}`)
};
export const productAPI = {
    // ... your existing getById and addReview endpoints ...
    
    markHelpful: (productId, reviewId) => fetch(`/api/products/${productId}/review/${reviewId}/helpful`, {
        method: 'POST'
    }).then(res => res.json()),

    approveReview: (productId, reviewId) => fetch(`/api/products/${productId}/review/${reviewId}/approve`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('ojasAdminToken')}` }
    }).then(res => res.json())
};
export default api;
