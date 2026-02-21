export interface Symptom {
  name: string;
  weight: number;
  isRedFlag?: boolean;
}

export const RED_FLAG_SYMPTOMS = [
  'chest pain',
  'breathing difficulty',
  'unconsciousness',
  'seizure',
  'severe bleeding',
  'stroke symptoms',
  'heart attack symptoms',
];

export const SYMPTOM_WEIGHTS: Record<string, number> = {
  // High severity symptoms
  'chest pain': 10,
  'breathing difficulty': 10,
  'severe headache': 8,
  'high fever': 7,
  'severe pain': 7,
  
  // Moderate symptoms
  'headache': 4,
  'fatigue': 3,
  'nausea': 3,
  'dizziness': 4,
  'insomnia': 3,
  'anxiety': 3,
  'digestive issues': 3,
  'joint pain': 4,
  'muscle ache': 3,
  
  // Mild symptoms
  'mild headache': 2,
  'tiredness': 2,
  'stress': 2,
  'bloating': 2,
  'dry skin': 1,
  'hair fall': 1,
};

export interface RiskAssessment {
  score: number;
  level: 'Mild' | 'Moderate' | 'High' | 'Emergency';
  color: string;
  showRemedies: boolean;
  message: string;
}

export function calculateRiskScore(
  symptoms: string[],
  severity: number,
  duration: number,
  age: number
): RiskAssessment {
  // Check for red flags first
  const hasRedFlag = symptoms.some(symptom =>
    RED_FLAG_SYMPTOMS.some(flag => 
      symptom.toLowerCase().includes(flag)
    )
  );

  if (hasRedFlag) {
    return {
      score: 100,
      level: 'Emergency',
      color: '#DC2626',
      showRemedies: false,
      message: '⚠️ EMERGENCY: Please seek immediate medical attention or call emergency services.',
    };
  }

  // Calculate base score from symptoms
  let score = 0;
  symptoms.forEach(symptom => {
    const normalizedSymptom = symptom.toLowerCase();
    const matchedKey = Object.keys(SYMPTOM_WEIGHTS).find(key =>
      normalizedSymptom.includes(key)
    );
    if (matchedKey) {
      score += SYMPTOM_WEIGHTS[matchedKey];
    }
  });

  // Add severity multiplier
  score += severity * 2;

  // Add duration modifier
  if (duration > 30) score += 5; // Chronic
  else if (duration > 7) score += 3; // Persistent
  else if (duration > 3) score += 1; // Recent

  // Add age modifier
  if (age > 65) score += 2;
  else if (age < 18) score += 1;

  // Determine risk level
  if (score >= 25) {
    return {
      score,
      level: 'High',
      color: '#DC2626',
      showRemedies: false,
      message: 'High risk detected. Please consult a healthcare professional immediately.',
    };
  } else if (score >= 15) {
    return {
      score,
      level: 'Moderate',
      color: '#FFA500',
      showRemedies: true,
      message: 'Moderate risk. Consider consulting a healthcare professional.',
    };
  } else {
    return {
      score,
      level: 'Mild',
      color: '#8BA888',
      showRemedies: true,
      message: 'Low risk. Preventive guidance provided below.',
    };
  }
}
