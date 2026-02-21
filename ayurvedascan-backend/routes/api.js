const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const emergencyController = require('../controllers/emergencyController');

// Analysis endpoints
router.post('/analyze/tongue', analysisController.analyzeTongue);
router.post('/analyze/symptoms', analysisController.analyzeSymptoms);
router.post('/analyze/comprehensive', analysisController.comprehensiveAnalysis);

// Emergency check endpoint
router.post('/check-emergency', emergencyController.checkEmergency);

// Get static data - FIXED: Added missing arrow function syntax
router.get('/symptoms', (req, res) => {
  const symptoms = require('../data/symptoms.json');
  res.json(symptoms);
});

// FIXED: Added missing arrow function syntax here too
router.get('/remedies/:dosha', (req, res) => {
  const remedies = require('../data/remedies.json');
  const dosha = req.params.dosha;
  res.json(remedies[dosha] || remedies.general);
});

module.exports = router;