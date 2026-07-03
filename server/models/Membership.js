const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  profile: { type: String },
  dob: { type: Date },
  anniversary: { type: Date },
  membershipType: { 
    type: String, 
    enum: ['Silver', 'Gold', 'Platinum'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);