const mongoose = require('mongoose');

const supplementSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  dosage: { 
    type: String, 
    required: true 
  },
  frequency: { 
    type: String, 
    required: true 
  },
  timeOfDay: { 
    type: String, 
    enum: ['morning', 'noon', 'evening', 'night'],
    required: true 
  },
  withFood: { 
    type: Boolean, 
    default: false 
  },
  notes: String,
  startDate: { 
    type: Date, 
    default: Date.now 
  },
  endDate: Date,
  active: { 
    type: Boolean, 
    default: true 
  },
  category: {
    type: String,
    enum: ['vitamin', 'mineral', 'amino_acid', 'herb', 'other'],
    required: true
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true 
});

// Indizes für häufige Abfragen
supplementSchema.index({ userId: 1, active: 1 });
supplementSchema.index({ category: 1 });

module.exports = mongoose.model('Supplement', supplementSchema);