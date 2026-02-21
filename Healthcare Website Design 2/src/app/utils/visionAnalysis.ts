import { DoshaType } from './doshaDatabase';

export interface TongueAnalysis {
  doshaIndicator: DoshaType;
  confidence: 'high' | 'medium' | 'low';
  visualReason: string;
  observations: string[];
}

export interface HerbAnalysis {
  identifiedHerb: string;
  benefits: string[];
  doshaAffinity: DoshaType[];
  usage: string;
}

export interface EyeAnalysis {
  doshaIndicator: DoshaType;
  confidence: 'high' | 'medium' | 'low';
  observations: string[];
}

// Mock vision analysis (in production, this would call a vision AI API)
export async function analyzeTongueImage(imageData: string): Promise<TongueAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock analysis based on random selection (in production, actual AI analysis)
  const analyses: TongueAnalysis[] = [
    {
      doshaIndicator: 'Pitta',
      confidence: 'medium',
      visualReason: 'Red tip and yellow coating observed',
      observations: [
        'Reddish discoloration at tongue tip',
        'Thin yellow coating on surface',
        'Some inflammation visible',
      ],
    },
    {
      doshaIndicator: 'Vata',
      confidence: 'high',
      visualReason: 'Dry, cracked appearance with minimal coating',
      observations: [
        'Dry texture visible',
        'Small cracks along surface',
        'Thin, pale coating',
      ],
    },
    {
      doshaIndicator: 'Kapha',
      confidence: 'medium',
      visualReason: 'Thick white coating detected',
      observations: [
        'Heavy white coating on tongue',
        'Slightly swollen appearance',
        'Moist surface texture',
      ],
    },
  ];

  return analyses[Math.floor(Math.random() * analyses.length)];
}

export async function analyzeEyeImage(imageData: string): Promise<EyeAnalysis> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const analyses: EyeAnalysis[] = [
    {
      doshaIndicator: 'Pitta',
      confidence: 'medium',
      observations: [
        'Slight redness in sclera',
        'Sharp, penetrating gaze',
        'Medium pupil size',
      ],
    },
    {
      doshaIndicator: 'Vata',
      confidence: 'high',
      observations: [
        'Dryness around eyes',
        'Darting eye movement',
        'Thin conjunctiva',
      ],
    },
  ];

  return analyses[Math.floor(Math.random() * analyses.length)];
}

export async function analyzeHerbImage(imageData: string): Promise<HerbAnalysis> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const herbs: HerbAnalysis[] = [
    {
      identifiedHerb: 'Ashwagandha',
      benefits: [
        'Stress balance and adaptogenic support',
        'Energy and vitality enhancement',
        'Nervous system support',
        'Sleep quality improvement',
      ],
      doshaAffinity: ['Vata', 'Kapha'],
      usage: 'Typically consumed as powder with warm milk or water, 1-2 times daily',
    },
    {
      identifiedHerb: 'Turmeric (Haldi)',
      benefits: [
        'Anti-inflammatory properties',
        'Digestive health support',
        'Immune system boost',
        'Skin health enhancement',
      ],
      doshaAffinity: ['Kapha', 'Pitta'],
      usage: 'Can be added to food, warm milk, or taken as supplement',
    },
    {
      identifiedHerb: 'Tulsi (Holy Basil)',
      benefits: [
        'Respiratory health support',
        'Stress relief and mental clarity',
        'Immune modulation',
        'Adaptogenic properties',
      ],
      doshaAffinity: ['Kapha', 'Vata'],
      usage: 'Consumed as tea or fresh leaves, 1-2 cups daily',
    },
    {
      identifiedHerb: 'Brahmi',
      benefits: [
        'Cognitive function enhancement',
        'Mental clarity and focus',
        'Stress reduction',
        'Memory support',
      ],
      doshaAffinity: ['Vata', 'Pitta'],
      usage: 'Taken as powder, tablet, or oil application',
    },
    {
      identifiedHerb: 'Neem',
      benefits: [
        'Purifying and detoxifying',
        'Skin health support',
        'Cooling properties',
        'Immune support',
      ],
      doshaAffinity: ['Pitta', 'Kapha'],
      usage: 'Consumed as capsules, powder, or used topically',
    },
  ];

  return herbs[Math.floor(Math.random() * herbs.length)];
}

export function getImageType(file: File): 'tongue' | 'eye' | 'herb' | 'unknown' {
  // In production, this would use AI to classify the image type
  // For now, we'll use a simple mock based on file name
  const fileName = file.name.toLowerCase();
  if (fileName.includes('tongue')) return 'tongue';
  if (fileName.includes('eye')) return 'eye';
  if (fileName.includes('herb') || fileName.includes('plant')) return 'herb';
  
  // Default to tongue for demo purposes
  return 'tongue';
}
