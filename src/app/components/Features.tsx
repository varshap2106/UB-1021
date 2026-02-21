import { Brain, Salad, AlertCircle, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

const features = [
  {
    icon: Brain,
    title: 'Interactive Multi-Modal Assessment',
    description: 'Engage in intelligent conversations and upload medical scans for comprehensive health analysis.',
    gradient: 'from-[#8BA888] to-[#6B9468]',
    link: '/assessment',
  },
  {
    icon: Salad,
    title: 'Personalized Preventive Guidance',
    description: 'Receive tailored wellness recommendations based on your unique Dosha constitution and lifestyle.',
    gradient: 'from-[#A68A64] to-[#8A7152]',
    link: '/guidance',
  },
  {
    icon: AlertCircle,
    title: 'Emergency & Risk Awareness',
    description: 'Get instant alerts for potential health risks with clear severity levels and recommended actions.',
    gradient: 'from-[#B89A77] to-[#9E8566]',
    link: '/emergency',
  },
  {
    icon: BookOpen,
    title: 'Educational & Credible Insights',
    description: 'Learn about Ayurvedic principles with evidence-based information from trusted sources.',
    gradient: 'from-[#8BA888] to-[#7A9B7A]',
    link: '/education',
  },
];

export function Features() {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-20 sm:py-32 bg-gradient-to-b from-white to-[#FAF7F2]">
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
            Comprehensive Wellness Features
          </h2>
          <p className="text-lg text-[#5A6B59] max-w-2xl mx-auto">
            Experience the perfect blend of traditional Ayurvedic wisdom and cutting-edge AI technology
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => navigate(feature.link)}
              className="group relative cursor-pointer"
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-2xl hover:border-[#8BA888]/30 transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[#3D4A3C] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#5A6B59] leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Click to explore indicator */}
                <p className="text-sm text-[#8BA888] font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Click to explore →
                </p>

                {/* Decorative Element */}
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}