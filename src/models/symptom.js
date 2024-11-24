const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  severity: { type: Number, required: true, min: 1, max: 10 },
  time: { type: Date, required: true },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Symptom', symptomSchema);