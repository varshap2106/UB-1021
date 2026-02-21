const geminiService = require('../services/geminiService');
const riskEngine = require('../services/riskEngine');
const { v4: uuidv4 } = require('uuid');

exports.analyzeTongue = async (req, res) => {
  try {
    const { image, symptoms } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Process image with Gemini
    const doshaAnalysis = await geminiService.analyzeTongue(image);
    
    // Calculate risk score based on symptoms
    const riskScore = riskEngine.calculateRisk({
      symptoms: symptoms || [],
      severity: req.body.severity || 0,
      age: req.body.age || 30,
      duration: req.body.duration || 1
    });

    // Get personalized remedies
    const remedies = await geminiService.getRemedies({
      dosha: doshaAnalysis.primaryDosha,
      symptoms: symptoms || [],
      riskScore
    });

    res.json({
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      dosha: doshaAnalysis,
      risk: {
        score: riskScore,
        level: riskScore < 4 ? 'low' : riskScore < 7 ? 'moderate' : 'high'
      },
      remedies,
      disclaimer: "This is for educational purposes only. Not a medical diagnosis."
    });

  } catch (error) {
    console.error('Tongue analysis error:', error);
    res.status(500).json({ error: 'Analysis failed', message: error.message });
  }
};

exports.analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, severity, duration, age } = req.body;

    // Calculate risk
    const riskScore = riskEngine.calculateRisk({
      symptoms,
      severity,
      age,
      duration
    });

    // Check for emergencies
    const emergency = riskEngine.checkEmergencySymptoms(symptoms);
    if (emergency.isEmergency) {
      return res.json({
        emergency: true,
        message: emergency.message,
        action: emergency.action,
        riskScore: 10
      });
    }

    // Get Ayurvedic insights from Gemini
    const insights = await geminiService.analyzeSymptoms(symptoms);

    res.json({
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      risk: {
        score: riskScore,
        level: riskScore < 4 ? 'low' : riskScore < 7 ? 'moderate' : 'high'
      },
      insights,
      recommendations: riskEngine.getRecommendations(riskScore, insights.dosha)
    });

  } catch (error) {
    console.error('Symptom analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
};

exports.comprehensiveAnalysis = async (req, res) => {
  try {
    const { image, symptoms, severity, duration, age } = req.body;

    // Run both analyses
    const [tongueAnalysis, riskAnalysis] = await Promise.all([
      image ? geminiService.analyzeTongue(image) : null,
      riskEngine.calculateRisk({ symptoms, severity, age, duration })
    ]);

    // Check emergencies
    const emergency = riskEngine.checkEmergencySymptoms(symptoms);
    if (emergency.isEmergency) {
      return res.json({
        emergency: true,
        ...emergency
      });
    }

    // Generate comprehensive report
    const report = await geminiService.generateWellnessPlan({
      dosha: tongueAnalysis?.primaryDosha,
      symptoms,
      riskScore: riskAnalysis
    });

    res.json({
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      tongueAnalysis,
      risk: {
        score: riskAnalysis,
        level: riskAnalysis < 4 ? 'low' : riskAnalysis < 7 ? 'moderate' : 'high'
      },
      report,
      disclaimer: "Educational purposes only. Consult a doctor for medical advice."
    });

  } catch (error) {
    console.error('Comprehensive analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
};