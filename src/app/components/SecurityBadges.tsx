import { Shield, Lock, CheckCircle2, Award, FileCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function SecurityBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Full healthcare data protection',
    },
    {
      icon: Lock,
      title: '256-bit Encryption',
      description: 'Bank-level security',
    },
    {
      icon: FileCheck,
      title: 'SOC 2 Certified',
      description: 'Audited security controls',
    },
    {
      icon: Award,
      title: 'ISO 27001',
      description: 'Information security management',
    },
    {
      icon: CheckCircle2,
      title: 'GDPR Ready',
      description: 'Privacy by design',
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: '24/7 security surveillance',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#1A2F1A] via-[#2D5F3F] to-[#1A2F1A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#4A8B5F] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#3D6F4F] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <Shield className="w-4 h-4 text-[#E8F0E8]" />
            <span className="text-sm font-semibold text-white">Enterprise-Grade Security</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-family-heading)' }}>
            Your Health Data is Our Priority
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Industry-leading security standards and compliance certifications to protect your sensitive health information
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="group"
            >
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-center">
                <div className="w-14 h-14 rounded-xl bg-white/20 mx-auto mb-4 flex items-center justify-center group-hover:bg-white/30 transition-all">
                  <badge.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{badge.title}</h3>
                <p className="text-xs text-white/70">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center"
        >
          <p className="text-white/90 text-sm">
            <strong className="text-white">Privacy Notice:</strong> We never sell your data. All health information is encrypted end-to-end and stored in HIPAA-compliant data centers. You have complete control over your data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
