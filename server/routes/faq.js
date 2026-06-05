const express = require('express');
const router = express.Router();
const { FAQ } = require('../models/Misc');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const faqs = await FAQ.find(filter).sort({ order: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
