const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const adminAuth = require('../middleware/adminAuth');
const PDFDocument = require('pdfkit');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// 1. GET ALL ORDERS
router.get('/', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. UPDATE ORDER STATUS
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET CUSTOMERS (Aggregating unique customers from orders for order history)
router.get('/customers', adminAuth, async (req, res) => {
  try {
    // Grouping orders by customer email to build the customer table
    const customers = await Order.aggregate([
      {
        $group: {
          _id: "$customer.email",
          name: { $first: "$customer.name" },
          phone: { $first: "$customer.phone" },
          shippingAddress: { $last: "$shippingAddress" }, // Latest address
          orderHistory: { $push: { orderId: "$orderId", amount: "$totalAmount", status: "$status", date: "$createdAt" } },
          totalSpent: { $sum: "$totalAmount" }
        }
      }
    ]);
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. INVOICE GENERATOR FUNCTION (Used for both Download and Email)
const generateInvoicePDF = (order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // Invoice Header
    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${order.orderId}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.moveDown();
    
    // Customer Details
    doc.text('Bill To:');
    doc.text(order.customer.name);
    doc.text(order.customer.email);
    doc.text(order.customer.phone);
    doc.moveDown();

    // Products
    doc.text('Items:', { underline: true });
    order.products.forEach(p => {
      doc.text(`${p.name} - Qty: ${p.quantity} - Rs. ${p.price}`);
    });
    doc.moveDown();
    
    // Total
    doc.fontSize(14).text(`Total Amount: Rs. ${order.totalAmount}`, { align: 'right' });
    doc.end();
  });
};

// 5. DOWNLOAD INVOICE
router.get('/:id/invoice/download', adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const pdfBuffer = await generateInvoicePDF(order);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${order.orderId}.pdf`);
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. EMAIL INVOICE VIA SENDGRID
router.post('/:id/invoice/email', adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const pdfBuffer = await generateInvoicePDF(order);
    
    const msg = {
      to: order.customer.email,
      from: 'alerts@ojascouture.com', // MUST match your SendGrid verified sender
      subject: `Your Invoice for Order ${order.orderId} - Ojas Couture`,
      text: `Hi ${order.customer.name},\n\nThank you for your order! Please find your invoice attached.\n\nBest,\nOjas Couture`,
      attachments: [
        {
          content: pdfBuffer.toString('base64'),
          filename: `Invoice-${order.orderId}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };

    await sgMail.send(msg);
    res.json({ message: 'Invoice emailed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;