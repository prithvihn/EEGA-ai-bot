'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer
      id="about"
      className="border-t border-emergency-red/20 py-12 px-4 sm:px-6 lg:px-8 bg-surface/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <Link
              href="/"
              className="font-heading text-xl tracking-widest text-emergency-red"
            >
              ⚡ EEGA
            </Link>
            <p className="font-body text-sm text-white/60 mt-2">
              Built to save lives with AI
            </p>
          </div>
          <nav className="flex gap-6 font-body text-sm text-white/70">
            <Link href="#" className="hover:text-electric-cyan transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-electric-cyan transition-colors">
              Disclaimer
            </Link>
          </nav>
        </div>
        <p className="font-body text-xs text-white/50 mt-8 max-w-2xl">
          EEGA is an AI assistant. Always contact official emergency services in
          real emergencies.
        </p>
      </div>
    </footer>
  );
}
