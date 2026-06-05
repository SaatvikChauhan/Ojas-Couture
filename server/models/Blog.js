const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Pratibha Rajput' },
  coverImage: { type: String },
  category: { type: String, enum: ['styling-tips', 'fabric-guide', 'occasions', 'behind-the-scenes', 'news'] },
  tags: [{ type: String }],
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
