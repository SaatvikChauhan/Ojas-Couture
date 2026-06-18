const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true
  },
  subcategory: { type: String },
  images: [{ type: String }],
  badge: { type: String, enum: ['NEW', 'HANDMADE', 'NEW ARRIVAL', 'SALE', 'BEST SELLER', null] },
  fabric: { type: String },
  work: { type: String },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 10 },
  isLittleWonders: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isSpecialPrice: { type: Boolean, default: false },
  reviews: [reviewSchema],
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

productSchema.virtual('avgRating').get(function () {
  if (!this.reviews || !this.reviews.length) return 0;
  return (this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length).toFixed(1);
});

productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
