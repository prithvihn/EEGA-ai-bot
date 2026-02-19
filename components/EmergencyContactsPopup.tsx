'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmergencyStore } from '@/store/emergencyStore';
import { X } from 'lucide-react';

export function EmergencyContactsPopup() {
  const { hasResult, mockResult } = useEmergencyStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasResult && mockResult && !hasShown) {
      setIsOpen(true);
      setHasShown(true);
    }
    if (!hasResult) setHasShown(false);
  }, [hasResult, mockResult, hasShown]);

  if (!mockResult) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10001]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[10002] w-[90vw] max-w-md glass-panel rounded-xl border-emergency-red/50 shadow-[0_0_40px_rgba(255,45,45,0.2)] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl tracking-wider text-emergency-red">
                📲 EMERGENCY CONTACTS
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>
            <p className="font-body text-sm text-white/60 mb-4">
              For {mockResult.type} — call these numbers immediately:
            </p>
            <div className="space-y-3">
              {mockResult.emergencyNumbers.map(({ label, number }) => (
                <a
                  key={label}
                  href={`tel:${number}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface border border-emergency-red/20 hover:border-electric-cyan/50 transition-colors group"
                >
                  <span className="font-body text-white">{label}</span>
                  <span className="font-heading text-lg text-electric-cyan group-hover:underline">
                    {number}
                  </span>
                </a>
              ))}
            </div>
            <p className="font-body text-xs text-white/50 mt-4">
              Tap a number to call directly. Always contact official services in real emergencies.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
