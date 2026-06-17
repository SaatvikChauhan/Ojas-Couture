const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isAdmin: true });
    if (!user) return res.status(403).json({ msg: 'Not authorized' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Utility: seed first admin (run once, disable in production)
// POST /api/admin/auth/seed  { name, email, password, secret }
router.post('/seed', async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;
    if (secret !== process.env.ADMIN_SEED_SECRET) return res.status(403).json({ msg: 'Forbidden' });

    const existing = await User.findOne({ email });
    if (existing) {
      existing.isAdmin = true;
      await existing.save();
      return res.json({ msg: 'User promoted to admin' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, isAdmin: true });
    await user.save();
    res.json({ msg: 'Admin created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;