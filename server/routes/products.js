const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const adminAuth = require('../middleware/adminAuth');
const Product = require('../models/Product');
const ActivityLog = require('../models/activityLog'); // Import the tracking model

// ── Cloudinary setup ──────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ojas-couture/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC ROUTES  (no auth required)
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/products — filtered listing for storefront
router.get('/', async (req, res) => {
  try {
    const {
      category, badge,
      littleWonders, bestSeller, specialPrice,
      limit, page = 1,
    } = req.query;

    const filter = {};
    if (category)                 filter.category       = category;
    if (badge)                    filter.badge          = badge;
    if (littleWonders === 'true') filter.isLittleWonders = true;
    if (bestSeller    === 'true') filter.isBestSeller   = true;
    if (specialPrice  === 'true') filter.isSpecialPrice  = true;

    const pageSize = parseInt(limit) || 12;
    const skip     = (parseInt(page) - 1) * pageSize;

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize),
      Product.countDocuments(filter),
    ]);

    res.json({ products, total, page: parseInt(page), pages: Math.ceil(total / pageSize) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id — single product for storefront
router.get('/:id', async (req, res) => {
  try {
    // Skip admin sub-routes that start with "admin" or "upload"
    if (['admin', 'upload'].includes(req.params.id)) return next();
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/:id/reviews — add a customer review
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

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN ROUTES  (adminAuth middleware on every handler)
// ═══════════════════════════════════════════════════════════════════════════════

// POST /api/products/upload — upload images to Cloudinary, return URLs
router.post('/upload', adminAuth, upload.array('images', 10), async (req, res) => {
  try {
    const urls = req.files.map(f => f.path);
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/admin/create — create product (admin)
router.post('/create', adminAuth, async (req, res) => {
  try {
    const data = { ...req.body };

    ['tags', 'sizes', 'colors', 'images'].forEach(key => {
      if (typeof data[key] === 'string') {
        try { data[key] = JSON.parse(data[key]); } catch { data[key] = []; }
      }
    });

    if (!data.mainImage && data.images?.length) data.mainImage = data.images[0];
    if (data.category === 'little-wonders') data.isLittleWonders = true;
    data.inStock = data.status !== 'out-of-stock';

    const product = new Product(data);
    await product.save();

    // 🛡️ SECURITY TRACKING: Log creation action
    await ActivityLog.create({
      adminId: req.user.id,
      adminName: req.user.name || 'Admin',
      action: 'CREATE_PRODUCT',
      details: `Added product: ${product.name} (${product._id})`
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/products/admin/:id — update product (admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const data = { ...req.body };

    ['tags', 'sizes', 'colors', 'images'].forEach(key => {
      if (typeof data[key] === 'string') {
        try { data[key] = JSON.parse(data[key]); } catch { data[key] = []; }
      }
    });

    if (!data.mainImage && data.images?.length) data.mainImage = data.images[0];
    data.inStock   = data.status !== 'out-of-stock';
    data.updatedAt = new Date();

    const product = await Product.findByIdAndUpdate(
      req.params.id, data, { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ msg: 'Not found' });

    // 🛡️ SECURITY TRACKING: Log update action
    await ActivityLog.create({
      adminId: req.user.id,
      adminName: req.user.name || 'Admin',
      action: 'EDIT_PRODUCT',
      details: `Edited product fields for: ${product.name} (${product._id})`
    });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/products/admin/:id — delete product (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Not found' });

    // Delete images from Cloudinary (silent fail on each)
    if (product.images?.length) {
      await Promise.all(product.images.map(url => {
        const parts    = url.split('/');
        const file     = parts[parts.length - 1].split('.')[0];
        const folder   = parts[parts.length - 2];
        const publicId = `${folder}/${file}`;
        return cloudinary.uploader.destroy(publicId).catch(() => {});
      }));
    }

    // 🛡️ SECURITY TRACKING: Log delete action
    await ActivityLog.create({
      adminId: req.user.id,
      adminName: req.user.name || 'Admin',
      action: 'DELETE_PRODUCT',
      details: `Deleted product: ${product.name} (${product._id})`
    });

    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;