import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Activity, Download, User, Mail, Phone, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
}

export function HealthHistory() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      fetchHistory(savedEmail);
    }
  }, []);

  const fetchHistory = async (userEmail: string) => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch user profile
      const profileRes = await fetch(`http://localhost:5000/api/user/profile/${userEmail}`);
      const profileData = await profileRes.json();
      
      if (profileData.success) {
        setUserProfile(profileData.profile);
      }
      
      // Fetch sessions history
      const sessionsRes = await fetch(`http://localhost:5000/api/user/history/${userEmail}`);
      const sessionsData = await sessionsRes.json();
      
      if (sessionsData.success) {
        setSessions(sessionsData.sessions);
      } else {
        setError('No history found for this email');
      }
    } catch (err) {
      setError('Failed to load history. Make sure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('userEmail', email);
      fetchHistory(email);
    }
  };

  const getRiskColor = (level: string) => {
    switch(level?.toLowerCase()) {
      case 'mild': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'emergency': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadReport = (session: Session) => {
    const reportContent = `
HEALTH ASSESSMENT REPORT
=======================
Date: ${formatDate(session.date)}
Patient: ${userProfile?.name || 'Unknown'}
Email: ${userProfile?.email || email}

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
    a.download = `health-report-${session.id}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#8BA888]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-[#5A6B59] hover:text-[#8BA888] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Profile</span>
            </button>
            <h1 className="text-xl font-semibold text-[#3D4A3C]">
              Health History
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Email Input Form (shown when no profile loaded) */}
        {!userProfile && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#3D4A3C] mb-6">View Your Health History</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5A6B59] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#8BA888]/30 focus:outline-none focus:border-[#8BA888] focus:ring-1 focus:ring-[#8BA888]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#8BA888] to-[#6B9468] text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                View My History
              </button>
            </form>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-[#8BA888] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-[#5A6B59]">Loading your health history...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* User Profile Card */}
        {userProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-[#3D4A3C] mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-[#8BA888]" />
                <div>
                  <p className="text-xs text-[#5A6B59]">Name</p>
                  <p className="font-medium text-[#3D4A3C]">{userProfile.name || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8BA888]" />
                <div>
                  <p className="text-xs text-[#5A6B59]">Email</p>
                  <p className="font-medium text-[#3D4A3C]">{userProfile.email}</p>
                </div>
              </div>
              {userProfile.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#8BA888]" />
                  <div>
                    <p className="text-xs text-[#5A6B59]">Phone</p>
                    <p className="font-medium text-[#3D4A3C]">{userProfile.phone}</p>
                  </div>
                </div>
              )}
              {userProfile.age && (
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[#8BA888]" />
                  <div>
                    <p className="text-xs text-[#5A6B59]">Age/Gender</p>
                    <p className="font-medium text-[#3D4A3C]">{userProfile.age} years • {userProfile.gender || 'Not specified'}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Sessions List */}
        {userProfile && (
          <div>
            <h2 className="text-lg font-semibold text-[#3D4A3C] mb-4">Past Assessments</h2>
            
            {sessions.length === 0 && !loading && (
              <div className="bg-[#FAF7F2] rounded-xl p-12 text-center">
                <Calendar className="w-12 h-12 text-[#8BA888]/30 mx-auto mb-4" />
                <p className="text-[#5A6B59] mb-2">No health assessments yet</p>
                <button
                  onClick={() => navigate('/assessment')}
                  className="px-6 py-2 bg-[#8BA888] text-white rounded-lg hover:bg-[#6B9468] transition-colors"
                >
                  Start New Assessment
                </button>
              </div>
            )}

            <div className="space-y-4">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Date and Risk Badge */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#8BA888]" />
                          <span className="text-sm text-[#5A6B59]">{formatDate(session.date)}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(session.analysis.riskLevel)}`}>
                          {session.analysis.riskLevel} Risk • Score: {session.analysis.riskScore}
                        </span>
                      </div>
                      
                      {/* Symptoms */}
                      <div className="mb-3">
                        <p className="text-sm font-medium text-[#3D4A3C] mb-2">Symptoms:</p>
                        <div className="flex flex-wrap gap-2">
                          {session.symptoms.map((symptom, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-[#8BA888]/10 text-[#5A6B59] rounded-full text-xs"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Remedies Preview */}
                      {session.analysis.remedies?.home && session.analysis.remedies.home.length > 0 && (
                        <div className="mt-3 p-3 bg-[#FAF7F2] rounded-lg">
                          <p className="text-xs font-medium text-[#3D4A3C] mb-1">Home Remedies:</p>
                          <ul className="text-xs text-[#5A6B59] space-y-1">
                            {session.analysis.remedies.home.slice(0, 2).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#8BA888]">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                            {session.analysis.remedies.home.length > 2 && (
                              <li className="text-[#8BA888] text-xs mt-1">
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
                      className="p-2 text-[#8BA888] hover:bg-[#8BA888]/10 rounded-lg transition-colors"
                      title="Download Report"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}