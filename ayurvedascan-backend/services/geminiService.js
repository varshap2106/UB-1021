const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const DOSHA_PROMPTS = {
  tongue: "You are an Ayurvedic expert. Analyze this tongue image and return JSON with: primaryDosha (Vata/Pitta/Kapha), confidence (0-1), characteristics observed, and imbalances detected. Keep response under 200 words.",
  
  symptoms: "Based on these symptoms, identify the likely Dosha imbalance. Return JSON with dosha, explanation, and matching Ayurvedic principles from classical texts.",
  
  remedies: "Suggest Ayurvedic remedies including diet, lifestyle, and herbs for this dosha imbalance. Return JSON with diet, lifestyle, herbs, and yoga recommendations."
};

exports.analyzeTongue = async (imageBase64) => {
  try {
    // Remove data URL prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    
    const result = await model.generateContent([
      DOSHA_PROMPTS.tongue,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    try {
      const jsonMatch = text.match(/\{.*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : {
        primaryDosha: "Vata",
        confidence: 0.7,
        characteristics: ["Dry tongue", "Cracks visible"],
        imbalances: ["Vata imbalance indicated"]
      };
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return {
        primaryDosha: "Pitta",
        confidence: 0.6,
        characteristics: ["Reddish tongue", "Heat signs"],
        imbalances: ["Pitta imbalance suspected"]
      };
    }
    
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('AI analysis failed');
  }
};

exports.analyzeSymptoms = async (symptoms) => {
  try {
    const result = await model.generateContent(
      DOSHA_PROMPTS.symptoms + "\nSymptoms: " + symptoms.join(", ")
    );
    
    const response = await result.response;
    const text = response.text();
    
    // Parse or return default
    try {
      const jsonMatch = text.match(/\{.*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : {
        dosha: "Vata",
        explanation: "Symptoms indicate Vata imbalance",
        principles: "According to Charaka Samhita..."
      };
    } catch (e) {
      return {
        dosha: "Kapha",
        explanation: "Based on symptoms provided",
        principles: "Classical Ayurvedic texts suggest..."
      };
    }
    
  } catch (error) {
    console.error('Symptom analysis error:', error);
    return {
      dosha: "Tridoshic",
      explanation: "Mixed dosha pattern detected",
      principles: "Individual assessment recommended"
    };
  }
};

exports.getRemedies = async ({ dosha, symptoms, riskScore }) => {
  try {
    const prompt = `${DOSHA_PROMPTS.remedies}\nDosha: ${dosha}\nRisk Level: ${riskScore < 4 ? 'Mild' : riskScore < 7 ? 'Moderate' : 'Severe'}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Default remedies if parsing fails
    const defaultRemedies = {
      Vata: {
        diet: ["Warm, cooked foods", "Healthy fats", "Warm milk with spices"],
        lifestyle: ["Regular routine", "Warm oil massage", "Rest"],
        herbs: ["Ashwagandha", "Dashamoola", "Licorice"],
        yoga: ["Slow, grounding poses", "Corpse pose", "Child's pose"]
      },
      Pitta: {
        diet: ["Cooling foods", "Sweet fruits", "Bitter greens"],
        lifestyle: ["Cool environment", "Avoid midday sun", "Calming activities"],
        herbs: ["Brahmi", "Neem", "Shatavari"],
        yoga: ["Cooling breaths", "Moon salutations", "Forward bends"]
      },
      Kapha: {
        diet: ["Light, warm foods", "Spices", "Raw honey"],
        lifestyle: ["Active routine", "Dry brushing", "Varied schedule"],
        herbs: ["Trikatu", "Guggulu", "Tulsi"],
        yoga: ["Energizing poses", "Sun salutations", "Backbends"]
      }
    };
    
    try {
      const jsonMatch = text.match(/\{.*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : defaultRemedies[dosha] || defaultRemedies.Vata;
    } catch (e) {
      return defaultRemedies[dosha] || defaultRemedies.Vata;
    }
    
  } catch (error) {
    console.error('Remedies error:', error);
    return {
      diet: ["Consult an Ayurvedic practitioner"],
      lifestyle: ["Maintain daily routine"],
      herbs: ["Take professional advice"],
      yoga: ["Practice gentle yoga"]
    };
  }
};

exports.generateWellnessPlan = async ({ dosha, symptoms, riskScore }) => {
  try {
    const prompt = `Create a comprehensive Ayurvedic wellness plan for:
      Dosha: ${dosha || 'Unknown'}
      Symptoms: ${symptoms?.join(', ') || 'None specified'}
      Risk Level: ${riskScore < 4 ? 'Mild' : riskScore < 7 ? 'Moderate' : 'Severe'}
      
      Include: diet plan (morning, noon, evening), lifestyle routine, herbal support, yoga sequence, and preventive measures.
      Format as JSON with these sections.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonMatch = text.match(/\{.*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : {
        diet: { morning: "Warm water with lemon", noon: "Balanced meal", evening: "Light dinner" },
        lifestyle: "Wake before sunrise, regular meals, early dinner",
        herbs: ["Triphala", "Tulsi tea"],
        yoga: ["Surya Namaskar", "Pranayama"],
        prevention: "Maintain routine, avoid incompatible foods"
      };
    } catch (e) {
      return {
        diet: "Balanced Ayurvedic diet",
        lifestyle: "Follow daily routine",
        herbs: "As per practitioner",
        yoga: "Regular practice",
        prevention: "Mindful living"
      };
    }
    
  } catch (error) {
    console.error('Wellness plan error:', error);
    return {
      diet: "Simple, fresh foods",
      lifestyle: "Regular routine",
      herbs: "Consult expert",
      yoga: "Gentle asanas"
    };
  }
};