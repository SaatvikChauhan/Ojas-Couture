const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get reviews for a product
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select('reviews name');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product.reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a review
router.post('/:productId', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    product.reviews.push({ name, rating: Number(rating), comment });
    await product.save();
    res.status(201).json({ message: 'Review submitted!', reviews: product.reviews });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
