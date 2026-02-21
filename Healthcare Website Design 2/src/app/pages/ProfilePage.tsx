import { useState, useEffect } from 'react';
import { ArrowLeft, User, Activity, Settings, Calendar, Download, AlertCircle, X, Moon, Sun, Globe } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { PatientProfile, PatientData } from '../components/PatientProfile';

interface Session {
  id: string;
  date: string;
  symptoms: string[];
  analysis: {
    riskLevel: string;
    riskScore: number;
    remedies?: {
      home?: string[];
      diet?: string[];
      herbs?: string[];
    };
  };
}

export function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile'); // Removed 'reports'
  const [patientData, setPatientData] = useState<PatientData | undefined>(undefined);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  // Load patient data from localStorage on mount
  useEffect(() => {
    // Get or create user ID
    let id = localStorage.getItem('userId');
    if (!id) {
      id = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', id);
    }
    setUserId(id);
    
    // Load patient data from localStorage
    const savedData = localStorage.getItem('patientData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setPatientData(data);
      } catch (e) {
        console.error('Error parsing patient data:', e);
      }
    }
    
    // Load settings from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    const savedLanguage = localStorage.getItem('language') as 'english' | 'hindi' | null;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
    
    // Load history from localStorage
    loadHistoryFromStorage(id);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  // Apply language when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // You can implement language switching logic here
    console.log('Language changed to:', language);
  }, [language]);

  const loadHistoryFromStorage = (id: string) => {
    setLoading(true);
    try {
      // Get sessions from localStorage
      const storedSessions = localStorage.getItem(`healthSessions_${id}`);
      if (storedSessions) {
        const parsedSessions = JSON.parse(storedSessions);
        setSessions(parsedSessions);
      } else {
        setSessions([]);
      }
    } catch (err) {
      console.error('Error loading history:', err);
      setError('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = (data: PatientData) => {
    setPatientData(data);
    localStorage.setItem('patientData', JSON.stringify(data));
    console.log('Patient data saved:', data);
  };

  const getRiskColor = (level: string) => {
    switch(level?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'emergency': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const downloadReport = (session: Session) => {
    const reportContent = `
HEALTH ASSESSMENT REPORT
=======================
Date: ${formatDate(session.date)}
Patient: ${patientData?.fullName || 'Unknown'}

SYMPTOMS
========
${session.symptoms.join(', ')}

RISK ASSESSMENT
===============
Level: ${session.analysis.riskLevel}
Score: ${session.analysis.riskScore}

${session.analysis.remedies?.home ? `
HOME REMEDIES
============
${session.analysis.remedies.home.map(r => `• ${r}`).join('\n')}
` : ''}

${session.analysis.remedies?.diet ? `
DIETARY SUGGESTIONS
==================
${session.analysis.remedies.diet.map(d => `• ${d}`).join('\n')}
` : ''}

${session.analysis.remedies?.herbs ? `
BENEFICIAL HERBS
================
${session.analysis.remedies.herbs.map(h => `• ${h}`).join('\n')}
` : ''}

DISCLAIMER: This is for educational purposes only. Not medical advice.
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-report-${session.id || Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4F1] to-[#E8F0E8]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-[#2D5F3F]/15 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#2D5F3F]/10 transition-colors text-[#2D3E2D] font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-[#1A2F1A]" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Patient Dashboard
            </h1>
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-xl hover:bg-[#2D5F3F]/10 transition-colors"
            >
              <Settings className="w-5 h-5 text-[#2D3E2D]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation - REMOVED REPORTS BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-[#2D5F3F] to-[#3D6F4F] text-white shadow-lg'
                : 'bg-white/60 text-[#2D3E2D] hover:bg-white'
            }`}
          >
            <User className="w-5 h-5" />
            My Profile
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-[#2D5F3F] to-[#3D6F4F] text-white shadow-lg'
                : 'bg-white/60 text-[#2D3E2D] hover:bg-white'
            }`}
          >
            <Activity className="w-5 h-5" />
            Health History
          </button>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PatientProfile onSave={handleSaveProfile} initialData={patientData} />
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-2xl border border-[#2D5F3F]/10 p-8"
          >
            <h2 className="text-2xl font-bold text-[#1A2F1A] mb-6" style={{ fontFamily: 'var(--font-family-heading)' }}>
              Health History
            </h2>

            {/* Show user ID info */}
            {userId && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-700">
                  Your history is saved for this device
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-[#2D5F3F] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-[#5A6B59]">Loading your health history...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Sessions List */}
            {!loading && !error && (
              <>
                {sessions.length === 0 ? (
                  <div className="text-center py-12 text-[#5A6B59]">
                    <Activity className="w-16 h-16 mx-auto mb-4 text-[#4A8B5F]" />
                    <p className="text-lg">No health history recorded yet</p>
                    <p className="text-sm mt-2">Complete an assessment to see your history here</p>
                    <button
                      onClick={() => navigate('/assessment')}
                      className="mt-6 px-6 py-3 bg-gradient-to-r from-[#2D5F3F] to-[#3D6F4F] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      Start New Assessment
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session, index) => (
                      <motion.div
                        key={session.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-[#2D5F3F]/10 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {/* Date and Risk Badge */}
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#4A8B5F]" />
                                <span className="text-sm text-[#5A6B59]">{formatDate(session.date)}</span>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(session.analysis.riskLevel)}`}>
                                {session.analysis.riskLevel} Risk • Score: {session.analysis.riskScore}
                              </span>
                            </div>
                            
                            {/* Symptoms */}
                            <div className="mb-3">
                              <p className="text-sm font-medium text-[#2D3E2D] mb-2">Symptoms:</p>
                              <div className="flex flex-wrap gap-2">
                                {session.symptoms.map((symptom, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-[#4A8B5F]/10 text-[#2D5F3F] rounded-full text-xs"
                                  >
                                    {symptom}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Remedies Preview */}
                            {session.analysis.remedies?.home && session.analysis.remedies.home.length > 0 && (
                              <div className="mt-3 p-3 bg-[#F0F4F1] rounded-lg">
                                <p className="text-xs font-medium text-[#2D3E2D] mb-1">Home Remedies:</p>
                                <ul className="text-xs text-[#5A6B59] space-y-1">
                                  {session.analysis.remedies.home.slice(0, 2).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="text-[#4A8B5F]">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                  {session.analysis.remedies.home.length > 2 && (
                                    <li className="text-[#4A8B5F] text-xs mt-1">
                                      +{session.analysis.remedies.home.length - 2} more...
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Download Button */}
                          <button
                            onClick={() => downloadReport(session)}
                            className="p-2 text-[#4A8B5F] hover:bg-[#4A8B5F]/10 rounded-lg transition-colors"
                            title="Download Report"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {/* REMOVED THE REPORTS SECTION COMPLETELY */}
        
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#1A2F1A]">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme Settings */}
              <div>
                <label className="block text-sm font-medium text-[#2D3E2D] mb-2 flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  <Sun className="w-4 h-4" />
                  <span>Theme</span>
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                  className="w-full p-2 border border-[#2D5F3F]/20 rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>

              {/* Language Settings */}
              <div>
                <label className="block text-sm font-medium text-[#2D3E2D] mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Language</span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'english' | 'hindi')}
                  className="w-full p-2 border border-[#2D5F3F]/20 rounded-lg focus:outline-none focus:border-[#2D5F3F]"
                >
                  <option value="english">English</option>
                  <option value="hindi">हिन्दी (Hindi)</option>
                </select>
              </div>

              {/* Account Info */}
              <div className="bg-[#F0F4F1] rounded-lg p-4">
                <h3 className="font-medium text-[#2D3E2D] mb-2">Account Information</h3>
                <p className="text-sm text-[#5A6B59] mb-1">User ID: {userId}</p>
                <p className="text-xs text-[#5A6B59]">Data is stored locally on this device</p>
              </div>

              {/* Change User ID Section */}
              <div className="bg-[#F0F4F1] rounded-lg p-4">
                <h3 className="font-medium text-[#2D3E2D] mb-2">Change User ID</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="newUserId"
                    placeholder="Enter new User ID"
                    className="flex-1 p-2 border border-[#2D5F3F]/20 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('newUserId') as HTMLInputElement;
                      const newId = input.value.trim();
                      if (newId) {
                        localStorage.setItem('userId', newId);
                        alert('User ID changed! Page will reload.');
                        window.location.reload();
                      }
                    }}
                    className="px-3 py-2 bg-[#2D5F3F] text-white rounded-lg text-sm"
                  >
                    Change
                  </button>
                </div>
                <p className="text-xs text-[#5A6B59] mt-2">
                  Current: {userId}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-[#2D5F3F]/10">
                <button
                  onClick={() => {
                    // Clear all localStorage data
                    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear Data
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#2D5F3F] to-[#3D6F4F] text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}