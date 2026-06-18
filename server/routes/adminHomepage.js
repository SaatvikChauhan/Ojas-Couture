const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const adminAuth = require('../middleware/adminAuth');
const Homepage = require('../models/Homepage');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'ojas-couture/homepage', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] },
});
const upload = multer({ storage });

// Upload homepage image (hero banners, about image)
router.post('/upload', adminAuth, upload.single('image'), async (req, res) => {
  try {
    res.json({ url: req.file.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET homepage settings (always returns single doc)
router.get('/', async (req, res) => {
  try {
    let homepage = await Homepage.findOne().populate('featuredCollection', 'name slug description banner');
    if (!homepage) homepage = await Homepage.create({});
    res.json(homepage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update homepage settings
router.put('/', adminAuth, async (req, res) => {
  try {
    let homepage = await Homepage.findOne();
    if (!homepage) homepage = new Homepage();
    Object.assign(homepage, req.body);
    await homepage.save();
    res.json(homepage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;