const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema({
  heroBanners: [{ type: String }],
  featuredCollection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' },
  aboutTitle: { type: String, default: 'About Ojas Couture' },
  aboutText: { type: String },
  aboutImage: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  contactAddress: { type: String },
  instagramHandle: { type: String },
  whatsappNumber: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Homepage', homepageSchema);