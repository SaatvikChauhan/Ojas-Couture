const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adminName: { type: String, required: true },
  action: { type: String, enum: ['CREATE_PRODUCT', 'EDIT_PRODUCT', 'DELETE_PRODUCT', 'LOGIN_FAILURE'], required: true },
  details: { type: String }, // e.g., "Deleted product: Wine Velvet Lehenga Choli"
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);