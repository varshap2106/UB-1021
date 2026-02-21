import React, { useState } from 'react';
import { analyzeSymptoms, analyzeWithImage, testConnection } from '../../api';

interface SymptomFormData {
  symptoms: string;
  age: string;
  severity: string;
  duration: string;
  bodyArea: string;
}

interface AnalysisResult {
  riskScore?: number;
  riskLevel?: string;
  isEmergency?: boolean;
  remedies?: any;
  recommendation?: any;
  imageAnalysis?: any;
  disclaimer?: string;
}

const AyurVedaScan = () => {
  const [formData, setFormData] = useState<SymptomFormData>({
    symptoms: '',
    age: '',
    severity: '',
    duration: '',
    bodyArea: 'general'
  });

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  const bodyAreas = [
    'head', 'chest', 'respiratory', 'abdomen', 
    'limbs', 'skin', 'general'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Test Backend Connection
  const handleTestConnection = async () => {
    setLoading(true);
    const result = await testConnection();
    setConnectionStatus(result.message);
    setLoading(false);
    
    if (result.success) {
      alert('✅ Backend Connected Successfully!');
    } else {
      alert('❌ Failed to connect to backend. Make sure server is running on port 5000');
    }
  };

  // Symptom Analysis
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const symptomsArray = formData.symptoms
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '');

      const data = {
        symptoms: symptomsArray,
        age: parseInt(formData.age) || 30,
        severity: parseInt(formData.severity) || 2,
        duration: parseInt(formData.duration) || 1,
        bodyArea: formData.bodyArea
      };

      console.log('Sending to backend:', data);
      const response = await analyzeSymptoms(data);
      console.log('Received from backend:', response);
      setResult(response);
    } catch (err) {
      setError('Failed to connect to backend. Make sure server is running on port 5000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Image Analysis
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formDataImg = new FormData();
    formDataImg.append('image', selectedImage);
    
    if (formData.symptoms) {
      const symptomsArray = formData.symptoms
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '');
      formDataImg.append('symptoms', JSON.stringify(symptomsArray));
    }
    
    formDataImg.append('age', formData.age || '30');
    formDataImg.append('severity', formData.severity || '2');
    formDataImg.append('duration', formData.duration || '1');
    formDataImg.append('bodyArea', formData.bodyArea || 'general');

    try {
      const response = await analyzeWithImage(formDataImg);
      console.log('Image analysis response:', response);
      setResult(response);
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get color based on risk level
  const getRiskColor = (level?: string) => {
    switch(level?.toLowerCase()) {
      case 'mild': return '#4caf50';
      case 'moderate': return '#ff9800';
      case 'high': return '#f44336';
      case 'emergency': return '#d32f2f';
      default: return '#9e9e9e';
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
        🌿 AyurVedaScan - AI Health Assistant
      </h1>

      {/* Connection Test Button */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button
          onClick={handleTestConnection}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Testing...' : '🔌 Test Backend Connection'}
        </button>
        {connectionStatus && (
          <p style={{ 
            marginTop: '5px', 
            color: connectionStatus.includes('✅') ? 'green' : 'red' 
          }}>
            {connectionStatus}
          </p>
        )}
      </div>

      {/* Symptom Form */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h3>📝 Symptom Analysis</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Symptoms (comma-separated):
          </label>
          <input
            type="text"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="e.g., headache, fever, cough"
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Severity (1-5):</label>
            <input
              type="number"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
              min="1"
              max="5"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Duration (days):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Body Area:</label>
            <select
              name="bodyArea"
              value={formData.bodyArea}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              {bodyAreas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px'
          }}
        >
          {loading ? 'Analyzing...' : '🔍 Analyze Symptoms'}
        </button>
      </form>

      {/* Image Upload Form */}
      <form onSubmit={handleImageSubmit} style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h3>📸 Tongue/Image Analysis</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || !selectedImage}
          style={{
            padding: '12px',
            backgroundColor: '#8e44ad',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px'
          }}
        >
          {loading ? 'Analyzing...' : '📤 Upload & Analyze'}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h3>📊 Analysis Results</h3>
          
          {result.riskLevel && (
            <div style={{
              padding: '15px',
              backgroundColor: getRiskColor(result.riskLevel),
              color: 'white',
              borderRadius: '5px',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 10px 0' }}>
                {result.isEmergency ? '🚨 EMERGENCY' : `Risk Level: ${result.riskLevel}`}
              </h4>
              {result.riskScore && <p>Risk Score: {result.riskScore}</p>}
            </div>
          )}

          {result.imageAnalysis && (
            <div style={{ marginBottom: '15px' }}>
              <h4>🔬 Image Analysis</h4>
              <p><strong>Dosha:</strong> {result.imageAnalysis.dosha}</p>
              <p><strong>Observations:</strong> {result.imageAnalysis.observations}</p>
            </div>
          )}

          {result.remedies?.showRemedies && (
            <div style={{ marginBottom: '15px' }}>
              <h4>🌿 Ayurvedic Remedies</h4>
              {result.remedies.home && (
                <div>
                  <strong>Home Care:</strong>
                  <ul>
                    {result.remedies.home.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {result.recommendation && (
            <div style={{
              backgroundColor: '#fff3e0',
              padding: '15px',
              borderRadius: '5px'
            }}>
              <h4>💡 Recommendation</h4>
              <p><strong>{result.recommendation.action}</strong></p>
              <p>{result.recommendation.message}</p>
            </div>
          )}

          {result.disclaimer && (
            <p style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '15px',
              fontStyle: 'italic'
            }}>
              ⚠️ {result.disclaimer}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AyurVedaScan;