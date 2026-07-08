const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay'); // Import the official Razorpay SDK
const ActivityLog = require('../models/activityLog'); // Reusing your activity log model

// Initialize the secure Razorpay instance using your non-hardcoded environment keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// 1. ROUTE: Create a new Order ID from Razorpay servers
router.post('/order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Razorpay expects amount in paisa (e.g., ₹12,000 = 1200000)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ROUTE: Server-side cryptographic signature verification (Prevents transaction tampering)
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // SECURITY: Generate expected signature using HMAC-SHA256
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // SECURITY: Verify payment signature server-side
    if (razorpay_signature === expectedSign) {
      
      // SECURITY: Log all successful payment events
      await ActivityLog.create({
        adminId: req.user?.id || razorpay_payment_id, // Identifies tracking context
        adminName: req.user?.name || 'Razorpay Gateway',
        action: 'PAYMENT_SUCCESS',
        details: `Payment verified successfully for Order ID: ${razorpay_order_id} | Payment ID: ${razorpay_payment_id}`
      });

      return res.status(200).json({ status: "success", message: "Payment verified successfully" });
    } else {
      
      // SECURITY: Log suspicious/failed payment attempts
      await ActivityLog.create({
        adminId: 'SYSTEM_ALERT',
        adminName: 'Security Monitor',
        action: 'PAYMENT_FAILURE',
        details: `TAMPERING WARNING: Invalid payment signature detected for Order ID: ${razorpay_order_id}`
      });

      return res.status(400).json({ status: "failure", message: "Invalid payment signature!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;