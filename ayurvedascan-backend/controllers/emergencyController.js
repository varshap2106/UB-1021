const riskEngine = require('../services/riskEngine');

exports.checkEmergency = async (req, res) => {
  try {
    const { symptoms, vitals } = req.body;

    // Check for red flag symptoms
    const emergencyCheck = riskEngine.checkEmergencySymptoms(symptoms);
    
    // Check vitals if provided
    const vitalCheck = vitals ? riskEngine.checkVitals(vitals) : null;

    const isEmergency = emergencyCheck.isEmergency || vitalCheck?.isEmergency;

    res.json({
      isEmergency,
      emergency: isEmergency ? {
        message: emergencyCheck.message || vitalCheck?.message,
        action: emergencyCheck.action || vitalCheck?.action,
        severity: 'critical'
      } : null,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Emergency check error:', error);
    res.status(500).json({ error: 'Emergency check failed' });
  }
};