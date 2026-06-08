import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ojas-couture-api.vercel.app/api/',
  timeout: 10000,
});

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

export const contactAPI = {
  send: (data) => api.post('/contact', data),
};

export const faqAPI = {
  getAll: (params = {}) => api.get('/faq', { params }),
};

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter', { email }),
};

export default api;
