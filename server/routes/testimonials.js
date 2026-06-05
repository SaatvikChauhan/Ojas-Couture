const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = { approved: true };
    if (featured === 'true') filter.featured = true;
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json({ message: 'Thank you! Your testimonial is under review.', testimonial });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
