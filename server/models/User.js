const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Date }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);