// src/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Health check
export const checkHealth = async () => {
  try {
    const response = await fetch('http://localhost:5000/health');
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Analyze symptoms
export const analyzeSymptoms = async (symptomsData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(symptomsData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Analyze with image
export const analyzeWithImage = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-with-image`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Image API Error:', error);
    throw error;
  }
};

// Test connection
export const testConnection = async () => {
  try {
    const result = await checkHealth();
    return { success: true, message: '✅ Connected to backend!', data: result };
  } catch (error) {
    return { success: false, message: '❌ Cannot connect to backend. Make sure server is running on port 5000' };
  }
};

export default {
  checkHealth,
  analyzeSymptoms,
  analyzeWithImage,
  testConnection
};