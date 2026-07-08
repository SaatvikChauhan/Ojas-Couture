const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const ActivityLog = require('../models/activityLog'); // Import ActivityLog model

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Send Welcome Email
    sendEmail(
      email,
      "Welcome to Ojas Couture 🎉",
      `<h2>Hi ${name},</h2><p>Welcome to Ojas Couture! We're glad to have you 💛</p>`
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { name, email, isAdmin: user.isAdmin || false } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN (UNIFIED FOR CUSTOMERS & ADMINS)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // 1. SECURITY: Check if the account is currently locked out
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remainingMinutes = Math.ceil((user.lockUntil - Date.now()) / (1000 * 60));
      return res.status(423).json({ 
        msg: `Account locked due to multiple failures. Please try again in ${remainingMinutes} minutes.` 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      // 2. SECURITY: Increment login failures tracking
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // Lock account for exactly 2 hours
        
        // Log the security breach event if it was an admin profile
        if (user.isAdmin) {
          await ActivityLog.create({
            adminId: user._id,
            adminName: user.name,
            action: 'LOGIN_FAILURE',
            details: `Brute-force alert: Admin account locked after 5 failed login attempts.`
          });
        }
      }
      
      await user.save();
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 3. SECURITY: Reset tracking metrics on a successful login connection
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // Send Login Alert Email ONLY if it's a regular customer
    if (!user.isAdmin) {
      sendEmail(
        email,
        "Login Alert 🔐",
        `<p>You just logged in to your Ojas Couture account.</p>`
      );
    }

    // 4. SECURITY: Dynamic Token Expiry (1 hour session timeout for admins, 7 days for regular users)
    const tokenExpiry = user.isAdmin ? '1h' : '7d';
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: tokenExpiry });

    res.json({ token, user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;