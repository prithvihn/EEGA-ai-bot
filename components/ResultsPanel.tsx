'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmergencyStore } from '@/store/emergencyStore';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { MapView } from './MapView';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ResultsPanel() {
  const { hasResult, mockResult } = useEmergencyStore();

  useEffect(() => {
    if (hasResult) {
      document.getElementById('results-panel')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hasResult]);
  const { showToast } = useToast();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  if (!hasResult || !mockResult) return null;

  return (
    <AnimatePresence>
      <motion.section
        id="results-panel"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left - 60% */}
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-panel rounded-lg p-4 border-emergency-red/40">
                <span className="font-heading text-lg tracking-wider text-emergency-red">
                  🔴 {mockResult.type} DETECTED
                </span>
                <div className="mt-3">
                  <div className="flex justify-between text-sm font-body text-white/70 mb-1">
                    <span>Confidence</span>
                    <span>{mockResult.confidence}%</span>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mockResult.confidence}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-emergency-red"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading text-xl tracking-wider text-white">
                  STEP-BY-STEP GUIDANCE
                </h3>
                {mockResult.steps.map((step) => (
                  <Card
                    key={step.id}
                    className="overflow-hidden cursor-pointer hover:border-emergency-red/40"
                    onClick={() =>
                      setExpandedStep(expandedStep === step.id ? null : step.id)
                    }
                  >
                    <CardHeader className="flex flex-row items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{step.icon}</span>
                        <CardTitle className="text-base m-0">
                          {step.title}
                        </CardTitle>
                      </div>
                      {expandedStep === step.id ? (
                        <ChevronUp className="w-5 h-5 text-white/60" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/60" />
                      )}
                    </CardHeader>
                    <AnimatePresence>
                      {expandedStep === step.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-0 pb-4">
                            <p className="font-body text-sm text-white/70">
                              {step.description}
                            </p>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}
              </div>

              <p className="font-body text-xs text-white/50">
                {mockResult.source}
              </p>
            </div>

            {/* Right - 40% */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel rounded-lg overflow-hidden h-[280px] sm:h-[320px]">
                <MapView
                  center={[17.385, 78.4867]}
                  markers={mockResult.nearbyCenters.slice(0, 3)}
                />
              </div>

              <div>
                <h3 className="font-heading text-lg tracking-wider text-white mb-3">
                  NEAREST HELP
                </h3>
                <div className="space-y-2">
                  {mockResult.nearbyCenters.map((place) => (
                    <div
                      key={place.name}
                      className="glass-panel rounded p-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-body text-sm text-white font-medium">
                          {place.name}
                        </p>
                        <p className="font-body text-xs text-white/50">
                          {place.type} • {place.distance} • {place.eta}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <h3 className="font-heading text-sm tracking-wider text-white mb-3">
                  EMERGENCY NUMBERS
                </h3>
                <div className="space-y-2">
                  {mockResult.emergencyNumbers.map(({ label, number }) => (
                    <div
                      key={label}
                      className="flex justify-between font-body text-sm"
                    >
                      <span className="text-white/70">{label}</span>
                      <a
                        href={`tel:${number}`}
                        className="text-electric-cyan hover:underline"
                      >
                        {number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => showToast('SMS alert sent to contacts (mock)')}
              >
                📲 SEND SMS TO CONTACTS
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
