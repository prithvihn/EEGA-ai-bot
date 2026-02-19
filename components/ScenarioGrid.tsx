'use client';

import { motion } from 'framer-motion';
import { MOCK_SCENARIOS } from '@/lib/mockData';
import { useEmergencyStore } from '@/store/emergencyStore';

export function ScenarioGrid() {
  const submitEmergency = useEmergencyStore((s) => s.submitEmergency);

  const handleScenarioClick = (scenarioId: number) => {
    submitEmergency(scenarioId);
    document.getElementById('results-panel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="coverage"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-2xl sm:text-3xl tracking-[0.2em] text-white mb-10 text-center"
      >
        EMERGENCY SCENARIOS
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {MOCK_SCENARIOS.map((scenario, i) => (
          <motion.button
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleScenarioClick(scenario.id)}
            className="group glass-panel rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center gap-3 hover:border-emergency-red/50 hover:scale-105 transition-all duration-300 text-left"
          >
            <span className="text-4xl sm:text-5xl">{scenario.icon}</span>
            <span className="font-heading text-sm sm:text-base tracking-wider text-white">
              {scenario.name}
            </span>
            <span className="font-body text-xs text-emergency-red opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              CLICK TO GET GUIDANCE
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
