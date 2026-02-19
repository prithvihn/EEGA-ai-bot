'use client';

import { motion } from 'framer-motion';
import { HOW_IT_WORKS_STEPS } from '@/lib/mockData';

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-2xl sm:text-3xl tracking-[0.2em] text-white mb-16 text-center"
      >
        HOW IT WORKS
      </motion.h2>

      <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
        {/* Vertical dashed line - desktop centered */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 border-l-2 border-dashed border-emergency-red/30" />

        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`relative flex mb-10 md:mb-12 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
              <div className="glass-panel rounded-lg p-5 md:inline-block">
                <span className="font-heading text-xl text-emergency-red">
                  {String(step.id).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-base tracking-wider text-white mt-1">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-white/60 mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Center node */}
            <div className="absolute left-0 md:left-1/2 top-5 -translate-x-1/2 w-3 h-3 rounded-full bg-emergency-red border-2 border-background z-10" />

            <div className="hidden md:block flex-1" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
