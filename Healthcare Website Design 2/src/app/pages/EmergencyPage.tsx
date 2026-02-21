import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, AlertTriangle, Phone, Activity, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { RED_FLAG_SYMPTOMS } from '../utils/riskAssessment';

export function EmergencyPage() {
  const navigate = useNavigate();
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const emergencySymptoms = [
    { name: 'Chest Pain', severity: 'Critical', action: 'Call 911 immediately' },
    { name: 'Breathing Difficulty', severity: 'Critical', action: 'Seek emergency care now' },
    { name: 'Stroke Symptoms', severity: 'Critical', action: 'Call emergency services' },
    { name: 'Seizure', severity: 'Critical', action: 'Emergency medical attention required' },
    { name: 'Severe Bleeding', severity: 'Critical', action: 'Apply pressure, call 911' },
    { name: 'Unconsciousness', severity: 'Critical', action: 'Call 911, check breathing' },
  ];

  const riskFormula = `
Risk Score = 
  Σ(symptom weights) 
  + (severity × 2) 
  + duration modifier 
  + age modifier

Red Flag Override:
IF symptoms include:
  - Chest pain
  - Breathing difficulty  
  - Unconsciousness
  - Seizure
THEN:
  risk_level = "Emergency"
  remedies = DISABLED
  show_emergency_banner = TRUE
  `;

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
              Emergency & Risk Awareness
            </h1>
            <div className="w-32" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-[#DC2626]/10 to-[#FFA500]/10 border-2 border-[#DC2626]/30"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#DC2626]/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#DC2626] mb-2">
                When to Seek Immediate Medical Attention
              </h2>
              <p className="text-[#5A6B59]">
                If you're experiencing any critical symptoms, do not use this app. Call emergency services (911) or visit the nearest emergency room immediately.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Critical Symptoms Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#3D4A3C] mb-6">
            Red Flag Symptoms - Emergency Override System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencySymptoms.map((symptom, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 border-[#DC2626]/20 hover:border-[#DC2626]/40 transition-all cursor-pointer"
                onClick={() => setSelectedSymptom(symptom.name)}
              >
                <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
                </div>
                <h3 className="font-semibold text-[#3D4A3C] mb-2">{symptom.name}</h3>
                <div className="inline-block px-3 py-1 rounded-full bg-[#DC2626]/10 text-xs font-medium text-[#DC2626] mb-3">
                  {symptom.severity}
                </div>
                <p className="text-sm text-[#5A6B59]">
                  <strong>Action:</strong> {symptom.action}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risk Scoring System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#8BA888]/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#8BA888]" />
              </div>
              <h3 className="text-xl font-semibold text-[#3D4A3C]">Risk Score Formula</h3>
            </div>
            <pre className="text-xs text-[#5A6B59] bg-[#3D4A3C]/5 p-4 rounded-xl overflow-x-auto font-mono whitespace-pre-wrap">
              {riskFormula}
            </pre>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#8BA888]/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#8BA888]" />
              </div>
              <h3 className="text-xl font-semibold text-[#3D4A3C]">Safety Controls</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#DC2626]/5 border border-[#DC2626]/20">
                <h4 className="font-semibold text-[#3D4A3C] mb-2">Emergency Level</h4>
                <p className="text-sm text-[#5A6B59]">
                  All remedy suggestions are <strong>DISABLED</strong>. User is directed to emergency services.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFA500]/5 border border-[#FFA500]/20">
                <h4 className="font-semibold text-[#3D4A3C] mb-2">High Risk Level</h4>
                <p className="text-sm text-[#5A6B59]">
                  Remedies <strong>BLOCKED</strong>. User advised to consult healthcare professional immediately.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFA500]/5 border border-[#FFA500]/20">
                <h4 className="font-semibold text-[#3D4A3C] mb-2">Moderate Risk Level</h4>
                <p className="text-sm text-[#5A6B59]">
                  Limited recommendations shown. Strong medical consultation message displayed.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#8BA888]/5 border border-[#8BA888]/20">
                <h4 className="font-semibold text-[#3D4A3C] mb-2">Mild Risk Level</h4>
                <p className="text-sm text-[#5A6B59]">
                  Educational guidance provided with full disclaimer and preventive focus.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-[#DC2626]/10 to-[#FFA500]/10 border-2 border-[#DC2626]/30 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#DC2626]/20 flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-[#DC2626]" />
          </div>
          <h2 className="text-2xl font-bold text-[#3D4A3C] mb-4">
            Emergency Services
          </h2>
          <p className="text-[#5A6B59] mb-6 max-w-2xl mx-auto">
            In case of a medical emergency, always call your local emergency number or visit the nearest emergency room.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-white/60">
              <p className="text-sm text-[#5A6B59] mb-1">United States</p>
              <p className="text-2xl font-bold text-[#DC2626]">911</p>
            </div>
            <div className="p-4 rounded-xl bg-white/60">
              <p className="text-sm text-[#5A6B59] mb-1">United Kingdom</p>
              <p className="text-2xl font-bold text-[#DC2626]">999</p>
            </div>
            <div className="p-4 rounded-xl bg-white/60">
              <p className="text-sm text-[#5A6B59] mb-1">India</p>
              <p className="text-2xl font-bold text-[#DC2626]">112</p>
            </div>
          </div>
        </motion.div>

        {/* Responsible AI Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl bg-[#8BA888]/5 border border-[#8BA888]/20 text-center"
        >
          <h3 className="text-lg font-semibold text-[#3D4A3C] mb-2">
            Responsible AI Healthcare
          </h3>
          <p className="text-sm text-[#5A6B59] max-w-3xl mx-auto">
            Our emergency detection system uses <strong>rule-based logic</strong> (not AI-controlled) to ensure 
            maximum safety. AI is never allowed to decide emergency status, risk escalation, or critical medical decisions. 
            This deterministic approach ensures predictable, reliable safety responses.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
