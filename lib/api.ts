import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

interface AnalyzeResponse {
  guidance: string;
  emergency_type: string;
}

export async function analyzeEmergency(
  message: string,
  emergencyType?: string,
): Promise<AnalyzeResponse> {
  try {
    const response = await axios.post<AnalyzeResponse>(
      `${API_BASE_URL}/analyze`,
      {
        message,
        emergency_type: emergencyType || "",
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.detail || `Server error: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        "Could not reach the EEGA server. Make sure the backend is running on port 8000.",
      );
    } else {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
}

// ── Nearby Hospitals ────────────────────────────────────────────────────

export interface Hospital {
  name: string;
  lat: number;
  lon: number;
  distance_km: number;
  phone: string | null;
}

export async function getNearbyHospitals(
  latitude: number,
  longitude: number,
): Promise<Hospital[]> {
  try {
    const response = await axios.post<Hospital[]>(
      `${API_BASE_URL}/nearby-hospitals`,
      { latitude, longitude },
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.detail || `Server error: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        "Could not reach the EEGA server. Make sure the backend is running on port 8000.",
      );
    } else {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
}
