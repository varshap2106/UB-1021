import { Camera, Upload, Send, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'motion/react';

export function ChatbotPreview() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-[#FAF7F2] to-white">
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
            Intelligent Chatbot Interface
          </h2>
          <p className="text-lg text-[#5A6B59] max-w-2xl mx-auto">
            Experience seamless conversations with personalized insights
          </p>
        </motion.div>

        {/* Chatbot Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xl p-6 overflow-hidden">
            {/* Chat Area - Left Side */}
            <div className="lg:col-span-2 space-y-4">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-[#8BA888]/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8BA888] to-[#6B9468] flex items-center justify-center">
                  <span className="text-white font-semibold">AI</span>
                </div>
                <div>
                  <div className="font-semibold text-[#3D4A3C]">AyurCare Assistant</div>
                  <div className="flex items-center gap-1 text-xs text-[#5A6B59]">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Online
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {/* AI Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-2"
                >
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-md bg-gradient-to-br from-[#8BA888]/10 to-[#8BA888]/5 border border-[#8BA888]/20">
                    <p className="text-sm text-[#3D4A3C]">
                      Hello! I'm your AyurCare AI assistant. How can I help you today? You can describe your symptoms or upload a medical scan.
                    </p>
                  </div>
                </motion.div>

                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-md bg-[#E8DCC4]/40 border border-[#E8DCC4]">
                    <p className="text-sm text-[#3D4A3C]">
                      I've been experiencing frequent headaches and fatigue. Can you help?
                    </p>
                  </div>
                </motion.div>

                {/* AI Response Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-2"
                >
                  <div className="max-w-[85%]">
                    <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-gradient-to-br from-[#8BA888]/10 to-[#8BA888]/5 border border-[#8BA888]/20 space-y-3">
                      <p className="text-sm text-[#3D4A3C] mb-3">
                        Based on your symptoms, here's my analysis:
                      </p>

                      {/* Dosha Imbalance */}
                      <div className="p-3 rounded-xl bg-white/60 space-y-2">
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-[#8BA888]" />
                          <span className="text-xs font-semibold text-[#3D4A3C]">Dosha Imbalance</span>
                        </div>
                        <p className="text-xs text-[#5A6B59]">Possible Vata imbalance detected</p>
                        <div className="flex gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-[#8BA888]" style={{ width: '65%' }} />
                          <div className="flex-1 h-1.5 rounded-full bg-gray-200" />
                        </div>
                      </div>

                      {/* Risk Level */}
                      <div className="p-3 rounded-xl bg-white/60 space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-[#B89A77]" />
                          <span className="text-xs font-semibold text-[#3D4A3C]">Risk Level</span>
                        </div>
                        <div className="inline-flex px-3 py-1 rounded-full bg-[#FFA500]/10 border border-[#FFA500]/30">
                          <span className="text-xs font-medium text-[#CC8400]">Moderate</span>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="p-3 rounded-xl bg-white/60 space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#8BA888]" />
                          <span className="text-xs font-semibold text-[#3D4A3C]">Recommendations</span>
                        </div>
                        <ul className="text-xs text-[#5A6B59] space-y-1 list-disc list-inside">
                          <li>Practice daily meditation for 15 minutes</li>
                          <li>Consume warm, grounding foods</li>
                          <li>Maintain regular sleep schedule</li>
                        </ul>
                      </div>
                    </div>

                    {/* Safety Disclaimer */}
                    <div className="mt-2 px-3 py-2 rounded-xl bg-[#FFA500]/5 border border-[#FFA500]/20">
                      <p className="text-xs text-[#5A6B59]">
                        ⚠️ This is educational guidance. Please consult a healthcare professional for diagnosis.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Input Area */}
              <div className="flex gap-2 pt-4 border-t border-[#8BA888]/10">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-white/60 border border-[#8BA888]/20 focus:outline-none focus:border-[#8BA888] transition-colors text-sm"
                />
                <button className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#8BA888] to-[#6B9468] text-white flex items-center justify-center hover:shadow-lg transition-all">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Upload Panel - Right Side */}
            <div className="lg:col-span-1 space-y-4">
              <div className="p-4 rounded-2xl bg-white/60 border border-[#8BA888]/20">
                <h3 className="font-semibold text-[#3D4A3C] mb-3">Upload Medical Scan</h3>
                
                {/* Upload Area */}
                <div className="p-6 rounded-xl border-2 border-dashed border-[#8BA888]/30 bg-[#8BA888]/5 hover:bg-[#8BA888]/10 transition-colors cursor-pointer text-center">
                  <div className="w-12 h-12 rounded-full bg-[#8BA888]/20 mx-auto mb-3 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-[#8BA888]" />
                  </div>
                  <p className="text-sm font-medium text-[#3D4A3C] mb-1">
                    Drop files here
                  </p>
                  <p className="text-xs text-[#5A6B59]">
                    or click to browse
                  </p>
                </div>

                {/* Camera Button */}
                <button className="w-full mt-3 px-4 py-3 rounded-xl bg-white/80 border border-[#8BA888]/20 text-[#5A6B59] font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <Camera className="w-5 h-5" />
                  Take Photo
                </button>

                {/* Supported Formats */}
                <div className="mt-4 p-3 rounded-xl bg-[#E8DCC4]/20">
                  <p className="text-xs font-medium text-[#3D4A3C] mb-1">Supported formats:</p>
                  <p className="text-xs text-[#5A6B59]">JPG, PNG, PDF</p>
                  <p className="text-xs text-[#5A6B59] mt-1">Max size: 10MB</p>
                </div>
              </div>

              {/* Severity Slider */}
              <div className="p-4 rounded-2xl bg-white/60 border border-[#8BA888]/20">
                <h3 className="font-semibold text-[#3D4A3C] mb-3">Symptom Severity</h3>
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(to right, #8BA888 0%, #FFA500 50%, #DC2626 100%)',
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-[#5A6B59]">Mild</span>
                  <span className="text-xs text-[#5A6B59]">Moderate</span>
                  <span className="text-xs text-[#5A6B59]">Severe</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
