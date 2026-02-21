import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Send, Camera, Upload, Loader2, Info, AlertTriangle, CheckCircle2, X, ScanLine, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeSymptoms, analyzeWithImage, analyzeWithGemini, testConnection, chatWithAI } from '../../services/api';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  analysis?: any;
  imageUrl?: string;
}

interface Remedy {
  home: string[];
  diet: string[];
  herbs: string[];
  yoga?: string[];
  note?: string;
}

const DEFAULT_REMEDIES: Record<string, Remedy> = {
  fever: {
    home: [
      "Take complete rest - let your body heal",
      "Sponge bath with lukewarm water to reduce temperature",
      "Keep warm and avoid drafts",
      "Steam inhalation with mint or eucalyptus leaves if congestion"
    ],
    diet: [
      "Drink warm water throughout the day",
      "Light khichdi with ginger and turmeric",
      "Herbal tea with tulsi, ginger, and honey",
      "Avoid cold drinks, dairy, fried and spicy foods"
    ],
    herbs: ["Tulsi (Holy Basil)", "Ginger", "Giloy (Guduchi)", "Cinnamon"],
    note: "If fever is very high (>103°F) or persists beyond 3 days, consult a doctor."
  },
  cold: {
    home: [
      "Steam inhalation with eucalyptus or mint oil",
      "Warm salt water gargle",
      "Honey with warm water"
    ],
    diet: [
      "Warm water with honey and lemon",
      "Turmeric milk at night",
      "Ginger tea",
      "Avoid cold foods"
    ],
    herbs: ["Tulsi", "Ginger", "Black pepper", "Licorice"]
  },
  cough: {
    home: [
      "Steam inhalation with mint leaves",
      "Warm salt water gargle",
      "Honey with black pepper"
    ],
    diet: [
      "Warm water with honey",
      "Turmeric milk at night",
      "Avoid cold foods"
    ],
    herbs: ["Tulsi", "Ginger", "Licorice"]
  },
  headache: {
    home: [
      "Apply sandalwood paste on forehead",
      "Gentle head massage with coconut oil",
      "Rest in dark room"
    ],
    diet: [
      "Avoid spicy food",
      "Drink herbal tea",
      "Stay hydrated"
    ],
    herbs: ["Brahmi", "Ashwagandha"]
  },
  stomach: {
    home: [
      "Drink warm water with ginger juice",
      "Apply warm compress on abdomen",
      "Gentle massage around navel with castor oil",
      "Rest and avoid stress"
    ],
    diet: [
      "Eat light, easily digestible foods like khichdi",
      "Drink ginger tea or peppermint tea",
      "Avoid spicy, oily, and heavy foods",
      "Eat small meals frequently",
      "Avoid cold drinks and ice cream"
    ],
    herbs: ["Ginger", "Peppermint", "Fennel seeds", "Cumin seeds", "Triphala"],
    note: "If pain is severe or persists, consult a doctor immediately."
  },
  nausea: {
    home: [
      "Sip ginger tea slowly",
      "Smell fresh lemon or mint",
      "Rest in a quiet place",
      "Avoid strong odors"
    ],
    diet: [
      "Eat dry crackers or toast",
      "Drink clear fluids in small sips",
      "Avoid dairy and fried foods",
      "Eat small, bland meals"
    ],
    herbs: ["Ginger", "Peppermint", "Fennel", "Cardamom"],
    note: "If vomiting persists for more than 24 hours, consult a doctor."
  },
  acidity: {
    home: [
      "Drink cold milk",
      "Chew fennel seeds after meals",
      "Keep head elevated while sleeping",
      "Avoid lying down immediately after eating"
    ],
    diet: [
      "Avoid spicy and fried foods",
      "Eat smaller, frequent meals",
      "Include bananas and cucumbers",
      "Avoid citrus fruits on empty stomach",
      "Drink coconut water"
    ],
    herbs: ["Amla", "Licorice", "Coriander seeds", "Fennel"],
    note: "If acidity is chronic or severe, consult a doctor."
  },
  diarrhea: {
    home: [
      "Complete rest",
      "Apply warm compress on abdomen",
      "Avoid solid food for first few hours",
      "Stay hydrated"
    ],
    diet: [
      "Drink ORS (Oral Rehydration Solution)",
      "Eat bland foods like bananas and rice",
      "Avoid dairy, spicy foods, and raw vegetables",
      "Eat small, frequent meals"
    ],
    herbs: ["Ginger", "Fennel", "Cumin", "Pomegranate"],
    note: "If diarrhea persists for more than 24 hours or causes dehydration, consult a doctor."
  },
  constipation: {
    home: [
      "Drink warm water with lemon in morning",
      "Gentle abdominal massage",
      "Light exercise like walking",
      "Establish regular toilet routine"
    ],
    diet: [
      "Eat fiber-rich foods like fruits and vegetables",
      "Drink plenty of warm water",
      "Include ghee in meals",
      "Avoid processed and junk food"
    ],
    herbs: ["Triphala", "Castor oil", "Fennel", "Cumin"],
    note: "If constipation is chronic or severe, consult a doctor."
  },
  fatigue: {
    home: [
      "Adequate sleep (7-8 hours)",
      "Oil massage (Abhyanga)",
      "Warm baths with Epsom salt",
      "Regular daily routine"
    ],
    diet: [
      "Warm, nourishing foods",
      "Dates and nuts",
      "Warm milk with turmeric",
      "Avoid caffeine"
    ],
    herbs: ["Ashwagandha", "Shatavari", "Licorice"],
    note: "If fatigue persists for weeks, consult a doctor."
  },
  bodyache: {
    home: [
      "Warm oil massage with sesame oil",
      "Warm bath with Epsom salt",
      "Gentle stretching",
      "Apply warm compress on painful areas"
    ],
    diet: [
      "Warm, nourishing foods",
      "Ginger tea",
      "Turmeric milk",
      "Avoid cold foods"
    ],
    herbs: ["Ashwagandha", "Ginger", "Turmeric", "Dashamoola"],
    note: "If bodyache is severe or accompanied by fever, consult a doctor."
  },
  anxiety: {
    home: [
      "Deep breathing exercises",
      "Meditation for 10-15 minutes",
      "Gentle yoga",
      "Aromatherapy with lavender"
    ],
    diet: [
      "Warm milk with nutmeg before bed",
      "Avoid caffeine and stimulants",
      "Eat regular, nourishing meals",
      "Include calming herbs in diet"
    ],
    herbs: ["Brahmi", "Ashwagandha", "Jatamansi", "Tulsi"],
    note: "If anxiety is severe or persistent, consult a mental health professional."
  },
  insomnia: {
    home: [
      "Warm milk with nutmeg before bed",
      "Oil massage on feet and head",
      "Create dark, quiet sleep environment",
      "Avoid screens 1 hour before bed"
    ],
    diet: [
      "Avoid caffeine after noon",
      "Light dinner at least 2 hours before bed",
      "Warm, comforting foods",
      "Avoid heavy, spicy foods at night"
    ],
    herbs: ["Ashwagandha", "Brahmi", "Jatamansi", "Nutmeg"],
    note: "If insomnia is chronic, consult a doctor."
  }
};

export function AssessmentPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Namaste! 🙏 I'm your AyurCare AI assistant. I'll help you with a comprehensive health assessment combining Ayurvedic wisdom with modern AI.\n\nYou can:\n• Describe your symptoms for analysis\n• Ask me questions about Ayurveda, doshas, or health\n• Upload images (tongue, eyes, or herbs) for visual analysis\n\nHow are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [severity, setSeverity] = useState(5);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [conversationData, setConversationData] = useState({
    symptoms: [] as string[],
    duration: 0,
    age: 30,
    bodyArea: 'general' as string,
    imageAnalysis: null as any,
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      const result = await testConnection();
      setConnectionStatus(result.message);
      setIsBackendConnected(result.success);
      
      if (result.success) {
        const statusMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: '✅ Backend connected successfully! Ready to analyze your symptoms and images.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, statusMessage]);
      }
    } catch (error) {
      setConnectionStatus('❌ Cannot connect to backend');
      setIsBackendConnected(false);
    }
  };

  const cleanMarkdown = (text: string): string => {
    if (!text) return '';
    return text
      .replace(/#{1,6}\s?/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/---+/g, '')
      .replace(/`{1,3}/g, '')
      .replace(/>\s?/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const saveSessionToStorage = (analysis: any, symptoms: string[]) => {
    try {
      const userId = localStorage.getItem('userId') || 'anonymous';
      const session = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        symptoms: symptoms,
        analysis: {
          riskLevel: analysis.riskLevel || 'Moderate',
          riskScore: analysis.riskScore || 0,
          remedies: analysis.remedies || analysis.defaultRemedies
        }
      };

      const existingSessions = localStorage.getItem(`healthSessions_${userId}`);
      let sessions = existingSessions ? JSON.parse(existingSessions) : [];
      
      sessions.unshift(session);
      
      if (sessions.length > 20) {
        sessions = sessions.slice(0, 20);
      }
      
      localStorage.setItem(`healthSessions_${userId}`, JSON.stringify(sessions));
      console.log('✅ Session saved to history');
    } catch (error) {
      console.error('❌ Error saving session:', error);
    }
  };

  // ============= UPDATED HANDLE SEND MESSAGE WITH DOSHA MEANINGS =============
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsProcessing(true);

    // Check if asking for remedies from last analysis
    if ((currentInput.toLowerCase().includes('solution') || 
         currentInput.toLowerCase().includes('remedy') ||
         currentInput.toLowerCase().includes('cure') ||
         currentInput.toLowerCase().includes('treatment')) && lastAnalysis) {
      
      const responseContent = generateRemedyResponse(lastAnalysis);
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: responseContent,
        timestamp: new Date(),
        analysis: lastAnalysis,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      return;
    }

    // ============= CHECK FOR DOSHA MEANING QUESTIONS =============
    const lowerInput = currentInput.toLowerCase();
    
    // Check for Vata meaning
    if ((lowerInput.includes('what is vata') || 
         lowerInput.includes('vata meaning') || 
         lowerInput.includes('vata dosha') ||
         lowerInput === 'vata' ||
         (lowerInput.includes('vata') && lowerInput.includes('meaning')))) {
      
      const vataMeaning = "🌬️ **Vata Dosha** is the energy of movement composed of Air and Space elements.\n\n" +
        "**Characteristics:**\n" +
        "• Light, cold, dry, rough, mobile, subtle\n" +
        "• Governs breathing, blinking, muscle movement, heartbeat\n" +
        "• Controls creativity, enthusiasm, and vitality\n\n" +
        "**When Balanced:** Creative, energetic, flexible, enthusiastic\n\n" +
        "**When Imbalanced:** Anxiety, fear, dry skin, constipation, insomnia, restlessness\n\n" +
        "**To Balance Vata:**\n" +
        "• Eat warm, moist, nourishing foods\n" +
        "• Maintain regular daily routine\n" +
        "• Stay warm and avoid cold drafts\n" +
        "• Practice gentle yoga and meditation\n" +
        "• Get adequate rest and sleep\n\n" +
        "**Best Foods:** Warm soups, cooked grains, dairy, nuts, sweet fruits\n" +
        "**Avoid:** Cold drinks, dry foods, caffeine, raw vegetables";
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: vataMeaning,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      return;
    }
    
    // Check for Pitta meaning
    if ((lowerInput.includes('what is pitta') || 
         lowerInput.includes('pitta meaning') || 
         lowerInput.includes('pitta dosha') ||
         lowerInput === 'pitta' ||
         (lowerInput.includes('pitta') && lowerInput.includes('meaning')))) {
      
      const pittaMeaning = "🔥 **Pitta Dosha** is the energy of transformation composed of Fire and Water elements.\n\n" +
        "**Characteristics:**\n" +
        "• Hot, sharp, light, oily, liquid, spreading\n" +
        "• Governs digestion, metabolism, body temperature\n" +
        "• Controls intelligence, courage, and determination\n\n" +
        "**When Balanced:** Intelligent, content, courageous, warm-hearted\n\n" +
        "**When Imbalanced:** Anger, irritability, inflammation, acidity, skin rashes\n\n" +
        "**To Balance Pitta:**\n" +
        "• Eat cooling, refreshing foods\n" +
        "• Avoid spicy, oily, and fried foods\n" +
        "• Stay calm and avoid stressful situations\n" +
        "• Practice cooling breathing exercises\n" +
        "• Spend time in nature near water\n\n" +
        "**Best Foods:** Sweet fruits, vegetables, coconut, cucumber, mint\n" +
        "**Avoid:** Spicy food, alcohol, fermented foods, sour fruits";
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: pittaMeaning,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      return;
    }
    
    // Check for Kapha meaning
    if ((lowerInput.includes('what is kapha') || 
         lowerInput.includes('kapha meaning') || 
         lowerInput.includes('kapha dosha') ||
         lowerInput === 'kapha' ||
         (lowerInput.includes('kapha') && lowerInput.includes('meaning')))) {
      
      const kaphaMeaning = "🌊 **Kapha Dosha** is the energy of structure composed of Earth and Water elements.\n\n" +
        "**Characteristics:**\n" +
        "• Heavy, slow, cool, oily, smooth, dense, soft, stable\n" +
        "• Governs structure, lubrication, immunity\n" +
        "• Controls strength, stability, memory, and compassion\n\n" +
        "**When Balanced:** Strong, calm, loving, forgiving, patient\n\n" +
        "**When Imbalanced:** Weight gain, congestion, lethargy, attachment, greed\n\n" +
        "**To Balance Kapha:**\n" +
        "• Eat light, warm, dry foods\n" +
        "• Exercise regularly and stay active\n" +
        "• Avoid dairy, heavy foods, and sweets\n" +
        "• Wake up early and avoid daytime sleep\n" +
        "• Use warming spices in cooking\n\n" +
        "**Best Foods:** Light grains, legumes, apples, pears, honey, ginger\n" +
        "**Avoid:** Dairy, fried foods, cold drinks, excessive sweets";
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: kaphaMeaning,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      return;
    }

    // Extract symptoms from input
    const newSymptoms = extractSymptoms(currentInput);
    const duration = extractDuration(currentInput);
    const bodyArea = detectBodyArea(currentInput);
    
    setConversationData(prev => ({
      ...prev,
      symptoms: [...prev.symptoms, ...newSymptoms],
      duration: duration || prev.duration,
      bodyArea: bodyArea || prev.bodyArea,
    }));

    // Check if it's a general question or symptom
    const isGeneralQuestion = newSymptoms.length === 0 && 
                             !currentInput.toLowerCase().includes('pain') &&
                             !currentInput.toLowerCase().includes('ache') &&
                             !currentInput.toLowerCase().includes('fever');

    if (isGeneralQuestion) {
      // Use chat mode for general questions
      const thinkingMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: "🤔 Thinking...",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, thinkingMessage]);

      try {
        const reply = await chatWithAI(currentInput);
        
        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== thinkingMessage.id);
          const aiMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: reply,
            timestamp: new Date(),
          };
          return [...filtered, aiMessage];
        });
      } catch (error) {
        console.error('Chat error:', error);
        
        setMessages(prev => prev.filter(msg => msg.id !== thinkingMessage.id));
        
        // Fallback responses for common topics
        const lowerInput = currentInput.toLowerCase();
        let fallbackReply = '';
        
        if (lowerInput.includes('pitta')) {
          fallbackReply = "🌋 **Pitta** is the fire and water dosha. It governs digestion, metabolism, and transformation. When balanced, it leads to intelligence and contentment. Imbalanced Pitta can cause anger, inflammation, and acidity. To balance Pitta: favor cool foods, avoid spicy meals, and practice cooling breathing exercises.";
        } else if (lowerInput.includes('vata')) {
          fallbackReply = "🌬️ **Vata** is the air and space dosha. It controls movement, breathing, and circulation. Balanced Vata brings creativity and vitality. Imbalanced Vata can cause anxiety, dry skin, and constipation. To balance Vata: eat warm, nourishing foods, maintain a routine, and stay warm.";
        } else if (lowerInput.includes('kapha')) {
          fallbackReply = "🌊 **Kapha** is the earth and water dosha. It provides structure, lubrication, and stability. Balanced Kapha brings strength and calmness. Imbalanced Kapha can cause weight gain, congestion, and lethargy. To balance Kapha: eat light, warm foods, exercise regularly, and stay active.";
        } else if (lowerInput.includes('ayurveda')) {
          fallbackReply = "🌿 **Ayurveda** is the ancient Indian system of medicine that focuses on balance in the body, mind, and consciousness. It emphasizes prevention through lifestyle practices and uses natural remedies, diet, and herbal treatments to maintain health.";
        } else {
          fallbackReply = "I'm here to help with your health questions! You can ask me about:\n• Ayurvedic doshas (Vata, Pitta, Kapha)\n• Symptoms you're experiencing\n• Home remedies\n• Dietary advice\n\nWhat would you like to know?";
        }
        
        const aiMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: fallbackReply,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } else {
      // Use symptom analysis for medical symptoms
      await performAnalysis(newSymptoms);
    }

    setIsProcessing(false);
  };

  const extractSymptoms = (text: string): string[] => {
    const symptomKeywords: { [key: string]: string[] } = {
      'fever': ['fever', 'high temperature', 'hot', 'temperature'],
      'headache': ['headache', 'head pain', 'migraine'],
      'cough': ['cough', 'coughing'],
      'cold': ['cold', 'runny nose', 'sneezing', 'stuffy nose'],
      'stomach': ['stomach pain', 'stomach ache', 'abdominal pain', 'belly pain', 'stomach'],
      'nausea': ['nausea', 'queasy', 'sick stomach', 'vomit', 'vomiting'],
      'acidity': ['acidity', 'heartburn', 'burning stomach', 'acid reflux'],
      'diarrhea': ['diarrhea', 'loose motion', 'loose stools'],
      'constipation': ['constipation', 'hard stools', 'difficulty passing stool'],
      'fatigue': ['fatigue', 'tired', 'exhausted', 'weakness', 'low energy'],
      'bodyache': ['body ache', 'body pain', 'muscle pain', 'aches'],
      'anxiety': ['anxiety', 'anxious', 'stress', 'nervous', 'worry'],
      'insomnia': ['insomnia', 'can\'t sleep', 'sleepless', 'difficulty sleeping'],
    };

    const found: string[] = [];
    const lowerText = text.toLowerCase();
    
    Object.entries(symptomKeywords).forEach(([symptom, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        found.push(symptom);
      }
    });
    
    return found;
  };

  const extractDuration = (text: string): number | null => {
    const dayMatch = text.match(/(\d+)\s*day/i);
    const weekMatch = text.match(/(\d+)\s*week/i);
    const monthMatch = text.match(/(\d+)\s*month/i);
    
    if (monthMatch) return parseInt(monthMatch[1]) * 30;
    if (weekMatch) return parseInt(weekMatch[1]) * 7;
    if (dayMatch) return parseInt(dayMatch[1]);
    
    return null;
  };

  const detectBodyArea = (text: string): string | null => {
    const bodyAreas = {
      'head': ['head', 'brain', 'skull', 'forehead'],
      'chest': ['chest', 'heart', 'lungs', 'ribs'],
      'respiratory': ['breath', 'breathing', 'lungs', 'throat', 'nose'],
      'abdomen': ['stomach', 'belly', 'abdomen', 'gut', 'digest'],
      'limbs': ['arm', 'leg', 'hand', 'foot', 'limb'],
      'skin': ['skin', 'rash', 'itching', 'hives'],
      'general': ['body', 'general', 'overall', 'whole'],
    };

    const lowerText = text.toLowerCase();
    
    for (const [area, keywords] of Object.entries(bodyAreas)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return area;
      }
    }
    
    return null;
  };

  const generateRemedyResponse = (analysis: any): string => {
    let response = `🌿 Here are remedies for your ${analysis.symptoms?.join(', ') || 'symptoms'}:\n\n`;
    
    if (analysis.defaultRemedies) {
      if (analysis.defaultRemedies.home) {
        response += `🏠 Home Care:\n${analysis.defaultRemedies.home.map((r: string) => `• ${r}`).join('\n')}\n\n`;
      }
      if (analysis.defaultRemedies.diet) {
        response += `🥗 Dietary Suggestions:\n${analysis.defaultRemedies.diet.map((d: string) => `• ${d}`).join('\n')}\n\n`;
      }
      if (analysis.defaultRemedies.herbs) {
        response += `🌱 Beneficial Herbs:\n${analysis.defaultRemedies.herbs.map((h: string) => `• ${h}`).join('\n')}\n\n`;
      }
      if (analysis.defaultRemedies.note) {
        response += `⚠️ Note: ${analysis.defaultRemedies.note}\n\n`;
      }
    } else {
      response += `Note: Your condition requires medical attention. Please consult a doctor.\n\n`;
      response += `While waiting:\n• Rest completely\n• Stay hydrated\n• Monitor your symptoms\n`;
    }
    
    return response;
  };

  const getDefaultRemediesForSymptom = (symptom: string): Remedy | null => {
    const symptomLower = symptom.toLowerCase();
    if (symptomLower.includes('fever')) return DEFAULT_REMEDIES.fever;
    if (symptomLower.includes('cold')) return DEFAULT_REMEDIES.cold;
    if (symptomLower.includes('cough')) return DEFAULT_REMEDIES.cough;
    if (symptomLower.includes('headache')) return DEFAULT_REMEDIES.headache;
    if (symptomLower.includes('stomach') || symptomLower.includes('abdominal') || symptomLower.includes('belly')) return DEFAULT_REMEDIES.stomach;
    if (symptomLower.includes('nausea') || symptomLower.includes('vomit')) return DEFAULT_REMEDIES.nausea;
    if (symptomLower.includes('acidity') || symptomLower.includes('heartburn') || symptomLower.includes('reflux')) return DEFAULT_REMEDIES.acidity;
    if (symptomLower.includes('diarrhea') || symptomLower.includes('loose')) return DEFAULT_REMEDIES.diarrhea;
    if (symptomLower.includes('constipation')) return DEFAULT_REMEDIES.constipation;
    if (symptomLower.includes('fatigue') || symptomLower.includes('tired') || symptomLower.includes('exhausted')) return DEFAULT_REMEDIES.fatigue;
    if (symptomLower.includes('bodyache') || symptomLower.includes('body pain') || symptomLower.includes('muscle pain')) return DEFAULT_REMEDIES.bodyache;
    if (symptomLower.includes('anxiety') || symptomLower.includes('anxious') || symptomLower.includes('stress')) return DEFAULT_REMEDIES.anxiety;
    if (symptomLower.includes('insomnia') || symptomLower.includes('sleep')) return DEFAULT_REMEDIES.insomnia;
    return null;
  };

  const performAnalysis = async (newSymptoms: string[]) => {
    try {
      const allSymptoms = [...conversationData.symptoms, ...newSymptoms];
      
      if (allSymptoms.length === 0) {
        const noSymptomsMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: "I couldn't detect any specific symptoms in your message. Could you please describe how you're feeling?\n\nTry saying:\n• I have stomach pain\n• I'm feeling feverish\n• I have a headache\n• My stomach is upset\n• I feel nauseous\n• I have body ache",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, noSymptomsMessage]);
        setIsProcessing(false);
        return;
      }

      const analysisData = {
        symptoms: allSymptoms,
        age: conversationData.age,
        severity: severity,
        duration: conversationData.duration || 1,
        bodyArea: conversationData.bodyArea || 'general'
      };

      const thinkingMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: "🔍 Analyzing your symptoms with Gemini AI...",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, thinkingMessage]);

      try {
        const result = await analyzeWithGemini(analysisData);
        setLastAnalysis(result);
        saveSessionToStorage(result, allSymptoms);

        let responseContent = '';
        
        if (result.emergency) {
          responseContent = `🚨 EMERGENCY DETECTED\n\n${result.recommendation || 'Please seek immediate medical attention!'}\n\nImmediate Actions:\n• Call emergency services (102/108)\n• Do NOT wait\n• Keep patient comfortable`;
        } else {
          responseContent = `🤖 Gemini AI Analysis\n\n`;
          responseContent += `Severity Level: ${severity}/10\n`;
          responseContent += `Primary Dosha: ${result.dosha || 'Vata'}\n`;
          responseContent += `Risk Level: ${result.riskLevel || 'Moderate'}\n\n`;
          
          if (result.remedies && result.remedies.length > 0) {
            responseContent += `🌿 Personalized Remedies:\n`;
            result.remedies.forEach((remedy: string, index: number) => {
              responseContent += `${index + 1}. ${remedy}\n`;
            });
            responseContent += '\n';
          }
          
          if (result.dietary && result.dietary.length > 0) {
            responseContent += `🥗 Dietary Recommendations:\n`;
            result.dietary.forEach((item: string, index: number) => {
              responseContent += `${index + 1}. ${item}\n`;
            });
            responseContent += '\n';
          }
          
          if (result.herbs && result.herbs.length > 0) {
            responseContent += `🌱 Beneficial Herbs:\n`;
            result.herbs.forEach((herb: string, index: number) => {
              responseContent += `${index + 1}. ${herb}\n`;
            });
            responseContent += '\n';
          }
          
          if (result.recommendation) {
            responseContent += `💡 Recommendation:\n${result.recommendation}\n\n`;
          }
        }
        
        responseContent += `\n---\nPowered by Google Gemini AI`;
        responseContent = cleanMarkdown(responseContent);

        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== thinkingMessage.id);
          const aiMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: responseContent,
            timestamp: new Date(),
            analysis: result,
          };
          return [...filtered, aiMessage];
        });

      } catch (geminiError) {
        console.error('Gemini API error:', geminiError);
        
        let defaultRemedies: Remedy | null = null;
        for (const symptom of allSymptoms) {
          const remedies = getDefaultRemediesForSymptom(symptom);
          if (remedies) {
            defaultRemedies = remedies;
            break;
          }
        }
        
        saveSessionToStorage({ 
          riskLevel: 'Moderate', 
          riskScore: 5, 
          defaultRemedies 
        }, allSymptoms);
        
        let fallbackContent = `⚠️ Gemini AI is currently unavailable\n\n`;
        fallbackContent += `Based on your symptoms, here are standard Ayurvedic recommendations:\n\n`;
        
        if (defaultRemedies) {
          if (defaultRemedies.home && defaultRemedies.home.length > 0) {
            fallbackContent += `🏠 Home Care:\n`;
            defaultRemedies.home.forEach((item, index) => {
              fallbackContent += `${index + 1}. ${item}\n`;
            });
            fallbackContent += '\n';
          }
          
          if (defaultRemedies.diet && defaultRemedies.diet.length > 0) {
            fallbackContent += `🥗 Dietary Suggestions:\n`;
            defaultRemedies.diet.forEach((item, index) => {
              fallbackContent += `${index + 1}. ${item}\n`;
            });
            fallbackContent += '\n';
          }
          
          if (defaultRemedies.herbs && defaultRemedies.herbs.length > 0) {
            fallbackContent += `🌱 Beneficial Herbs:\n`;
            defaultRemedies.herbs.forEach((herb, index) => {
              fallbackContent += `${index + 1}. ${herb}\n`;
            });
            fallbackContent += '\n';
          }
          
          if (defaultRemedies.note) {
            fallbackContent += `⚠️ Note: ${defaultRemedies.note}\n\n`;
          }
        } else {
          fallbackContent += `General wellness tips:\n`;
          fallbackContent += `• Get adequate rest\n`;
          fallbackContent += `• Stay hydrated\n`;
          fallbackContent += `• Eat light, warm meals\n`;
          fallbackContent += `• Consult a doctor if symptoms persist\n\n`;
        }
        
        fallbackContent += `---\nUsing standard Ayurvedic database`;

        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== thinkingMessage.id);
          const aiMessage: Message = {
            id: Date.now().toString(),
            type: 'ai',
            content: fallbackContent,
            timestamp: new Date(),
            analysis: { defaultRemedies, symptoms: allSymptoms },
          };
          return [...filtered, aiMessage];
        });
      }

    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error while analyzing your symptoms.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsProcessing(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: '⚠️ Please upload a valid image file (JPEG, PNG, GIF, or WEBP)',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: '⚠️ File size too large. Maximum size is 10MB.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    const uploadMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `📸 Image uploaded for analysis: ${file.name}`,
      timestamp: new Date(),
      imageUrl: previewUrl,
    };
    setMessages(prev => [...prev, uploadMessage]);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null || prev >= 90) return prev;
        return prev + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append('image', file);
      
      if (conversationData.symptoms.length > 0) {
        formData.append('symptoms', JSON.stringify(conversationData.symptoms));
      }
      formData.append('age', conversationData.age.toString());
      formData.append('severity', severity.toString());
      formData.append('duration', (conversationData.duration || 1).toString());
      formData.append('bodyArea', conversationData.bodyArea || 'general');

      console.log('📤 Uploading image:', file.name, 'Size:', (file.size / 1024).toFixed(2), 'KB');
      
      setUploadProgress(50);
      
      const result = await analyzeWithImage(formData);
      
      setUploadProgress(100);
      clearInterval(progressInterval);
      
      console.log('✅ Upload response:', result);
      
      let responseContent = '';
      
      if (result.imageAnalysis) {
        responseContent = `✅ **Image Analysis Complete**\n\n`;
        responseContent += `**Detected Dosha:** ${result.imageAnalysis.dosha || 'Unknown'}\n\n`;
        responseContent += `**Observations:**\n${result.imageAnalysis.observations || 'Analysis complete'}\n\n`;
        
        if (result.imageAnalysis.suggestions && result.imageAnalysis.suggestions.length > 0) {
          responseContent += `**Suggestions:**\n`;
          result.imageAnalysis.suggestions.forEach((s: string, index: number) => {
            responseContent += `${index + 1}. ${s}\n`;
          });
        }
      } else {
        responseContent = `✅ **Image uploaded successfully!**\n\n${result.message || 'Analysis complete.'}`;
      }

      responseContent = cleanMarkdown(responseContent);

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: responseContent,
        timestamp: new Date(),
        analysis: result,
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setConversationData(prev => ({ ...prev, imageAnalysis: result.imageAnalysis }));

    } catch (error: any) {
      clearInterval(progressInterval);
      console.error('❌ Image upload error details:', error);
      
      let errorMessage = '⚠️ Sorry, I had trouble analyzing that image. ';
      
      if (error.message?.includes('Failed to fetch')) {
        errorMessage += 'Cannot connect to backend. Make sure the server is running on port 5000.';
      } else if (error.message?.includes('404')) {
        errorMessage += 'Backend endpoint not found.';
      } else if (error.message?.includes('413')) {
        errorMessage += 'Image file is too large.';
      } else if (error.message?.includes('NetworkError')) {
        errorMessage += 'Network error. Check your connection.';
      } else {
        errorMessage += 'Please try again with a clearer image.';
      }
      
      const errorMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: errorMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessageObj]);
      
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleCameraOpen = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    })
      .then(stream => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please check permissions.');
        setIsCameraOpen(false);
      });
  };

  const handleCameraClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraOpen(false);
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `captured_image_${Date.now()}.jpg`, { type: 'image/jpeg' });
            
            const fakeEvent = {
              target: {
                files: [file]
              }
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            
            await handleImageUpload(fakeEvent);
          }
        }, 'image/jpeg', 0.9);
        
        handleCameraClose();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#8BA888]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#5A6B59] hover:text-[#8BA888] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-xl font-semibold text-[#3D4A3C]">
              Interactive Multi-Modal Assessment
            </h1>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs text-[#5A6B59]">
                {isBackendConnected ? 'Backend Connected' : 'Backend Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
              {/* Chat Header */}
              <div className="p-6 border-b border-[#8BA888]/10 bg-gradient-to-r from-[#8BA888]/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8BA888] to-[#6B9468] flex items-center justify-center">
                    <span className="text-white font-semibold">AI</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#3D4A3C]">AyurCare Assistant</div>
                    <div className="flex items-center gap-1 text-xs text-[#5A6B59]">
                      <div className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      {isBackendConnected ? 'Connected to Backend' : 'Checking connection...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'rounded-tr-md bg-[#E8DCC4]/40 border border-[#E8DCC4]'
                            : 'rounded-tl-md bg-gradient-to-br from-[#8BA888]/10 to-[#8BA888]/5 border border-[#8BA888]/20'
                        }`}
                      >
                        {message.imageUrl && (
                          <div className="mb-3">
                            <img 
                              src={message.imageUrl} 
                              alt="Uploaded" 
                              className="max-w-full h-auto rounded-lg max-h-48 object-contain"
                            />
                          </div>
                        )}
                        <p className="text-sm text-[#3D4A3C] whitespace-pre-wrap">{message.content}</p>
                        
                        {message.analysis && (
                          <div className="mt-4 space-y-3">
                            {message.analysis.riskLevel && (
                              <div className="p-4 rounded-xl bg-white/80 space-y-2">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="text-xs font-semibold text-[#3D4A3C]">Risk Assessment</span>
                                </div>
                                <span className="inline-flex px-3 py-1 rounded-full border text-xs font-medium">
                                  {message.analysis.riskLevel} Risk
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[#5A6B59]/60 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-[#5A6B59]"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">
                      {uploadProgress !== null ? `Uploading... ${uploadProgress}%` : 'AI is analyzing...'}
                    </span>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[#8BA888]/10 bg-white/40">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Describe your symptoms or ask a question..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-white border border-[#8BA888]/20 focus:outline-none focus:border-[#8BA888] transition-colors text-sm"
                    disabled={isProcessing}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isProcessing || !inputValue.trim()}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#8BA888] to-[#6B9468] text-white flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Upload Panel */}
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-[#8BA888]/20 shadow-lg">
              <h3 className="font-semibold text-[#3D4A3C] mb-4">Upload Image</h3>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 rounded-xl border-2 border-dashed border-[#8BA888]/30 bg-[#8BA888]/5 hover:bg-[#8BA888]/10 transition-colors cursor-pointer text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#8BA888]/20 mx-auto mb-3 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-[#8BA888]" />
                </div>
                <p className="text-sm font-medium text-[#3D4A3C] mb-1">
                  Upload for Analysis
                </p>
                <p className="text-xs text-[#5A6B59]">
                  Tongue, eyes, or herb images
                </p>
              </div>

              <button
                onClick={handleCameraOpen}
                className="w-full mt-3 px-4 py-3 rounded-xl bg-white/80 border border-[#8BA888]/20 text-[#5A6B59] font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Take Photo
              </button>

              <div className="mt-4 p-3 rounded-xl bg-[#E8DCC4]/20">
                <p className="text-xs font-medium text-[#3D4A3C] mb-1">Supported:</p>
                <p className="text-xs text-[#5A6B59]">JPG, PNG (Max 10MB)</p>
                <p className="text-xs text-[#5A6B59] mt-2">Best results: tongue photos, eye close-ups, herb images</p>
              </div>
            </div>

            {/* Camera Panel */}
            <AnimatePresence>
              {isCameraOpen && (
                <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-[#8BA888]/20 shadow-lg">
                  <h3 className="font-semibold text-[#3D4A3C] mb-4">Camera Capture</h3>
                  
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-48 rounded-xl bg-black"
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-48 rounded-xl"
                      style={{ display: 'none' }}
                    />
                  </div>
                  
                  <button
                    onClick={handleCapture}
                    className="w-full mt-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#8BA888] to-[#6B9468] text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ScanLine className="w-5 h-5" />
                    Capture Photo
                  </button>

                  <button
                    onClick={handleCameraClose}
                    className="w-full mt-3 px-4 py-3 rounded-xl bg-white/80 border border-[#8BA888]/20 text-[#5A6B59] font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Close Camera
                  </button>
                </div>
              )}
            </AnimatePresence>

            {/* Severity Slider */}
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-[#8BA888]/20 shadow-lg">
              <h3 className="font-semibold text-[#3D4A3C] mb-4">Symptom Severity</h3>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, #8BA888 0%, #FFA500 50%, #DC2626 100%)',
                }}
              />
              <div className="flex justify-between mt-3">
                <span className="text-xs text-[#5A6B59]">Mild</span>
                <span className="text-xs font-semibold text-[#3D4A3C]">{severity}/10</span>
                <span className="text-xs text-[#5A6B59]">Severe</span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#8BA888]/10 to-[#8BA888]/5 border border-[#8BA888]/20">
              <h3 className="font-semibold text-[#3D4A3C] mb-2">Backend Status</h3>
              <ul className="text-xs text-[#5A6B59] space-y-2">
                <li className="flex items-start gap-2">
                  <span className={`mt-0.5 ${isBackendConnected ? 'text-green-500' : 'text-yellow-500'}`}>
                    {isBackendConnected ? '✓' : '?'}
                  </span>
                  <span>{isBackendConnected ? 'Backend connected' : 'Checking connection...'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8BA888] mt-0.5">✓</span>
                  <span>Real symptom analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8BA888] mt-0.5">✓</span>
                  <span>AI image processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8BA888] mt-0.5">✓</span>
                  <span>Emergency detection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}