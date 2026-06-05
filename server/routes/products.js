const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, badge, littleWonders, bestSeller, specialPrice, limit, page = 1 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (badge) filter.badge = badge;
    if (littleWonders === 'true') filter.isLittleWonders = true;
    if (bestSeller === 'true') filter.isBestSeller = true;
    if (specialPrice === 'true') filter.isSpecialPrice = true;

    const pageSize = parseInt(limit) || 12;
    const skip = (parseInt(page) - 1) * pageSize;

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize),
      Product.countDocuments(filter)
    ]);

    res.json({ products, total, page: parseInt(page), pages: Math.ceil(total / pageSize) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add review to product
router.post('/:id/reviews', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.reviews.push({ name, rating: Number(rating), comment });
    await product.save();
    res.status(201).json({ message: 'Review added', reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create product (admin)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
