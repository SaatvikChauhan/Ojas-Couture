const express = require('express');
const router = express.Router();
const { Newsletter } = require('../models/Misc');
const { formRateLimiter, validateNewsletterForm, verifyCaptcha } = require('../middleware/formSecurity');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.json({ message: 'You are already part of the Ojas family!' });
    const sub = new Newsletter({ email });
    await sub.save();
    res.status(201).json({ message: 'Welcome to the Ojas Couture family! 🌸' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/subscribe', formRateLimiter, validateNewsletterForm, verifyCaptcha, async (req, res) => {
  try {
    res.status(200).json({ message: "Successfully subscribed to Ojas Couture! 🎉" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
