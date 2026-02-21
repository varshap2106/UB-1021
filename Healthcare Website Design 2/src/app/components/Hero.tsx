import { ArrowRight, Upload, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Tooltip, ayurvedicTerms } from './Tooltip';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F1] via-[#E8F0E8] to-[#D4E5D8]" />
      
      {/* Animated Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#2D5F3F]/20 to-[#3D6F4F]/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#4A8B5F]/20 to-[#2D5F3F]/10 rounded-full blur-3xl"
      />
      
      {/* Subtle Herbal Illustrations */}
      <div className="absolute top-1/4 left-10 opacity-10">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 10C60 10 40 40 40 60C40 71.046 48.954 80 60 80C71.046 80 80 71.046 80 60C80 40 60 10 60 10Z"
            fill="#2D5F3F"
          />
          <circle cx="45" cy="45" r="8" fill="#2D5F3F" />
          <circle cx="75" cy="45" r="6" fill="#2D5F3F" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 right-20 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="30" rx="15" ry="25" fill="#2D5F3F" />
          <ellipse cx="35" cy="50" rx="12" ry="20" transform="rotate(-30 35 50)" fill="#2D5F3F" />
          <ellipse cx="65" cy="50" rx="12" ry="20" transform="rotate(30 65 50)" fill="#2D5F3F" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-md border border-[#2D5F3F]/30 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#2D5F3F]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#1A2F1A] to-[#2D5F3F] bg-clip-text text-transparent">
              Powered by Advanced AI Technology
            </span>
          </motion.div>

          {/* Main Heading with Elegant Font */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A2F1A] leading-tight" style={{ fontFamily: 'var(--font-family-heading)' }}>
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-[#2D5F3F] via-[#3D6F4F] to-[#4A8B5F] bg-clip-text text-transparent">
              Ayurvedic Wellness
            </span>
            <br />
            <span className="text-5xl sm:text-6xl">Assistant</span>
          </h1>

          {/* Subtext with Tooltips */}
          <p className="text-lg sm:text-xl text-[#2D3E2D] max-w-3xl mx-auto leading-relaxed font-medium">
            Multi-modal health insights combining ancient{' '}
            <Tooltip term="Ayurveda" definition={ayurvedicTerms.prakriti}>
              Ayurvedic
            </Tooltip>{' '}
            wisdom with modern AI technology for personalized preventive care.{' '}
            Understand your unique{' '}
            <Tooltip term="Dosha" definition={ayurvedicTerms.dosha}>
              Dosha
            </Tooltip>{' '}
            constitution and optimize your wellbeing.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => navigate('/assessment')}
              className="group px-10 py-4 rounded-xl bg-gradient-to-r from-[#2D5F3F] via-[#3D6F4F] to-[#4A8B5F] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#2D5F3F]/40 transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
            >
              Start Assessment
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/assessment')}
              className="px-10 py-4 rounded-xl bg-white backdrop-blur-md border-2 border-[#2D5F3F]/30 text-[#1A2F1A] font-bold text-lg hover:bg-white hover:border-[#2D5F3F] hover:shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
            >
              <Upload className="w-6 h-6" />
              Upload Scan
            </button>
          </motion.div>

          {/* Stats or Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16"
          >
            <div className="space-y-2 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#2D5F3F]/20 shadow-lg">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#2D5F3F] to-[#4A8B5F] bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-family-heading)' }}>10k+</div>
              <div className="text-sm font-semibold text-[#2D3E2D]">Active Users</div>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#2D5F3F]/20 shadow-lg">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#2D5F3F] to-[#4A8B5F] bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-family-heading)' }}>98%</div>
              <div className="text-sm font-semibold text-[#2D3E2D]">Satisfaction</div>
            </div>
            <div className="space-y-2 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#2D5F3F]/20 shadow-lg">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#2D5F3F] to-[#4A8B5F] bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-family-heading)' }}>24/7</div>
              <div className="text-sm font-semibold text-[#2D3E2D]">Available</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}