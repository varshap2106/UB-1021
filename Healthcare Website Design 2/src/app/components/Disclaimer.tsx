import { AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function Disclaimer() {
  return (
    <section className="py-12 bg-gradient-to-r from-[#FFA500]/5 to-[#8BA888]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#FFA500]/20"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FFA500]/10 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-[#CC8400]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-semibold text-[#3D4A3C] mb-1">Important Safety Disclaimer</h3>
            <p className="text-sm text-[#5A6B59]">
              This assistant provides preventive educational guidance based on Ayurvedic principles and does not replace professional medical consultation. 
              Always consult qualified healthcare professionals for diagnosis and treatment. In case of emergency, please contact emergency services immediately.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
