const express = require('express');
const router = express.Router();
const { Contact } = require('../models/Misc');

router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Message received! We will get back to you within 24 hours.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
