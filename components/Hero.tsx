'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MARQUEE_ITEMS = [
  'CARDIAC ARREST',
  'FIRE',
  'SNAKE BITE',
  'ROAD ACCIDENT',
  'FLOODING',
  'POISONING',
  'ELECTRIC SHOCK',
  'DROWNING',
  'CHOKING',
  'HEAD INJURY',
  'BLEEDING',
  'EARTHQUAKE',
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Radar pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="radar-ring" />
        <div className="radar-ring" />
        <div className="radar-ring" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="font-heading text-2xl sm:text-3xl tracking-widest text-emergency-red">
          ⚡ EEGA
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-body text-sm text-white/80">
          <Link href="#how-it-works" className="hover:text-electric-cyan transition-colors">
            How It Works
          </Link>
          <Link href="#coverage" className="hover:text-electric-cyan transition-colors">
            Coverage
          </Link>
          <Link href="#about" className="hover:text-electric-cyan transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2 px-3 py-1.5 glass-panel rounded border-emergency-red/30">
          <span className="w-2 h-2 rounded-full bg-emergency-red blink-dot" />
          <span className="font-heading text-xs tracking-wider text-emergency-red">
            SYSTEM ACTIVE
          </span>
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.2em] text-white leading-tight max-w-5xl"
        >
          WHEN SECONDS MATTER,<br />EEGA RESPONDS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-base sm:text-lg text-white/70 max-w-2xl mt-6"
        >
          AI-powered emergency guidance. Live location. Real-time protocols. Nearest help — instantly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Link href="#emergency-input">
            <Button size="lg" className="w-full sm:w-auto text-base px-10 py-5 animate-pulse">
              🚨 GET EMERGENCY HELP
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              ▶ See How It Works
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="relative z-10 w-full overflow-hidden border-t border-emergency-red/20 py-3 bg-surface/80">
        <div className="marquee-content">
          <span className="font-heading text-sm tracking-[0.3em] text-white/60 whitespace-nowrap px-8">
            COVERING:{' '}
          </span>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-heading text-sm tracking-[0.3em] text-white/60 whitespace-nowrap px-8"
            >
              {item} •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
