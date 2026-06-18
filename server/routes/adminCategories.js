const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const Category = require('../models/Category');

const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

// GET all
router.get('/', adminAuth, async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const cat = new Category({ name, slug: slugify(name), description, image });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, image, isActive } = req.body;
    const update = { description, image, isActive };
    if (name) { update.name = name; update.slug = slugify(name); }
    const cat = await Category.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;