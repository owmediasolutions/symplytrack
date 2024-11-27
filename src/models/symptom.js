const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  severity: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 10 
  },
  duration: {
    value: Number,
    unit: {
      type: String,
      enum: ['minutes', 'hours', 'days', 'weeks'],
      required: true
    }
  },
  timeOfDay: { 
    type: String,
    enum: ['morning', 'noon', 'evening', 'night', 'variable']
  },
  triggers: [{
    type: String
  }],
  relatedSupplements: [{
    supplement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplement'
    },
    correlation: {
      type: String,
      enum: ['improved', 'worsened', 'no_change', 'unclear']
    }
  }],
  notes: String,
  date: { 
    type: Date, 
    default: Date.now,
    required: true 
  },
  location: {
    type: String
  },
  characteristics: [{
    type: String
  }],
  accompaniedBy: [{
    symptom: String,
    severity: Number
  }]
}, { 
  timestamps: true 
});

// Indizes für häufige Abfragen
symptomSchema.index({ userId: 1, date: -1 });
symptomSchema.index({ name: 1 });
symptomSchema.index({ 'relatedSupplements.supplement': 1 });

module.exports = mongoose.model('Symptom', symptomSchema);