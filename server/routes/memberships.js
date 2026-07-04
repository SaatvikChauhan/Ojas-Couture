const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');
const adminAuth = require('../middleware/adminAuth');

// 🌐 PUBLIC: Submit a membership application
router.post('/apply', async (req, res) => {
  try {
    const existing = await Membership.findOne({ email: req.body.email });
    if (existing && existing.status !== 'Rejected') {
      return res.status(400).json({ error: 'An application for this email already exists.' });
    }

    const membership = new Membership(req.body);
    await membership.save();
    res.status(201).json({ message: 'Membership application submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🌐 PUBLIC/CUSTOMER: Check own membership status (for Profile Page)
router.get('/status/:email', async (req, res) => {
  try {
    const membership = await Membership.findOne({ email: req.params.email, status: 'Approved' });
    res.json({ membershipType: membership ? membership.membershipType : null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔒 ADMIN ONLY: Get all pending applications
router.get('/admin/applications', adminAuth, async (req, res) => {
  try {
    const applications = await Membership.find({ status: 'Pending' }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔒 ADMIN ONLY: Get approved members directory
router.get('/admin/directory', adminAuth, async (req, res) => {
  try {
    const directory = await Membership.find({ status: 'Approved' }).sort({ createdAt: -1 });
    res.json(directory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔒 ADMIN ONLY: Update status (Approve / Reject)
router.put('/admin/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const membership = await Membership.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(membership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;