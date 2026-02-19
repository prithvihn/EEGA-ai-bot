'use client';

import { motion } from 'framer-motion';
import { useEmergencyStore } from '@/store/emergencyStore';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Button } from '@/components/ui/button';

export function EmergencyInput() {
  const {
    emergencyText,
    setEmergencyText,
    isRecording,
    toggleRecording,
    isLoading,
    submitEmergency,
  } = useEmergencyStore();

  useSpeechRecognition();

  const handleSubmit = () => {
    submitEmergency();
  };

  return (
    <section
      id="emergency-input"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="font-heading text-2xl sm:text-3xl tracking-[0.2em] text-white mb-6">
          DESCRIBE YOUR EMERGENCY
        </h2>

        <div className="glass-panel rounded-lg p-1 focus-within:border-emergency-red/50 focus-within:shadow-[0_0_20px_rgba(255,45,45,0.2)] transition-all duration-300">
          <textarea
            value={emergencyText}
            onChange={(e) => setEmergencyText(e.target.value)}
            placeholder="Type or speak your emergency... e.g. 'someone collapsed and is not breathing'"
            className="w-full min-h-[120px] sm:min-h-[140px] bg-transparent text-white placeholder:text-white/40 font-body text-base p-4 resize-none focus:outline-none"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            type="button"
            onClick={toggleRecording}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-heading text-sm tracking-wider uppercase transition-all ${
              isRecording
                ? 'bg-emergency-red/30 border border-emergency-red text-emergency-red'
                : 'glass-panel border border-white/20 text-white/80 hover:border-emergency-red/50'
            }`}
          >
            {/* Soundwave bars when recording */}
            {isRecording ? (
              <span className="flex items-end gap-1 h-5">
                {[0.3, 0.6, 1, 0.6, 0.3].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-emergency-red rounded-full soundwave-bar"
                    style={{
                      height: `${h * 20}px`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ))}
              </span>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            )}
            SPEAK
          </button>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 py-6 font-heading text-base tracking-wider animate-pulse"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ANALYZING...
              </span>
            ) : (
              '⚡ ANALYZE & GET HELP'
            )}
          </Button>
        </div>

        <p className="mt-4 font-body text-xs text-white/50 max-w-xl">
          EEGA uses AI. Always call official emergency services (100/108/112) in life-threatening situations.
        </p>
      </motion.div>
    </section>
  );
}
