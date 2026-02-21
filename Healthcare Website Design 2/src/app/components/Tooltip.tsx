import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';

interface TooltipProps {
  term: string;
  definition: string;
  children?: ReactNode;
}

export function Tooltip({ term, definition, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="cursor-help border-b-2 border-dotted border-[#8BA888] text-[#2C3D2B] font-medium hover:text-[#8BA888] transition-colors"
      >
        {children || term}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64"
          >
            <div className="relative p-4 rounded-xl bg-[#2C3D2B] text-white shadow-2xl border border-[#8BA888]/20">
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                <div className="border-8 border-transparent border-t-[#2C3D2B]" />
              </div>
              
              {/* Content */}
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#8BA888] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#8BA888] mb-1">{term}</p>
                  <p className="text-sm text-white/90 leading-relaxed">{definition}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// Pre-defined Ayurvedic terms for easy use
export const ayurvedicTerms = {
  dosha: 'Biological energies found throughout the human body and mind that govern physical and mental processes',
  vata: 'The energy of movement, composed of air and space elements. Governs breathing, blinking, muscle movement, and communication',
  pitta: 'The energy of digestion and metabolism, composed of fire and water elements. Governs body temperature, digestion, and understanding',
  kapha: 'The energy of structure and lubrication, composed of water and earth elements. Governs growth, strength, and immunity',
  agni: 'The digestive fire that transforms food into energy and consciousness. Central to Ayurvedic understanding of health',
  ama: 'Toxic residue left from incomplete digestion. Considered a root cause of disease in Ayurveda',
  prakriti: 'Your unique constitution determined at birth, representing your natural balance of doshas',
  panchakarma: 'A five-step cleansing and rejuvenation program that removes deep-rooted toxins from the body',
  ojas: 'The subtle essence of vitality, immunity, and spiritual energy. The finest product of digestion',
  prana: 'Life force energy that flows through subtle energy channels in the body',
  srotas: 'Channels or pathways in the body through which nutrients, energy, and waste products flow',
  rasayana: 'Rejuvenation therapies that promote longevity, enhance memory, and improve overall vitality',
  triphala: 'A classical Ayurvedic formulation made of three fruits, used for gentle detoxification and digestion',
  ashwagandha: 'A powerful adaptogenic herb that helps the body manage stress and promotes balance',
  dinacharya: 'Daily routine practices aligned with natural rhythms to maintain balance and prevent disease',
  ritucharya: 'Seasonal routines and lifestyle adjustments to stay in harmony with nature throughout the year',
};
