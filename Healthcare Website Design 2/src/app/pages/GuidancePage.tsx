import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Leaf, UtensilsCrossed, Activity, Droplets } from 'lucide-react';
import { motion } from 'motion/react';
import { DOSHA_RECOMMENDATIONS, DoshaType } from '../utils/doshaDatabase';

export function GuidancePage() {
  const navigate = useNavigate();
  const [selectedDosha, setSelectedDosha] = useState<DoshaType>('Vata');

  const doshaColors = {
    Vata: '#8BA888',
    Pitta: '#DC6B4A',
    Kapha: '#B89A77',
    Balanced: '#6B9468',
  };

  const recommendations = DOSHA_RECOMMENDATIONS[selectedDosha];

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
              Personalized Preventive Guidance
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
          <h2 className="text-3xl font-bold text-[#3D4A3C] mb-4">
            Rule + AI Hybrid Recommendations
          </h2>
          <p className="text-lg text-[#5A6B59] max-w-2xl mx-auto">
            Select your Dosha type to explore personalized dietary, lifestyle, and herbal recommendations
            based on classical Ayurvedic principles.
          </p>
        </motion.div>

        {/* Dosha Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
          {(['Vata', 'Pitta', 'Kapha', 'Balanced'] as DoshaType[]).map((dosha) => (
            <motion.button
              key={dosha}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedDosha(dosha)}
              className={`p-6 rounded-2xl border-2 transition-all ${
                selectedDosha === dosha
                  ? 'border-current shadow-lg'
                  : 'border-transparent bg-white/40'
              }`}
              style={{
                borderColor: selectedDosha === dosha ? doshaColors[dosha] : undefined,
                backgroundColor: selectedDosha === dosha ? `${doshaColors[dosha]}10` : undefined,
              }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${doshaColors[dosha]}20` }}
              >
                <Leaf className="w-6 h-6" style={{ color: doshaColors[dosha] }} />
              </div>
              <h3 className="font-semibold text-[#3D4A3C]">{dosha}</h3>
            </motion.button>
          ))}
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Diet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${doshaColors[selectedDosha]}20` }}
              >
                <UtensilsCrossed className="w-6 h-6" style={{ color: doshaColors[selectedDosha] }} />
              </div>
              <h3 className="text-xl font-semibold text-[#3D4A3C]">Dietary Recommendations</h3>
            </div>
            <ul className="space-y-3">
              {recommendations.diet.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: doshaColors[selectedDosha] }} />
                  <span className="text-[#5A6B59]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lifestyle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${doshaColors[selectedDosha]}20` }}
              >
                <Activity className="w-6 h-6" style={{ color: doshaColors[selectedDosha] }} />
              </div>
              <h3 className="text-xl font-semibold text-[#3D4A3C]">Lifestyle Practices</h3>
            </div>
            <ul className="space-y-3">
              {recommendations.lifestyle.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: doshaColors[selectedDosha] }} />
                  <span className="text-[#5A6B59]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Herbs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${doshaColors[selectedDosha]}20` }}
              >
                <Droplets className="w-6 h-6" style={{ color: doshaColors[selectedDosha] }} />
              </div>
              <h3 className="text-xl font-semibold text-[#3D4A3C]">Recommended Herbs</h3>
            </div>
            <ul className="space-y-3">
              {recommendations.herbs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: doshaColors[selectedDosha] }} />
                  <span className="text-[#5A6B59]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What to Avoid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#DC2626]/10">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold text-[#3D4A3C]">What to Avoid</h3>
            </div>
            <ul className="space-y-3">
              {recommendations.avoid.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" />
                  <span className="text-[#5A6B59]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Educational Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-[#8BA888]/10 to-[#8BA888]/5 border border-[#8BA888]/20"
        >
          <h3 className="text-xl font-semibold text-[#3D4A3C] mb-4">
            Understanding {selectedDosha} Dosha
          </h3>
          <p className="text-[#5A6B59] leading-relaxed mb-4">
            {recommendations.explanation}
          </p>
          <div className="p-4 rounded-xl bg-[#FFA500]/5 border border-[#FFA500]/20">
            <p className="text-sm text-[#5A6B59]">
              <strong>Important:</strong> These recommendations are based on classical Ayurvedic principles and are meant for educational purposes. 
              Individual constitutions vary, and it's recommended to consult with a qualified Ayurvedic practitioner for personalized guidance.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/assessment')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8BA888] to-[#6B9468] text-white font-medium hover:shadow-xl hover:shadow-[#8BA888]/30 transition-all"
          >
            Start Your Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
