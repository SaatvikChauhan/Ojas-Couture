const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Newsletter } = require('../models/Misc');
const { formRateLimiter, validateNewsletterForm, verifyCaptcha } = require('../middleware/formSecurity');
const adminAuth = require('../middleware/adminAuth');
const sendEmail = require('../utils/sendEmail');

// Helper to generate unsubscribe token
const genToken = () => crypto.randomBytes(16).toString('hex');

// Public subscribe endpoint (simple)
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.json({ message: 'You are already part of the Ojas family!' });

    const unsubToken = genToken();
    const sub = new Newsletter({ email, name, unsubToken, source: req.body.source || 'website' });
    await sub.save();

    // Send a welcome email if sendEmail is configured (guarded)
    try {
      if (process.env.SENDGRID_API_KEY) {
        await sendEmail(email, 'Welcome to Ojas Couture', `<p>Thank you for subscribing to Ojas Couture! <br/><a href="${process.env.FRONTEND_URL || ''}/unsubscribe?token=${unsubToken}">Click here to unsubscribe</a></p>`);
      }
    } catch (e) {
      console.warn('Failed to send welcome email:', e.message);
    }

    res.status(201).json({ message: 'Welcome to the Ojas Couture family! 🌸' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Form-backed subscribe endpoint (with rate-limiting and captcha middleware)
router.post('/subscribe', formRateLimiter, validateNewsletterForm, verifyCaptcha, async (req, res) => {
  try {
    const { email, name } = req.body;
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(200).json({ message: 'You are already part of the Ojas family!' });

    const unsubToken = genToken();
    const sub = new Newsletter({ email, name, unsubToken, source: 'form' });
    await sub.save();

    // Send welcome email (if configured)
    try {
      if (process.env.SENDGRID_API_KEY) {
        await sendEmail(email, 'Welcome to Ojas Couture', `<p>Thanks for subscribing. Manage preferences or <a href="${process.env.FRONTEND_URL || ''}/unsubscribe?token=${unsubToken}">unsubscribe</a>.</p>`);
      }
    } catch (e) { console.warn('Welcome email failed:', e.message); }

    res.status(201).json({ message: 'Successfully subscribed to Ojas Couture! 🎉' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unsubscribe by token
router.post('/unsubscribe', async (req, res) => {
  try {
    const { token, email } = req.body;
    let sub = null;
    if (token) sub = await Newsletter.findOneAndUpdate({ unsubToken: token }, { active: false });
    else if (email) sub = await Newsletter.findOneAndUpdate({ email }, { active: false });
    if (!sub) return res.status(404).json({ message: 'Subscriber not found' });
    res.json({ message: 'You have been unsubscribed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: list subscribers (paginated)
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 50);
    const q = {};
    if (req.query.active) q.active = req.query.active === 'true';
    if (req.query.search) q.email = { $regex: req.query.search, $options: 'i' };
    if (req.query.category) q.category = req.query.category;

    const total = await Newsletter.countDocuments(q);
    const items = await Newsletter.find(q).sort({ subscribedAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    res.json({ page, limit, total, items });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Admin: export CSV of subscribers
router.get('/admin/export', adminAuth, async (req, res) => {
  try {
    const subs = await Newsletter.find({}).lean();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="subscribers-${Date.now()}.csv"`);
    res.write('email,name,subscribedAt,active,source\n');
    subs.forEach(s => {
      res.write(`${s.email || ''},${(s.name || '').replace(/,/g,' ')},${s.subscribedAt?.toISOString() || ''},${s.active},${s.source||''}\n`);
    });
    res.end();
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Admin: update subscriber (toggle active, category)
router.put('/admin/:id', adminAuth, async (req, res) => {
  try {
    const updates = {};
    if (typeof req.body.active !== 'undefined') updates.active = req.body.active;
    if (req.body.category) updates.category = req.body.category;
    const sub = await Newsletter.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!sub) return res.status(404).json({ message: 'Not found' });
    res.json(sub);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Admin: delete subscriber
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Admin: import subscribers (accepts JSON array of {email,name,category})
router.post('/admin/import', adminAuth, async (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : req.body.items || [];
    const results = { inserted: 0, skipped: 0 };
    for (const it of items) {
      if (!it.email) { results.skipped++; continue; }
      const exists = await Newsletter.findOne({ email: it.email });
      if (exists) { results.skipped++; continue; }
      const unsubToken = genToken();
      await Newsletter.create({ email: it.email, name: it.name, category: it.category, unsubToken, source: 'import' });
      results.inserted++;
    }
    res.json(results);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
