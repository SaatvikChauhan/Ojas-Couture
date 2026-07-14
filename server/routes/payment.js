const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const ActivityLog = require('../models/activityLog'); // Reusing your activity log model

// Initialize Razorpay SDK only when not running in MOCK_MODE to avoid startup crashes
let razorpay = null;
if (process.env.MOCK_MODE === 'true') {
  console.log('Razorpay mock mode active — SDK not initialized');
} else {
  try {
    const RazorpaySdk = require('razorpay'); // Import the official Razorpay SDK
    razorpay = new RazorpaySdk({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  } catch (e) {
    console.warn('Razorpay SDK could not be initialized:', e.message);
    razorpay = null;
  }
}

// 1. ROUTE: Create a new Order ID from Razorpay servers
router.post('/order', async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    if (process.env.MOCK_MODE === 'true' || !razorpay) {
      // Return a fake order object compatible with Razorpay response
      const mockOrder = {
        id: 'order_' + Date.now(),
        amount: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        status: 'created',
      };
      return res.json(mockOrder);
    }
    
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error('Razorpay order creation error:', err);
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
      if (process.env.MOCK_MODE !== 'true') {
        try {
          await ActivityLog.create({
            adminId: req.user?.id || razorpay_payment_id, // Identifies tracking context
            adminName: req.user?.name || 'Razorpay Gateway',
            action: 'PAYMENT_SUCCESS',
            details: `Payment verified successfully for Order ID: ${razorpay_order_id} | Payment ID: ${razorpay_payment_id}`
          });
        } catch (e) {
          console.warn('ActivityLog create skipped/failed:', e.message);
        }
      }

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

// Mock payment simulation endpoint for local E2E testing when MOCK_MODE=true
router.post('/mockPay', async (req, res) => {
  try {
    const { order_id } = req.body;
    if (!order_id) return res.status(400).json({ error: 'order_id required' });

    // Create a fake payment id
    const payment_id = 'pay_' + Date.now();

    // Create a fake signature exactly like Razorpay does: HMAC_SHA256(order_id + '|' + payment_id)
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET || 'mock_secret')
      .update(order_id + '|' + payment_id)
      .digest('hex');

    // Optionally log the mock payment
    if (process.env.MOCK_MODE !== 'true') {
      try {
        await ActivityLog.create({
          adminId: 'MOCK_USER',
          adminName: 'Mock Gateway',
          action: 'MOCK_PAYMENT_CREATED',
          details: `Mock payment created for order ${order_id}`,
        });
      } catch (e) {
        // ignore logging errors in mock mode
      }
    }

    // Return the simulated payment response that the real Razorpay overlay would provide
    return res.json({
      razorpay_order_id: order_id,
      razorpay_payment_id: payment_id,
      razorpay_signature: expectedSign,
    });
  } catch (err) {
    console.error('Mock payment error:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;