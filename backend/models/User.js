// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user', 'vendor'], default: 'user' },
  isAdmin: { type: Boolean, default: false }, // New property to track admin status
});

module.exports = mongoose.model("User", userSchema);
