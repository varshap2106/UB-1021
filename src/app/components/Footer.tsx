import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer id="about" className="bg-gradient-to-b from-white to-[#FAF7F2] border-t border-[#8BA888]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8BA888] to-[#6B9468] flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#3D4A3C]">AyurCare AI</span>
            </div>
            <p className="text-sm text-[#5A6B59] leading-relaxed">
              Combining ancient Ayurvedic wisdom with modern AI technology for personalized preventive wellness care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#3D4A3C] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-[#3D4A3C] mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                  Ayurveda Basics
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                  Health Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#3D4A3C] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#5A6B59]">
                <Mail className="w-4 h-4 text-[#8BA888]" />
                hello@ayurcare.ai
              </li>
              <li className="flex items-center gap-2 text-sm text-[#5A6B59]">
                <Phone className="w-4 h-4 text-[#8BA888]" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2 text-sm text-[#5A6B59]">
                <MapPin className="w-4 h-4 text-[#8BA888] mt-0.5" />
                <span>123 Wellness Street<br />San Francisco, CA 94102</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#8BA888]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#5A6B59]">
              © 2026 AyurCare AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-[#5A6B59] hover:text-[#8BA888] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-[#8BA888]/10 z-40">
        <button 
          onClick={() => navigate('/assessment')}
          className="w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8BA888] to-[#6B9468] text-white font-medium shadow-lg"
        >
          Start Chat
        </button>
      </div>
    </footer>
  );
}