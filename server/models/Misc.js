const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, enum: ['ordering', 'shipping', 'returns', 'sizing', 'fabric', 'customization'], default: 'ordering' },
  order: { type: Number, default: 0 }
});

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  subscribedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  category: { type: String, default: 'general' },
  source: { type: String, default: 'website' },
  unsubToken: { type: String }
});

module.exports = {
  Contact: mongoose.model('Contact', contactSchema),
  FAQ: mongoose.model('FAQ', faqSchema),
  Newsletter: mongoose.model('Newsletter', newsletterSchema)
};
