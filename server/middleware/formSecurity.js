const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const fetch = require('node-fetch');

// ── 1. RATE LIMITING MIDDLEWARE ──────────────────────────────────────────────
// Restricts an IP address to a maximum of 5 form submissions every 15 minutes
const formRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message: { error: 'Too many submissions from this IP. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── 2. SERVER-SIDE VALIDATION RULES ──────────────────────────────────────────

// Validation rules for the Review Form
const validateReviewForm = [
  body('name').trim().notEmpty().withMessage('Name is required.').escape(),
  body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5.'),
  body('comment').trim().notEmpty().withMessage('Comment cannot be empty.').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation rules for the Newsletter Form
const validateNewsletterForm = [
  body('email').isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// ── 3. CAPTCHA VERIFICATION MIDDLEWARE ───────────────────────────────────────
const verifyCaptcha = async (req, res, next) => {
  const token = req.body['cf-turnstile-response'] || req.body['g-recaptcha-response'];
  
  if (!token) {
    return res.status(400).json({ error: 'CAPTCHA verification is missing!' });
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY, // Kept secure in your environment variables
        response: token,
        remoteip: req.ip
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const outcome = await response.json();
    if (!outcome.success) {
      return res.status(403).json({ error: 'Failed CAPTCHA protection. Bot suspected.' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Captcha verification server error' });
  }
};

// ── 4. EXPORT ALL SECURITY LAYERS ────────────────────────────────────────────
module.exports = { 
  formRateLimiter, 
  validateReviewForm, 
  validateNewsletterForm, 
  verifyCaptcha 
};