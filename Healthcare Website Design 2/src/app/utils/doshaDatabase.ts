export type DoshaType = 'Vata' | 'Pitta' | 'Kapha' | 'Balanced';

export interface DoshaRecommendations {
  diet: string[];
  lifestyle: string[];
  herbs: string[];
  avoid: string[];
  explanation: string;
}

export const DOSHA_RECOMMENDATIONS: Record<DoshaType, DoshaRecommendations> = {
  Vata: {
    diet: [
      'Warm, cooked foods',
      'Grounding grains (rice, oats)',
      'Healthy fats (ghee, olive oil)',
      'Sweet fruits (bananas, mangoes)',
      'Warm beverages (herbal tea, warm milk)',
    ],
    lifestyle: [
      'Regular sleep schedule (before 10 PM)',
      'Daily meditation for 15-20 minutes',
      'Gentle yoga and stretching',
      'Oil massage (Abhyanga)',
      'Maintain routine and structure',
    ],
    herbs: [
      'Ashwagandha - Stress balance and grounding',
      'Brahmi - Mental clarity and calm',
      'Shatavari - Nourishment and vitality',
    ],
    avoid: [
      'Cold, raw foods',
      'Excessive caffeine',
      'Irregular eating times',
      'Too much screen time',
    ],
    explanation: 'Vata dosha governs movement and communication in the body. When imbalanced, it can manifest as anxiety, restlessness, and digestive irregularities. Grounding, warming practices help restore balance.',
  },
  Pitta: {
    diet: [
      'Cooling foods (cucumber, coconut)',
      'Sweet and bitter vegetables',
      'Whole grains (barley, wheat)',
      'Fresh fruits (melons, grapes)',
      'Coconut water and mint tea',
    ],
    lifestyle: [
      'Avoid overexertion and excessive heat',
      'Practice cooling pranayama',
      'Moderate exercise',
      'Spend time in nature',
      'Maintain work-life balance',
    ],
    herbs: [
      'Neem - Cooling and purifying',
      'Turmeric - Anti-inflammatory support',
      'Aloe Vera - Soothing and cooling',
    ],
    avoid: [
      'Spicy, hot foods',
      'Excessive sun exposure',
      'Competitive activities',
      'Alcohol and caffeine',
    ],
    explanation: 'Pitta dosha represents transformation and metabolism. Excess Pitta can manifest as inflammation, irritability, and heat-related symptoms. Cooling, calming practices help restore balance.',
  },
  Kapha: {
    diet: [
      'Light, warm, spiced foods',
      'Bitter and astringent vegetables',
      'Legumes and beans',
      'Pungent spices (ginger, black pepper)',
      'Warm herbal teas',
    ],
    lifestyle: [
      'Vigorous daily exercise',
      'Wake up early (before 6 AM)',
      'Dry brushing',
      'Avoid daytime naps',
      'Stay active and engaged',
    ],
    herbs: [
      'Trikatu - Digestive fire and metabolism',
      'Guggul - Weight management support',
      'Tulsi - Respiratory health',
    ],
    avoid: [
      'Heavy, oily foods',
      'Excessive dairy',
      'Oversleeping',
      'Sedentary lifestyle',
    ],
    explanation: 'Kapha dosha provides structure and lubrication. Excess Kapha can manifest as lethargy, weight gain, and congestion. Stimulating, energizing practices help restore balance.',
  },
  Balanced: {
    diet: [
      'Seasonal, fresh foods',
      'Variety of fruits and vegetables',
      'Whole grains and legumes',
      'Moderate portions',
      'Adequate hydration',
    ],
    lifestyle: [
      'Regular exercise (30 min daily)',
      'Consistent sleep schedule',
      'Stress management practices',
      'Time in nature',
      'Social connections',
    ],
    herbs: [
      'Triphala - Overall digestive health',
      'Chyawanprash - Immunity and vitality',
      'Tulsi - Adaptogenic support',
    ],
    avoid: [
      'Processed foods',
      'Excessive stress',
      'Irregular routines',
      'Environmental toxins',
    ],
    explanation: 'Your doshas are in relative balance. Maintain this harmony through mindful living, seasonal awareness, and preventive self-care according to Ayurvedic principles.',
  },
};

export const SYMPTOM_TO_DOSHA_MAP: Record<string, DoshaType> = {
  // Vata indicators
  'anxiety': 'Vata',
  'insomnia': 'Vata',
  'dry skin': 'Vata',
  'constipation': 'Vata',
  'joint pain': 'Vata',
  'restlessness': 'Vata',
  'nervousness': 'Vata',
  'bloating': 'Vata',
  'gas': 'Vata',
  
  // Pitta indicators
  'inflammation': 'Pitta',
  'heartburn': 'Pitta',
  'acid reflux': 'Pitta',
  'skin rash': 'Pitta',
  'irritability': 'Pitta',
  'anger': 'Pitta',
  'excessive heat': 'Pitta',
  'burning sensation': 'Pitta',
  
  // Kapha indicators
  'congestion': 'Kapha',
  'lethargy': 'Kapha',
  'weight gain': 'Kapha',
  'mucus': 'Kapha',
  'heaviness': 'Kapha',
  'depression': 'Kapha',
  'sluggishness': 'Kapha',
};

export function detectDoshaFromSymptoms(symptoms: string[]): {
  dosha: DoshaType;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
} {
  const doshaCount: Record<DoshaType, number> = {
    Vata: 0,
    Pitta: 0,
    Kapha: 0,
    Balanced: 0,
  };

  symptoms.forEach(symptom => {
    const normalizedSymptom = symptom.toLowerCase();
    Object.entries(SYMPTOM_TO_DOSHA_MAP).forEach(([key, dosha]) => {
      if (normalizedSymptom.includes(key)) {
        doshaCount[dosha]++;
      }
    });
  });

  const maxCount = Math.max(doshaCount.Vata, doshaCount.Pitta, doshaCount.Kapha);
  
  if (maxCount === 0) {
    return {
      dosha: 'Balanced',
      confidence: 'low',
      reason: 'No specific dosha indicators detected',
    };
  }

  let dominantDosha: DoshaType = 'Balanced';
  if (doshaCount.Vata === maxCount) dominantDosha = 'Vata';
  else if (doshaCount.Pitta === maxCount) dominantDosha = 'Pitta';
  else if (doshaCount.Kapha === maxCount) dominantDosha = 'Kapha';

  const confidence = maxCount >= 3 ? 'high' : maxCount >= 2 ? 'medium' : 'low';

  return {
    dosha: dominantDosha,
    confidence,
    reason: `${maxCount} ${dominantDosha} indicators detected in symptoms`,
  };
}
