const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Supplement = require('../models/supplement');
const Symptom = require('../models/symptom');

router.post('/supplements', authenticateToken, async (req, res) => {
  try {
    const supplement = new Supplement({
      userId: req.user.id,
      ...req.body
    });
    await supplement.save();
    res.status(201).json(supplement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/supplements', authenticateToken, async (req, res) => {
  try {
    const supplements = await Supplement.find({ userId: req.user.id });
    res.json(supplements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/symptoms', authenticateToken, async (req, res) => {
  try {
    const symptom = new Symptom({
      userId: req.user.id,
      ...req.body
    });
    await symptom.save();
    res.status(201).json(symptom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/symptoms', authenticateToken, async (req, res) => {
  try {
    const symptoms = await Symptom.find({ userId: req.user.id });
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;