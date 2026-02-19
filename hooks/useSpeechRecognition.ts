'use client';

import { useEffect, useRef } from 'react';
import { useEmergencyStore } from '@/store/emergencyStore';

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
    SpeechRecognition?: new () => SpeechRecognition;
  }
}

const SpeechRecognitionAPI =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : undefined;

export function useSpeechRecognition() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isRecordingRef = useRef(false);
  const baseTextRef = useRef('');
  const { setEmergencyText, isRecording, setRecording } = useEmergencyStore();
  isRecordingRef.current = isRecording;

  useEffect(() => {
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const fullTranscript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join('');
      const newText = (baseTextRef.current + fullTranscript).trim();
      setEmergencyText(newText);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'no-speech') return;
      setRecording(false);
    };

    recognition.onend = () => {
      if (isRecordingRef.current) {
        try {
          recognition.start();
        } catch {
          setRecording(false);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isRecording) {
      baseTextRef.current = useEmergencyStore.getState().emergencyText;
      if (baseTextRef.current) baseTextRef.current += ' ';
      try {
        recognition.start();
      } catch {
        setRecording(false);
      }
    } else {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    }
  }, [isRecording, setRecording]);
}
