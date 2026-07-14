require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // 1. Import Helmet for Security Headers
const mongoose = require('mongoose');

const app = express();

// ── 2. SECURITY HEADERS CONFIGURATION (HELMET) ──────────────────────────────────
app.use(
  helmet({
    // Content Security Policy (CSP): Prevents XSS and unauthorized data injection
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        // Allow scripts from self, Razorpay, and Cloudflare Turnstile
        scriptSrc: [
          "'self'", 
          "https://checkout.razorpay.com", 
          "https://challenges.cloudflare.com"
        ],
        // Allow connection endpoints to your API, Razorpay servers, and Turnstile
        connectSrc: [
          "'self'", 
          "https://api.razorpay.com", 
          "https://challenges.cloudflare.com"
        ],
        // Allow images from your server, Unsplash assets, and Razorpay CDNs
        imgSrc: [
          "'self'", 
          "data:", 
          "https://images.unsplash.com", 
          "https://*.razorpay.com"
        ],
        // Allow checkout and validation iframe overlay windows
        frameSrc: [
          "'self'", 
          "https://api.razorpay.com", 
          "https://challenges.cloudflare.com"
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        upgradeInsecureRequests: [],
      },
    },
    // X-Frame-Options: Strict mitigation against Clickjacking attacks
    frameguard: {
      action: 'deny',
    },
    // X-Content-Type-Options: Prevents browsers from guessing/sniffing MIME response types
    noSniff: true,
    // Referrer-Policy: Safely restricts referral data leaks to external sites
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },
  })
);

// --- OTHER BASE MIDDLEWARES ---
app.use(cors({
  origin: ['https://ojas-couture.vercel.app', 'http://localhost:5173'], // Allows both your live production and local dev environment
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DB CONNECTION (OPTIMIZED FOR SERVERLESS) ---
let isConnected = false;

const connectDB = async () => {
  // Allow running in MOCK_MODE without a real MongoDB (useful for local testing)
  if (process.env.MOCK_MODE === 'true' || !process.env.MONGO_URI) {
    if (!process.env.MONGO_URI) console.warn('Warning: MONGO_URI not set — running in mock/no-db mode');
    if (process.env.MOCK_MODE === 'true') console.log('Mock mode enabled — skipping DB connect');
    return;
  }

  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

app.get('/api/health', (req, res) => {
  return res.json({ status: 'OK', message: 'Ojas Couture API running' });
});

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Error");
  }
});

// --- ROUTES ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/adminCategories'));
app.use('/api/collections', require('./routes/adminCollections'));
app.use('/api/admin/orders', require('./routes/adminOrders'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/homepage', require('./routes/adminHomepage'));
app.use('/api/products', require('./routes/products'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/memberships', require('./routes/memberships'));

// 3. MOUNT THE MISSING PAYMENT ROUTE ENGINE
app.use('/api/payment', require('./routes/payment'));

// --- EXPORT FOR VERCEL ---
module.exports = app;