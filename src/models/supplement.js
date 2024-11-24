const mongoose = require('mongoose');

const supplementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  time: { type: Date, required: true },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Supplement', supplementSchema);