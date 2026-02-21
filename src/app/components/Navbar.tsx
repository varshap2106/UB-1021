import { useState } from 'react';
import { Menu, X, Leaf, Shield, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#2D5F3F]/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2D5F3F] to-[#3D6F4F] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#1A2F1A]" style={{ fontFamily: 'var(--font-family-heading)' }}>AyurCare AI</span>
              <span className="text-xs text-[#4A8B5F] flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secure & Certified
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-[#2D3E2D] font-medium hover:text-[#2D5F3F] transition-colors px-3 py-2">
              Features
            </a>
            <a href="#how-it-works" className="text-[#2D3E2D] font-medium hover:text-[#2D5F3F] transition-colors px-3 py-2">
              How It Works
            </a>
            <a href="#consult" className="text-[#2D3E2D] font-medium hover:text-[#2D5F3F] transition-colors px-3 py-2">
              Consult Doctor
            </a>
            <button
              onClick={() => navigate('/profile')}
              className="p-2.5 rounded-xl hover:bg-[#2D5F3F]/10 transition-colors"
              title="Patient Profile"
            >
              <User className="w-5 h-5 text-[#2D5F3F]" />
            </button>
            <button 
              onClick={() => navigate('/assessment')}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#2D5F3F] to-[#3D6F4F] text-white font-semibold hover:shadow-xl hover:shadow-[#2D5F3F]/30 transition-all transform hover:scale-105"
            >
              Start Chat
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-[#2D5F3F]/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-[#2D5F3F]" /> : <Menu className="w-6 h-6 text-[#2D5F3F]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-[#2D5F3F]/10"
          >
            <div className="px-4 py-4 space-y-2">
              <a
                href="#features"
                className="block px-4 py-3 rounded-xl text-[#2D3E2D] font-medium hover:bg-[#2D5F3F]/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-4 py-3 rounded-xl text-[#2D3E2D] font-medium hover:bg-[#2D5F3F]/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#consult"
                className="block px-4 py-3 rounded-xl text-[#2D3E2D] font-medium hover:bg-[#2D5F3F]/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Consult Doctor
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/profile');
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-[#2D3E2D] font-medium hover:bg-[#2D5F3F]/10 transition-colors flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                My Profile
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  navigate('/assessment');
                }}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#2D5F3F] to-[#3D6F4F] text-white font-semibold"
              >
                Start Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}