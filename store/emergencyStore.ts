import { create } from 'zustand';
import { MOCK_EMERGENCY_RESULT, SCENARIO_MOCK_DATA, type MockEmergencyResult } from '@/lib/mockData';

interface EmergencyState {
  emergencyText: string;
  isRecording: boolean;
  isLoading: boolean;
  hasResult: boolean;
  mockResult: MockEmergencyResult | null;
  location: { lat: number; lng: number } | null;
  setEmergencyText: (text: string) => void;
  toggleRecording: () => void;
  setRecording: (recording: boolean) => void;
  submitEmergency: (scenarioId?: number) => Promise<void>;
  clearResult: () => void;
  setLocation: (location: { lat: number; lng: number } | null) => void;
}

export const useEmergencyStore = create<EmergencyState>((set) => ({
  emergencyText: '',
  isRecording: false,
  isLoading: false,
  hasResult: false,
  mockResult: null,
  location: null,

  setEmergencyText: (text) => set({ emergencyText: text }),

  toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),

  setRecording: (recording) => set({ isRecording: recording }),

  submitEmergency: async (scenarioId?: number) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const mockResult =
      scenarioId && SCENARIO_MOCK_DATA[scenarioId]
        ? SCENARIO_MOCK_DATA[scenarioId]
        : MOCK_EMERGENCY_RESULT;
    set({
      isLoading: false,
      hasResult: true,
      mockResult,
    });
  },

  clearResult: () => set({ hasResult: false, mockResult: null }),

  setLocation: (location) => set({ location }),
}));
