const emergencyRules = require('../data/emergencyRules.json');

class RiskEngine {
  calculateRisk({ symptoms = [], severity = 0, age = 30, duration = 1 }) {
    // Base risk from symptom weights
    let riskScore = 0;
    
    // Load symptom weights
    const symptomWeights = {
      'headache': 2,
      'fever': 3,
      'cough': 2,
      'fatigue': 1,
      'nausea': 2,
      'pain': 3,
      'dizziness': 4,
      'shortness_of_breath': 5,
      'chest_pain': 5,
      'confusion': 5
    };
    
    // Sum symptom weights
    symptoms.forEach(symptom => {
      riskScore += symptomWeights[symptom] || 1;
    });
    
    // Add severity multiplier
    riskScore += severity * 2;
    
    // Age factor (older = higher risk)
    if (age > 60) riskScore += 2;
    else if (age > 40) riskScore += 1;
    
    // Duration factor (longer = higher risk)
    if (duration > 7) riskScore += 3;
    else if (duration > 3) riskScore += 1;
    
    return Math.min(riskScore, 10); // Cap at 10
  }
  
  checkEmergencySymptoms(symptoms = []) {
    const redFlags = emergencyRules.redFlagSymptoms || [
      'chest_pain',
      'difficulty_breathing',
      'severe_bleeding',
      'unconscious',
      'confusion_sudden',
      'paralysis',
      'seizure',
      'severe_allergic'
    ];
    
    for (const symptom of symptoms) {
      if (redFlags.includes(symptom)) {
        return {
          isEmergency: true,
          message: '🚨 RED ALERT: Immediate medical attention required',
          action: 'Call 102 or go to nearest emergency room',
          symptom: symptom
        };
      }
    }
    
    return { isEmergency: false };
  }
  
  checkVitals(vitals) {
    const { heartRate, bloodPressure, temperature, oxygenLevel } = vitals;
    
    if (heartRate && (heartRate < 40 || heartRate > 140)) {
      return {
        isEmergency: true,
        message: 'Abnormal heart rate detected',
        action: 'Seek immediate medical attention'
      };
    }
    
    if (oxygenLevel && oxygenLevel < 90) {
      return {
        isEmergency: true,
        message: 'Low oxygen level detected',
        action: 'Emergency medical care required'
      };
    }
    
    if (temperature && temperature > 103) {
      return {
        isEmergency: true,
        message: 'Very high fever detected',
        action: 'Visit emergency room immediately'
      };
    }
    
    return { isEmergency: false };
  }
  
  getRecommendations(riskScore, dosha) {
    if (riskScore >= 7) {
      return {
        level: 'HIGH RISK',
        action: 'Seek immediate medical attention',
        advice: 'Emergency care required',
        homeRemedies: []
      };
    } else if (riskScore >= 4) {
      return {
        level: 'MODERATE RISK',
        action: 'Consult healthcare provider',
        advice: `Follow ${dosha}-pacifying routine`,
        homeRemedies: [
          'Rest adequately',
          'Stay hydrated',
          'Monitor symptoms'
        ]
      };
    } else {
      return {
        level: 'LOW RISK',
        action: 'Self-care recommended',
        advice: `Follow ${dosha}-balancing lifestyle`,
        homeRemedies: [
          'Maintain routine',
          'Eat light meals',
          'Practice relaxation'
        ]
      };
    }
  }
}

module.exports = new RiskEngine();