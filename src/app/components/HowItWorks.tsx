import { MessageSquare, ScanLine, Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Chat & Upload Scan',
    description: 'Start a conversation or upload medical images for analysis',
    color: '#8BA888',
  },
  {
    icon: ScanLine,
    title: 'AI Analysis',
    description: 'Advanced AI processes your inputs with Ayurvedic principles',
    color: '#A68A64',
  },
  {
    icon: Shield,
    title: 'Risk Evaluation',
    description: 'Receive detailed risk assessment and severity levels',
    color: '#B89A77',
  },
  {
    icon: Sparkles,
    title: 'Personalized Guidance',
    description: 'Get customized wellness recommendations and action plans',
    color: '#8BA888',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#3D4A3C] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#5A6B59] max-w-2xl mx-auto">
            Your journey to personalized wellness in four simple steps
          </p>
        </motion.div>

        {/* Steps - Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8BA888] via-[#A68A64] to-[#8BA888] opacity-20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#8BA888]/30 flex items-center justify-center text-sm font-semibold text-[#8BA888] z-10">
                  {index + 1}
                </div>

                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-white to-[#FAF7F2] border border-[#8BA888]/20 shadow-lg flex items-center justify-center mb-6"
                  style={{
                    boxShadow: `0 10px 30px ${step.color}15`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}CC 100%)`,
                    }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-[#3D4A3C] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5A6B59] max-w-xs">
                  {step.description}
                </p>

                {/* Arrow for desktop - between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-8 text-[#8BA888]/30">
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                      <path
                        d="M0 8H30M30 8L24 2M30 8L24 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8BA888] to-[#6B9468] text-white font-medium hover:shadow-xl hover:shadow-[#8BA888]/30 transition-all">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}
