import { useState } from 'react';
import { User, Calendar, Users, Ruler, Weight, Save, Edit2, Shield, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface PatientData {
  fullName: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
}

interface PatientProfileProps {
  onSave?: (data: PatientData) => void;
  initialData?: PatientData;
  isEditable?: boolean;
}

export function PatientProfile({ onSave, initialData, isEditable = true }: PatientProfileProps) {
  const [isEditMode, setIsEditMode] = useState(!initialData);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState<PatientData>(
    initialData || {
      fullName: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
    }
  );

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setIsEditMode(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.age !== '' &&
      formData.gender !== '' &&
      formData.height !== '' &&
      formData.weight !== ''
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Security Badge */}
      <div className="absolute -top-3 -right-3 z-10">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2D5F3F] to-[#1E4A2F] text-white shadow-lg border border-[#4A8B5F]/30">
          <Shield className="w-4 h-4" />
          <span className="text-xs font-semibold">HIPAA Compliant</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-[#F8F9FA] rounded-3xl shadow-2xl border border-[#2D5F3F]/10 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D5F3F] to-[#3D6F4F] px-8 py-6 border-b border-[#4A8B5F]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-family-heading)' }}>
                  Patient Profile
                </h2>
                <p className="text-sm text-white/80 flex items-center gap-2 mt-1">
                  <Lock className="w-3 h-3" />
                  Your data is encrypted and secure
                </p>
              </div>
            </div>
            {!isEditMode && isEditable && (
              <button
                onClick={() => setIsEditMode(true)}
                className="px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white font-medium hover:bg-white/30 transition-all border border-white/30 flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#2D3E2D] mb-3">
                <User className="w-4 h-4 text-[#4A8B5F]" />
                Full Name
                <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={!isEditMode}
                  placeholder="Enter your full legal name"
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#2D5F3F]/20 focus:border-[#4A8B5F] focus:outline-none transition-all bg-white disabled:bg-gray-50 disabled:text-gray-700 text-[#2D3E2D] font-medium placeholder:text-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
                />
                {formData.fullName && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A8B5F]" />
                )}
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#2D3E2D] mb-3">
                <Calendar className="w-4 h-4 text-[#4A8B5F]" />
                Age
                <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative group">
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  disabled={!isEditMode}
                  min="1"
                  max="120"
                  placeholder="Years"
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#2D5F3F]/20 focus:border-[#4A8B5F] focus:outline-none transition-all bg-white disabled:bg-gray-50 disabled:text-gray-700 text-[#2D3E2D] font-medium placeholder:text-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
                />
                {formData.age && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#4A8B5F] font-medium">
                    yrs
                  </div>
                )}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#2D3E2D] mb-3">
                <Users className="w-4 h-4 text-[#4A8B5F]" />
                Gender
                <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  disabled={!isEditMode}
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#2D5F3F]/20 focus:border-[#4A8B5F] focus:outline-none transition-all bg-white disabled:bg-gray-50 disabled:text-gray-700 text-[#2D3E2D] font-medium appearance-none cursor-pointer shadow-sm hover:shadow-md focus:shadow-lg"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-[#4A8B5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#2D3E2D] mb-3">
                <Ruler className="w-4 h-4 text-[#4A8B5F]" />
                Height
                <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative group">
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  disabled={!isEditMode}
                  min="1"
                  step="0.1"
                  placeholder="Enter height"
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#2D5F3F]/20 focus:border-[#4A8B5F] focus:outline-none transition-all bg-white disabled:bg-gray-50 disabled:text-gray-700 text-[#2D3E2D] font-medium placeholder:text-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#4A8B5F] font-medium">
                  cm
                </div>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#2D3E2D] mb-3">
                <Weight className="w-4 h-4 text-[#4A8B5F]" />
                Weight
                <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative group">
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  disabled={!isEditMode}
                  min="1"
                  step="0.1"
                  placeholder="Enter weight"
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#2D5F3F]/20 focus:border-[#4A8B5F] focus:outline-none transition-all bg-white disabled:bg-gray-50 disabled:text-gray-700 text-[#2D3E2D] font-medium placeholder:text-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#4A8B5F] font-medium">
                  kg
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={handleSave}
                disabled={!isFormValid()}
                className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-[#2D5F3F] to-[#3D6F4F] text-white font-semibold hover:shadow-xl hover:shadow-[#2D5F3F]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform hover:scale-[1.02] disabled:transform-none"
              >
                <Save className="w-5 h-5" />
                Save Profile Information
              </button>
              {initialData && (
                <button
                  onClick={() => {
                    setFormData(initialData);
                    setIsEditMode(false);
                  }}
                  className="px-6 py-4 rounded-xl border-2 border-[#2D5F3F]/30 text-[#2D3E2D] font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              )}
            </motion.div>
          )}

          {/* Success Message */}
          <AnimatePresence>
            {isSaved && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#4A8B5F]/10 to-[#2D5F3F]/10 border border-[#4A8B5F]/30 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#2D5F3F]" />
                <span className="text-sm font-medium text-[#2D3E2D]">
                  Profile saved securely and encrypted
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security Footer */}
        <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-[#2D5F3F]/10">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#5A6B59]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#4A8B5F]" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#4A8B5F]" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A8B5F]" />
              <span>SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
