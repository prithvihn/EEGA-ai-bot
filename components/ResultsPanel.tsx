'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmergencyStore } from '@/store/emergencyStore';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { MapView } from './MapView';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdownBase from 'react-markdown';
import { getNearbyHospitals, type Hospital } from '@/lib/api';
const ReactMarkdown = ReactMarkdownBase as any;

function GuidanceSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="glass-panel rounded-lg p-4 border-emergency-red/40">
        <div className="h-5 w-48 bg-white/10 rounded mb-3" />
        <div className="h-2 bg-white/10 rounded-full w-full mb-2" />
      </div>
      <div className="space-y-3">
        <div className="h-6 w-64 bg-white/10 rounded" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-panel rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded" />
              <div className="h-4 bg-white/10 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HospitalsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-panel rounded p-3">
          <div className="h-4 bg-white/10 rounded w-3/5 mb-2" />
          <div className="h-3 bg-white/10 rounded w-2/5" />
        </div>
      ))}
    </div>
  );
}

export function ResultsPanel() {
  const { hasResult, mockResult, guidance, isLoading, location } = useEmergencyStore();
  const { showToast } = useToast();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  // Nearby hospitals state
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [hospitalsLoading, setHospitalsLoading] = useState(false);
  const [hospitalsError, setHospitalsError] = useState<string | null>(null);

  useEffect(() => {
    if (hasResult) {
      document.getElementById('results-panel')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hasResult]);

  // Fetch nearby hospitals when AI guidance is displayed
  useEffect(() => {
    if (hasResult && guidance && location) {
      setHospitalsLoading(true);
      setHospitalsError(null);
      getNearbyHospitals(location.lat, location.lng)
        .then((data) => {
          setHospitals(data);
          setHospitalsLoading(false);
        })
        .catch((err) => {
          setHospitalsError(err.message || 'Failed to fetch nearby hospitals.');
          setHospitalsLoading(false);
        });
    } else {
      setHospitals([]);
    }
  }, [hasResult, guidance, location]);

  // Show loading skeleton
  if (isLoading) {
    return (
      <section id="results-panel" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <GuidanceSkeleton />
        </div>
      </section>
    );
  }

  // Show AI guidance (API flow)
  if (hasResult && guidance) {
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
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel rounded-lg p-4 border-emergency-red/40 mb-6">
              <span className="font-heading text-lg tracking-wider text-emergency-red">
                🔴 AI EMERGENCY GUIDANCE
              </span>
            </div>

            <div className="glass-panel rounded-lg p-6">
              <div className="prose prose-invert prose-sm max-w-none
                              prose-p:text-gray-200
                              prose-strong:text-white prose-strong:font-bold
                              prose-headings:text-white prose-headings:font-heading
                              prose-ol:text-gray-200
                              prose-ul:text-gray-200
                              prose-li:text-gray-200
                              prose-li:my-1">
                <ReactMarkdown>{guidance}</ReactMarkdown>
              </div>
            </div>

            <div className="mt-6 glass-panel rounded-lg p-4">
              <h3 className="font-heading text-sm tracking-wider text-white mb-3">
                EMERGENCY NUMBERS
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Ambulance', number: '108' },
                  { label: 'Fire', number: '101' },
                  { label: 'Police', number: '100' },
                ].map(({ label, number }) => (
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

            {/* ── NEARBY HOSPITALS ─────────────────────────────────── */}
            <div className="mt-8">
              <div className="glass-panel rounded-lg p-4 border-emergency-red/40 mb-4">
                <span className="font-heading text-lg tracking-wider text-emergency-red">
                  🏥 NEARBY HOSPITALS
                </span>
              </div>

              {hospitalsLoading && <HospitalsSkeleton />}

              {hospitalsError && (
                <div className="glass-panel rounded-lg p-4 text-center">
                  <p className="font-body text-sm text-red-400">{hospitalsError}</p>
                </div>
              )}

              {!hospitalsLoading && !hospitalsError && hospitals.length === 0 && (
                <div className="glass-panel rounded-lg p-4 text-center">
                  <p className="font-body text-sm text-white/50">
                    No hospitals found nearby. Make sure location access is enabled.
                  </p>
                </div>
              )}

              {!hospitalsLoading && hospitals.length > 0 && (
                <>
                  {/* Map */}
                  <div className="glass-panel rounded-lg overflow-hidden h-[280px] sm:h-[320px] mb-4">
                    <MapView
                      center={
                        location
                          ? [location.lat, location.lng]
                          : [hospitals[0].lat, hospitals[0].lon]
                      }
                      userLocation={
                        location ? [location.lat, location.lng] : undefined
                      }
                      hospitals={hospitals}
                    />
                  </div>

                  {/* Hospital Cards */}
                  <div className="space-y-2">
                    {hospitals.map((h) => (
                      <motion.div
                        key={`${h.name}-${h.lat}-${h.lon}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel rounded p-3 flex justify-between items-center hover:border-emergency-red/30 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-body text-sm text-white font-medium truncate">
                            {h.name}
                          </p>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="font-body text-xs text-white/50">
                              📍 {h.distance_km} km
                            </span>
                            {h.phone && (
                              <a
                                href={`tel:${h.phone}`}
                                className="font-body text-xs text-electric-cyan hover:underline"
                              >
                                📞 {h.phone}
                              </a>
                            )}
                          </div>
                        </div>
                        <a
                          href={`https://www.openstreetmap.org/?mlat=${h.lat}&mlon=${h.lon}#map=16/${h.lat}/${h.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 shrink-0 px-3 py-1.5 rounded text-xs font-heading tracking-wider
                                     bg-emergency-red/20 text-emergency-red border border-emergency-red/30
                                     hover:bg-emergency-red/30 transition-colors"
                        >
                          Open in Maps
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <p className="mt-4 font-body text-xs text-white/50">
              Guidance generated by EEGA AI. Always verify with professional medical/emergency services.
            </p>
          </div>
        </motion.section>
      </AnimatePresence>
    );
  }

  // Show mock result (scenario card flow) — existing UI preserved
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
