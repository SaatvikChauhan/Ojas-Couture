const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  avatar: { type: String },
  approved: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
