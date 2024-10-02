const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role:      { type: String, enum: ['user', 'admin'], default: 'user' },
    address:   { type: String },
    phoneNumber: { type: String },
    insurance: { type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);