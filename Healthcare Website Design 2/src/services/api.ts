// src/services/api.ts

const BASE_URL = "http://localhost:5000";

export interface ImageAnalysis {
  dosha: string;
  observations: string;
  suggestions?: string[];
}

export interface Recommendation {
  action?: string;
  message: string;
}

export interface AnalysisResponse {
  success?: boolean;

  // Common fields
  message?: string;
  emergency?: boolean;
  riskLevel?: string;
  riskScore?: number;
  disclaimer?: string;

  // Gemini fields
  dosha?: string;
  remedies?: string[];
  dietary?: string[];
  herbs?: string[];
  recommendation?: Recommendation;

  // Image analysis
  imageAnalysis?: ImageAnalysis;
}

export const testConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/health`);

    if (!response.ok) {
      return { success: false, message: "Server not responding" };
    }

    const data = await response.json();

    // ✅ Check backend health properly
    if (data.status === "OK") {
      return { success: true, message: "Backend connected" };
    }

    return { success: false, message: "Health check failed" };

  } catch (error) {
    return { success: false, message: "Connection error" };
  }
};

// ===== ADD THE NEW CHAT FUNCTION HERE =====
export const chatWithAI = async (message: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Chat failed');
    }

    const data = await response.json();
    return data.reply || data.message || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
};
// ==========================================

export const analyzeWithGemini = async (
  data: any
): Promise<AnalysisResponse> => {
  const response = await fetch(`${BASE_URL}/api/analyze-with-gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Gemini analysis failed");
  }

  return response.json();
};

export const analyzeWithImage = async (
  formData: FormData
): Promise<AnalysisResponse> => {
  const response = await fetch(`${BASE_URL}/api/analyze-with-image`, {  // ← CORRECT
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image analysis failed");
  }

  return response.json();
};

export const analyzeSymptoms = async (
  data: any
): Promise<AnalysisResponse> => {
const response = await fetch(`${BASE_URL}/api/analyze-with-gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Symptom analysis failed");
  }

  return response.json();
};