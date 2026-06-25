const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// PUBLIC: Place a new order
router.post('/', async (req, res) => {
  try {
    const { customer, shippingAddress, products, totalAmount } = req.body;
    
    // Generate a random 6-digit Order ID (e.g., ORD-482910)
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000); 

    const newOrder = new Order({
      orderId,
      customer,
      shippingAddress,
      products,
      totalAmount
    });

    await newOrder.save();
    
    res.status(201).json({ 
      message: 'Order placed successfully!', 
      orderId: newOrder.orderId 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;