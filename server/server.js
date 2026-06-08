require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DB CONNECTION (OPTIMIZED FOR SERVERLESS) ---
let isConnected = false;

const connectDB = async () => {
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
app.use('/api/products', require('./routes/products'));
// app.use('/api/testimonials', require('../routes/testimonials'));
// app.use('/api/blog', require('../routes/blog'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/reviews', require('./routes/reviews'));
// app.use('/api/faq', require('../routes/faq'));
app.use('/api/newsletter', require('./routes/newsletter'));

// --- EXPORT FOR VERCEL ---
module.exports = serverless(app);