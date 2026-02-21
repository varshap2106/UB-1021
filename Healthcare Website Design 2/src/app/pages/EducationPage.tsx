import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, BookOpen, Sparkles, Wind, Flame, Droplet } from 'lucide-react';
import { motion } from 'motion/react';

export function EducationPage() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('doshas');

  const educationalContent = {
    doshas: {
      title: 'Understanding the Three Doshas',
      icon: Wind,
      content: `According to classical Ayurvedic understanding, the three doshas - Vata, Pitta, and Kapha - are fundamental energetic principles that govern all biological, psychological, and physiological functions.

**Vata (Air + Space):**
Governs movement, communication, and the nervous system. When balanced, promotes creativity and vitality. Excess Vata may manifest as anxiety, restlessness, and digestive irregularities.

**Pitta (Fire + Water):**
Represents transformation and metabolism. Controls digestion, absorption, and body temperature. Excess Pitta can manifest as inflammation, irritability, and heat-related symptoms.

**Kapha (Water + Earth):**
Provides structure, lubrication, and stability. Supports immunity and tissue formation. Excess Kapha may present as lethargy, weight gain, and congestion.

The goal of Ayurveda is to maintain balance among these three doshas according to one's unique constitution (Prakriti).`,
      color: '#8BA888',
    },
    agni: {
      title: 'Agni - The Digestive Fire',
      icon: Flame,
      content: `Agni, or digestive fire, is considered the cornerstone of health in Ayurveda. It represents not just physical digestion, but the body's ability to process experiences, emotions, and environmental inputs.

**Four States of Agni:**

**Sama Agni (Balanced):**
Optimal digestion, regular appetite, and efficient metabolism. This is the ideal state.

**Vishama Agni (Irregular):**
Associated with Vata imbalance. Characterized by variable appetite and unpredictable digestion.

**Tikshna Agni (Sharp):**
Linked to Pitta excess. Manifests as intense hunger and rapid digestion, sometimes leading to heartburn.

**Manda Agni (Slow):**
Related to Kapha accumulation. Results in sluggish digestion and reduced appetite.

Maintaining balanced Agni through appropriate diet, lifestyle, and seasonal routines is fundamental to preventing disease and promoting longevity.`,
      color: '#DC6B4A',
    },
    ama: {
      title: 'Ama - Toxins and Imbalance',
      icon: Droplet,
      content: `Ama refers to undigested material or toxins that accumulate when Agni is weak. It is considered a primary cause of disease in Ayurvedic medicine.

**Formation of Ama:**
When digestive fire is weak, food is not properly metabolized, leading to toxic residue. This sticky substance accumulates in the body and blocks channels (srotas).

**Signs of Ama:**
• Coating on tongue (especially white)
• Lack of appetite
• Sluggish digestion
• Fatigue and heaviness
• Mental fog
• Body odor

**Reducing Ama:**
• Strengthen Agni through warm, cooked foods
• Use digestive spices (ginger, cumin, coriander)
• Intermittent fasting or light meals
• Regular exercise
• Adequate sleep
• Stress management

Triphala, a classical Ayurvedic formulation, is traditionally used to support natural elimination of Ama.`,
      color: '#B89A77',
    },
    foundations: {
      title: 'Classical Ayurvedic Foundations',
      icon: BookOpen,
      content: `Ayurveda, meaning "science of life," is a 5,000-year-old system of natural healing originating from ancient India. It is based on the principle that health and wellness depend on a delicate balance between mind, body, and spirit.

**Core Principles:**

**Prakriti (Constitution):**
Each individual has a unique combination of doshas determined at birth. Understanding your Prakriti helps guide personalized health choices.

**Panchamahabhutas (Five Elements):**
All matter is composed of five elements: Space, Air, Fire, Water, and Earth. Doshas are combinations of these elements.

**Srotas (Channels):**
Systems of circulation throughout the body. Health requires these channels to remain open and flowing.

**Ojas, Tejas, and Prana:**
Subtle essences that govern immunity, transformation, and vitality respectively.

**Dinacharya (Daily Routine):**
Ayurveda emphasizes daily practices aligned with natural rhythms to maintain balance.

**Ritucharya (Seasonal Routine):**
Adjusting lifestyle and diet according to seasonal changes prevents imbalance.

These foundational concepts provide a framework for understanding health as a dynamic equilibrium rather than merely the absence of disease.`,
      color: '#6B9468',
    },
  };

  const topics = [
    { key: 'doshas', label: 'Three Doshas', icon: Wind },
    { key: 'agni', label: 'Digestive Fire', icon: Flame },
    { key: 'ama', label: 'Toxins & Ama', icon: Droplet },
    { key: 'foundations', label: 'Classical Foundations', icon: BookOpen },
  ];

  const currentContent = educationalContent[selectedTopic as keyof typeof educationalContent];

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
              Educational & Credible Insights
            </h1>
            <div className="w-32" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8BA888]/10 border border-[#8BA888]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#8BA888]" />
            <span className="text-sm text-[#5A6B59]">AI-Enhanced Educational Content</span>
          </div>
          <h2 className="text-3xl font-bold text-[#3D4A3C] mb-4">
            Learn Ayurvedic Principles
          </h2>
          <p className="text-lg text-[#5A6B59] max-w-2xl mx-auto">
            Explore evidence-based Ayurvedic concepts with AI-generated explanations rooted in classical texts.
          </p>
        </motion.div>

        {/* Topic Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {topics.map((topic) => (
            <motion.button
              key={topic.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTopic(topic.key)}
              className={`p-6 rounded-2xl border-2 transition-all ${
                selectedTopic === topic.key
                  ? 'border-[#8BA888] bg-[#8BA888]/10 shadow-lg'
                  : 'border-transparent bg-white/40'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  selectedTopic === topic.key ? 'bg-[#8BA888]/20' : 'bg-gray-100'
                }`}
              >
                <topic.icon
                  className="w-6 h-6"
                  style={{ color: selectedTopic === topic.key ? '#8BA888' : '#5A6B59' }}
                />
              </div>
              <h3 className="font-semibold text-[#3D4A3C] text-sm">{topic.label}</h3>
            </motion.button>
          ))}
        </div>

        {/* Content Display */}
        <motion.div
          key={selectedTopic}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-10 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${currentContent.color}20` }}
            >
              <currentContent.icon className="w-8 h-8" style={{ color: currentContent.color }} />
            </div>
            <h2 className="text-3xl font-bold text-[#3D4A3C]">{currentContent.title}</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="text-[#5A6B59] leading-relaxed whitespace-pre-line space-y-4">
              {currentContent.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className={paragraph.startsWith('**') ? 'font-semibold text-[#3D4A3C]' : ''}>
                  {paragraph.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>
          </div>

          {/* AI Enhancement Note */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#8BA888]/5 to-[#6B9468]/5 border border-[#8BA888]/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#8BA888] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#3D4A3C] mb-2">AI-Enhanced Explanation</h4>
                <p className="text-sm text-[#5A6B59]">
                  This content combines traditional Ayurvedic wisdom with AI-generated explanations. 
                  The AI provides context and clarity while staying true to classical principles from ancient texts like 
                  Charaka Samhita and Sushruta Samhita. Always consult qualified Ayurvedic practitioners for personalized guidance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* References Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-[#E8DCC4]/20 to-white/40 border border-[#E8DCC4]"
        >
          <h3 className="text-xl font-semibold text-[#3D4A3C] mb-4">Classical References</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-white/60">
              <h4 className="font-semibold text-[#3D4A3C] mb-2">Charaka Samhita</h4>
              <p className="text-sm text-[#5A6B59]">
                Ancient Ayurvedic text on medicine and therapeutics, attributed to sage Charaka.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/60">
              <h4 className="font-semibold text-[#3D4A3C] mb-2">Sushruta Samhita</h4>
              <p className="text-sm text-[#5A6B59]">
                Classical text on surgery and anatomy, foundational to Ayurvedic surgical practice.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/60">
              <h4 className="font-semibold text-[#3D4A3C] mb-2">Ashtanga Hridaya</h4>
              <p className="text-sm text-[#5A6B59]">
                Comprehensive compendium synthesizing the essential teachings of Ayurveda.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 rounded-2xl bg-[#FFA500]/5 border border-[#FFA500]/20 text-center">
          <p className="text-sm text-[#5A6B59]">
            <strong>Educational Purpose Only:</strong> This information is provided for learning and awareness. 
            It does not constitute medical advice. Consult qualified healthcare professionals for diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
