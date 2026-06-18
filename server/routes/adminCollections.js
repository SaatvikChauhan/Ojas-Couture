const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const adminAuth = require('../middleware/adminAuth');
const Collection = require('../models/Collection');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'ojas-couture/collections', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] },
});
const upload = multer({ storage });

const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

// Upload banner
router.post('/upload-banner', adminAuth, upload.single('banner'), async (req, res) => {
  try {
    res.json({ url: req.file.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all
router.get('/', adminAuth, async (req, res) => {
  try {
    const collections = await Collection.find().populate('products', 'name images price').sort({ createdAt: -1 });
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// GET single
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const col = await Collection.findById(req.params.id).populate('products', 'name images price category');
    if (!col) return res.status(404).json({ msg: 'Not found' });
    res.json(col);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, description, banner, products } = req.body;
    const col = new Collection({ name, slug: slugify(name), description, banner, products: products || [] });
    await col.save();
    res.status(201).json(col);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, banner, products, isActive } = req.body;
    const update = { description, banner, products, isActive };
    if (name) { update.name = name; update.slug = slugify(name); }
    const col = await Collection.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(col);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;